import express, { Response } from 'express';
import { authentication, errorHandler } from './middlewares';
import ShoppingListRouter from './routes/shopping-list-route';

const app = express();
const protectedRouter = express.Router();

app.use(express.json());

protectedRouter.use('/shopping-list', ShoppingListRouter);

app.use('/v1', authentication, protectedRouter);

app.use((err: Error, req: any, res: Response, next: any) => {
    errorHandler(err, res);
});

export default app;