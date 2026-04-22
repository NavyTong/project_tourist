import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, destinationId, rating } = req.body;

  if (!email || !destinationId || rating === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const db = readDB();
  const userIndex = db.users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user's rating
  if (!db.users[userIndex].ratings) db.users[userIndex].ratings = {};
  db.users[userIndex].ratings[destinationId] = rating;

  // Update destination's average rating
  const destIndex = db.destinations.findIndex(d => d.id === destinationId);
  if (destIndex !== -1) {
    // In a real app, we'd calculate this from all user ratings.
    // For this demo, we'll just slightly shift the current rating based on the new input
    // or set it if it's the first time.
    const currentRating = db.destinations[destIndex].rating || 0;
    // Simple mock math: average of current and new (not perfect but works for demo)
    db.destinations[destIndex].rating = Number(((currentRating + rating) / 2).toFixed(1));
  }

  writeDB(db);

  res.status(200).json({ 
    userRating: rating, 
    newAverage: destIndex !== -1 ? db.destinations[destIndex].rating : null 
  });
}
