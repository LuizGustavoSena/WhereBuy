import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult } from "../models";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAll(): Promise<GetAllShoppingListResult>;
    getByName(name: string): Promise<GetByNameShoppingListResult>;
    deleteById(id: string): Promise<void>;
    deleteAll(): Promise<void>;
}