import './form.css';
import { useEffect, useState } from 'react';
import NFTContainer from "./NFTContainer";

// Imports for thirdweb & moralis (for connect wallet), also what is in github/gizmotronn/mint

var accounts;
function SearchForm() {
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            var accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); // add user.issuer from profile.js
            setWalletAddress(accounts[0]);
            console.log(accounts[0])
        }
    }

    // Use the Rarible API to fetch the user's mainnet Eth NFTs (even those not on Rarible)
    const getNftData = async () => {
        // Check to ensure wallet address is being set
        if(!walletAddress) return;

        // If the user is authenticated
        const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${walletAddress}`);
        const data = await response.json();
        console.log(data);
        //debugger

        // Testing with a confirmed wallet
        const confirmedResponse = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0xCdc5929e1158F7f0B320e3B942528E6998D8b25c`);
        const confirmedData = await confirmedResponse.json();
        console.log(confirmedData); // Even works with polygon mainnet!
    }

    // Every time the user's wallet address changes/is added, fetch their NFTs
    useEffect(() => {
        getNftData();
    }, [walletAddress])

    return (
        <div className="SearchForm">
            <div className='text'>
                Account {walletAddress}:
            </div>
            <button className='connect-button' onClick={connectWallet}>
                Connect Wallet
            </button>
            <NFTContainer />
        </div>
    );
}

export default SearchForm;
export const walletAccount = accounts;

// Buildspace nft game -> make it fun for members as a minigame?