import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db, Filter, MongoClient } from 'mongodb';
import AppConfig from '../config/AppConfig';
import { DATABASE_CLIENT } from './database';
import CommentDocument from './model/Comment';
import PostDocument from './model/Post';

@Injectable()
class Repository implements OnApplicationShutdown {
    private readonly appDb: Db;

    constructor(
        @Inject(DATABASE_CLIENT) private readonly client: MongoClient,
        private readonly config: ConfigService<AppConfig>,
    ) {
        this.appDb = this.client.db(config.get('MONGO_DB'));
    }

    async getPostsList(query: Filter<PostDocument>): Promise<PostDocument[]> {
        return this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).find(query).sort({id: -1}).toArray();
    }

    async getLatPost(): Promise<PostDocument> {
        return (await this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).find({}).sort({id: -1}).limit(1).toArray())?.[0];
    }

    async getPost(query: Filter<PostDocument>): Promise<PostDocument> {
        return this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).findOne(query);
    }

    async updatePost(post: PostDocument): Promise<PostDocument> {
        await this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).updateOne(
            { id: post.id },
            { $set: { ...post, updateAt: new Date() } },
            { upsert: true, }
        );
        return this.getPost({ id: post.id });
    }

    async updatePostFromId(postId: number, post: PostDocument): Promise<PostDocument> {
        await this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).updateOne(
            { id: postId },
            { $set: { ...post, updateAt: new Date() } },
            { upsert: true, }
        );
        return this.getPost({ id: post.id });
    }

    async createPost(post: PostDocument): Promise<PostDocument> {
        await this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).insertOne(
            { ...post, createAt: new Date(), updateAt: new Date() }
        );
        return this.getPost({ id: post.id });
    }
    
    async deletePost(id: number): Promise<boolean> {
       const deleteResult =  await this.appDb.collection<PostDocument>(this.config.get('MONGO_COLLECTION_POSTS')).deleteOne(
            { id: id }
        );
        return (deleteResult.deletedCount >= 1);
    }

    async onApplicationShutdown(signal?: string): Promise<void> {
        await this.client.close();
    }

    // COMMENTS
    async getCommentList(query: Filter<CommentDocument>): Promise<CommentDocument[]> {
        const res = await this.appDb.collection<CommentDocument>(this.config.get('MONGO_COLLECTION_COMMENTS')).find(query).toArray();
        return res;
    }
    
}

export default Repository;