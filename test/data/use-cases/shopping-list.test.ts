import { faker } from "@faker-js/faker";
import { ShoppingList } from "@src/data/use-cases";
import { DatabaseError } from "@src/domain/errors";
import { makeCreateShoppingList, makeShoppingListItem } from "@test/domain/mocks/shopping-list";
import { describe, expect, test } from "vitest";
import DatabaseSpy from "../protocols/database/mock-database-client";
import { GuidClientSpy } from "../protocols/guid/mock-guid-client";

type Props = {
    sut: ShoppingList;
    database: DatabaseSpy;
    guid: GuidClientSpy;
};

const makeSut = (): Props => {
    const database = new DatabaseSpy();
    const guid = new GuidClientSpy();
    const sut = new ShoppingList(database, guid);

    return {
        sut,
        database,
        guid
    }
}

describe('ShoppingList', () => {
    test('Should be successful create item in list', async() => {
        const { sut, guid, database } = makeSut();

        const newGuid = faker.string.uuid();
        const request = makeCreateShoppingList();

        guid.guid = newGuid;
        database.content = { id: newGuid };

        const response = await sut.create(request);

        expect(database.params).toHaveProperty('created');
        expect(database.params.id).toBe(newGuid);
        expect(database.params.name).toBe(request.name);
        expect(database.params.amount).toBe(request.amount);
        expect(database.params.typeAmount).toBe(request.typeAmount);

        expect(response.id).toBe(newGuid);
    });

    test('Should be error when create item in list', async() => {
        const { sut, guid, database } = makeSut();

        const request = makeCreateShoppingList();

        guid.guid = faker.string.uuid();

        const promise = sut.create(request);

        await expect(promise).rejects.toThrow(new DatabaseError());
    });

    test('Should be successful getAll', async() => {
        const { sut, guid, database } = makeSut();

        const userId = faker.string.uuid();
        const item = makeShoppingListItem({ userId })

        database.content = [{ ...item }];

        const response = await sut.getAll(userId);

        expect(database.filters.userId).toBe(userId);

        expect(response).toHaveLength(1);
        expect(response[0]).not.toHaveProperty('userId');
        expect(response[0].amount).toBe(item.amount);
        expect(response[0].created).toBe(item.created);
        expect(response[0].id).toBe(item.id);
        expect(response[0].name).toBe(item.name);
        expect(response[0].typeAmount).toBe(item.typeAmount);
    });

    test('Should be error when getAll itens', async() => {
        const { sut } = makeSut();

        const promise = sut.getAll(faker.string.uuid());

        await expect(promise).rejects.toThrow(new DatabaseError());
    });
});