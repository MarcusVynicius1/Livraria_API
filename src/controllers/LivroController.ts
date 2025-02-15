import { Request, Response } from 'express';
import { Livro } from '../models/Livro';

export class LivroController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const livros = await Livro.findAll();
      return res.json(livros);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro not found' });
      }
      return res.json(livro);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, author, releaseYear } = req.body;
      const newLivro = await Livro.create({ title, author, releaseYear });
      return res.status(201).json(newLivro);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create livro' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro not found' });
      }

      await livro.update(req.body);
      return res.json(livro);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update livro' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro not found' });
      }

      await livro.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete livro' });
    }
  }
}
