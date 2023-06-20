import {
  connectDatabase,
  insertDocument,
  getALLComments,
} from '../../../../helpers/db-utils';
async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: 'Connecting to the database failed' });
    return;
  }
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
      client.close();
      return;
    }
    console.log(email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    let result;
    try {
      result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: 'Added successfully', comment: newComment });
    } catch (err) {
      res.status(500).json({ message: 'Inserting data failed' });
    }
  }
  if (req.method === 'GET') {
    try {
      const documents = await getALLComments(
        client,
        'comments',
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (err) {
      res.status(500).json({ message: 'Getting comments failed' });
    }
  }
  client.close();
}
export default handler;
