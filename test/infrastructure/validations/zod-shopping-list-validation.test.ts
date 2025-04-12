import { faker } from "@faker-js/faker";
import { ValidationError } from "@src/domain/errors";
import { ShoppingListMessageRequire, ShoppingListMessageType } from "@src/domain/validations";
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

    test('Should be error whit another type name create method', () => {
        const sut = makeSut();
        // @ts-expect-error
        const request = makeCreateShoppingList({name: faker.number.int()});

        expect(() => sut.create(request)).toThrow(new ValidationError(ShoppingListMessageType.NAME));
    });

    test('Should be error whit another type amount create method', () => {
        const sut = makeSut();
        // @ts-expect-error
        const request = makeCreateShoppingList({ amount: faker.string.sample()});

        expect(() => sut.create(request)).toThrow(new ValidationError(ShoppingListMessageType.AMOUNT));
    });

    test('Should be error whitout name getByName method', () => {
        const sut = makeSut();
        // @ts-expect-error
        expect(() => sut.getByName()).toThrow(new ValidationError(ShoppingListMessageRequire.NAME));
    });
})
