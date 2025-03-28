import { faker } from "@faker-js/faker";
import { GetProductProps } from "@src/domain/models/tenda";

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