import { ShoppingList } from "@src/data/use-cases";
import { IShoppingList } from "@src/domain/use-cases";
import { makePrismaDatabase, makeUuidGuid } from "../infrastructure";

export const makeShoppingList = (): IShoppingList =>
    new ShoppingList(makePrismaDatabase(), makeUuidGuid());