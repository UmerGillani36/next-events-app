import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    const uri =
      'mongodb+srv://umergillani36:aJ1ZSYke7FT7tdge@cluster0.2hss9zy.mongodb.net/?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);
    const db = client.db();
    await db.collection('emails').insertOne({ email: userEmail });
    client.close();
    console.log('User Email', userEmail);
    res.status(201).json({ message: 'Successfully created' });
  }
}
export default handler;
