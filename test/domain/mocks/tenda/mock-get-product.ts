import { faker } from "@faker-js/faker";
import { Product } from "@src/domain/models";
import { GetProductProps } from "@src/domain/models/tenda";
import { ISupermarket } from "@src/domain/use-cases";

export const mockGetProducts = (): GetProductProps => ({
    products: [
        {
            name: faker.commerce.productName(),
            thumbnail: faker.internet.url(),
            price: Number(faker.commerce.price()),
            brand: faker.commerce.product()
        }
    ]
});

export const mockProducts = (params?: Partial<Product>): Product => ({
    name: params && params.name ? params.name : faker.commerce.productName(),
    urlPhoto: params && params.urlPhoto ? params.urlPhoto : faker.internet.url(),
    price: params && params.price ? params.price : Number(faker.commerce.price()),
    supermarket: 'Tenda Atacado'
});

export class TendaSupermarketSpy implements ISupermarket {
    name: string;
    response: Product[] = [mockProducts()];

    async getProductByName(name: string): Promise<Product[]> {
        this.name = name;

        return this.response;
    }
}