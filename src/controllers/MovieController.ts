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

}