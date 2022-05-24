'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var base = require('../../../dist/base-4ab4da9e.cjs.prod.js');
var providers = require('@ethersproject/providers');
var walletSdk = require('@coinbase/wallet-sdk');
var utils = require('ethers/lib/utils');
require('eventemitter3');

var _client = /*#__PURE__*/new WeakMap();

var _provider = /*#__PURE__*/new WeakMap();

class CoinbaseWalletConnector extends base.Connector {
  constructor(config) {
    var _window$ethereum;

    super(config);

    base._defineProperty(this, "id", 'coinbasewallet');

    base._defineProperty(this, "name", 'Coinbase Wallet');

    base._defineProperty(this, "ready", typeof window !== 'undefined' && !((_window$ethereum = window.ethereum) !== null && _window$ethereum !== void 0 && _window$ethereum.isCoinbaseWallet));

    base._classPrivateFieldInitSpec(this, _client, {
      writable: true,
      value: void 0
    });

    base._classPrivateFieldInitSpec(this, _provider, {
      writable: true,
      value: void 0
    });

    base._defineProperty(this, "onAccountsChanged", accounts => {
      if (accounts.length === 0) this.emit('disconnect');else this.emit('change', {
        account: utils.getAddress(accounts[0])
      });
    });

    base._defineProperty(this, "onChainChanged", chainId => {
      const id = base.normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit('change', {
        chain: {
          id,
          unsupported
        }
      });
    });

    base._defineProperty(this, "onDisconnect", () => {
      this.emit('disconnect');
    });
  }

  async connect() {
    try {
      const provider = this.getProvider();
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
      const accounts = await provider.enable();
      const account = utils.getAddress(accounts[0]);
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);
      return {
        account,
        chain: {
          id,
          unsupported
        },
        provider: new providers.Web3Provider(provider)
      };
    } catch (error) {
      if (/user closed modal/i.test(error.message)) throw new base.UserRejectedRequestError();
      throw error;
    }
  }

  async disconnect() {
    if (!base._classPrivateFieldGet(this, _provider)) return;
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

    return utils.getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = this.getProvider();
    const chainId = base.normalizeChainId(provider.chainId);
    return chainId;
  }

  getProvider() {
    if (!base._classPrivateFieldGet(this, _provider)) {
      base._classPrivateFieldSet(this, _client, new walletSdk.CoinbaseWalletSDK(this.options));

      base._classPrivateFieldSet(this, _provider, base._classPrivateFieldGet(this, _client).makeWeb3Provider(this.options.jsonRpcUrl));
    }

    return base._classPrivateFieldGet(this, _provider);
  }

  async getSigner() {
    const provider = this.getProvider();
    const account = await this.getAccount();
    return new providers.Web3Provider(provider).getSigner(account);
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
    const id = utils.hexValue(chainId);

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: id
        }]
      });
      const chains = [...this.chains, ...base.allChains];
      return chains.find(x => x.id === chainId);
    } catch (error) {
      if (/user rejected signature request/i.test(error.message)) throw new base.UserRejectedRequestError();else throw new base.SwitchChainError();
    }
  }

}

exports.CoinbaseWalletConnector = CoinbaseWalletConnector;
