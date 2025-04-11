import { ValidationError } from "@src/domain/errors";
import { ShoppingListMessageRequire } from "@src/domain/validations";
import { ZodShoppingListValidation } from "@src/infrastructure/validations";
import { makeCreateShoppingList } from "@test/domain/mocks/shopping-list";
import { describe, expect, test } from "vitest";

const makeSut = () => new ZodShoppingListValidation();

describe('ZodShoppingListValidation', () => {
    test('Should be error whitout name create method', () => {
        const sut = makeSut();
        const request = makeCreateShoppingList();
        // @ts-expect-error
        delete request.name;

        expect(() => sut.create(request)).toThrow(new ValidationError(ShoppingListMessageRequire.NAME));
    });

    test('Should be error whitout amount create method', () => {
        const sut = makeSut();
        const request = makeCreateShoppingList();
        // @ts-expect-error
        delete request.amount;

        expect(() => sut.create(request)).toThrow(new ValidationError(ShoppingListMessageRequire.AMOUNT));
    });

    test('Should be error whitout typeAmount create method', () => {
        const sut = makeSut();
        const request = makeCreateShoppingList();
        // @ts-expect-error
        delete request.typeAmount;

        expect(() => sut.create(request)).toThrow(new ValidationError(ShoppingListMessageRequire.TYPE_AMOUNT));
    });
})
