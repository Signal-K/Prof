'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var base = require('./base-3d1ba951.cjs.dev.js');
var providers = require('@ethersproject/providers');
var utils = require('ethers/lib/utils');
var ethers = require('ethers');
require('eventemitter3');

const erc1155ABI = [{
  constant: true,
  inputs: [{
    internalType: 'address',
    name: '_owner',
    type: 'address'
  }, {
    internalType: 'uint256',
    name: '_id',
    type: 'uint256'
  }],
  name: 'balanceOf',
  outputs: [{
    internalType: 'uint256',
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    internalType: 'uint256',
    name: '_id',
    type: 'uint256'
  }],
  name: 'uri',
  outputs: [{
    internalType: 'string',
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];

const erc20ABI = [{
  constant: true,
  inputs: [],
  name: 'name',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_spender',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'approve',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_from',
    type: 'address'
  }, {
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transferFrom',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'decimals',
  outputs: [{
    name: '',
    type: 'uint8'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }],
  name: 'balanceOf',
  outputs: [{
    name: 'balance',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: true,
  inputs: [],
  name: 'symbol',
  outputs: [{
    name: '',
    type: 'string'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  constant: false,
  inputs: [{
    name: '_to',
    type: 'address'
  }, {
    name: '_value',
    type: 'uint256'
  }],
  name: 'transfer',
  outputs: [{
    name: '',
    type: 'bool'
  }],
  payable: false,
  stateMutability: 'nonpayable',
  type: 'function'
}, {
  constant: true,
  inputs: [{
    name: '_owner',
    type: 'address'
  }, {
    name: '_spender',
    type: 'address'
  }],
  name: 'allowance',
  outputs: [{
    name: '',
    type: 'uint256'
  }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}, {
  payable: true,
  stateMutability: 'payable',
  type: 'fallback'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'owner',
    type: 'address'
  }, {
    indexed: true,
    name: 'spender',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Approval',
  type: 'event'
}, {
  anonymous: false,
  inputs: [{
    indexed: true,
    name: 'from',
    type: 'address'
  }, {
    indexed: true,
    name: 'to',
    type: 'address'
  }, {
    indexed: false,
    name: 'value',
    type: 'uint256'
  }],
  name: 'Transfer',
  type: 'event'
}];

const erc721ABI = [{
  inputs: [{
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'ownerOf',
  outputs: [{
    internalType: 'address',
    name: '',
    type: 'address'
  }],
  stateMutability: 'view',
  type: 'function'
}, {
  inputs: [{
    internalType: 'uint256',
    name: 'tokenId',
    type: 'uint256'
  }],
  name: 'tokenURI',
  outputs: [{
    internalType: 'string',
    name: '',
    type: 'string'
  }],
  stateMutability: 'view',
  type: 'function'
}];

// https://github.com/ethers-io/ethers.js/blob/master/packages/units/src.ts/index.ts#L10-L18
const units = ['wei', 'kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether'];

const getInjectedName = ethereum => {
  if (!ethereum) return 'Injected';
  if (ethereum.isBraveWallet) return 'Brave Wallet';
  if (ethereum.isMetaMask) return 'MetaMask';
  if (ethereum.isCoinbaseWallet) return 'Coinbase Wallet';
  if (ethereum.isFrame) return 'Frame';
  if (ethereum.isTally) return 'Tally';
  return 'Injected';
};

const shimKey = 'wagmi.shimDisconnect';

var _provider = /*#__PURE__*/new WeakMap();

class InjectedConnector extends base.Connector {
  constructor(config) {
    super({ ...config,
      options: config === null || config === void 0 ? void 0 : config.options
    });

    base._defineProperty(this, "id", 'injected');

    base._defineProperty(this, "name", void 0);

    base._defineProperty(this, "ready", typeof window != 'undefined' && !!window.ethereum);

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
      var _this$options;

      this.emit('disconnect');
      if ((_this$options = this.options) !== null && _this$options !== void 0 && _this$options.shimDisconnect) typeof localStorage !== 'undefined' && localStorage.removeItem(shimKey);
    });

    let name = 'Injected';
    if (typeof window !== 'undefined') name = getInjectedName(window.ethereum);
    this.name = name;
  }

  async connect() {
    try {
      var _this$options3;

      const provider = this.getProvider();
      if (!provider) throw new base.ConnectorNotFoundError();

      if (provider.on) {
        var _this$options2;

        provider.on('accountsChanged', this.onAccountsChanged);
        provider.on('chainChanged', this.onChainChanged);
        if (!((_this$options2 = this.options) !== null && _this$options2 !== void 0 && _this$options2.shimChainChangedDisconnect)) provider.on('disconnect', this.onDisconnect);
      }

      const account = await this.getAccount();
      const id = await this.getChainId();
      const unsupported = this.isChainUnsupported(id);
      if ((_this$options3 = this.options) !== null && _this$options3 !== void 0 && _this$options3.shimDisconnect) typeof localStorage !== 'undefined' && localStorage.setItem(shimKey, 'true');
      return {
        account,
        chain: {
          id,
          unsupported
        },
        provider
      };
    } catch (error) {
      if (error.code === 4001) throw new base.UserRejectedRequestError();
      throw error;
    }
  }

  async disconnect() {
    var _this$options4;

    const provider = this.getProvider();
    if (!(provider !== null && provider !== void 0 && provider.removeListener)) return;
    provider.removeListener('accountsChanged', this.onAccountsChanged);
    provider.removeListener('chainChanged', this.onChainChanged);
    provider.removeListener('disconnect', this.onDisconnect);
    if ((_this$options4 = this.options) !== null && _this$options4 !== void 0 && _this$options4.shimDisconnect) typeof localStorage !== 'undefined' && localStorage.removeItem(shimKey);
  }

  async getAccount() {
    const provider = this.getProvider();
    if (!provider) throw new base.ConnectorNotFoundError();
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    }); // return checksum address

    return utils.getAddress(accounts[0]);
  }

  async getChainId() {
    const provider = this.getProvider();
    if (!provider) throw new base.ConnectorNotFoundError();
    return await provider.request({
      method: 'eth_chainId'
    }).then(base.normalizeChainId);
  }

  getProvider() {
    if (typeof window !== 'undefined' && !!window.ethereum) base._classPrivateFieldSet(this, _provider, window.ethereum);
    return base._classPrivateFieldGet(this, _provider);
  }

  async getSigner() {
    const provider = this.getProvider();
    const account = await this.getAccount();
    return new providers.Web3Provider(provider).getSigner(account);
  }

  async isAuthorized() {
    try {
      var _this$options5;

      if ((_this$options5 = this.options) !== null && _this$options5 !== void 0 && _this$options5.shimDisconnect && typeof localStorage !== 'undefined' && !localStorage.getItem(shimKey)) return false;
      const provider = this.getProvider();
      if (!provider) throw new base.ConnectorNotFoundError();
      const accounts = await provider.request({
        method: 'eth_accounts'
      });
      const account = accounts[0];
      return !!account;
    } catch {
      return false;
    }
  }

  async switchChain(chainId) {
    const provider = this.getProvider();
    if (!provider) throw new base.ConnectorNotFoundError();
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
      // Indicates chain is not added to MetaMask
      if (error.code === 4902) {
        try {
          var _chain$blockExplorers;

          const chain = this.chains.find(x => x.id === chainId);
          if (!chain) throw new base.ChainNotConfiguredError();
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: id,
              chainName: chain.name,
              nativeCurrency: chain.nativeCurrency,
              rpcUrls: chain.rpcUrls,
              blockExplorerUrls: (_chain$blockExplorers = chain.blockExplorers) === null || _chain$blockExplorers === void 0 ? void 0 : _chain$blockExplorers.map(x => x.url)
            }]
          });
          return chain;
        } catch (addError) {
          throw new base.AddChainError();
        }
      } else if (error.code === 4001) throw new base.UserRejectedRequestError();else throw new base.SwitchChainError();
    }
  }

  async watchAsset(_ref) {
    let {
      address,
      decimals = 18,
      image,
      symbol
    } = _ref;
    const provider = this.getProvider();
    if (!provider) throw new base.ConnectorNotFoundError();
    await provider.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          decimals,
          image,
          symbol
        }
      }
    });
  }

}

const balanceAction = async _ref => {
  var _config$formatUnits, _chain$nativeCurrency, _chain$nativeCurrency2, _chain$nativeCurrency3, _chain$nativeCurrency4;

  let {
    chains = [...base.defaultChains, ...base.defaultL2Chains],
    config,
    provider
  } = _ref;
  const unit = (_config$formatUnits = config.formatUnits) !== null && _config$formatUnits !== void 0 ? _config$formatUnits : 'ether';

  if (config.token) {
    const contract = new ethers.ethers.Contract(config.token, erc20ABI, provider);
    const [value, decimals, symbol] = await Promise.all([contract.balanceOf(config.addressOrName), contract.decimals(), contract.symbol()]);
    return {
      decimals,
      formatted: ethers.utils.formatUnits(value, unit),
      symbol,
      unit,
      value
    };
  }

  const value = await provider.getBalance(config.addressOrName);
  const chain = chains.find(x => x.id === provider.network.chainId);
  return {
    decimals: (_chain$nativeCurrency = chain === null || chain === void 0 ? void 0 : (_chain$nativeCurrency2 = chain.nativeCurrency) === null || _chain$nativeCurrency2 === void 0 ? void 0 : _chain$nativeCurrency2.decimals) !== null && _chain$nativeCurrency !== void 0 ? _chain$nativeCurrency : 18,
    formatted: ethers.utils.formatUnits(value, unit),
    symbol: (_chain$nativeCurrency3 = chain === null || chain === void 0 ? void 0 : (_chain$nativeCurrency4 = chain.nativeCurrency) === null || _chain$nativeCurrency4 === void 0 ? void 0 : _chain$nativeCurrency4.symbol) !== null && _chain$nativeCurrency3 !== void 0 ? _chain$nativeCurrency3 : 'ETH',
    unit,
    value
  };
};

exports.AddChainError = base.AddChainError;
exports.ChainNotConfiguredError = base.ChainNotConfiguredError;
exports.Connector = base.Connector;
exports.ConnectorAlreadyConnectedError = base.ConnectorAlreadyConnectedError;
exports.ConnectorNotFoundError = base.ConnectorNotFoundError;
exports.SwitchChainError = base.SwitchChainError;
exports.UserRejectedRequestError = base.UserRejectedRequestError;
exports.allChains = base.allChains;
exports.chain = base.chain;
exports.defaultChains = base.defaultChains;
exports.defaultL2Chains = base.defaultL2Chains;
exports.developmentChains = base.developmentChains;
exports.normalizeChainId = base.normalizeChainId;
exports.InjectedConnector = InjectedConnector;
exports.balanceAction = balanceAction;
exports.erc1155ABI = erc1155ABI;
exports.erc20ABI = erc20ABI;
exports.erc721ABI = erc721ABI;
exports.units = units;
