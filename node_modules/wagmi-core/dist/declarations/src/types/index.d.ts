import { BigNumber } from 'ethers';
import { units } from '../constants';
export type { WithProvider } from './actions';
export declare type Balance = {
    decimals: number;
    formatted: string;
    symbol: string;
    unit: Unit | number;
    value: BigNumber;
};
export declare type Chain = {
    id: number;
    name: AddEthereumChainParameter['chainName'];
    nativeCurrency?: AddEthereumChainParameter['nativeCurrency'];
    rpcUrls: AddEthereumChainParameter['rpcUrls'];
    blockExplorers?: {
        name: string;
        url: string;
    }[];
    testnet?: boolean;
};
export declare type Unit = typeof units[number];
declare global {
    type AddEthereumChainParameter = {
        chainId: string;
        chainName: string;
        nativeCurrency?: {
            name: string;
            symbol: string;
            decimals: 18;
        };
        rpcUrls: string[];
        blockExplorerUrls?: string[];
        iconUrls?: string[];
    };
    type WatchAssetParams = {
        type: 'ERC20';
        options: {
            address: string;
            decimals: number;
            image?: string;
            symbol: string;
        };
    };
    type RequestArguments = {
        method: 'eth_accounts';
    } | {
        method: 'eth_chainId';
    } | {
        method: 'eth_requestAccounts';
    } | {
        method: 'personal_sign';
        params: [string, string];
    } | {
        method: 'wallet_addEthereumChain';
        params: AddEthereumChainParameter[];
    } | {
        method: 'wallet_switchEthereumChain';
        params: [{
            chainId: string;
        }];
    } | {
        method: 'wallet_watchAsset';
        params: WatchAssetParams;
    };
    type InjectedProviders = {
        isBraveWallet?: true;
        isCoinbaseWallet?: true;
        isFrame?: true;
        isMetaMask?: true;
        isTally?: true;
    };
    interface Window {
        ethereum?: InjectedProviders & {
            on?: (...args: any[]) => void;
            removeListener?: (...args: any[]) => void;
            request<T = any>(args: RequestArguments): Promise<T>;
        };
    }
    interface ProviderRpcError extends Error {
        code: 4001 | 4902;
        data?: unknown;
        message: string;
    }
}
