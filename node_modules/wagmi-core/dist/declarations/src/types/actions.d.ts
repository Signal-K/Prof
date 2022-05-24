import { BaseProvider } from '@ethersproject/providers';
export declare type WithProvider<T> = T & {
    /** Interface for connecting to network */
    provider: BaseProvider;
};
