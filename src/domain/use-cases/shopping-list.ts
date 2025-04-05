import { CreateShoppingListProps, CreateShoppingListResponse, GetAllShoppingListResult, GetByNameShoppingListResult } from "../models";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAll(userId: string): Promise<GetAllShoppingListResult>;
    getByName(name: string): Promise<GetByNameShoppingListResult>;
    deleteById(id: string): Promise<void>;
    deleteAll(userId: string): Promise<void>;
    validateItemOwnership(req: any, res: any, next: Function): Promise<void>;
}