import { makeValidationToken } from '../factories/use-cases';

const validationTokenService = makeValidationToken();

export const authentication = async (req: any, res: any, next: any) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.split(' ')[1])
        return res.status(401).send();

    try {
        const userId = await validationTokenService.validateByToken(authorization.split(' ')[1]);

        req.userId = userId;

        return next(null);
    } catch (error) {
        return res.status(401).send();
    }
}