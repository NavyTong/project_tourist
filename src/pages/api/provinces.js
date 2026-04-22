import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = readDB();
      res.status(200).json(db.provinces || []);
    } catch (error) {
      res.status(500).json({ message: 'Error reading database' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, image } = req.body;
      if (!name || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const db = readDB();
      if (!db.provinces) db.provinces = [];

      const newProvince = {
        id: db.provinces.length > 0 ? Math.max(...db.provinces.map(p => p.id)) + 1 : 1,
        name,
        href: `/${name.toLowerCase().replace(/\s+/g, '')}`,
        image
      };

      db.provinces.push(newProvince);
      writeDB(db);

      res.status(201).json(newProvince);
    } catch (error) {
      res.status(500).json({ message: 'Error writing to database' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
