import { Request, Response } from 'express';
import { pool } from '../database';
import { MovieDTO } from '../dto/MovieDTO';


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

    async create(req: Request, res: Response) {
        const { title, director, releaseYear }: MovieDTO = req.body; console.log(req.body)
        const client = await pool.connect();
        try {
            const result = await client.query(
                'INSERT INTO movies (title, director, releaseYear) VALUES ($1, $2, $3) RETURNING *',
                [title, director, releaseYear]
            );
            res.json(result.rows[0]);
        } finally {
            client.release();
        }
    }

    async update(req: Request, res: Response) {
        const updates = req.body;
        const id = req.params.id;
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ message: 'No fields provided for update' });
        } else {

            const fields = Object.keys(updates).map((key, index) => `${key} = $${index + 1}`).join(', ');
            const values = Object.values(updates);

            const client = await pool.connect();
            try {
                const result = await client.query(
                    `UPDATE movies SET ${fields} WHERE id = $${values.length + 1} RETURNING *`,
                    [...values, id]
                );
                result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ message: 'Movie not found' });
            } finally {
                client.release();
            }

        }
    }

    async delete(req: Request, res: Response) {
        const client = await pool.connect();
        try {
            const result = await client.query('DELETE FROM movies WHERE id = $1 RETURNING *', [req.params.id]);
            result.rows.length ? res.json(result.rows[0]) : res.status(404).json({ message: 'Movie not found' });
        } finally {
            client.release();
        }
    }

}