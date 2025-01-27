import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface CategoryAttributes {
  name: string;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'name'> {}

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public name!: string;
}

export function CategoryFactory(sequelize: Sequelize): typeof Category {
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize, 
      tableName: 'categories',
    }
  );

    return Category;
}