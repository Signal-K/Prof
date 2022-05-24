import { l as _checkPrivateRedeclaration, C as Connector, _ as _defineProperty, a as _classPrivateFieldInitSpec, n as normalizeChainId, U as UserRejectedRequestError, d as _classPrivateFieldGet, c as _classPrivateFieldSet, e as allChains, S as SwitchChainError } from '../../../dist/base-2a0d02bb.esm.js';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/ethereum-provider';
import { getAddress, hexValue } from 'ethers/lib/utils';
import 'eventemitter3';

function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);
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

class WalletConnectConnector extends Connector {
  constructor(config) {
    super(config);

    _classPrivateMethodInitSpec(this, _switchChain);

    _defineProperty(this, "id", 'walletConnect');

    _defineProperty(this, "name", 'WalletConnect');

    _defineProperty(this, "ready", true);

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
  }

  async connect() {
    try {
      var _provider$connector$p, _provider$connector, _provider$connector$p2;

      const provider = this.getProvider(true);
      provider.on('accountsChanged', this.onAccountsChanged);
      provider.on('chainChanged', this.onChainChanged);
      provider.on('disconnect', this.onDisconnect);
      const accounts = await provider.enable();
      const account = getAddress(accounts[0]);
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
        provider: new Web3Provider(provider)
      };
    } catch (error) {
      if (/user closed modal/i.test(error.message)) throw new UserRejectedRequestError();
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

    return getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = this.getProvider();
    const chainId = normalizeChainId(provider.chainId);
    return chainId;
  }

  getProvider(create) {
    if (!_classPrivateFieldGet(this, _provider) || create) _classPrivateFieldSet(this, _provider, new WalletConnectProvider(this.options));
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

}

async function _switchChain2(chainId) {
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
    const message = typeof error === 'string' ? error : error === null || error === void 0 ? void 0 : error.message;
    if (/user rejected request/i.test(message)) throw new UserRejectedRequestError();else throw new SwitchChainError();
  }
}

export { WalletConnectConnector };
