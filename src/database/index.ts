import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
  host: config.host,
  port: parseInt(config.db_port as string, 10),
  database: config.databse,
  user: config.user,
  password: config.password,
});

pool.on('error', (error) => {
  console.error(error.message);
});

export default pool;
