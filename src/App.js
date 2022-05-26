import './App.css';
import { useState, useEffect, useMemo } from 'react';
import MainMint from './components/MainMint';
import NavBar from './components/NavBar';

// Comments imports
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading, Button } from '@chakra-ui/react';
import { Toaster, toast } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { providers } from 'ethers';

// Thirdweb & contract components
import { useAddress, useMetamask, useEditionDrop, useToken, useVote, useNetwork } from '@thirdweb-dev/react';
import { ChainId } from '@thirdweb-dev/sdk';
import { AddressZero } from "@ethersproject/constants";
//import editionDrop from "./editionDrop";

// NFT Display
// import CharacterGallery from ./components/CharacterGallery;

// Minigame components
import Phaser from 'phaser';
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNFTbalances, } from "react-moralis";
import PhaserLoad from './components/PhaserLoad';
//import PhaserLoad from './components/PhaserLoad';

// Commenting components
const provider = providers.getDefaultProvider("http://localhost:8545");
// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        "Network Error: Ensure Metamask is connected to the same network that your contract is deployed to."
      );
    },
  }),
});


function App() {
  // Thirdweb components
  const editionDropAddress = "0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC";
  //const editionDrop = useEditionDrop("0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC");
  // Initialise the token contract
  const tokenAddress = "0xe850E4a40F8F1B666C3AC21e7f51e6279cA0af7E";
  //const token = useToken("0xe850E4a40F8F1B666C3AC21e7f51e6279cA0af7E");
  //const memberAddressEtherscan = "https://rinkeby.etherscan.io/address" + member.address;
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };
  const shortenAddressMore = (str) => {
    return str.substring(0, 4) + ".." + str.substring(str.length - 2);
  }
  // Vote token contract
  const voteAddress = "0xCD2Bf092ce9E051360b649D038c9ecf5b54D203e";
  //const vote = useVote("0xCD2Bf092ce9E051360b649D038c9ecf5b54D203e");

  // Moralis Components


  // Original minting components
  const [accounts, setAccounts] = useState([]); // Any updates on the frontend (ui) -> use useState to update the value on the frontend (e.g. when the user logins/authenticates)

  const isConnected = Boolean(accounts[0]); // Address of wallet that is connected

  async function connectAccount() {
      if (window.ethereum) {
          const accounts = await window.ethereum.request({    
              method: "eth_requestAccounts", // Give all the accounts that exist in the user's metamask extension
          });
          console.log(accounts);
          setAccounts(accounts);
      }
  }

  useEffect(() => {
    document.title = "Star Sailors Mint";  
  }, []);

  return (
    <WagmiProvider autoConnect provider={provider}>
      <div className="overlay">
      <div className="App">
        <NavBar accounts={accounts} setAccounts={setAccounts} />
        <MainMint accounts={accounts} setAccounts={setAccounts} />

        {/* Commenting tool */}
        { isConnected ? (
          <QueryClientProvider client={queryClient}>
            <Box p={8} maxW="600px" minW="320px" m="0 auto">
              {/*
              <Comments topic="my-blog-post" /> // -> Set up headless CMS with automated Comments tag for each post
              <Toaster position="bottom-right" />
              */}
            </Box>
          </QueryClientProvider>
        ) : (
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit" 
            padding="15px"
            margin="0 15px"
              onClick={connectAccount}>
                Connect
          </Button>
        )}

        {/* Create a new component that only shows if the user has the NFT in their wallet 
        How about disabling components on mobile devices? -> Start thinking about a mobile design 
        { isConnected ? (
          <PhaserLoad accounts={accounts} setAccounts={setAccounts} />
          // Allow the users to comment on the NFT collection
          // Show the user's NFTs from the collection -> e.g. commenting on specific nfts, the multiplayer battles, etc
          // https://skinetics.notion.site/NFT-Drop-c9cabbaf202d46e9bf79e271b9be0b55

          // Notification section -> web3 notifications? One signal?
        ) : (
          <div>
            
          </div>
        )}*/}
      </div>
      <div className="moving-background"></div>
    </div>
    </WagmiProvider>
  );
}

export default App;
