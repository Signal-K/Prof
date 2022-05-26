/*import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Phaser from 'phaser';
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNFTBalances, } from "react-moralis";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";

let game = null;
const initState =  { players: [], score: 0, gameOver: false }; // game state management
export const GET_PLAYERS = "GET_PLAYERS";
export const LOGIN_PLAYER = "LOGIN_PLAYER";
export const UPDATE_SCORE = "UPDATE_SCORE";
export const GAME_OVER = "GAME_OVER";

// Reducer
function reducer(state = initState, action) {
    switch (action.type) {
      case GET_PLAYERS:
        return { ...state, players: action.players };
      case LOGIN_PLAYER:
        game.events.emit("LOGIN_PLAYER", "Check block at time of game over");
        return { ...state, players: [...state.players, action.player] };
      case UPDATE_SCORE:
        return { ...state, score: action.score };
      case GAME_OVER:
        // emit Phaser game event to trigger on-chain [action]
        game.events.emit("BLOCK_CHECK", "Check Block at Time of Game Over");
        return { ...state, gameOver: true};
      default:
        return state;
    }
}
// Redux
export const events = createStore(
    reducer,
    applyMiddleware(thunkMiddleware, createLogger())
)

const PhaserLoad = ({ accounts, setAccounts }) => { // was originally function PhaserLoad() {
  const { authenticate, isAuthenticated, isAuthenticating, user, logout } = 
    useMoralis();
  const [loaded, setLoaded] = useState(false);
  const [block, setBlock] = useState("100000");

  // Test connection to a connected chain
  const Web3Api = useMoralisWeb3Api();
  const { fetch, data } = useMoralisWeb3ApiCall(Web3Api.native.getBlock, {
    block_number_or_hash: block,
  });

  // update feedback on re-renders
  useEffect(() => {
    if (data) {
      console.log("BLOCK DATE: ", data);
    } if (user) {
      console.log(user);
    }
  }, [data, user]);

  function startGame(_user) {
    // Communicate to Phaser [from Moralis] that player is authenticated
    authEvents.dispatch({ type: AUTH, player: _user });
  }

  const { getNFTBalances } = useNFTBalances(); // Declare the function that grabs NFTs from a user's wallet
  // Declare contract address for the player -> only allow access to the game if the player has an nft from the collection (specific nft address id?)
  const check_address = "";
  const network_chain_id = ""; // Is this the id of the nft (in the collection) or the network id (like Rinkeby/4, Mainnet/1, etc)

  const nftMetadata = [];
  const findNftMetadata = async (__data) => {
    let p = 0;
    for (let i = 0; i < __data.length; i++) {
      console.log(__data[i].token_address);
      if (__data[i].token_address === check_address) {
        console.log(__data[i].token_uri);
        nftMetadata[p] = __data[i].token_uri;
        p++;
      }
    }
  };

  let demoNFTimageURL = "";
  const getJSON = async (_metadata) => {
    try { // Grab remote json file (likely from IPFS)
      await axios.get(_metadata).then((res) => {
        console.log("Initial image URL: ", res.data?.image);
        demoNFTimageURL = res.data?.image;
        if (demoNFTimageURL.match("moralis")) { // If the image already has a moralis ipfs link -> skip further processing
        } else {
          let imageSplit = res.data?.image.split("/");
          console.log("IMAGE CID: ", res.data?.image.split("/"));
          demoNFTimageURL = 
            "https://ipfs.moralis.io:2053/ipfs/" + 
            imageSplit[2] + 
            "/" +
            imageSplit[3];
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const compileNFT = async (__user, __data) => {
    await findNFTMetadata(__data);
    await getJSON(nftMetadata[0]); // first nft in the collection?
    console.log("Final NFT image URL: ", demoNFTimageURL);

    if (demoNFTimageURL === "") {
    } else {
      // valid NFT holders can play
      nftEvents.dispatch({ type: LOAD_NFT, nft: demoNFTimageURL });
      // start game and change the scene in Phaser
      startGame(__user, demoNFTimageURL);
    }
  };
}

export default PhaserLoad;*/