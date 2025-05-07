import { HttpStatusCode } from "@src/data/protocols/http";
import { ItemNotFoundError } from "@src/domain/errors";
import { validateItemOwnershipFilter } from "@src/domain/models";
import { IShoppingList } from "@src/domain/use-cases";

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

    getByName = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.getByName(req.query.name);

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
        const idParam = Number(req.params?.id);

        var filter: validateItemOwnershipFilter = { id: idParam };

        if (isNaN(idParam))
            filter = { name: req.query?.name };

        const item = await this.shoppingListService.getByFilter(filter);

        const isOwn = item.find(el => el.userId === req.user.id);

        if (isOwn)
            return next();

        throw new ItemNotFoundError();
    }
}