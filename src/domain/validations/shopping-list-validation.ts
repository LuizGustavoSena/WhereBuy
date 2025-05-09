import { TypeAmountEnum } from "../models";

export enum ShoppingListMessageRequire {
    ID = 'O campo id deve ser preenchido',
    NAME = 'O campo name deve ser preenchido',
    AMOUNT = 'O campo amount deve ser preenchido',
    TYPE_AMOUNT = 'O campo typeAmount deve ser preenchido',
    DATA = 'O object data deve conter pelo menos uma propriedade'
}

export const ShoppingListMessageType = {
    ID: 'Campo id deve ser do tipo guid',
    NAME: 'Campo name deve ser do tipo string',
    AMOUNT: 'Campo amount deve ser do tipo number',
    TYPE_AMOUNT: `Tipo não reconhecido por typeAmount, informe: ${Object.values(TypeAmountEnum).join(', ')}`
};

export interface IShoppingListValidation {
    create(data: any): void;
    getByName(data: any): void;
    update(data: any): void;
    deleteById(data: any): void;
}