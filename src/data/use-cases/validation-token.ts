import { IValidationToken } from "@src/domain/use-cases";
import { env } from "@src/infrastructure/config/env";
import { HttpStatusCode, IHttpClient } from "../protocols/http";

export class ValidationToken implements IValidationToken {
    constructor(
        private readonly httpClient: IHttpClient
    ) { };

    async validateByToken(token: string): Promise<boolean> {
        try {
            const response = await this.httpClient.request({
                url: env.AUTHENTICATION_URL,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.statusCode !== HttpStatusCode.Ok)
                throw new Error('Invalid token');

            return true;
        } catch (error) {
            return false;
        }
    }
}