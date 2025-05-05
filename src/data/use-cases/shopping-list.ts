import { DatabaseError, ItemNotFoundError } from "@src/domain/errors";
import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByFilterShoppingListResult, GetByNameShoppingListResult, ShoppingListProps } from "@src/domain/models";
import { IShoppingList } from "@src/domain/use-cases";
import moment from "moment";
import { IDatabaseClient } from "../protocols/database";
import { IGuidClient } from "../protocols/guid";

export class ShoppingList implements IShoppingList {
    constructor(
        private dbClient: IDatabaseClient<ShoppingListProps>,
        private guidClient: IGuidClient,
    ) { }

    create = async (params: CreateShoppingListProps): Promise<CreateShoppingListResponse> => {
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

    getAllByUserId = async (userId: string): Promise<GetAllShoppingListResult> => {
        try {
            const response = await this.getByFilter({ userId }) as Partial<ShoppingListProps>[];

            response.forEach(obj => {
                delete obj.userId;
            });

            return response as GetAllShoppingListResult;
        } catch (error) {
            if (error instanceof ItemNotFoundError)
                return [];

            throw error;
        }
    }

    getByName = async (name: string): Promise<GetByNameShoppingListResult> => {
        try {
            const response = await this.getByFilter({ name }) as Partial<ShoppingListProps>[];

            response.forEach(obj => {
                delete obj.userId;
            });

            return response as GetByNameShoppingListResult;
        } catch (error) {
            if (error instanceof ItemNotFoundError)
                return [];

            throw error;
        }
    }

    getByFilter = async (filter: object): Promise<GetByFilterShoppingListResult> => {
        try {
            const response = await this.dbClient.getByFIlter(filter) as Partial<ShoppingListProps>[];

            if (!response || response.length === 0)
                throw new ItemNotFoundError();

            return response as GetByFilterShoppingListResult;
        } catch (error) {
            if (error instanceof ItemNotFoundError)
                throw new ItemNotFoundError();

            throw new DatabaseError();
        }
    }

    deleteById = async (id: string): Promise<void> => {
        try {
            await this.dbClient.deleteById(id);
        } catch (error) {
            throw new DatabaseError();
        }
    }

    deleteAll = async (userId: string): Promise<void> => {
        try {
            const response = await this.getAllByUserId(userId);

            const promise = response.map(el => this.deleteById(el.id));

            await Promise.all(promise);
        } catch (error) {
            throw new DatabaseError();
        }
    }
}