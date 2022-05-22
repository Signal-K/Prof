"use strict";
exports.__esModule = true;
var React = require("react");
var react_query_1 = require("react-query");
var react_1 = require("@chakra-ui/react");
var react_hot_toast_1 = require("react-hot-toast");
var theme_1 = require("../theme");
var wagmi_1 = require("wagmi");
var ethers_1 = require("ethers");
// Provider that will be used when no wallet is connected (aka no signer)
var provider = ethers_1.providers.getDefaultProvider("http://localhost:8545");
// Create a react-query client
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    },
    queryCache: new react_query_1.QueryCache({
        onError: function () {
            react_hot_toast_1.toast.error("Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to.");
        }
    })
});
var App = function () {
    return (<wagmi_1.Provider autoConnect provider={provider}>
      <react_1.ChakraProvider theme={theme_1["default"]}>
        <react_query_1.QueryClientProvider client={queryClient}>
          <react_1.Box p={8} maxW="600px" minW="320px" m="0 auto">
            <react_1.Heading>Oops, no comments yet!</react_1.Heading>
            <react_hot_toast_1.Toaster position="bottom-right"/>
          </react_1.Box>
        </react_query_1.QueryClientProvider>
      </react_1.ChakraProvider>
    </wagmi_1.Provider>);
};
exports["default"] = App;
