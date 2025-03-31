import { DatabaseError } from "@src/domain/errors";
import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult, ShoppingListProps } from "@src/domain/models";
import { IShoppingList } from "@src/domain/use-cases";
import moment from "moment";
import { IDatabaseClient } from "../protocols/database";
import { IGuidClient } from "../protocols/guid";

export class ShoppingList implements IShoppingList {
    constructor(
        private dbClient: IDatabaseClient,
        private guidClient: IGuidClient,
    ){};

    async create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse> {
        try {
            const request: ShoppingListProps = {
                ...params,
                id: this.guidClient.generate(),
                created: moment().toISOString()
            }

            const response = await this.dbClient.create<ShoppingListProps, CreateShoppingListResponse>(request);

            return {
                id: response.id
            };
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async getAll(userId: string): Promise<GetAllShoppingListResult> {
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
            const response = await this.dbClient.getByFIlter({ name }) as GetByNameShoppingListResult;

            return response;
        } catch (error) {
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
            const response = await this.getAll(userId);

            const promise = response.map(el => this.deleteById(el.id));

            await Promise.all(promise);
        } catch (error) {
            throw new DatabaseError();
        }
    }
}