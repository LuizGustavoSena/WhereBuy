import { TendaSupermarket } from "@src/data/use-cases/tenda-supermarket";
import { makeAxiosHttpClient } from "../infrastructure";

export const makeTendaSupermarket = () : TendaSupermarket =>
    new TendaSupermarket(makeAxiosHttpClient());