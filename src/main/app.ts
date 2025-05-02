import express from 'express';
import ShoppingListRouter from './routes/shopping-list-route';

const app = express();
const protectedRoutes = express.Router();

protectedRoutes.use('/shopping-list', ShoppingListRouter);

export default app;