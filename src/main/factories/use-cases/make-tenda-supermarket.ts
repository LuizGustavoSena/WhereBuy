import TendaSupermarket from "@src/data/use-cases/tenda-supermarket";
import { ISupermarket } from "@src/domain/use-cases";
import { MakeAxiosHttpClient } from "../infrastructure/http/make-axios-http-client";

export class MakeTendaSupermarket {
    private static instance: ISupermarket;

    private constructor() { }

    static getInstance(): ISupermarket {
        if (!MakeTendaSupermarket.instance) {
            const httpClient = MakeAxiosHttpClient.getInstance();

            MakeTendaSupermarket.instance = new TendaSupermarket(httpClient);
        }

        return MakeTendaSupermarket.instance;
    }
}