export type ShoppingListProps = {
    id: string;
    name: string;
    amount: number;
    typeAmount: TypeAmountEnum;
    created: Date;
    userId: string;
}

export type CreateShoppingListProps = Omit<ShoppingListProps, 'id' | 'created'>;

export type CreateShoppingListResponse = { id: string };

export enum TypeAmountEnum {
    UNIT = 'unit',
    GRAMS = 'grams',
    LITERS = 'liters'
}

export type GetAllShoppingListResult = Omit<ShoppingListProps, 'userId'>[];

export type GetByNameShoppingListResult = Omit<ShoppingListProps, 'userId'>[];

export type GetByFilterShoppingListResult = ShoppingListProps[];

export type validateItemOwnershipFilter = {
    id?: number;
    name?: string;
}