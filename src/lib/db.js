import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/db.json');

export const readDB = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    return { provinces: [], destinations: [], activities: [] };
  }
};

export const writeDB = (data) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing DB:', error);
    return false;
  }
};

export const getData = (collection) => {
  const db = readDB();
  return db[collection] || [];
};

export const saveData = (collection, item) => {
  const db = readDB();
  if (!db[collection]) db[collection] = [];
  
  const newItem = { ...item, id: item.id || Date.now() };
  db[collection].push(newItem);
  
  writeDB(db);
  return newItem;
};

export const updateData = (collection, id, updates) => {
  const db = readDB();
  if (!db[collection]) return null;
  
  const index = db[collection].findIndex(item => item.id == id);
  if (index === -1) return null;
  
  db[collection][index] = { ...db[collection][index], ...updates };
  writeDB(db);
  return db[collection][index];
};

export const deleteData = (collection, id) => {
  const db = readDB();
  if (!db[collection]) return false;
  
  const initialLength = db[collection].length;
  db[collection] = db[collection].filter(item => item.id != id);
  
  if (db[collection].length === initialLength) return false;
  
  writeDB(db);
  return true;
};
