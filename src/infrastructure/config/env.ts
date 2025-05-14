import { InvalidEnvError } from "@src/domain/errors/invalid-env-error";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3000),
    AUTHENTICATION_URL: z.string(),
    URLS_ENABLE_CORS: z.string().default('')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success)
    throw new InvalidEnvError(JSON.stringify(_env.error.format()));

export const env = _env.data;