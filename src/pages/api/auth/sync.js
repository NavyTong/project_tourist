import { readDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email' });
  }

  const db = readDB();
  const user = db.users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove password from response
  const { password, ...userWithoutPassword } = user;
  res.status(200).json(userWithoutPassword);
}
