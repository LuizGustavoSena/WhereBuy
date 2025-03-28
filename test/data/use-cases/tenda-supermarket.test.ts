// import { faker } from '@faker-js/faker/.';
import { faker } from '@faker-js/faker';
import { TendaSupermarket } from "@src/data/use-cases";
import { describe, expect, test } from 'vitest';
import { HttpClientSpy } from "../protocols/http/mock-http-client";

type Props = {
    sut: TendaSupermarket;
        httpClient: HttpClientSpy;
}
const makeSut = (): Props => {
    const httpClient = new HttpClientSpy();
    const sut = new TendaSupermarket(httpClient);

    return {
        sut,
        httpClient
    }
}

describe('TendaSupermarket', () => {
    test('Should be called currect verbs httpClient', async() => {
        const { sut, httpClient } = makeSut();
         const product = faker.commerce.productName()

        await sut.getProductByName(product);

        expect(httpClient.url).toBe(`https://api.tendaatacado.com.br/api/public/store/search?query=${product}`);
        expect(httpClient.method).toBe('get');
    });
});