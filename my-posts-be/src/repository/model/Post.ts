import { WithId } from "mongodb";

class Post {
    userId!: number;
    id: number;
    title: string;
    bosy: string;
  };

  type PostDocument = Post & WithId<{
      createAt: Date,
      updateAt: Date,
  }>

  export default PostDocument;