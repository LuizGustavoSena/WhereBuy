export class RenderBuyListError extends Error {
    constructor() {
        super(`Erro ao gerar lista de compras`);
        this.name = 'RenderBuyListError';
    }
}