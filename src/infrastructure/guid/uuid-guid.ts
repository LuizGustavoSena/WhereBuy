import { IGuidClient } from "@src/data/protocols/guid";
import { v4 as uuidv4 } from 'uuid';

export class UuidGuid implements IGuidClient {
    constructor() { };

    generate = (): string => {
        return uuidv4();
    }
}