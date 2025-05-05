import { Authentication } from "./authentication";

declare global {
    namespace Express {
        export interface Request {
            user: Authentication
        }
    }
}