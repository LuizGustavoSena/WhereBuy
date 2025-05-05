import { HttpStatusCode } from "@src/data/protocols/http";
import { IShoppingList } from "@src/domain/use-cases";

export class ShoppingListController {
    constructor(
        private shoppingListService: IShoppingList
    ) { };

    create = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.create(req.body);

            res.status(HttpStatusCode.Created).send(response);
        } catch (error) {
            next(error);
        }
    }

    getAllByUserId = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.getAllByUserId(req.user.id);

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }

    getByName = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.shoppingListService.getByName(req.query.name);

            res.status(response ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }

    deleteById = async (req: any, res: any, next: Function) => {
        try {
            await this.shoppingListService.deleteById(req.params.id);

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    deleteAll = async (req: any, res: any, next: Function) => {
        try {
            await this.shoppingListService.deleteAll(req.user.id);

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    paramsInterceptor = async (req: any, res: any, next: any) => {
        try {
            await this.shoppingListService.validateItemOwnership(req, res, next);

            next();
        } catch (error) {
            next(error);
        }
    }
}