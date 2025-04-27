import { UuidGuid } from "@src/infrastructure/guid";
import { describe, expect, test } from "vitest";

const sut = new UuidGuid();

describe('UuidGuid', () => {
    const validationFGuid = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    test('Should be successfull create a new guid', () => {
        const guid = sut.generate();

        expect(validationFGuid.test(guid)).toBeTruthy();
    });

    test(`Shouldn't be equals guids`, () => {
        const guid1 = sut.generate();
        const guid2 = sut.generate();

        expect(guid1).not.toBe(guid2);
    });
});