import { faker } from "@faker-js/faker";
import { PrismaDatabase } from "@src/infrastructure/database";
import { makeShoppingListItem } from "@test/domain/mocks/shopping-list";
import { describe, expect, test } from "vitest";

const sut = new PrismaDatabase();

describe('PrismaDatabase', () => {
    var id = faker.string.uuid();
    var userId = faker.string.uuid();

    test('Should be successful create a shoppingList item', async () => {
        const shoppingList = makeShoppingListItem({ id, userId });

        const response = await sut.create(shoppingList);

        expect(response).toEqual(shoppingList);
    });

    test('Should be successful getAllByUserId shoppingList itens', async () => {
        const shoppingList = makeShoppingListItem();

        await sut.create(shoppingList);

        const response = await sut.getAllByUserId(userId);

        expect(response).toHaveLength(1);
    });

    test('Should be successful getByFIlter shoppingList itens', async () => {
        const response = await sut.getByFIlter({ id });

        expect(response).toHaveLength(1);
    });
});