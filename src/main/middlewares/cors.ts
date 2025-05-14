import { env } from '@src/infrastructure/config/env';
import cors from 'cors';

var allowlist = env.URLS_ENABLE_CORS.split(',');

var corsOptionsDelegate = function (req: any, callback: Function) {
    var corsOptions = { origin: false };

    if (env.NODE_ENV !== 'production') return callback(null, corsOptions)

    if (allowlist.indexOf(req.header('Origin')) !== -1)
        corsOptions = { origin: true }

    callback(null, corsOptions);
}

export const configurationCors = cors(corsOptionsDelegate);