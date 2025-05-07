import { ZodShoppingListValidation } from "@src/infrastructure/validations";

export const makeZodShoppingListValidation = (): ZodShoppingListValidation =>
    new ZodShoppingListValidation();