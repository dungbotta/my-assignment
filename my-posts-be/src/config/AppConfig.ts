type AppConfig = {
  MONGO_DB_URI: string;
  MONGO_DB: string;
  MONGO_COLLECTION_USERS: string;
  MONGO_COLLECTION_POSTS: string;
  MONGO_COLLECTION_COMMENTS: string;
  JWT_SECRET: string;
  CYPHER_KEY: string;
  CYPHER_NAME: string;
  CYPHER_IV: string;
  CYPHER_KEYSIZE: number;
  FRONTEND_URL: string;
};

export default AppConfig;
