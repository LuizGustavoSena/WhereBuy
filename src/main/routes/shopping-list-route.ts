import express from "express";
import { makeShoppingListController } from "../factories/controllers";

const router = express.Router();

const shoppingListController = makeShoppingListController();

router.get('/', (req, res, next) => {
    const nameFunction = req.query.name ?
        'getByName' : 'getAllByUserId';

    return shoppingListController[nameFunction](req, res, next);
});

router.post('/', shoppingListController.create);

export default router;