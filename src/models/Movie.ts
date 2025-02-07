import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Movie extends Model {
  public id!: number;
  public title!: string;
  public director!: string;
  public releaseYear!: number;
}

Movie.init(
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
    director: {
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
    tableName: 'movies',
  }
);
