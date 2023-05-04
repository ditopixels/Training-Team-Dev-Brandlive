import { FC } from "react";
export interface StorefrontFunctionComponent<P = {}> extends FC<P> {
    schema?: object
    getSchema?(props?: P): object
}