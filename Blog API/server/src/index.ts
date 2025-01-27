import express from 'express';
const app = express();
import dotenv from 'dotenv';
import authRoute from './routes/auth';
import userRoute from './routes/users';
import postRoute from './routes/posts';
import categoryRoute from './routes/categories';

dotenv.config();
app.use(express.json());

import { Sequelize } from 'sequelize';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '',
      process.env.DB_USER || '',
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );
export default sequelize;


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});