import { faker } from "@faker-js/faker";
import { CreateShoppingListProps, ShoppingListProps, TypeAmountEnum } from "@src/domain/models";

export const makeCreateShoppingList = (params?: Partial<CreateShoppingListProps>): CreateShoppingListProps => ({
    name: params?.name ? params.name : faker.commerce.productName(),
    amount: params?.amount ? params.amount : faker.number.int(),
    typeAmount: params?.typeAmount ? params.typeAmount : faker.helpers.enumValue(TypeAmountEnum),
    userId: params?.userId ? params.userId : faker.string.uuid()
});

export const makeShoppingListItem = (params?: Partial<ShoppingListProps>): ShoppingListProps => ({
    id: params?.id ? params.id : faker.string.uuid(),
    name: params?.name ? params.name : `${faker.commerce.productName()}-test`,
    amount: params?.amount ? params.amount : Number(faker.commerce.price({dec: 2})),
    typeAmount: params?.typeAmount ? params.typeAmount : faker.helpers.enumValue(TypeAmountEnum),
    created: params?.created ? params.created : faker.date.anytime(),
    userId: params?.userId ? params.userId : faker.string.uuid()
});