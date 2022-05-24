import * as React from 'react';
import { getDefaultProvider } from '@ethersproject/providers';
import { balanceAction, defaultChains, defaultL2Chains, ConnectorAlreadyConnectedError, allChains, SwitchChainError, ConnectorNotFoundError, UserRejectedRequestError, erc20ABI, InjectedConnector } from 'wagmi-core';
export { AddChainError, ChainNotConfiguredError, Connector, ConnectorAlreadyConnectedError, ConnectorNotFoundError, InjectedConnector, SwitchChainError, UserRejectedRequestError, allChains, chain, defaultChains, defaultL2Chains, developmentChains, erc1155ABI, erc20ABI, erc721ABI, normalizeChainId } from 'wagmi-core';
import { utils, Contract, ethers } from 'ethers';

const useProvider = () => {
  const {
    state
  } = useContext();
  return state.provider;
};

const useWebSocketProvider = () => {
  const {
    state
  } = useContext();
  return state.webSocketProvider;
};

const useCacheBuster = () => {
  const context = useContext();
  return context.state.cacheBuster;
};

const useCancel = () => {
  const cancelCallback = React.useRef(null);
  React.useEffect(() => {
    return () => {
      var _cancelCallback$curre;

      return (_cancelCallback$curre = cancelCallback.current) === null || _cancelCallback$curre === void 0 ? void 0 : _cancelCallback$curre.call(cancelCallback);
    };
  }, []);
  const cancel = React.useCallback(callback => {
    var _cancelCallback$curre2;

    (_cancelCallback$curre2 = cancelCallback.current) === null || _cancelCallback$curre2 === void 0 ? void 0 : _cancelCallback$curre2.call(cancelCallback);
    if (callback) cancelCallback.current = callback;
  }, []);
  return cancel;
};

const useLocalStorage = function (key) {
  let defaultState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  const [value, setValue] = React.useState(() => {
    if (typeof localStorage === 'undefined') return defaultState;
    const value = localStorage.getItem(key);

    try {
      return value ? JSON.parse(value) : defaultState;
    } catch (error) {
      console.warn(error);
      return defaultState;
    }
  });
  const setLocalStorage = React.useCallback(newValue => {
    if (newValue === value) return;
    setValue(newValue);
    if (newValue === null) localStorage.removeItem(key);else localStorage.setItem(key, JSON.stringify(newValue));

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(error);
      }
    }
  }, [value, setValue, key]);
  return [value, setLocalStorage];
};

const initialState$g = {
  loading: false
};
const useEnsAvatar = function () {
  let {
    addressOrName,
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const [state, setState] = React.useState(initialState$g);
  const cancelQuery = useCancel();
  const getEnsAvatar = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        addressOrName
      };
      if (!config_.addressOrName) throw new Error('addressOrName is required');
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const avatar = await provider.getAvatar(config_.addressOrName);

      if (!didCancel) {
        setState(x => ({ ...x,
          avatar,
          loading: false
        }));
      }

      return avatar;
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return error;
    }
  }, [addressOrName, cancelQuery, provider]); // Fetch avatar when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !addressOrName) return;
    getEnsAvatar({
      addressOrName
    });
    return cancelQuery;
  }, [addressOrName, cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.avatar,
    loading: state.loading,
    error: state.error
  }, getEnsAvatar];
};

const initialState$f = {
  loading: false
};
const useEnsLookup = function () {
  let {
    address,
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const [state, setState] = React.useState(initialState$f);
  const cancelQuery = useCancel();
  const lookupAddress = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        address
      };
      if (!config_.address) throw new Error('address is required');
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const ens = await provider.lookupAddress(config_.address);

      if (!didCancel) {
        setState(x => ({ ...x,
          ens,
          loading: false
        }));
      }

      return {
        data: ens,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [address, cancelQuery, provider]); // Resolve name when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !address) return;
    lookupAddress({
      address
    });
    return cancelQuery;
  }, [address, cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.ens,
    loading: state.loading,
    error: state.error
  }, lookupAddress];
};

const initialState$e = {
  loading: false
};
const useEnsResolveName = function () {
  let {
    name,
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const [state, setState] = React.useState(initialState$e);
  const cancelQuery = useCancel();
  const resolveName = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        name
      };
      if (!config_.name) throw new Error('name is required');
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const address = await provider.resolveName(config_.name);

      if (!didCancel) {
        setState(x => ({ ...x,
          address,
          loading: false
        }));
      }

      return {
        data: address,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [name, cancelQuery, provider]); // Resolve name when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !name) return;
    resolveName({
      name
    });
    return cancelQuery;
  }, [name, cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.address,
    loading: state.loading,
    error: state.error
  }, resolveName];
};

const initialState$d = {
  loading: false
};
const useEnsResolver = function () {
  let {
    name,
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const [state, setState] = React.useState(initialState$d);
  const cancelQuery = useCancel();
  const getEnsResolver = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        name
      };
      if (!config_.name) throw new Error('name is required');
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const resolver = await provider.getResolver(config_.name);

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false,
          resolver
        }));
      }

      return {
        data: resolver,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, name, provider]); // Fetch avatar when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !name) return;
    getEnsResolver({
      name
    });
    return cancelQuery;
  }, [cacheBuster, cancelQuery, name, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.resolver,
    loading: state.loading,
    error: state.error
  }, getEnsResolver];
};

const useAccount = function () {
  var _globalState$data;

  let {
    fetchEns
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: globalState,
    setState
  } = useContext();
  const address = (_globalState$data = globalState.data) === null || _globalState$data === void 0 ? void 0 : _globalState$data.account;
  const [{
    data: ens,
    error: ensError,
    loading: ensLoading
  }] = useEnsLookup({
    address,
    skip: !fetchEns
  });
  const [{
    data: avatar,
    error: avatarError,
    loading: avatarLoading
  }] = useEnsAvatar({
    addressOrName: ens,
    skip: !fetchEns || !ens
  });
  const disconnect = React.useCallback(() => {
    setState(x => {
      var _x$connector;

      (_x$connector = x.connector) === null || _x$connector === void 0 ? void 0 : _x$connector.disconnect();
      return {
        cacheBuster: x.cacheBuster + 1
      };
    });
  }, [setState]);
  const error = ensError || avatarError;
  const loading = ensLoading || avatarLoading;
  return [{
    data: address ? {
      address,
      connector: globalState.connector,
      ens: ens ? {
        avatar,
        name: ens
      } : undefined
    } : undefined,
    error,
    loading
  }, disconnect];
};

const initialState$c = {
  loading: false
};
const useBlockNumber = function () {
  let {
    skip,
    watch
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const webSocketProvider = useWebSocketProvider();
  const [state, setState] = React.useState(initialState$c);
  const cancelQuery = useCancel();
  const getBlockNumber = React.useCallback(async () => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const blockNumber = await provider.getBlockNumber();

      if (!didCancel) {
        setState(x => ({ ...x,
          blockNumber,
          loading: false
        }));
      }

      return {
        data: blockNumber,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, provider]);
  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip) return;
    getBlockNumber();
    return cancelQuery;
  }, [cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch) return;
    let didCancel = false;

    const listener = blockNumber => {
      // Just to be safe in case the provider implementation
      // calls the event callback after .off() has been called
      if (!didCancel) {
        setState(x => ({ ...x,
          blockNumber
        }));
      }
    };

    const provider_ = webSocketProvider !== null && webSocketProvider !== void 0 ? webSocketProvider : provider;
    provider_.on('block', listener);
    return () => {
      didCancel = true;
      provider_.off('block', listener);
    };
  }, [provider, watch, webSocketProvider]);
  return [{
    data: state.blockNumber,
    error: state.error,
    loading: state.loading
  }, getBlockNumber];
};

const initialState$b = {
  loading: false
};
const useFeeData = function () {
  let {
    formatUnits = 'wei',
    skip,
    watch
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const provider = useProvider();
  const [{
    data: blockNumber
  }] = useBlockNumber({
    skip: true,
    watch
  });
  const cacheBuster = useCacheBuster();
  const [state, setState] = React.useState(initialState$b);
  const cancelQuery = useCancel();
  const getFeeData = React.useCallback(async () => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const feeData = await provider.getFeeData();

      if (!didCancel) {
        setState(x => ({ ...x,
          feeData,
          loading: false
        }));
      }

      return {
        data: feeData,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, provider]); // Fetch feeData on mount or when chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip) return;
    getFeeData();
    return cancelQuery;
  }, [cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch || !blockNumber) return;
    getFeeData();
    return cancelQuery;
  }, [blockNumber, cancelQuery, getFeeData, watch]);
  const formatted = state.feeData ? {
    gasPrice: utils.formatUnits(state.feeData.gasPrice, formatUnits),
    maxFeePerGas: utils.formatUnits(state.feeData.maxFeePerGas, formatUnits),
    maxPriorityFeePerGas: utils.formatUnits(state.feeData.maxPriorityFeePerGas, formatUnits)
  } : undefined;
  return [{
    data: state.feeData ? { ...state.feeData,
      formatted
    } : undefined,
    loading: state.loading,
    error: state.error
  }, getFeeData];
};

const initialState$a = {
  loading: false
};
const useBalance = function () {
  let {
    addressOrName,
    formatUnits = 'ether',
    skip,
    token,
    watch
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const [{
    data: blockNumber
  }] = useBlockNumber({
    skip: true,
    watch
  });
  const [state, setState] = React.useState(initialState$a);
  const cancelQuery = useCancel();
  const getBalance = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      var _connector$chains;

      const config_ = config !== null && config !== void 0 ? config : {
        addressOrName,
        formatUnits,
        token
      };
      if (!config_.addressOrName) throw new Error('address is required');
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const balance = await balanceAction({
        chains: [...((_connector$chains = connector === null || connector === void 0 ? void 0 : connector.chains) !== null && _connector$chains !== void 0 ? _connector$chains : []), ...defaultChains, ...defaultL2Chains],
        config: config_,
        provider
      });
      if (!didCancel) setState(x => ({ ...x,
        balance,
        loading: false
      }));
      return {
        data: balance,
        error: undefined
      };
    } catch (error_) {
      const error = error_;
      if (!didCancel) setState(x => ({ ...x,
        error,
        loading: false
      }));
      return {
        data: undefined,
        error
      };
    }
  }, [addressOrName, cancelQuery, connector, formatUnits, provider, token]); // Fetch balance when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !addressOrName) return;
    getBalance({
      addressOrName,
      formatUnits,
      token
    });
    return cancelQuery;
  }, [addressOrName, cacheBuster, cancelQuery, skip, token]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch) return;
    if (!blockNumber) return;
    if (!addressOrName) return;
    getBalance({
      addressOrName,
      formatUnits,
      token
    });
  }, [blockNumber]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.balance,
    error: state.error,
    loading: state.loading
  }, getBalance];
};

const initialState$9 = {
  loading: false
};
const useConnect = () => {
  var _globalState$data;

  const {
    state: globalState,
    setState: setGlobalState,
    setLastUsedConnector
  } = useContext();
  const [state, setState] = React.useState(initialState$9);
  const cancelQuery = useCancel();
  const connect = React.useCallback(async connector => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const activeConnector = globalState === null || globalState === void 0 ? void 0 : globalState.connector;
      if (connector === activeConnector) throw new ConnectorAlreadyConnectedError();
      setState(x => ({ ...x,
        loading: true,
        connector,
        error: undefined
      }));
      const data = await connector.connect();

      if (!didCancel) {
        // Update connector globally only after successful connection
        setGlobalState(x => ({ ...x,
          connector,
          data
        }));
        setLastUsedConnector(connector.name);
        setState(x => ({ ...x,
          loading: false
        }));
      }

      return {
        data,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          connector: undefined,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, globalState.connector, setGlobalState, setLastUsedConnector]); // Keep connector in sync with global connector

  React.useEffect(() => {
    setState(x => ({ ...x,
      connector: globalState.connector,
      error: undefined
    }));
    return cancelQuery;
  }, [cancelQuery, globalState.connector]);
  return [{
    data: {
      connected: !!((_globalState$data = globalState.data) !== null && _globalState$data !== void 0 && _globalState$data.account),
      connector: state.connector,
      connectors: globalState.connectors
    },
    error: state.error,
    loading: state.loading || globalState.connecting
  }, connect];
};

const initialState$8 = {
  loading: false
};
const useNetwork = () => {
  var _data$chain, _data$chain2, _connector$chains;

  const {
    state: {
      connector,
      data
    }
  } = useContext();
  const [state, setState] = React.useState(initialState$8);
  const chainId = data === null || data === void 0 ? void 0 : (_data$chain = data.chain) === null || _data$chain === void 0 ? void 0 : _data$chain.id;
  const unsupported = data === null || data === void 0 ? void 0 : (_data$chain2 = data.chain) === null || _data$chain2 === void 0 ? void 0 : _data$chain2.unsupported;
  const activeChains = (_connector$chains = connector === null || connector === void 0 ? void 0 : connector.chains) !== null && _connector$chains !== void 0 ? _connector$chains : [];
  const activeChain = [...activeChains, ...allChains].find(x => x.id === chainId);
  const cancelQuery = useCancel();
  const switchNetwork = React.useCallback(async chainId => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });
    if (!(connector !== null && connector !== void 0 && connector.switchChain)) return {
      data: undefined,
      error: new SwitchChainError()
    };

    try {
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const chain = await connector.switchChain(chainId);

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false
        }));
      }

      return {
        data: chain,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, connector]);
  return [{
    data: {
      chain: chainId ? { ...activeChain,
        id: chainId,
        unsupported
      } : undefined,
      chains: activeChains
    },
    error: state.error,
    loading: state.loading
  }, connector !== null && connector !== void 0 && connector.switchChain ? switchNetwork : undefined];
};

const initialState$7 = {
  data: undefined,
  error: undefined,
  loading: false
};
const useSigner = function () {
  let {
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const cacheBuster = useCacheBuster();
  const {
    state: {
      connector
    }
  } = useContext();
  const [state, setState] = React.useState(initialState$7);
  const cancelQuery = useCancel();
  const getSigner = React.useCallback(async () => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const signer = await (connector === null || connector === void 0 ? void 0 : connector.getSigner());

      if (!didCancel) {
        setState(x => ({ ...x,
          data: signer,
          loading: false
        }));
      }

      return signer;
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          data: undefined,
          error,
          loading: false
        }));
      }
    }
  }, [cancelQuery, connector]);
  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip) return;
    getSigner();
    return cancelQuery;
  }, [cacheBuster, connector, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [state, getSigner];
};

const initialState$6 = {
  loading: false
};
const useSignMessage = function () {
  let {
    message
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const [state, setState] = React.useState(initialState$6);
  const cancelQuery = useCancel();
  const signMessage = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        message
      };
      if (!config_.message) throw new Error('message is required');
      if (!connector) throw new ConnectorNotFoundError();
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const signer = await connector.getSigner();
      const signature = await signer.signMessage(config_.message);

      if (!didCancel) {
        setState(x => ({ ...x,
          signature,
          loading: false
        }));
      }

      return {
        data: signature,
        error: undefined
      };
    } catch (error_) {
      let error = error_;
      if (error_.code === 4001) error = new UserRejectedRequestError();

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, connector, message]);
  return [{
    data: state.signature,
    error: state.error,
    loading: state.loading
  }, signMessage];
};

const initialState$5 = {
  loading: false
};
const useSignTypedData = function () {
  let {
    domain,
    types,
    value
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const [state, setState] = React.useState(initialState$5);
  const cancelQuery = useCancel();
  const signTypedData = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        domain,
        types,
        value
      };
      if (!config_.domain) throw new Error('domain is required');
      if (!config_.types) throw new Error('type is required');
      if (!config_.value) throw new Error('value is required');
      if (!connector) throw new ConnectorNotFoundError();
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const signer = await connector.getSigner(); // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData

      const signature = await signer._signTypedData(config_.domain, config_.types, config_.value);

      if (!didCancel) {
        setState(x => ({ ...x,
          signature,
          loading: false
        }));
      }

      return {
        data: signature,
        error: undefined
      };
    } catch (error_) {
      let error = error_;
      if (error_.code === 4001) error = new UserRejectedRequestError();

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, connector, domain, types, value]);
  return [{
    data: state.signature,
    error: state.error,
    loading: state.loading
  }, signTypedData];
};

const getContract = _ref => {
  let {
    addressOrName,
    contractInterface,
    signerOrProvider
  } = _ref;
  return new Contract(addressOrName, contractInterface, signerOrProvider);
};

const useContract = _ref2 => {
  let {
    addressOrName,
    contractInterface,
    signerOrProvider
  } = _ref2;
  return React.useMemo(() => {
    return getContract({
      addressOrName,
      contractInterface,
      signerOrProvider
    });
  }, [addressOrName, contractInterface, signerOrProvider]);
};

const useContractEvent = function (contractConfig, eventName, listener) {
  let {
    once
  } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const provider = useProvider();
  const webSocketProvider = useWebSocketProvider();
  const contract = useContract({
    signerOrProvider: webSocketProvider !== null && webSocketProvider !== void 0 ? webSocketProvider : provider,
    ...contractConfig
  });
  const listenerRef = React.useRef(listener);
  listenerRef.current = listener;
  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    const handler = function () {
      for (var _len = arguments.length, event = new Array(_len), _key = 0; _key < _len; _key++) {
        event[_key] = arguments[_key];
      }

      return listenerRef.current(event);
    };

    const contract_ = contract;
    if (once) contract_.once(eventName, handler);else contract_.on(eventName, handler);
    return () => {
      contract_.off(eventName, handler);
    };
  }, [contract, eventName]);
  /* eslint-enable react-hooks/exhaustive-deps */
};

const initialState$4 = {
  loading: false
};
const useContractRead = function (contractConfig, functionName) {
  let {
    args,
    overrides,
    skip,
    watch
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const cacheBuster = useCacheBuster();
  const provider = useProvider();
  const contract = useContract({
    signerOrProvider: provider,
    ...contractConfig
  });
  const [{
    data: blockNumber
  }] = useBlockNumber({
    skip: true,
    watch
  });
  const [state, setState] = React.useState(initialState$4);
  const cancelQuery = useCancel();
  const read = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        args,
        overrides
      };
      const params = [...(Array.isArray(config_.args) ? config_.args : config_.args ? [config_.args] : []), ...(config_.overrides ? [config_.overrides] : [])];
      setState(x => ({ ...x,
        error: undefined,
        loading: true,
        response: undefined
      }));
      const response = await contract[functionName](...params);

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false,
          response
        }));
      }

      return {
        data: response,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [args, cancelQuery, contract, functionName, overrides]);
  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip) return;
    read();
    return cancelQuery;
  }, [cacheBuster, cancelQuery, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!watch) return;
    if (!blockNumber) return;
    read();
    return cancelQuery;
  }, [blockNumber, cancelQuery, watch]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.response,
    error: state.error,
    loading: state.loading
  }, read];
};

const initialState$3 = {
  loading: false
};
const useContractWrite = function (contractConfig, functionName) {
  let {
    args,
    overrides
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const contract = useContract(contractConfig);
  const [state, setState] = React.useState(initialState$3);
  const cancelQuery = useCancel();
  const write = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        args,
        overrides
      };
      if (!connector) throw new ConnectorNotFoundError();
      const params = [...(Array.isArray(config_.args) ? config_.args : config_.args ? [config_.args] : []), ...(config_.overrides ? [config_.overrides] : [])];
      setState(x => ({ ...x,
        error: undefined,
        loading: true,
        response: undefined
      }));
      const signer = await connector.getSigner();
      const contract_ = contract.connect(signer);
      const response = await contract_[functionName](...params);

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false,
          response
        }));
      }

      return {
        data: response,
        error: undefined
      };
    } catch (error_) {
      let error = error_;
      if (error_.code === 4001) error = new UserRejectedRequestError();

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [args, cancelQuery, connector, contract, functionName, overrides]);
  return [{
    data: state.response,
    error: state.error,
    loading: state.loading
  }, write];
};

const initialState$2 = {
  loading: false
};
const useToken = function () {
  let {
    address,
    formatUnits = 'ether',
    skip
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const provider = useProvider();
  const [state, setState] = React.useState(initialState$2);
  const cancelQuery = useCancel();
  const getToken = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      var _config_$formatUnits;

      const config_ = config !== null && config !== void 0 ? config : {
        address,
        formatUnits
      };
      if (!config_.address) throw new Error('address is required');
      const contract = new ethers.Contract(config_.address, erc20ABI, provider);
      const formatUnits_ = (_config_$formatUnits = config_.formatUnits) !== null && _config_$formatUnits !== void 0 ? _config_$formatUnits : 'ether';
      setState(x => ({ ...x,
        error: undefined,
        loading: true
      }));
      const [symbol, decimals, totalSupply] = await Promise.all([contract.symbol(), contract.decimals(), contract.totalSupply()]);
      const token = {
        address: config_.address,
        decimals,
        symbol,
        totalSupply: {
          formatted: utils.formatUnits(totalSupply, formatUnits_),
          value: totalSupply
        }
      };

      if (!didCancel) {
        setState(x => ({ ...x,
          token,
          loading: false
        }));
      }

      return {
        data: token,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [address, cancelQuery, formatUnits, provider]);
  const watchToken = React.useCallback(async token => {
    if (!(connector !== null && connector !== void 0 && connector.watchAsset)) return false;

    try {
      await connector.watchAsset(token);
      return true;
    } catch (error) {
      return error;
    }
  }, [connector]);
  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !address) return;
    getToken({
      address,
      formatUnits
    });
    return cancelQuery;
  }, [address, cancelQuery, formatUnits, skip]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.token ? { ...state.token,
      address
    } : undefined,
    error: state.error,
    loading: state.loading
  }, watchToken, getToken];
};

const initialState$1 = {
  loading: false
};
const useTransaction = function () {
  let {
    request
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    state: {
      connector
    }
  } = useContext();
  const [state, setState] = React.useState(initialState$1);
  const cancelQuery = useCancel();
  const sendTransaction = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        request
      };
      if (!config_.request) throw new Error('request is required');
      if (!connector) throw new ConnectorNotFoundError();
      setState(x => ({ ...x,
        loading: true
      }));
      const signer = await connector.getSigner();
      const transaction = await signer.sendTransaction(config_.request);

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false,
          transaction
        }));
      }

      return {
        data: transaction,
        error: undefined
      };
    } catch (error_) {
      let error = error_;
      if (error_.code === 4001) error = new UserRejectedRequestError();

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, connector, request]);
  return [{
    data: state.transaction,
    error: state.error,
    loading: state.loading
  }, sendTransaction];
};

const initialState = {
  loading: false
};
const useWaitForTransaction = function () {
  let {
    confirmations,
    hash,
    skip,
    timeout,
    wait: wait_
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const provider = useProvider();
  const [state, setState] = React.useState(initialState);
  const cancelQuery = useCancel();
  const wait = React.useCallback(async config => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    try {
      const config_ = config !== null && config !== void 0 ? config : {
        confirmations,
        hash,
        timeout,
        wait: wait_
      };
      if (!config_.hash && !config_.wait) throw new Error('hash or wait is required');
      let promise; // eslint-disable-next-line testing-library/await-async-utils

      if (config_.wait) promise = config_.wait(config_.confirmations);else if (config_.hash) promise = provider.waitForTransaction(config_.hash, config_.confirmations, config_.timeout);else throw new Error('hash or wait is required');
      setState(x => ({ ...x,
        loading: true
      }));
      const receipt = await promise;

      if (!didCancel) {
        setState(x => ({ ...x,
          loading: false,
          receipt
        }));
      }

      return {
        data: receipt,
        error: undefined
      };
    } catch (error_) {
      const error = error_;

      if (!didCancel) {
        setState(x => ({ ...x,
          error,
          loading: false
        }));
      }

      return {
        data: undefined,
        error
      };
    }
  }, [cancelQuery, confirmations, hash, provider, timeout, wait_]); // Fetch balance when deps or chain changes

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (skip || !hash && !wait_) return;
    /* eslint-disable testing-library/await-async-utils */

    wait({
      confirmations,
      hash,
      timeout,
      wait: wait_
    });
    /* eslint-enable testing-library/await-async-utils */

    return cancelQuery;
  }, [cancelQuery, hash, skip, wait_]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return [{
    data: state.receipt,
    error: state.error,
    loading: state.loading
  }, wait];
};

const Context = /*#__PURE__*/React.createContext(null);
const Provider = _ref => {
  var _state$data2, _state$data2$chain, _state$data4, _state$data4$chain, _state$data6, _state$data6$chain;

  let {
    autoConnect = false,
    children,
    connectors: connectors_ = [new InjectedConnector()],
    connectorStorageKey = 'wagmi.wallet',
    provider: provider_ = getDefaultProvider(),
    webSocketProvider: webSocketProvider_
  } = _ref;
  const [lastUsedConnector, setLastUsedConnector] = useLocalStorage(connectorStorageKey);
  const [state, setState] = React.useState({
    cacheBuster: 1,
    connecting: autoConnect
  });
  const connectors = React.useMemo(() => {
    var _state$data, _state$data$chain;

    if (typeof connectors_ !== 'function') return connectors_;
    return connectors_({
      chainId: (_state$data = state.data) === null || _state$data === void 0 ? void 0 : (_state$data$chain = _state$data.chain) === null || _state$data$chain === void 0 ? void 0 : _state$data$chain.id
    });
  }, [connectors_, (_state$data2 = state.data) === null || _state$data2 === void 0 ? void 0 : (_state$data2$chain = _state$data2.chain) === null || _state$data2$chain === void 0 ? void 0 : _state$data2$chain.id]);
  const provider = React.useMemo(() => {
    var _state$data3, _state$data3$chain;

    if (typeof provider_ !== 'function') return provider_;
    return provider_({
      chainId: (_state$data3 = state.data) === null || _state$data3 === void 0 ? void 0 : (_state$data3$chain = _state$data3.chain) === null || _state$data3$chain === void 0 ? void 0 : _state$data3$chain.id,
      connector: state.connector
    });
  }, [provider_, (_state$data4 = state.data) === null || _state$data4 === void 0 ? void 0 : (_state$data4$chain = _state$data4.chain) === null || _state$data4$chain === void 0 ? void 0 : _state$data4$chain.id, state.connector]);
  const webSocketProvider = React.useMemo(() => {
    var _state$data5, _state$data5$chain;

    if (!webSocketProvider_) return undefined;
    if (typeof webSocketProvider_ !== 'function') return webSocketProvider_;
    return webSocketProvider_({
      chainId: (_state$data5 = state.data) === null || _state$data5 === void 0 ? void 0 : (_state$data5$chain = _state$data5.chain) === null || _state$data5$chain === void 0 ? void 0 : _state$data5$chain.id,
      connector: state.connector
    });
  }, [webSocketProvider_, (_state$data6 = state.data) === null || _state$data6 === void 0 ? void 0 : (_state$data6$chain = _state$data6.chain) === null || _state$data6$chain === void 0 ? void 0 : _state$data6$chain.id, state.connector]); // Attempt to connect on mount

  /* eslint-disable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    if (!autoConnect) return;

    (async () => {
      setState(x => ({ ...x,
        connecting: true
      }));
      const sorted = lastUsedConnector ? [...connectors].sort(x => x.name === lastUsedConnector ? -1 : 1) : connectors;

      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue;
        const isAuthorized = await connector.isAuthorized();
        if (!isAuthorized) continue;
        const data = await connector.connect();
        setState(x => ({ ...x,
          connector,
          data
        }));
        break;
      }

      setState(x => ({ ...x,
        connecting: false
      }));
    })();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  // Make sure connectors close

  React.useEffect(() => {
    return () => {
      if (!state.connector) return;
      state.connector.disconnect();
    };
  }, [state.connector]); // Watch connector for events

  React.useEffect(() => {
    if (!state.connector) return;

    const onChange = data => setState(x => ({ ...x,
      cacheBuster: x.cacheBuster + 1,
      data: { ...x.data,
        ...data
      }
    }));

    const onDisconnect = () => setState({
      cacheBuster: 1
    });

    const onError = error => setState(x => ({ ...x,
      error
    }));

    state.connector.on('change', onChange);
    state.connector.on('disconnect', onDisconnect);
    state.connector.on('error', onError);
    return () => {
      if (!state.connector) return;
      state.connector.off('change', onChange);
      state.connector.off('disconnect', onDisconnect);
      state.connector.off('error', onError);
    };
  }, [state.connector]);
  const value = {
    state: {
      cacheBuster: state.cacheBuster,
      connecting: state.connecting,
      connectors,
      connector: state.connector,
      data: state.data,
      provider,
      webSocketProvider
    },
    setState,
    setLastUsedConnector
  };
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value
  }, children);
};
const useContext = () => {
  const context = React.useContext(Context);
  if (!context) throw Error('Must be used within Provider');
  return context;
};

export { Context, Provider, Provider as WagmiProvider, useAccount, useBalance, useBlockNumber, useConnect, useContext, useContract, useContractEvent, useContractRead, useContractWrite, useEnsAvatar, useEnsLookup, useEnsResolveName, useEnsResolver, useFeeData, useNetwork, useProvider, useSignMessage, useSignTypedData, useSigner, useToken, useTransaction, useWaitForTransaction, useWebSocketProvider };
