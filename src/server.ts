import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './database';
import { LivroController } from './controllers/LivroController';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));

const livroController = new LivroController();

// Conectar ao banco antes de iniciar o servidor
connectDB();

app.get('/livros', async (req, res, next) => {
    try {
        await livroController.getAll(req, res);
    } catch (error) {
        next(error);
    }
});

app.get('/livros/:id', async (req, res, next) => {
    try {
        await livroController.getById(req, res);
    } catch (error) {
        next(error);
    }
});

app.post('/livros', async (req, res, next) => {
    try {
        await livroController.create(req, res);
    } catch (error) {
        next(error);
    }
});

app.patch('/livros/:id', async (req, res, next) => {
    try {
        await livroController.update(req, res);
    } catch (error) {
        next(error);
    }
});

app.delete('/livros/:id', async (req, res, next) => {
    try {
        await livroController.delete(req, res);
    } catch (error) {
        next(error);
    }
});



app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
