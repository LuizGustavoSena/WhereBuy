import { faker } from '@faker-js/faker';
import { HttpStatusCode } from '@src/data/protocols/http';
import { TendaSupermarket } from "@src/data/use-cases";
import { GetProductsError } from '@src/domain/errors';
import { mockGetProducts } from '@test/domain/mocks/tenda';
import { describe, expect, test } from 'vitest';
import { HttpClientSpy } from "../protocols/http";

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

    test('Should be successful getProducts', async() => {
        const { sut, httpClient } = makeSut();

        const mock = mockGetProducts();

        httpClient.response.body = mock;

        const response = await sut.getProductByName(faker.commerce.productName());

        expect(response[0].name).toBe(mock.products[0].name);
        expect(response[0].price).toBe(mock.products[0].price);
        expect(response[0].urlPhoto).toBe(mock.products[0].thumbnail);
    });

    test('Should be error when getProducts', async() => {
        const { sut, httpClient } = makeSut();

        const mock = mockGetProducts();

        httpClient.response.statusCode = HttpStatusCode.ServerError;

        const promise = sut.getProductByName(faker.commerce.productName());

        await expect(promise).rejects.toThrow(new GetProductsError('Tenda'));
    });
});