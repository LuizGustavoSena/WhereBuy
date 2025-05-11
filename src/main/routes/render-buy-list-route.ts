import express from "express";
import { makeRenderBuyListController } from "../factories/controllers";

const router = express.Router();

const renderBuyListController = makeRenderBuyListController();

router.get('/', renderBuyListController.render);

export default router;