import express from "express";
import { makeShoppingListController } from "../factories/controllers";

const router = express.Router();

const shoppingListController = makeShoppingListController();

router.get('/', shoppingListController.getAllByUserId);

export default router;