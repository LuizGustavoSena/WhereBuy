export interface IValidationToken {
    validateByToken(token: string): Promise<boolean>;
}