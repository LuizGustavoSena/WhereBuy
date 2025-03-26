export type GetProductProps = {
    products: Product[];
}

type Product = {
    name: string;
    thumbnail: string;
    price: number;
    brand: string;
}