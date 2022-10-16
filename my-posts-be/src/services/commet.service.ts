import { BadRequestException, Injectable } from '@nestjs/common';
import Repository from '../repository/mongo.repository';
import CommentDocument from 'src/repository/model/Comment';

@Injectable()
export class CommentService {
    constructor(private readonly repository: Repository) { }

    async getComment(Id: string): Promise<CommentDocument[]> {
        try {
            const postId = parseInt(Id);
            return await this.repository.getCommentList({postId});
        } catch (error) {
            throw new BadRequestException('postId is not available, insert an available id');
        }
    }
}
