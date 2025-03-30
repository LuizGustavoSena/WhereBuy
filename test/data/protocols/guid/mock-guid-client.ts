import { IGuidClient } from ".";

export class GuidClientSpy implements IGuidClient {
    guid: string;

    generate(): string {
        return this.guid;
    }
}