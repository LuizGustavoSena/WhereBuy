import { IDatabaseClient, ParamsUpdateDatabaseClient } from "@src/data/protocols/database";
import { ShoppingListProps } from "@src/domain/models";
import { PrismaClient } from '../../../generated/prisma';

export class PrismaDatabase implements IDatabaseClient<ShoppingListProps> {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create = async (params: ShoppingListProps): Promise<ShoppingListProps> => {
        const response = await this.prisma.shoppingList
            .create({ data: params });

        return response as ShoppingListProps;
    }

    getAllByUserId = async (userId: string): Promise<ShoppingListProps[]> => {
        const response = await this.prisma.shoppingList.findMany({
            where: { userId }
        });

        return response as ShoppingListProps[];
    }

    getByFIlter = async (filter: object): Promise<ShoppingListProps[]> => {
        const response = await this.prisma.shoppingList.findMany({
            where: filter
        });

        return response as ShoppingListProps[];
    }

    update = async (params: ParamsUpdateDatabaseClient<ShoppingListProps>): Promise<ShoppingListProps> => {
        const response = await this.prisma.shoppingList.update({
            where: { id: params.id },
            data: params.data
        });

        return response as ShoppingListProps;
    }

    deleteById = async (id: string): Promise<void> => {
        await this.prisma.shoppingList.delete({
            where: { id }
        });
    }
}