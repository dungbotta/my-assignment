import { Body, Controller, Get, Param, Put, Delete, Post } from '@nestjs/common';
import { CommentService } from '../services/commet.service';
import CommentDocument from '../repository/model/Comment';

@Controller('posts/')
export class CommentController {
  constructor(
    private readonly commentService: CommentService) {}

  @Get(':id/comments')
  async getComment(@Param('id') id: string): Promise<CommentDocument[]> {
    return await this.commentService.getComment(id);
  }
}
