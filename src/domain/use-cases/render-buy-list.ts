import { renderListByUserIdResponse } from "../models";

export interface IRenderBuyList {
    renderListByUserId(userId: string): Promise<renderListByUserIdResponse>;
}