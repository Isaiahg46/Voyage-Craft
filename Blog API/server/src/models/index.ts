import sequelize from '../index.js';
import { UserFactory } from './User.js';
import { PostFactory } from './Post.js';
import { CategoryFactory } from './Category.js';

const User = UserFactory(sequelize);
const Post = PostFactory(sequelize);
const Category = CategoryFactory(sequelize);

User.hasMany(Post);
Post.belongsTo(User);
Category.hasMany(Post);

export { User, Post, Category };