import { Balance, Chain, Unit, WithProvider } from '../../types';
export declare type BalanceActionArgs = WithProvider<{
    /** Chains to use for looking up native currency */
    chains?: Chain[];
    /** Configuration to use for balance */
    config: {
        /** Address or ENS name */
        addressOrName: string;
        /** Units for formatting output */
        formatUnits?: Unit | number;
        /** ERC-20 address */
        token?: string;
    };
}>;
export declare type BalanceActionResult = Balance;
export declare const balanceAction: ({ chains, config, provider, }: BalanceActionArgs) => Promise<BalanceActionResult>;
