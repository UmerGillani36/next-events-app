function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    console.log('User Email', userEmail);
    res.status(201).json({ message: 'Successfully created' });
  }
}
export default handler;
