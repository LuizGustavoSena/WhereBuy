
export type ParamsUpdateDatabaseClient<T> = {
    id: string;
    data: Partial<Omit<T, 'id'>>
}

export interface IDatabaseClient<T> {
    create(params: T): Promise<T>;
    getAllByUserId(userId: string): Promise<T[]>;
    getByFIlter(filter: object): Promise<T[]>;
    update(params: ParamsUpdateDatabaseClient<T>): Promise<T>;
    deleteById(id: string): Promise<void>;
}