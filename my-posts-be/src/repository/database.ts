import { MongoClient } from 'mongodb';
import { FactoryProvider } from '@nestjs/common';
import AppConfig from '../config/AppConfig';
import { ConfigService } from '@nestjs/config';

export const DATABASE_CLIENT = 'DATABASE_CLIENT';

const createClient = async (
  config: ConfigService<AppConfig>,
): Promise<MongoClient> => {
  const mongoUri = config.get('MONGO_DB_URI');
  let client = new MongoClient(mongoUri);

  client = await client.connect();

  return client;
};

const MongoClientProvider: FactoryProvider<Promise<MongoClient>> = {
  inject: [ConfigService],
  provide: DATABASE_CLIENT,
  useFactory: (config: ConfigService) => createClient(config),
};

export default MongoClientProvider;
