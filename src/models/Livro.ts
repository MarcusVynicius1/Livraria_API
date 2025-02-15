import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Livro extends Model {
  public id!: number;
  public title!: string;
  public author!: string;
  public releaseYear!: number;
}

Livro.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'livros',
  }
);
