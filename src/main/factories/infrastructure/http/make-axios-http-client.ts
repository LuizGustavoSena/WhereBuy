import { AxiosHttpClient } from "@src/infrastructure/http/axios-http-client";

export const makeAxiosHttpClient= (): AxiosHttpClient  => 
    new AxiosHttpClient();