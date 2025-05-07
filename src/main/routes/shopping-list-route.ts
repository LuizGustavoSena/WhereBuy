import express from "express";
import { makeShoppingListController } from "../factories/controllers";

const router = express.Router();

const shoppingListController = makeShoppingListController();

router.param('id', shoppingListController.paramsInterceptor);

router.post('/', shoppingListController.create);

router.get('/', (req, res, next) => {
    const nameFunction = req.query.name ?
        'getByName' : 'getAllByUserId';

    return shoppingListController[nameFunction](req, res, next);
});

router.delete('/:id', shoppingListController.deleteById);
router.delete('/', shoppingListController.deleteAll);

export default router;