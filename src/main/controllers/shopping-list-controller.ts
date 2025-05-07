import { HttpStatusCode } from "@src/data/protocols/http";
import { ItemNotFoundError } from "@src/domain/errors";
import { IShoppingList } from "@src/domain/use-cases";
import { Request } from 'express';

export class ShoppingListController {
    constructor(
        private shoppingListService: IShoppingList
    ) { };

    create = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.create({
                ...req.body,
                userId: req.userId
            });

            res.status(HttpStatusCode.Created).send(response);
        } catch (error) {
            next(error);
        }
    }

    getAllByUserId = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.getAllByUserId(req.userId);

            res.status(response.length > 0 ? HttpStatusCode.Ok : HttpStatusCode.NoContent).send(response);
        } catch (error) {
            next(error);
        }
    }

    getByName = async (req: Request, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.getByName({
                name: req.query.name as string,
                userId: req.userId
            });

            res.status(response.length > 0 ? HttpStatusCode.Ok : HttpStatusCode.NoContent).send(response);
        } catch (error) {
            next(error);
        }
    }

    deleteById = async (req: any, res: any, next: Function) => {
        try {
            await this.shoppingListService.deleteById(req.params.id);

            res.status(HttpStatusCode.Ok).send();
        } catch (error) {
            next(error);
        }
    }

    deleteAll = async (req: any, res: any, next: Function) => {
        try {
            await this.shoppingListService.deleteAll(req.userId);

            res.status(HttpStatusCode.Ok).send();
        } catch (error) {
            next(error);
        }
    }

    paramsInterceptor = async (req: any, res: any, next: any) => {
        const item = await this.shoppingListService.getByFilter({ id: req.params?.id });

        const isOwn = item.find(el => el.userId === req.userId);

        if (isOwn)
            return next();

        throw new ItemNotFoundError();
    }
}