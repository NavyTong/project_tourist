import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, bio, profileImage } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Missing email' });
  }

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (name) db.users[userIndex].name = name;
  if (bio !== undefined) db.users[userIndex].bio = bio;
  if (profileImage) db.users[userIndex].profileImage = profileImage;

  writeDB(db);

  const { password, ...userWithoutPassword } = db.users[userIndex];
  res.status(200).json(userWithoutPassword);
}
