import { BigNumberish, BytesLike } from 'ethers/lib/ethers';
declare type TypedDataDomain = {
    name?: string;
    version?: string;
    chainId?: BigNumberish;
    verifyingContract?: string;
    salt?: BytesLike;
};
declare type TypedDataField = {
    name: string;
    type: string;
};
export declare type Config = {
    domain?: TypedDataDomain;
    types?: Record<string, Array<TypedDataField>>;
    value?: Record<string, any>;
};
export declare const useSignTypedData: ({ domain, types, value }?: Config) => readonly [{
    readonly data: string | undefined;
    readonly error: Error | undefined;
    readonly loading: boolean | undefined;
}, (config?: {
    domain?: Config['domain'];
    types?: Config['types'];
    value?: Config['value'];
} | undefined) => Promise<{
    data: string;
    error: undefined;
} | {
    data: undefined;
    error: Error;
}>];
export {};
