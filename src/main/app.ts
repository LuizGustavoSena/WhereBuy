import express from 'express';
import authentication from './middlewares/protected-router';
import ShoppingListRouter from './routes/shopping-list-route';

const app = express();
const protectedRouter = express.Router();

protectedRouter.use('/shopping-list', ShoppingListRouter);

app.use('/v1', authentication, protectedRouter);

export default app;