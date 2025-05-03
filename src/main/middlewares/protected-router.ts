import { NextFunction, Request, Response } from 'express';
import { makeValidationToken } from '../factories/use-cases';

const validationTokenService = makeValidationToken();

const authentication = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).send();

    try {
        const validated = await validationTokenService.validateByToken(authorization);

        return next(null, validated);
    } catch (error) {
        return res.status(401).send();
    }
}

export default authentication;