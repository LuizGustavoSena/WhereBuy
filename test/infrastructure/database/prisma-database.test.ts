import { faker } from "@faker-js/faker";
import { PrismaDatabase } from "@src/infrastructure/database";
import { makeShoppingListItem } from "@test/domain/mocks/shopping-list";
import { execSync } from "node:child_process";
import { afterAll, describe, expect, test } from "vitest";

const sut = new PrismaDatabase();

describe('PrismaDatabase', () => {
    afterAll(() => {
        execSync('npx prisma migrate reset -f');
    });

    test('Should be successful create a shoppingList item', async () => {
        const shoppingList = makeShoppingListItem();

        const response = await sut.create(shoppingList);

        expect(response).toEqual(shoppingList);
    });

    test('Should be successful getAllByUserId shoppingList itens', async () => {
        const userId = faker.string.uuid();
        const shoppingList = makeShoppingListItem({ userId });

        await sut.create(shoppingList);

        const response = await sut.getAllByUserId(userId);

        expect(response).toHaveLength(1);
        expect(response[0]).toEqual(shoppingList);
    });

    test('Should be successful getByFIlter shoppingList itens', async () => {
        const name = `${faker.commerce.productName()}-test`;
        const shoppingList = makeShoppingListItem({ name });

        await sut.create(shoppingList);

        const response = await sut.getByFIlter({ name });

        expect(response).toHaveLength(1);
        expect(response[0]).toEqual(shoppingList);
    });

    test('Should be successful update a shoppingList item', async () => {
        const updatedName = `${faker.commerce.productName()}-test`;
        const id = faker.string.uuid();
        const shoppingList = makeShoppingListItem({ id });

        await sut.create(shoppingList);

        const response = await sut.update({
            id,
            data: { name: updatedName }
        });

        expect(response).toEqual({ ...shoppingList, name: updatedName });
    });

    test('Should be successful deleteById shoppingList itens', async () => {
        const id = faker.string.uuid();
        const shoppingList = makeShoppingListItem({ id });

        await sut.create(shoppingList);
        
        await sut.deleteById(id);

        const response = await sut.getByFIlter({ id });

        expect(response).toHaveLength(0);
    });
});