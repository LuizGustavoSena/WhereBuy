import { HttpClient } from "@src/data/protocols/http";
import { AxiosHttpClient } from "@src/infrastructure/http/axios-http-client";

export class MakeAxiosHttpClient {
    private static instance: HttpClient;

    private constructor() { }

    static getInstance(): HttpClient {
        if (!MakeAxiosHttpClient.instance)
            MakeAxiosHttpClient.instance = new AxiosHttpClient();

        return MakeAxiosHttpClient.instance;
    }
}