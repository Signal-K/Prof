'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var base = require('../../../dist/base-3d1ba951.cjs.dev.js');
var providers = require('@ethersproject/providers');
var WalletConnectProvider = require('@walletconnect/ethereum-provider');
var utils = require('ethers/lib/utils');
require('eventemitter3');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var WalletConnectProvider__default = /*#__PURE__*/_interopDefault(WalletConnectProvider);

function _classPrivateMethodInitSpec(obj, privateSet) {
  base._checkPrivateRedeclaration(obj, privateSet);
  privateSet.add(obj);
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

const switchChainAllowedRegex = /(rainbow)/i;

var _provider = /*#__PURE__*/new WeakMap();

var _switchChain = /*#__PURE__*/new WeakSet();

class WalletConnectConnector extends base.Connector {
  constructor(config) {
    super(config);

    _classPrivateMethodInitSpec(this, _switchChain);

    base._defineProperty(this, "id", 'walletConnect');

    base._defineProperty(this, "name", 'WalletConnect');

    base._defineProperty(this, "ready", true);

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
      var _provider$connector$p, _provider$connector, _provider$connector$p2;

      const provider = this.getProvider(true);
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
      const accounts = await provider.enable();
      const account = utils.getAddress(accounts[0]);
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id); // Not all WalletConnect options support programmatic chain switching
      // Only enable for wallet options that do

      const walletName = (_provider$connector$p = (_provider$connector = provider.connector) === null || _provider$connector === void 0 ? void 0 : (_provider$connector$p2 = _provider$connector.peerMeta) === null || _provider$connector$p2 === void 0 ? void 0 : _provider$connector$p2.name) !== null && _provider$connector$p !== void 0 ? _provider$connector$p : '';
      if (switchChainAllowedRegex.test(walletName)) this.switchChain = _classPrivateMethodGet(this, _switchChain, _switchChain2);
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
    const provider = this.getProvider();
    await provider.disconnect();
    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
    typeof localStorage !== 'undefined' && localStorage.removeItem('walletconnect');
  }

  async getAccount() {
    const provider = this.getProvider();
    const accounts = provider.accounts; // return checksum address

    return utils.getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = this.getProvider();
    const chainId = base.normalizeChainId(provider.chainId);
    return chainId;
  }

  getProvider(create) {
    if (!base._classPrivateFieldGet(this, _provider) || create) base._classPrivateFieldSet(this, _provider, new WalletConnectProvider__default["default"](this.options));
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

}

async function _switchChain2(chainId) {
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
    const message = typeof error === 'string' ? error : error === null || error === void 0 ? void 0 : error.message;
    if (/user rejected request/i.test(message)) throw new base.UserRejectedRequestError();else throw new base.SwitchChainError();
  }
}

exports.WalletConnectConnector = WalletConnectConnector;
