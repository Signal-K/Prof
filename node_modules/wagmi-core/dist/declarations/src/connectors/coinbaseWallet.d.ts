import { Web3Provider } from '@ethersproject/providers';
import { CoinbaseWalletProvider } from '@coinbase/wallet-sdk';
import { CoinbaseWalletSDKOptions } from '@coinbase/wallet-sdk/dist/CoinbaseWalletSDK';
import { Chain } from '../types';
import { Connector } from './base';
declare type Options = CoinbaseWalletSDKOptions & {
    jsonRpcUrl?: string;
};
export declare class CoinbaseWalletConnector extends Connector<CoinbaseWalletProvider, Options> {
    #private;
    readonly id = "coinbasewallet";
    readonly name = "Coinbase Wallet";
    readonly ready: boolean;
    constructor(config: {
        chains?: Chain[];
        options: Options;
    });
    connect(): Promise<{
        account: string;
        chain: {
            id: number;
            unsupported: boolean;
        };
        provider: Web3Provider;
    }>;
    disconnect(): Promise<void>;
    getAccount(): Promise<string>;
    getChainId(): Promise<number>;
    getProvider(): CoinbaseWalletProvider;
    getSigner(): Promise<import("@ethersproject/providers").JsonRpcSigner>;
    isAuthorized(): Promise<boolean>;
    switchChain(chainId: number): Promise<Chain | undefined>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
}
export {};
