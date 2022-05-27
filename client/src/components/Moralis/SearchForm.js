import './form.css';
import { useState } from 'react';
import NFTContainer from "./NFTContainer";

// Imports for thirdweb & moralis (for connect wallet), also what is in github/gizmotronn/mint

var accounts;
function SearchForm() {
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            var accounts = await window.ethereum.request({ method: "eth_requestAccounts" }); // add user.issuer from profile.js
            setWalletAddress(accounts[0]);
        }
    }

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