import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  const db = readDB();
  if (!db.activities) db.activities = [];

  // GET — return all activities
  if (req.method === 'GET') {
    return res.status(200).json(db.activities);
  }

  // POST — create a new activity
  if (req.method === 'POST') {
    const { name, category, description, image } = req.body;

    if (!name || !category || !description) {
      return res.status(400).json({ message: 'Name, category, and description are required' });
    }

    const newActivity = {
      id: Date.now(),
      name,
      category,
      description,
      image: image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    };

    db.activities.push(newActivity);
    writeDB(db);

    return res.status(201).json(newActivity);
  }

  // DELETE — remove activity by id
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing activity id' });

    const before = db.activities.length;
    db.activities = db.activities.filter((a) => String(a.id) !== String(id));

    if (db.activities.length === before) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    writeDB(db);
    return res.status(200).json({ message: 'Activity deleted' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
