import { HttpStatusCode } from "@src/data/protocols/http";
import { IShoppingList } from "@src/domain/use-cases";

export class ShoppingListController {
    constructor(
        private shoppingListService: IShoppingList
    ){};

    async create(req: any, res: any, next: Function){
        try {
            const response = await this.shoppingListService.create(req.body);

            res.status(HttpStatusCode.Created).send(response);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: any, res: any, next: Function){
        try {
            const response = await this.shoppingListService.getAll(req.user.id);

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }

    async getByName(req: any, res: any, next: Function){
        try {
            const response = await this.shoppingListService.getByName(req.query.name);

            res.status(response ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }

    async deleteById(req: any, res: any, next: Function){
        try {
            await this.shoppingListService.deleteById(req.params.id);

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    async deleteAll(req: any, res: any, next: Function){
        try {
            await this.shoppingListService.deleteAll(req.user.id);

            res.status(200).send();
        } catch (error) {
            next(error);
        }
    }

    async paramsInterceptor(req: any, res: any, next: any) {
        try {
            await this.shoppingListService.validateItemOwnership(req, res, next);

            next();
        } catch (error) {
            next(error);
        }
    }
}