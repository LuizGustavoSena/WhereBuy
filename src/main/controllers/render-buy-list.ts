import { IRenderBuyList } from "@src/domain/use-cases";

export class RenderBuyListController {
    constructor(
        private service: IRenderBuyList
    ) { };

    render = async (req: any, res: any, next: Function) => {
        try {
            const response = await this.service.renderListByUserId(req.userId);

            res.status(response.products.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            next(error);
        }
    }
}