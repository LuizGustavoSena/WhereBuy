import { TendaSupermarket } from "@src/data/use-cases/tenda-supermarket";
import { makeAxiosHttpClient } from "../infrastructure/http/make-axios-http-client";

export const makeTendaSupermarket = () : TendaSupermarket =>
    new TendaSupermarket(makeAxiosHttpClient());