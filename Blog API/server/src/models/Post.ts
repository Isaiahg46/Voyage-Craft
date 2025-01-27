import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  username: string;
  category: string[];
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public username!: string;
  public category!: string[];
}

export function PostFactory(sequelize: Sequelize): typeof Post {
  Post.init(
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
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        category: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
    },
    {
      sequelize,
      tableName: 'posts',
    }
  );

    return Post;
}