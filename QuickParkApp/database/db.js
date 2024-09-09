import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve('./database/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const pool = mysql.createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    port: config.dbPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
