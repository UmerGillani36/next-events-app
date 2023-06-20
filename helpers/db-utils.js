import ResultsTitle from '../components/results-title/results-title';
import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const uri =
    'mongodb+srv://umergillani36:aJ1ZSYke7FT7tdge@cluster0.2hss9zy.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);
  return client;
};
export const insertDocument = async (client, collection, data) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(data);
  return result;
};

export const getALLComments = async (client, collection, sort, filter = {}) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
};
