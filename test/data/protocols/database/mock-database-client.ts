import { IDatabaseClient, ParamsUpdateDatabaseClient } from '@src/data/protocols/database';

export default class DatabaseSpy<T = any> implements IDatabaseClient<T> {
    params: any;
    filters: any;
    content: any;
    tableName: string;

    constructor() { };

    async create(params: T): Promise<T> {
       this.params = params;

       return this.content;
    }

    async getAllByUserId(userId: string): Promise<T[]> {
       return this.content;
    }

    async getByFIlter(filter: object): Promise<T[]> {
        this.filters = filter;

       return this.content;
    }

    async update(params: ParamsUpdateDatabaseClient<T>): Promise<T> {
        this.params = params;

       return this.content;
    }

    async deleteById(id: string): Promise<void> {
        this.params = id;
    }
}