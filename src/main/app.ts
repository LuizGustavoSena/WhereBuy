import express from 'express';
import authentication from './middlewares/protected-router';
import ShoppingListRouter from './routes/shopping-list-route';

const app = express();
const protectedRoutes = express.Router();

protectedRoutes.use('/shopping-list', ShoppingListRouter);

app.use('/v1', authentication, protectedRoutes)

export default app;