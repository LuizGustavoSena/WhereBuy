import { IDatabaseClient, ParamsUpdateDatabaseClient } from "@src/data/protocols/database";
import { ShoppingListProps } from "@src/domain/models";
import { PrismaClient } from '../../../generated/prisma';

export class PrimaDatabase implements IDatabaseClient<ShoppingListProps> {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(params: ShoppingListProps): Promise<ShoppingListProps> {
        const response = await this.prisma.shoppingList
            .create({ data: params});

        return response as ShoppingListProps;
    }

    async getAllByUserId(userId: string): Promise<ShoppingListProps[]> {
        const response = await this.prisma.shoppingList.findMany({
            where: { userId }
        });

        return response as ShoppingListProps[];
    }
    
    async getByFIlter(filter: object): Promise<ShoppingListProps[]> {
        const response = await this.prisma.shoppingList.findMany({
            where: filter
        });

        return response as ShoppingListProps[];
    }
    
    async update(params: ParamsUpdateDatabaseClient<ShoppingListProps>): Promise<ShoppingListProps> {
        const response = await this.prisma.shoppingList.update({
            where: { id: params.id },
            data: params.data
        });
        
        return response as ShoppingListProps;
    }
    
    async deleteById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}