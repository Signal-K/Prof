import { CallOverrides, ethers } from 'ethers';
import { Config as UseContractConfig } from './useContract';
declare type Config = {
    /** Arguments to pass contract method */
    args?: any | any[];
    overrides?: CallOverrides;
    /** Disables fetching */
    skip?: boolean;
    /** Subscribe to changes */
    watch?: boolean;
};
export declare const useContractRead: <Contract extends ethers.Contract = ethers.Contract>(contractConfig: UseContractConfig, functionName: string, { args, overrides, skip, watch }?: Config) => readonly [{
    readonly data: ethers.utils.Result | undefined;
    readonly error: Error | undefined;
    readonly loading: boolean | undefined;
}, (config?: {
    args?: Config['args'];
    overrides?: Config['overrides'];
} | undefined) => Promise<{
    data: ethers.utils.Result;
    error: undefined;
} | {
    data: undefined;
    error: Error;
}>];
export {};
