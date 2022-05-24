import { Chain } from '../types';
declare type ChainName = 'arbitrumOne' | 'arbitrumRinkeby' | 'avalanche' | 'avalancheFuji' | 'gnosis' | 'goerli' | 'hardhat' | 'kovan' | 'localhost' | 'mainnet' | 'optimism' | 'optimismKovan' | 'polygonMainnet' | 'polygonTestnetMumbai' | 'rinkeby' | 'ropsten';
/**
 * Data from Chainlist
 * @see https://chainlist.org
 */
export declare const chain: Record<ChainName, Chain>;
export declare const allChains: Chain[];
export declare const defaultChains: Chain[];
export declare const defaultL2Chains: Chain[];
export declare const developmentChains: Chain[];
export {};
