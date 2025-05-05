import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByFilterShoppingListResult, GetByNameShoppingListResult } from "../models";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAllByUserId(userId: string): Promise<GetAllShoppingListResult>;
    getByName(name: string): Promise<GetByNameShoppingListResult>;
    getByFilter(filter: object): Promise<GetByFilterShoppingListResult>;
    deleteById(id: string): Promise<void>;
    deleteAll(userId: string): Promise<void>;
}