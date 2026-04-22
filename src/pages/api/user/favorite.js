import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, destinationId } = req.body;

  if (!email || !destinationId) {
    return res.status(400).json({ message: 'Missing email or destinationId' });
  }

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = db.users[userIndex];
  if (!user.favorites) user.favorites = [];

  const idToToggle = String(destinationId);
  const favoriteIndex = user.favorites.findIndex(id => String(id) === idToToggle);
  if (favoriteIndex === -1) {
    user.favorites.push(destinationId);
  } else {
    user.favorites.splice(favoriteIndex, 1);
  }

  db.users[userIndex] = user;
  writeDB(db);

  res.status(200).json({ favorites: user.favorites });
}
