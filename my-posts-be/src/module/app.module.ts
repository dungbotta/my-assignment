import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentController } from '../controller/comment.controller';
import { PostController } from '../controller/post.controller';
import { CommentService } from '../services/commet.service';
import { PostService } from '../services/post.service';
import DatabaseModule from './database.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule],
  controllers: [
    PostController,
    CommentController
  ],
  providers: [
    PostService,
    CommentService
  ],
})
export class AppModule {}
