// Thirdweb components & contracts
import { useAddress, useMetamask, useEditionDrop, useToken, useVote } from "@thirdweb-dev/react";
import { useState, useEffect, useMemo } from 'react';
import { AddressZero } from "@ethersproject/constants";
import './DAO.css';
import './DAOFramework.css'

// Thirdweb contract
const DAOFramework = ({ accounts, setAccounts }) => {
    const sdk = new ThirdwebSDK("rinkeby");

    const isConnected = Boolean(accounts[0]);
    const address = useAddress();

    // NFT address metadata
    const editionDropAddress = "0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC";
    const editionDrop = useEditionDrop("0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC");
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

    // Token metadata
    const tokenAddress = "0xe850E4a40F8F1B666C3AC21e7f51e6279cA0af7E";
    const token = useToken("0xe850E4a40F8F1B666C3AC21e7f51e6279cA0af7E");
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([]); // Holds the number of token each member has in state
    const [memberAddresses, setMemberAddresses] = useState([]); // Array holding all the holders' addresses

    // Vote [token] metadata
    const voteAddress = "0xCD2Bf092ce9E051360b649D038c9ecf5b54D203e";
    const vote = useVote("0xCD2Bf092ce9E051360b649D038c9ecf5b54D203e");
    const [proposals, setProposals] = useState([]);
    const [isVoting, setIsVoting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    const shortenAddress = (str) => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    };
    const shortenAddressMore = (str) => {
        return str.substring(0, 4) + ".." + str.substring(str.length - 2);
    };

    // Get the address of all holders
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllAddresses = async () => {
            try {
                const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
                setMemberAddresses(memberAddresses);
                console.log("Holder addresses: ", memberAddresses);
            } catch (error) {
                console.log("failed to get member list: ", error);
            }
        };
        getAllAddresses();
    }, [hasClaimedNFT, editionDrop.history]);

    // Find the number of tokens each member holds
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        const getAllBalances = async () => {
            try {
                const amounts = await token.history.getAllHolderBalances();
                setMemberTokenAmounts(amounts);
                console.log("Member balances: ", amounts);
            } catch (error) {
                console.error("Failed to get member balances: ", error);
            }
        };
        getAllBalances();
    }, [hasClaimedNFT, token.history]);

    // Retrieve all existing proposals form the voting/governance contract
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        // Call to grab the proposals
        const getAllProposals = async () => {
            try {
                const proposals = await vote.getAll();
                setProposals(proposals);
            } catch (error) {
                console.error("Failed to get proposals: ", error);
            }
        };
        getAllProposals();
    }, [hasClaimedNFT, vote]);

    // Has the user already voted?
    useEffect(() => {
        if (!hasClaimedNFT) {
            return;
        }

        if (!proposals.length) {
            return; // There aren't any proposals in state (either they haven't been deployed or they haven't retrieved)
        }

        const checkIfUserHasVoted = async () => {
            try {
                const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
                setHasVoted(hasVoted);
                if (hasVoted) {
                    console.log("user has already voted")
                } else {
                    console.log('user has not voted yet')
                }
            } catch (error) {
                console.error("Failed to check if wallet has voted: ", error);
            }
        };
        checkIfUserHasVoted();
    }, [hasClaimedNFT, proposals, address, vote])

    // Combine the addresses & token amounts into one array
    const memberList = useMemo(() => {
        return memberAddresses.map((address) => {
            // Find the address in the token holders' array
            const member = memberTokenAmounts?.find(({ holder }) => holder === address);

            return {
                address,
                tokenAmount: member?.balance.displayValue || "0", // If someone has an NFT but not tokens, they get a "0" value [for their tokens]
            }
        });
    }, [memberAddresses, memberTokenAmounts]);

    // Check if the user has a membership NFT in their wallet
    useEffect(() => {
        if (!address) { // If the user hasn't connected a/their wallet
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0);
                if (balance.gt(0)) { // If they have the index 0 of the nft drop
                    setHasClaimedNFT(true);
                    console.log("This user has a membership NFT!");
                } else {
                    setHasClaimedNFT(false);
                    console.log("This user doesn't have a membership NFT yet");
                }
            } catch (error) {
              setHasClaimedNFT(false);
              console.log("Failed to get balance: ", error);
            }
        };
        checkBalance();
    }, [address, editionDrop]);

    // Original NFT minting application/component
    const mintNft = async () => {
        try {
            setIsClaiming(true);
            await editionDrop.claim("0", 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
            setHasClaimedNFT(true);
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("Failed to mint NFT: ", error);
        } finally {
            setIsClaiming(false);
        }
    };
}

export default DAOFramework;