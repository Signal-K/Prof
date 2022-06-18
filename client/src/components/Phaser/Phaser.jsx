import Phaser from "phaser";
import Boot from "./scenes/Boot.js";
import Preloader, { authEvents, AUTH } from "./scenes/Preloader.js";
import MainMenu, { nftEvents, LOAD_NFT } from "./scenes/MainMenu.js";
import MainGame from "./scenes/Game.js";
import { useState, useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";

import {
    useMoralis,
    useMoralisWeb3Api,
    useMoralisWeb3ApiCall,
    useNFTBalances,
  } from "react-moralis";

function PhaserApp() {
    return (
        <div className="PhaserApp">
            <header className='Phaser-header'>
                
            </header>
        </div>
    );
}

export default PhaserApp;