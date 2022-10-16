import { Injectable } from '@nestjs/common';
import Repository from '../repository/mongo.repository';
import PostDocument from 'src/repository/model/Post';

@Injectable()
export class PostService {
    constructor(private readonly repository: Repository) { }

    async getPosts(): Promise<PostDocument[]> {
        return await this.repository.getPostsList({});
    }

    async createPost(newPost: PostDocument): Promise<PostDocument> {
        const lastPostId = (await this.repository.getLatPost())?.id;
        return await this.repository.createPost({...newPost, id: lastPostId ? lastPostId + 1 : 1 });

    }

    async updatePost(newPost: PostDocument, postToUpdateId?: number): Promise<PostDocument> {
        if (postToUpdateId) {
            return await this.repository.updatePostFromId(postToUpdateId, newPost);
        }
        return await this.repository.updatePost(newPost);

    }

    async deletePost(id: number): Promise<boolean> {
        return await this.repository.deletePost(id);
    }

}
