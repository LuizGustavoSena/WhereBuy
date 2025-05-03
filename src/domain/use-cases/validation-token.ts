export interface IValidationToken {
    validateByToken(token: string): Promise<string>;
}