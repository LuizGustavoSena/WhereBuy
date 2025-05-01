import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
import { makeShoppingList } from "../factories/use-cases";

export const ShoppingListRouter = (app: FastifyInstance) => {
    const shoppingListService = makeShoppingList();;

    app.get('/', async (req: FastifyRequest, res: FastifyReply) => {
        try {
            const response = await shoppingListService.getAllByUserId('');

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {

        }
    });
}