import { faker } from "@faker-js/faker";
import { ValidationError } from "@src/domain/errors";
import { SupermarketMessageRequire, SupermarketMessageType } from "@src/domain/validations/supermarket-validation";
import { ZodSupermarketValidation } from "@src/infrastructure/validations";
import { describe, expect, test } from "vitest";

const makeSut = () => new ZodSupermarketValidation();

describe('ZodSupermarketValidation', () => {
    test('Should be error whitout param in getProductByName method', () => {
        const sut = makeSut();
        // @ts-expect-error
        expect(() => sut.getProductByName()).toThrow(new ValidationError(SupermarketMessageRequire.NAME));
    });
    
    test('Should be error when another param type in getProductByName method', () => {
        const sut = makeSut();
        // @ts-expect-error
        expect(() => sut.getProductByName(faker.number.int())).toThrow(new ValidationError(SupermarketMessageType.NAME));
    });
})
