import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

export class MovieController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await Movie.findAll();
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const movie = await Movie.findByPk(req.params.id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
      return res.json(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, director, releaseYear } = req.body;
      const newMovie = await Movie.create({ title, director, releaseYear });
      return res.status(201).json(newMovie);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create movie' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      await movie.update(req.body);
      return res.json(movie);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update movie' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const movie = await Movie.findByPk(id);
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }

      await movie.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete movie' });
    }
  }
}
