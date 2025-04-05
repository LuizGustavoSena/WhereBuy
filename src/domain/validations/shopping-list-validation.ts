import { CreateShoppingListProps } from "../models";

export enum ShoppingListCreateMessageRequire {
    NAME = 'O campo name deve ser preenchido',
    AMOUNT = 'O campo amount deve ser preenchido',
    TYPE_AMOUNT = 'O campo typeAmount deve ser preenchido'
}

export interface IShoppingListValidation {
    create(params: CreateShoppingListProps): void;
    getByName(name: string): void;
    deleteById(id: string): void;
}