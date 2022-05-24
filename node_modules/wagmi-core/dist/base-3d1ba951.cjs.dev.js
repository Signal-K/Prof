'use strict';

var EventEmitter = require('eventemitter3');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var EventEmitter__default = /*#__PURE__*/_interopDefault(EventEmitter);

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

/**
 * Data from Chainlist
 * @see https://chainlist.org
 */
const chain = {
  mainnet: {
    id: 1,
    name: 'Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://etherscan.io'
    }]
  },
  ropsten: {
    id: 3,
    name: 'Ropsten',
    nativeCurrency: {
      name: 'Ropsten Ether',
      symbol: 'ropETH',
      decimals: 18
    },
    rpcUrls: ['https://ropsten.infura.io/v3'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://ropsten.etherscan.io'
    }],
    testnet: true
  },
  rinkeby: {
    id: 4,
    name: 'Rinkeby',
    nativeCurrency: {
      name: 'Rinkeby Ether',
      symbol: 'rETH',
      decimals: 18
    },
    rpcUrls: ['https://rinkeby.infura.io/v3'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://rinkeby.etherscan.io'
    }],
    testnet: true
  },
  gnosis: {
    id: 100,
    name: 'Gnosis Chain',
    nativeCurrency: {
      name: 'xDai',
      symbol: 'xDAI',
      decimals: 18
    },
    rpcUrls: ['https://rpc.gnosischain.com'],
    blockExplorers: [{
      name: 'Blockscout',
      url: 'https://blockscout.com'
    }]
  },
  goerli: {
    id: 5,
    name: 'Goerli',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'gETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.infura.io/v3'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://goerli.etherscan.io'
    }],
    testnet: true
  },
  kovan: {
    id: 42,
    name: 'Kovan',
    nativeCurrency: {
      name: 'Kovan Ether',
      symbol: 'kETH',
      decimals: 18
    },
    rpcUrls: ['https://kovan.infura.io/v3'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://kovan.etherscan.io'
    }],
    testnet: true
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://optimistic.etherscan.io'
    }]
  },
  optimismKovan: {
    id: 69,
    name: 'Optimism Kovan',
    nativeCurrency: {
      name: 'Kovan Ether',
      symbol: 'KOR',
      decimals: 18
    },
    rpcUrls: ['https://kovan.optimism.io'],
    blockExplorers: [{
      name: 'Etherscan',
      url: 'https://kovan-optimistic.etherscan.io'
    }],
    testnet: true
  },
  polygonMainnet: {
    id: 137,
    name: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com', 'https://rpc-mainnet.matic.network', 'https://matic-mainnet.chainstacklabs.com', 'https://rpc-mainnet.maticvigil.com', 'https://rpc-mainnet.matic.quiknode.pro', 'https://matic-mainnet-full-rpc.bwarelabs.com'],
    blockExplorers: [{
      name: 'Polygonscan',
      url: 'https://polygonscan.com'
    }]
  },
  polygonTestnetMumbai: {
    id: 80001,
    name: 'Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com', 'https://rpc-mumbai.maticvigil.com', 'https://matic-testnet-archive-rpc.bwarelabs.com'],
    blockExplorers: [{
      name: 'Polygonscan',
      url: 'https://mumbai.polygonscan.com'
    }],
    testnet: true
  },
  arbitrumOne: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'AETH',
      decimals: 18
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: [{
      name: 'Arbiscan',
      url: 'https://arbiscan.io'
    }, {
      name: 'Arbitrum Explorer',
      url: 'https://explorer.arbitrum.io'
    }]
  },
  arbitrumRinkeby: {
    id: 421611,
    name: 'Arbitrum Rinkeby',
    nativeCurrency: {
      name: 'Arbitrum Rinkeby Ether',
      symbol: 'ARETH',
      decimals: 18
    },
    rpcUrls: ['https://rinkeby.arbitrum.io/rpc'],
    blockExplorers: [{
      name: 'Arbitrum Explorer',
      url: 'https://rinkeby-explorer.arbitrum.io'
    }],
    testnet: true
  },
  avalanche: {
    id: 43114,
    name: 'Avalanche Mainnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorers: [{
      name: 'SnowTrace',
      url: 'https://snowtrace.io'
    }],
    testnet: false
  },
  avalancheFuji: {
    id: 43113,
    name: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorers: [{
      name: 'SnowTrace',
      url: 'https://testnet.snowtrace.io'
    }],
    testnet: true
  },
  localhost: {
    id: 1337,
    name: 'Localhost',
    rpcUrls: ['https://127.0.0.1:8545']
  },
  hardhat: {
    id: 31337,
    name: 'Hardhat',
    rpcUrls: ['http://127.0.0.1:8545']
  }
};
const allChains = Object.values(chain);
const defaultChains = [chain.mainnet, chain.ropsten, chain.rinkeby, chain.goerli, chain.kovan];
const defaultL2Chains = [chain.gnosis, chain.optimism, chain.optimismKovan, chain.polygonMainnet, chain.polygonTestnetMumbai, chain.arbitrumOne, chain.arbitrumRinkeby];
const developmentChains = [chain.localhost, chain.hardhat];

const normalizeChainId = chainId => {
  if (typeof chainId === 'string') return Number.parseInt(chainId, chainId.trim().substring(0, 2) === '0x' ? 16 : 10);
  return chainId;
};

class AddChainError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'AddChainError');

    _defineProperty(this, "message", 'Error adding chain');
  }

}
class ChainNotConfiguredError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'ChainNotConfigured');

    _defineProperty(this, "message", 'Chain not configured');
  }

}
class ConnectorAlreadyConnectedError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'ConnectorAlreadyConnectedError');

    _defineProperty(this, "message", 'Connector already connected');
  }

}
class ConnectorNotFoundError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'ConnectorNotFoundError');

    _defineProperty(this, "message", 'Connector not found');
  }

}
class SwitchChainError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'SwitchChainError');

    _defineProperty(this, "message", 'Error switching chain');
  }

}
class UserRejectedRequestError extends Error {
  constructor() {
    super(...arguments);

    _defineProperty(this, "name", 'UserRejectedRequestError');

    _defineProperty(this, "message", 'User rejected request');
  }

}

class Connector extends EventEmitter__default["default"] {
  /** Unique connector id */

  /** Connector name */

  /** Chains connector supports */

  /** Options to use with connector */

  /** Whether connector is usable */
  constructor(_ref) {
    let {
      chains = defaultChains,
      options
    } = _ref;
    super();

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "chains", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "ready", void 0);

    this.chains = chains;
    this.options = options;
  }

  isChainUnsupported(chainId) {
    return !this.chains.some(x => x.id === chainId);
  }

}

exports.AddChainError = AddChainError;
exports.ChainNotConfiguredError = ChainNotConfiguredError;
exports.Connector = Connector;
exports.ConnectorAlreadyConnectedError = ConnectorAlreadyConnectedError;
exports.ConnectorNotFoundError = ConnectorNotFoundError;
exports.SwitchChainError = SwitchChainError;
exports.UserRejectedRequestError = UserRejectedRequestError;
exports._checkPrivateRedeclaration = _checkPrivateRedeclaration;
exports._classPrivateFieldGet = _classPrivateFieldGet;
exports._classPrivateFieldInitSpec = _classPrivateFieldInitSpec;
exports._classPrivateFieldSet = _classPrivateFieldSet;
exports._defineProperty = _defineProperty;
exports.allChains = allChains;
exports.chain = chain;
exports.defaultChains = defaultChains;
exports.defaultL2Chains = defaultL2Chains;
exports.developmentChains = developmentChains;
exports.normalizeChainId = normalizeChainId;
