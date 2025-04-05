import { CreateShoppingListProps } from "../models";

export interface IShoppingListValidation {
    create(params: CreateShoppingListProps): void;
    getByName(name: string): void;
    deleteById(id: string): void;
}