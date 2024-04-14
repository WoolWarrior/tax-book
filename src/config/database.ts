import { Options } from 'sequelize';
import 'dotenv/config'

export const development: Options = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: false
  }
};
