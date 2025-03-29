
export type ParamsUpdateDatabaseClient<T> = {
    id: string;
    data: Partial<Omit<T, 'id'>>
}

export interface IDatabaseClient {
    tableName: string;

    create<T, R>(params: T): Promise<R>;
    getAll<T>(): Promise<T>;
    getByFIlter<T>(filter: any): Promise<T>;
    update<T>(params: ParamsUpdateDatabaseClient<T>): Promise<T>;
    deleteById(id: string): Promise<void>;
}