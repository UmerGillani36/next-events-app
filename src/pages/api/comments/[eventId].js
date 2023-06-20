import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;
  const uri =
    'mongodb+srv://umergillani36:aJ1ZSYke7FT7tdge@events.2hss9zy.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);
  const db = client.db();
  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    console.log(email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    res
      .status(201)
      .json({ message: 'Added successfully', comment: newComment });
  }
  if (req.method === 'GET') {
    const documents = await db
      .collection('comments')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}
export default handler;
