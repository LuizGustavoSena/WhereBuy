import fastify from "fastify";
import { ShoppingListRouter } from './routes';

const app = fastify();

app.register(ShoppingListRouter, { prefix: '/shopping-list' });

export default app;