export class DatabaseError extends Error {
    constructor() {
        super(`Erro ao acessar o banco de dados`);
        this.name = 'DatabaseError';
    }
}