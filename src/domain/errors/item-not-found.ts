export class ItemNotFoundError extends Error {
    constructor() {
        super(`Não conseguimos encontrar o produto`);
        this.name = 'ItemNotFoundError';
    }
}