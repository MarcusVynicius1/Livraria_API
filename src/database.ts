import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,   // Atualizado para DB_DATABASE
  process.env.DB_USERNAME as string,   // Atualizado para DB_USERNAME
  process.env.DB_PASSWORD as string,   // Atualizado para DB_PASSWORD
  {
    host: process.env.DB_HOST,         // Atualizado para DB_HOST
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT as string, 10), // Usando DB_PORT
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
