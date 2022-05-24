import { C as Connector, _ as _defineProperty, a as _classPrivateFieldInitSpec, n as normalizeChainId, U as UserRejectedRequestError, d as _classPrivateFieldGet, c as _classPrivateFieldSet, e as allChains, S as SwitchChainError } from '../../../dist/base-2a0d02bb.esm.js';
import { Web3Provider } from '@ethersproject/providers';
import { WalletLink } from 'walletlink';
import { getAddress, hexValue } from 'ethers/lib/utils';
import 'eventemitter3';

const cache = new Set();
const deprecatedMessage = 'WalletLinkConnector is deprecated. Use CoinbaseWalletConnector instead.';
/**
 * @deprecated se the new {@link CoinbaseWalletConnector} base class instead.
 */

var _client = /*#__PURE__*/new WeakMap();

var _provider = /*#__PURE__*/new WeakMap();

class WalletLinkConnector extends Connector {
  constructor(config) {
    var _window$ethereum;

    super(config);

    _defineProperty(this, "id", 'walletLink');

    _defineProperty(this, "name", 'Coinbase Wallet');

    _defineProperty(this, "ready", typeof window !== 'undefined' && !((_window$ethereum = window.ethereum) !== null && _window$ethereum !== void 0 && _window$ethereum.isCoinbaseWallet));

    _classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "onAccountsChanged", accounts => {
      if (accounts.length === 0) this.emit('disconnect');else this.emit('change', {
        account: getAddress(accounts[0])
      });
    });

    _defineProperty(this, "onChainChanged", chainId => {
      const id = normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit('change', {
        chain: {
          id,
          unsupported
        }
      });
    });

    _defineProperty(this, "onDisconnect", () => {
      this.emit('disconnect');
    });

    if (typeof window !== 'undefined' && !cache.has(deprecatedMessage)) {
      console.warn(deprecatedMessage);
      cache.add(deprecatedMessage);
    }
  }

  async connect() {
    try {
      const provider = this.getProvider();
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
      const accounts = await provider.enable();
      const account = getAddress(accounts[0]);
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);
      return {
        account,
        chain: {
          id,
          unsupported
        },
        provider: new Web3Provider(provider)
      };
    } catch (error) {
      if (/user closed modal/i.test(error.message)) throw new UserRejectedRequestError();
      throw error;
    }
  }

  async disconnect() {
    if (!_classPrivateFieldGet(this, _provider)) return;
    const provider = this.getProvider();
    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
    provider.disconnect();
    provider.close();

    if (typeof localStorage !== 'undefined') {
      let n = localStorage.length;

      while (n--) {
        const key = localStorage.key(n);
        if (!key) continue;
        if (!/-walletlink/.test(key)) continue;
        localStorage.removeItem(key);
      }
    }
  }

  async getAccount() {
    const provider = this.getProvider();
    const accounts = await provider.request({
      method: 'eth_accounts'
    }); // return checksum address

    return getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = this.getProvider();
    const chainId = normalizeChainId(provider.chainId);
    return chainId;
  }

  getProvider() {
    if (!_classPrivateFieldGet(this, _provider)) {
      _classPrivateFieldSet(this, _client, new WalletLink(this.options));

      _classPrivateFieldSet(this, _provider, _classPrivateFieldGet(this, _client).makeWeb3Provider(this.options.jsonRpcUrl));
    }

    return _classPrivateFieldGet(this, _provider);
  }

  async getSigner() {
    const provider = this.getProvider();
    const account = await this.getAccount();
    return new Web3Provider(provider).getSigner(account);
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  async switchChain(chainId) {
    const provider = this.getProvider();
    const id = hexValue(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: id
        }]
      });
      const chains = [...this.chains, ...allChains];
      return chains.find(x => x.id === chainId);
    } catch (error) {
      if (/user rejected signature request/i.test(error.message)) throw new UserRejectedRequestError();else throw new SwitchChainError();
    }
  }

}

export { WalletLinkConnector };
