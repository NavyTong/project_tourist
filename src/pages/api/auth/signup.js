import { readDB, writeDB } from '@/lib/db';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password, role, name, profileImage, bio, joinedDate, stats } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const db = readDB();
  
  if (db.users.find(u => u.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = {
    email,
    password,
    role: role || 'user',
    name: name || email.split('@')[0],
    profileImage: profileImage || '/avatar.png',
    bio: bio || "Welcome to my profile!",
    joinedDate: joinedDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    stats: stats || { trips: 0, reviews: 0, followers: 0 },
    favorites: [],
    ratings: {}
  };

  db.users.push(newUser);
  writeDB(db);

  // Remove password before sending back
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
}
