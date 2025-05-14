import express, { Response } from 'express';
import helmet from 'helmet';
import { authentication, errorHandler, rateLimiter, tooBusyCheck } from './middlewares';
import RenderBuyListRouter from './routes/render-buy-list-route';
import ShoppingListRouter from './routes/shopping-list-route';

const app = express();
const protectedRouter = express.Router();

app.use(express.json());
app.use(helmet());
app.use(tooBusyCheck);
app.use(rateLimiter);

protectedRouter.use('/shopping-list', ShoppingListRouter);
protectedRouter.use('/render-buy-list', RenderBuyListRouter);

app.use('/v1', authentication, protectedRouter);

app.use((err: Error, req: any, res: Response, next: any) => {
    errorHandler(err, res);
});

export default app;