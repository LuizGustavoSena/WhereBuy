export enum SupermarketMessageRequire {
    NAME = 'O campo name deve ser obrigatório'
}

export enum SupermarketMessageType {
    NAME = 'O campo name deve ser do tipo string'
}

export interface ISupermarketValidation {
    getProductByName(name: string): void;
}