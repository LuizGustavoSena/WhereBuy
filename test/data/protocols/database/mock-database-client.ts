import { IDatabaseClient, ParamsUpdateDatabaseClient } from '@src/data/protocols/database';

export default class DatabaseSpy implements IDatabaseClient {
    params: any;
    filters: any;
    content: any;

    constructor() { }tableName: string;
;

    async create<T, R>(params: T): Promise<R> {
       this.params = params;

       return this.content;
    }

    async getAll<T>(): Promise<T> {
       return this.content;
    }

    async getByFIlter<T>(filter: any): Promise<T> {
        this.filters = filter;

       return this.content;
    }

    async update<T>(params: ParamsUpdateDatabaseClient<T>): Promise<T> {
        this.params = params;

       return this.content;
    }

    async deleteById(id: string): Promise<void> {
        this.params = id;
    }
}