import { ShoppingListController } from "@src/main/controllers";
import { makeZodShoppingListValidation } from "../infrastructure";
import { makeShoppingList } from "../use-cases";

export const makeShoppingListController = (): ShoppingListController =>
    new ShoppingListController(makeShoppingList(), makeZodShoppingListValidation());