import { MongoClient } from 'mongodb';
const connectDatabase = async () => {
  const uri =
    'mongodb+srv://umergillani36:aJ1ZSYke7FT7tdge@cluster0.2hss9zy.mongodb.net/?retryWrites=true&w=majority';
  const client = await MongoClient.connect(uri);
  return client;
};
const insertDocument = async (client, data) => {
  const db = client.db();
  await db.collection('emails').insertOne(data);
};
async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }
    let client;
    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: 'Connecting to the database failed' });
      return;
    }
    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
      return;
    }

    console.log('User Email', userEmail);
    res.status(201).json({ message: 'Successfully created' });
  }
}
export default handler;
