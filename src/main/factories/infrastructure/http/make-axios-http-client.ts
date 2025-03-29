import { IHttpClient } from "@src/data/protocols/http";
import { AxiosHttpClient } from "@src/infrastructure/http/axios-http-client";

export class MakeAxiosHttpClient {
    private static instance: IHttpClient;

    private constructor() { }

    static getInstance(): IHttpClient {
        if (!MakeAxiosHttpClient.instance)
            MakeAxiosHttpClient.instance = new AxiosHttpClient();

        return MakeAxiosHttpClient.instance;
    }
}