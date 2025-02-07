import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './database';
import { MovieController } from './controllers/MovieController';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));

const movieController = new MovieController();

// Conectar ao banco antes de iniciar o servidor
connectDB();

app.get('/movies', async (req, res, next) => {
    try {
        await movieController.getAll(req, res);
    } catch (error) {
        next(error);
    }
});

app.get('/movies/:id', async (req, res, next) => {
    try {
        await movieController.getById(req, res);
    } catch (error) {
        next(error);
    }
});

app.post('/movies', async (req, res, next) => {
    try {
        await movieController.create(req, res);
    } catch (error) {
        next(error);
    }
});

app.patch('/movies/:id', async (req, res, next) => {
    try {
        await movieController.update(req, res);
    } catch (error) {
        next(error);
    }
});

app.delete('/movies/:id', async (req, res, next) => {
    try {
        await movieController.delete(req, res);
    } catch (error) {
        next(error);
    }
});



app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
