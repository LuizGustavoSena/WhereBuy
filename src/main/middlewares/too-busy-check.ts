import { HttpStatusCode } from '@src/data/protocols/http';
import tooBusy from 'toobusy-js';

export const tooBusyCheck = async (req: any, res: any, next: any) => {
    if (!tooBusy()) return next();

    res.status(HttpStatusCode.ServiceUnavailable).send('Server too busy');
}