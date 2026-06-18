import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  const db = readDB();
  if (!db.reviews) db.reviews = [];

  // GET — fetch all reviews
  if (req.method === 'GET') {
    return res.status(200).json(db.reviews);
  }

  // DELETE — remove review by id
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: 'Missing review id' });

    const before = db.reviews.length;
    db.reviews = db.reviews.filter((r) => String(r.id) !== String(id));

    if (db.reviews.length === before) {
      return res.status(404).json({ message: 'Review not found' });
    }

    writeDB(db);
    return res.status(200).json({ message: 'Review deleted' });
  }

  // PATCH — update review status (approve / pending)
  if (req.method === 'PATCH') {
    const { id } = req.query;
    const { status } = req.body;

    if (!id || !status) return res.status(400).json({ message: 'Missing id or status' });

    const idx = db.reviews.findIndex((r) => String(r.id) === String(id));
    if (idx === -1) return res.status(404).json({ message: 'Review not found' });

    db.reviews[idx].status = status;
    writeDB(db);
    return res.status(200).json(db.reviews[idx]);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
