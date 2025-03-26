
import { GetProductsError } from "@src/domain/errors";
import { Product } from "@src/domain/models";
import { GetProductProps } from "@src/domain/models/tenda";
import { ISupermarket } from "@src/domain/use-cases";
import { HttpClient } from "../protocols/http";

export default class TendaSupermarket implements ISupermarket {
    constructor(
        private httpClient: HttpClient
    ) { };

    async getProductByName(name: string): Promise<Product[]> {
        try {
            const response = await this.httpClient.request<GetProductProps>({
                method: "get",
                url: `https://api.tendaatacado.com.br/api/public/store/search?query=${name}`,
            });

            const products = response.body?.products.map(el => ({
                name: el.name,
                price: el.price,
                urlPhoto: el.thumbnail
            })) as Product[];

            return products;
        } catch (error) {
            throw new GetProductsError('Tenda');
        }
    }
}