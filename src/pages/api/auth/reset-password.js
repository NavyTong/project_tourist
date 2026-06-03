import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Missing email or new password' });
  }

  const db = readDB();
  
  // Find the index of the user
  const userIndex = db.users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Account not found for this email' });
  }

  // Update the user's password
  db.users[userIndex].password = newPassword;

  // Save the updated database
  writeDB(db);

  return res.status(200).json({ message: 'Password reset successfully' });
}
