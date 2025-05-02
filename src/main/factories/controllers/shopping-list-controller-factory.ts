import { ShoppingListController } from "@src/main/controllers";
import { makeShoppingList } from "../use-cases";

export const makeShoppingListController = (): ShoppingListController =>
    new ShoppingListController(makeShoppingList());