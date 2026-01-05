import {DatabaseSync} from  'node:sqlite'
const db = new DatabaseSync(':memory:')

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

db.exec(`
    CREATE TABLE jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        job_title TEXT,
        job_description TEXT,
        date_applied INTEGER,
        accepted BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)




export default db