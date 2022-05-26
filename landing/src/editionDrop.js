import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import { useAddress, useMetamask, useEditionDrop, useToken, useVote } from "@thirdweb-dev/react";

const editionDrop = ({ accounts, setAccounts }) => {
    //const isConnected = Boolean(accounts[0]);
    const address = useAddress();

    // NFT address metadata
    const editionDropAddress = "0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC";
    const editionDrop = useEditionDrop("0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC");
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false); // state variable - does the user have the nft in their connected wallet?

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

    // Get all the addresses of holders
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllAddresses = async () => {
        try {
            const memberAddresses = await editionDrop.history.getAllClaimerAddresses(0);
            setMemberAddresses(memberAddresses);
            console.log("DAO Members addresses: ", memberAddresses);
        } catch (error) {
            console.error("failed to get member list: ", error);
        }
    };
    getAllAddresses();
    }, [hasClaimedNFT, editionDrop.history]);

    // The number of tokens each member holds
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log("Amounts: ", amounts);
      } catch (error) {
        console.error("failed to get member balances -> ", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token.history]);

  // Retrieve all existing proposals from the voting/governance contract
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    } 
 
    // Call to grab the proposals
    const getAllProposals = async ()=> {
      try {
        const proposals = await vote.getAll();
        setProposals(proposals);
      } catch (error) {
        console.log("failed to get proposals: ", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  // Check to see if the user has already voted
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;  
    }

    if (!proposals.length) {
      return; // If there are no proposals in state (i.e. because they haven't been/finished retrieved)
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote.hasVoted(proposals[0].proposalId, address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("User has already voted");
        } else {
          console.log("User has not voted yet")
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted: ", error);
      }
    };
    checkIfUserHasVoted();
  }, [hasClaimedNFT, proposals, address, vote])

  // Combine addresses & their token amounts into one array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      // Find the address in the token holders' array
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);

      return {
        address,
        tokenAmount: member?.balance.displayValue || "0", // If someone has an NFT but no tokens, they automatically get a "0"
      }
    });
  }, [memberAddresses, memberTokenAmounts]);

  useEffect(() => {
    if (!address) {
      return; // exit the process if the user hasn't connected a/their wallet
    }

    const checkBalance = async () => {
      try {
        const balance = await editionDrop.balanceOf(address, 0);
        if (balance.gt(0)) { // If they have the index 0 of the nft drop (i.e. the first nft added to the "editionDrop")
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

  /*
  Original NFT minting application - this is being replaced in MainMint.js

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

  */
}

export default editionDrop;