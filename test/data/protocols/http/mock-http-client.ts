import { HttpRequest, HttpResponse, HttpStatusCode, IHttpClient } from "@src/data/protocols/http";

export class HttpClientSpy<T = any> implements IHttpClient {
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    response: HttpResponse<T> = {
        statusCode: HttpStatusCode.Ok
    }

    async request(params: HttpRequest): Promise<{ statusCode: HttpStatusCode; body?: any; }> {
        const { method, url, body, headers } = params;

        this.url = url;
        this.method = method;
        this.body = body;
        this.headers = headers;

        return this.response;
    }
}