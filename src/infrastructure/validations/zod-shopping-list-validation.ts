import { ValidationError } from "@src/domain/errors";
import { TypeAmountEnum } from "@src/domain/models";
import { IShoppingListValidation, ShoppingListMessageRequire, ShoppingListMessageType } from "@src/domain/validations";
import { z, ZodError } from "zod";

export class ZodShoppingListValidation implements IShoppingListValidation {
    constructor() { };

    create(data: any): void {
        const validation = z.object({
            name: z.string({ required_error: ShoppingListMessageRequire.NAME, invalid_type_error: ShoppingListMessageType.NAME }),
            amount: z.number({ required_error: ShoppingListMessageRequire.AMOUNT, invalid_type_error: ShoppingListMessageType.AMOUNT }),
            typeAmount: z.nativeEnum(TypeAmountEnum, { required_error: ShoppingListMessageRequire.TYPE_AMOUNT, invalid_type_error: ShoppingListMessageType.TYPE_AMOUNT })
        });

        this.throwValidationError(() => validation.parse(data));
    }

    getByName(data: any): void {
        const validation = z.string({ required_error: ShoppingListMessageRequire.NAME, invalid_type_error: ShoppingListMessageType.NAME });

        this.throwValidationError(() => validation.parse(data));
    }

    update(data: any): void {
        const validation = z.object({
            id: z.string({ required_error: ShoppingListMessageRequire.ID, invalid_type_error: ShoppingListMessageType.ID }),
            data: z.object({
                name: z.string({ required_error: ShoppingListMessageRequire.NAME, invalid_type_error: ShoppingListMessageType.NAME }).optional(),
                amount: z.number({ required_error: ShoppingListMessageRequire.AMOUNT, invalid_type_error: ShoppingListMessageType.AMOUNT }).optional(),
                typeAmount: z.nativeEnum(TypeAmountEnum, { required_error: ShoppingListMessageRequire.TYPE_AMOUNT, invalid_type_error: ShoppingListMessageType.TYPE_AMOUNT }).optional()
            })
        });

        this.throwValidationError(() => validation.parse(data));
    }

    deleteById(data: any): void {
        const validation = z.string({ required_error: ShoppingListMessageRequire.ID, invalid_type_error: ShoppingListMessageType.ID })
            .uuid({ message: ShoppingListMessageType.ID });

        this.throwValidationError(() => validation.parse(data));
    }

    private throwValidationError(callback: Function) {
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '));
        }
    }
}