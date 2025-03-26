export class GetProductsError extends Error {
    constructor(message: string) {
        super(`Não conseguimos buscar os produtos do supermercado ${message}`);
        this.name = 'GetProductsError';
    }
}