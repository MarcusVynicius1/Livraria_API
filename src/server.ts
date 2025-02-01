import express from 'express';
import { pool } from './database';
import dotenv from 'dotenv';
import { MovieController } from './controllers/MovieController';

dotenv.config();

const app = express();
app.use(express.json());

(async () => {
    try {
        const client = await pool.connect();
        console.log('Database connected');
        client.release();
    } catch (err) {
        console.error('Database connection error', err);
    }
})();

const movieController = new MovieController();

app.get('/movies', movieController.getAll);
app.get('/movies/:id', movieController.getById);

app.listen(3000, () => console.log('Server running on port 3000'));