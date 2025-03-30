import { faker } from "@faker-js/faker";
import { CreateShoppingListProps, TypeAmountEnum } from "@src/domain/models";

export const makeCreateShoppingList = (params?: Partial<CreateShoppingListProps>): CreateShoppingListProps => ({
    name: params?.name ? params.name : faker.commerce.productName(),
    amount: params?.amount ? params.amount : faker.number.int(),
    typeAmount: params?.typeAmount ? params.typeAmount : faker.helpers.enumValue(TypeAmountEnum)
});