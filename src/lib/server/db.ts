import mysql from 'mysql2/promise';
import { DATABASE_URL } from '$env/static/private';

// Initialize a robust, high-performance connection pool
export const db = mysql.createPool({
  uri: DATABASE_URL,
  connectionLimit: 15,          // Prevents connection starvation
  enableKeepAlive: true,        // Prevents MySQL timeouts on idle
  keepAliveInitialDelay: 10000
});