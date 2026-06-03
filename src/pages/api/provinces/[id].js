import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const db = readDB();
      if (!db.provinces) {
        return res.status(404).json({ message: 'Provinces not found' });
      }

      const provinceId = parseInt(id, 10);
      const provinceIndex = db.provinces.findIndex(p => p.id === provinceId);

      if (provinceIndex === -1) {
        return res.status(404).json({ message: 'Province not found' });
      }

      const deletedProvince = db.provinces.splice(provinceIndex, 1)[0];
      writeDB(db);

      res.status(200).json({ message: 'Province deleted successfully', province: deletedProvince });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ message: 'Error deleting province' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
