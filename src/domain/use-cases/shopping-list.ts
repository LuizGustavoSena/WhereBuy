import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByFilterShoppingListResult, GetByNameShoppingListProps, GetByNameShoppingListResult } from "../models";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAllByUserId(userId: string): Promise<GetAllShoppingListResult>;
    getByName(params: GetByNameShoppingListProps): Promise<GetByNameShoppingListResult>;
    getByFilter(filter: object): Promise<GetByFilterShoppingListResult>;
    deleteById(id: string): Promise<void>;
    deleteAll(userId: string): Promise<void>;
}