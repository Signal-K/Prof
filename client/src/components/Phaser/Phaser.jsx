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

let game = null;

function PhaserApp() {
    const { authenticate, isAuthenticated, isAuthenticating, logout } =
        useMoralis();
    const [loaded, setLoaded] = useState(false);

    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({ signingMessage: "Log in with Moralis" })
                .then(function (user) {
                    console.log("logged in user: ", user);
                    console.log(user?.get("ethAddress"));
                    startGame();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const logOut = async () => {
        await logout();
        console.log("logged out user");
    };

    if (!loaded) {
        setLoaded(true);
        // Phaser game configuration
        const config = {
            type: Phaser.AUTO,
            parent: "game-container",
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            autoFocus: true,
            fps: {
                target: 60,
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 200 },
                    debug: false,
                },
            },
            backgroundColor: "#282c34",
            scale: {
                mode: Phaser.Scale.ScaleModes.NONE,
            },
            scene: [Boot, Preloader, MainMenu, MainGame],
        };

        // Initialise the Phaser Canvas
        if (game === null) {
            game = new Phaser.Game(config);
        }
    }
    return (
        <div className="PhaserApp">
            <header className='Phaser-header'>
                
            </header>
        </div>
    );
}

export default PhaserApp;