import { faker } from "@faker-js/faker";
import { RenderBuyList } from "@src/data/use-cases";
import { RenderBuyListError } from "@src/domain/errors";
import { ISupermarket } from "@src/domain/use-cases";
import { makeShoppingListItem } from "@test/domain/mocks/shopping-list";
import { mockProducts, TendaSupermarketSpy } from "@test/domain/mocks/tenda";
import { describe, expect, test } from "vitest";
import { IDatabaseClient } from "../protocols/database";
import DatabaseSpy from "../protocols/database/mock-database-client";

type Props = {
    sut: RenderBuyList;
    supermarket: ISupermarket;
    database: IDatabaseClient<any>;
}
const makeSut = (): Props => {
    const database = new DatabaseSpy();
    const supermarket = new TendaSupermarketSpy();
    const sut = new RenderBuyList(database, supermarket);

    return {
        sut,
        supermarket,
        database
    }
}

describe('RenderBuyList', () => {
    test('Should be successful renderListByUserId', async () => {
        const { sut, database, supermarket } = makeSut();

        const shoppingList = [makeShoppingListItem()];
        const supermarketList = [mockProducts(), mockProducts()];

        database.getAllByUserId = async () => shoppingList;
        // @ts-expect-error
        supermarket.response = supermarketList;

        const response = await sut.renderListByUserId(faker.string.uuid());

        expect(response.products).toHaveLength(1);
        expect(response.products[0]).toMatchObject({
            name: shoppingList[0].name
        });
        expect(response.products[0].products).toEqual(supermarketList);
    });

    test('Should be error when throw database error', async () => {
        const { sut, database } = makeSut();

        database.getAllByUserId = async () => { throw new Error('Database Error') };

        const promise = sut.renderListByUserId(faker.string.uuid());

        await expect(promise).rejects.toThrow(new RenderBuyListError());
    });

    test('Should be error when throw supermarket api error', async () => {
        const { sut, supermarket } = makeSut();

        supermarket.getProductByName = async () => { throw new Error('Api Error') };

        const promise = sut.renderListByUserId(faker.string.uuid());

        await expect(promise).rejects.toThrow(new RenderBuyListError());
    });
});