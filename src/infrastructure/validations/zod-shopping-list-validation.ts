import { ValidationError } from "@src/domain/errors";
import { CreateShoppingListProps, TypeAmountEnum } from "@src/domain/models";
import { IShoppingListValidation, ShoppingListCreateMessageRequire, ShoppingListCreateMessageType } from "@src/domain/validations";
import { z, ZodError } from "zod";

export class ZodShoppingListValidation implements IShoppingListValidation {
    constructor(){};

    create(params: CreateShoppingListProps): void {
        const validation = z.object({
            name: z.string({required_error: ShoppingListCreateMessageRequire.NAME, invalid_type_error: ShoppingListCreateMessageType.NAME }),
            amount: z.number({ required_error: ShoppingListCreateMessageRequire.AMOUNT, invalid_type_error: ShoppingListCreateMessageType.AMOUNT }),
            typeAmount: z.nativeEnum(TypeAmountEnum, { required_error: ShoppingListCreateMessageRequire.TYPE_AMOUNT, invalid_type_error: ShoppingListCreateMessageType.TYPE_AMOUNT })
        });

        this.throwValidationError(() => validation.parse(params));
    }

    getByName(name: string): void {
        throw new Error("Method not implemented.");
    }

    deleteById(id: string): void {
        throw new Error("Method not implemented.");
    }

    private throwValidationError(callback: Function){
        try {
            callback();
        } catch (error: any) {
            if (!(error instanceof ZodError)) return;

            throw new ValidationError(error.errors.map(el => el.message).join(', '));
        }
    }
}