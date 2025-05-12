import { RenderBuyList } from "@src/data/use-cases";
import { ISupermarket } from "@src/domain/use-cases";
import { TendaSupermarketSpy } from "@test/domain/mocks/tenda";
import { describe } from "vitest";
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

});