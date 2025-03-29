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

            return response;
        } catch (error) {
            throw new DatabaseError();
        }
    }

    async getAll(): Promise<GetAllShoppingListResult> {
        try {
            const response = await this.dbClient.getAll() as GetAllShoppingListResult;

            return response;
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
    
    async deleteAll(): Promise<void> {
        try {
            const response = await this.getAll();

            response.map(el => this.dbClient.deleteById(el.id));

            await Promise.all(response);
        } catch (error) {
            throw new DatabaseError();
        }
    }
}