import { Product } from "../models";

export interface ISupermarket {
    getProductByName(name: string): Promise<Product[]>;
}