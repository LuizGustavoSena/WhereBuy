import { DatabaseError, ItemNotFoundError } from "@src/domain/errors";
import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult, ShoppingListProps, validateItemOwnershipFilter } from "@src/domain/models";
import { IShoppingList } from "@src/domain/use-cases";
import moment from "moment";
import { IDatabaseClient } from "../protocols/database";
import { IGuidClient } from "../protocols/guid";

export class ShoppingList implements IShoppingList {
    constructor(
        private dbClient: IDatabaseClient<ShoppingListProps>,
        private guidClient: IGuidClient,
    ) { }

    async create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse> {
        try {
            const request: ShoppingListProps = {
                ...params,
                id: this.guidClient.generate(),
                created: moment().toDate()
            }

            const response = await this.dbClient.create(request);

            return {
                id: response.id
            };
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async getAllByUserId(userId: string): Promise<GetAllShoppingListResult> {
        try {
            const response = await this.dbClient.getByFIlter({ userId }) as Partial<ShoppingListProps>[];

            response.forEach(obj => {
                delete obj.userId;
            });

            return response as GetAllShoppingListResult;
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async getByName(name: string): Promise<GetByNameShoppingListResult> {
        try {
            const response = await this.dbClient.getByFIlter({ name }) as Partial<ShoppingListProps>[];

            if (!response || response.length === 0)
                throw new ItemNotFoundError();

            response.forEach(obj => {
                delete obj.userId;
            });

            return response as GetByNameShoppingListResult;
        } catch (error) {
            if (error instanceof ItemNotFoundError)
                throw new ItemNotFoundError();

            throw new DatabaseError();
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            await this.dbClient.deleteById(id);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async deleteAll(userId: string): Promise<void> {
        try {
            const response = await this.getAllByUserId(userId);

            const promise = response.map(el => this.deleteById(el.id));

            await Promise.all(promise);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async validateItemOwnership(req: any, res: any, next: Function) {
        const idParam = Number(req.params?.id);

        var filter: validateItemOwnershipFilter = { id: idParam };

        if (isNaN(idParam))
            filter = { name: req.query?.name };

        const item = await this.dbClient.getByFIlter(filter) as Partial<ShoppingListProps>[];

        const isOwn = item.find(el => el.userId === req.user.id);

        if (isOwn)
            return next();

        throw new ItemNotFoundError();
    }
}