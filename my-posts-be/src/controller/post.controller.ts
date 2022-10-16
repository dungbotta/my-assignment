import { Body, Controller, Get, Param, Put, Delete, Post } from '@nestjs/common';
import { PostService } from '../services/post.service';
import PostDocument from '../repository/model/Post';

@Controller('/posts/')
export class PostController {
  constructor(
    private readonly postService: PostService)
    {}

  @Get()
  async getPosts(): Promise<PostDocument[]> {
    return await this.postService.getPosts();
  }

  @Post()
  async createPost(@Body() newPost: PostDocument): Promise<PostDocument> {
    return await this.postService.createPost(newPost);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() newPost: PostDocument): Promise<PostDocument> {
    return await this.postService.updatePost(newPost, parseInt(id));
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<boolean> {
    return await this.postService.deletePost(parseInt(id));
  }

}
