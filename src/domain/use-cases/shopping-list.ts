import {
    CreateShoppingListProps,
    CreateShoppingListResponse,
    GetAllShoppingListResult,
    GetByFilterShoppingListResult,
    GetByNameShoppingListProps,
    GetByNameShoppingListResult,
    UpdateShoppingListProps,
    UpdateShoppingListResult
} from "../models";

export interface IShoppingList {
    create(params: CreateShoppingListProps): Promise<CreateShoppingListResponse>;
    getAllByUserId(userId: string): Promise<GetAllShoppingListResult>;
    getByName(params: GetByNameShoppingListProps): Promise<GetByNameShoppingListResult>;
    getByFilter(filter: object): Promise<GetByFilterShoppingListResult>;
    update(params: UpdateShoppingListProps): Promise<UpdateShoppingListResult>
    deleteById(id: string): Promise<void>;
    deleteAll(userId: string): Promise<void>;
}