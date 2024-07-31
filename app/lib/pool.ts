import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_DATABASE,
     port:3307,
});

export default pool;
