export type renderListByUserIdResponse = {
    products: Product[];
}

type Product = {
    name: string;
    price: number;
    supermarket: string;
}