import { RenderBuyList } from "@src/data/use-cases";
import { makePrismaDatabase } from "../infrastructure";
import { makeTendaSupermarket } from "./make-tenda-supermarket";

export const makeRenderBuyList = (): RenderBuyList =>
    new RenderBuyList(makePrismaDatabase(), makeTendaSupermarket());