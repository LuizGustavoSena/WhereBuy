import { RenderBuyListController } from "@src/main/controllers/render-buy-list";
import { makeRenderBuyList } from "../use-cases";

export const makeRenderBuyListController = (): RenderBuyListController =>
    new RenderBuyListController(makeRenderBuyList());