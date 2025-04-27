import { PrismaDatabase } from "@src/infrastructure/database";

export const makePrismaDatabase = (): PrismaDatabase => 
    new PrismaDatabase();