import { WithId } from 'mongodb';

class Comment {
    postId: number;
    id: number;
    name: string;
    title: string;
    bosy: string;
  };

  type CommentDocument = Comment & WithId<{
    createAt: Date,
    updateAt: Date,
}>

export default CommentDocument;