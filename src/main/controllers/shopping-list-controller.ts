import { HttpStatusCode } from "@src/data/protocols/http";
import { ItemNotFoundError } from "@src/domain/errors";
import { IShoppingList } from "@src/domain/use-cases";
import { IShoppingListValidation } from "@src/domain/validations";

export class ShoppingListController {
    constructor(
        private service: IShoppingList,
        private validation: IShoppingListValidation
    ) { };

    create = async (req: any, res: any, next: Function) => {
        try {
            this.validation.create(req.body);

            const response = await this.service.create({
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
            const response = await this.service.getAllByUserId(req.userId);

            res.status(response.length > 0 ? HttpStatusCode.Ok : HttpStatusCode.NoContent).send(response);
        } catch (error) {
            next(error);
        }
    }

    getByName = async (req: any, res: any, next: Function) => {
        try {
            this.validation.getByName(req.query?.name);

            const response = await this.service.getByName({
                name: req.query.name as string,
                userId: req.userId
            });

            res.status(response.length > 0 ? HttpStatusCode.Ok : HttpStatusCode.NoContent).send(response);
        } catch (error) {
            next(error);
        }
    }

    update = async (req: any, res: any, next: Function) => {
        try {
            this.validation.update({
                id: req.params.id,
                data: req.body
            });

            const response = await this.service.update({
                id: req.params.id,
                data: req.body
            });

            res.status(HttpStatusCode.Ok).send(response);
        } catch (error) {
            next(error);
        }
    }

    deleteById = async (req: any, res: any, next: Function) => {
        try {
            this.validation.deleteById(req.params.id);

            await this.service.deleteById(req.params.id);

            res.status(HttpStatusCode.Ok).send();
        } catch (error) {
            next(error);
        }
    }

    deleteAll = async (req: any, res: any, next: Function) => {
        try {
            await this.service.deleteAll(req.userId);

            res.status(HttpStatusCode.Ok).send();
        } catch (error) {
            next(error);
        }
    }

    paramsInterceptor = async (req: any, res: any, next: any) => {
        const item = await this.service.getByFilter({ id: req.params?.id });

        const isOwn = item.find(el => el.userId === req.userId);

        if (isOwn)
            return next();

        throw new ItemNotFoundError();
    }
}