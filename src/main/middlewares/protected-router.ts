import { makeValidationToken } from '../factories/use-cases';

const validationTokenService = makeValidationToken();

// const authentication = async (err: Error, req: Request, res: Response, next: NextFunction) => {
const authentication = async (req: any, res: any, next: any) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.split(' ')[1])
        return res.status(401).send();

    try {
        const userId = await validationTokenService.validateByToken(authorization.split(' ')[1]);

        req.user = { id: userId };

        return next(null);
    } catch (error) {
        return res.status(401).send();
    }
}

export default authentication;