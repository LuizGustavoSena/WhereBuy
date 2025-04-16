import { ValidationError } from "@src/domain/errors";
import { ISupermarketValidation, SupermarketMessageRequire, SupermarketMessageType } from "@src/domain/validations";
import { z, ZodError } from "zod";

export class ZodSupermarketValidation implements ISupermarketValidation {
    constructor(){};

    getProductByName(name: string): void {
        const validation = z.string({ required_error: SupermarketMessageRequire.NAME, invalid_type_error: SupermarketMessageType.NAME });

        this.throwValidationError(() => validation.parse(name));
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