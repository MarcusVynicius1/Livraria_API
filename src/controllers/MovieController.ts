import { Request, Response } from 'express';
import { pool } from '../database';


export class MovieController {
    
    async getAll(req: Request, res: Response) {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM movies');
            res.json(result.rows);
        } finally {
            client.release();
        }
    }

    async getById(req: Request, res: Response) {
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM movies WHERE id = $1', [req.params.id]);
            result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ message: 'Movie not found' });
        } finally {
            client.release();
        }
    }

}