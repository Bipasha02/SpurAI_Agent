import Database from 'better-sqlite3';
import * as path from 'path';

const dbPath = path.resolve(process.cwd(), 'chat.db');
const db = new Database(dbPath); 

export default db;