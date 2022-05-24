import { BigNumber } from 'ethers';
import { BalanceActionArgs } from 'wagmi-core';
export declare type Config = {
    /** Disables fetching */
    skip?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
} & Partial<BalanceActionArgs['config']>;
export declare const useBalance: ({ addressOrName, formatUnits, skip, token, watch, }?: Config) => readonly [{
    readonly data: {
        decimals: number;
        formatted: string;
        symbol: string;
        value: BigNumber;
    } | undefined;
    readonly error: Error | undefined;
    readonly loading: boolean | undefined;
}, (config?: {
    addressOrName: string;
    formatUnits?: Config['formatUnits'];
    token?: Config['token'];
} | undefined) => Promise<{
    data: import("wagmi-core").Balance;
    error: undefined;
} | {
    data: undefined;
    error: Error;
}>];
