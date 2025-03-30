import { ShoppingList } from "@src/data/use-cases";
import { describe } from "vitest";
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

});