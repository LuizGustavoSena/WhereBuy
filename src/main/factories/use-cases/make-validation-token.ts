import { ValidationToken } from "@src/data/use-cases/validation-token";
import { makeAxiosHttpClient } from "../infrastructure";

export const makeValidationToken = () =>
    new ValidationToken(makeAxiosHttpClient());