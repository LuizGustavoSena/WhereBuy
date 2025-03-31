import { faker } from "@faker-js/faker";
import { ShoppingList } from "@src/data/use-cases";
import { DatabaseError } from "@src/domain/errors";
import { makeCreateShoppingList } from "@test/domain/mocks/shopping-list";
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
});