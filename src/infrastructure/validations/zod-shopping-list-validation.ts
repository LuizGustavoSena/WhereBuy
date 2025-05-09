import { ValidationError } from "@src/domain/errors";
import { TypeAmountEnum } from "@src/domain/models";
import { IShoppingListValidation, ShoppingListMessageRequire, ShoppingListMessageType } from "@src/domain/validations";
import { z, ZodError } from "zod";

export class ZodShoppingListValidation implements IShoppingListValidation {
    constructor() { };
    idSchema = z.string({
        required_error: ShoppingListMessageRequire.ID,
        invalid_type_error: ShoppingListMessageType.ID
    }).uuid({ message: ShoppingListMessageType.ID });

    nameSchema = z.string({
        required_error: ShoppingListMessageRequire.NAME,
        invalid_type_error: ShoppingListMessageType.NAME
    });

    amountSchema = z.number({
        required_error: ShoppingListMessageRequire.AMOUNT,
        invalid_type_error: ShoppingListMessageType.AMOUNT
    });

    typeAmountSchema = z.nativeEnum(TypeAmountEnum, {
        required_error: ShoppingListMessageRequire.TYPE_AMOUNT,
        invalid_type_error: ShoppingListMessageType.TYPE_AMOUNT
    });

    create(data: any): void {
        const validation = z.object({
            name: this.nameSchema,
            amount: this.amountSchema,
            typeAmount: this.typeAmountSchema
        });

        this.throwValidationError(() => validation.parse(data));
    }

    getByName(data: any): void {
        const validation = this.nameSchema;

        this.throwValidationError(() => validation.parse(data));
    }

    update(data: any): void {
        const dataSchema = z.object({
            name: this.nameSchema.optional(),
            amount: this.amountSchema.optional(),
            typeAmount: this.typeAmountSchema.optional()
        }).refine((obj) => Object.keys(obj).length > 0, {
            message: ShoppingListMessageRequire.DATA
        });

        const validation = z.object({
            id: this.idSchema,
            data: dataSchema
        });

        this.throwValidationError(() => validation.parse(data));
    }

    deleteById(data: any): void {
        const validation = this.idSchema;

        this.throwValidationError(() => validation.parse(data));
    }

    private throwValidationError(callback: Function) {
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            if (error.errors.find(el => el.message.includes('Invalid enum value')))
                throw new ValidationError(ShoppingListMessageType.TYPE_AMOUNT);

            throw new ValidationError(error.errors.map(el => el.message).join(', '));
        }
    }
}