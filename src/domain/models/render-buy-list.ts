import { Product } from "./product";

export type renderListByUserIdResponse = {
    products: Products[];
}

type Products = {
    name: string;
    products: Product[];
}