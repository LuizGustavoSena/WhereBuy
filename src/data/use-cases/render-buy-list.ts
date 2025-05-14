import { RenderBuyListError } from "@src/domain/errors";
import { renderListByUserIdResponse, ShoppingListProps } from "@src/domain/models";
import { ISupermarket } from "@src/domain/use-cases";
import { IRenderBuyList } from "@src/domain/use-cases/render-buy-list";
import { IDatabaseClient } from "../protocols/database";

export class RenderBuyList implements IRenderBuyList {
    constructor(
        private dbClient: IDatabaseClient<ShoppingListProps>,
        private tendaSupermarket: ISupermarket
    ) { };

    async renderListByUserId(userId: string): Promise<renderListByUserIdResponse> {
        try {
            const items = await this.dbClient.getAllByUserId(userId);

            const results = await Promise.all(items.map(item => this.tendaSupermarket.getProductByName(item.name)));

            return {
                products: results.map((el, index) => ({
                    name: items[index].name,
                    products: el
                }))
            };
        } catch (error) {
            throw new RenderBuyListError();
        }
    }
}