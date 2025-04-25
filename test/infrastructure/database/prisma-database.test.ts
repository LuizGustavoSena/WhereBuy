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
});