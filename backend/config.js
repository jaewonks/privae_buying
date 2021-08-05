import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME,
  DB_PW: process.env.DB_PW,
}

