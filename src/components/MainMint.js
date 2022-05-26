import { useState } from "react";
import { ethers, BigNumber } from 'ethers';
import roboPunksNFT from '../RoboPunksNFT.json'; // Grab the ABI from the contract
import WristbandNFT from '../WristbandNFT.json';
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";

const roboPunksNFTAddress = "0xA0Ba4E895447770cBf0ff998d3DBa0a08496CE90";
//const roboPunksNFTAddress = "0xd4F18cF04B9C74d5B69775BBfFbf433Ff24D8dbC";

const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum); // Provides ethers to connect to the blockchain
            const signer = provider.getSigner();
            const contract = new ethers.Contract( // Use contract functions
                roboPunksNFTAddress,
                //WristbandNFT.abi,
                roboPunksNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => { // This function is run when the "minus" button is hit on the mint component
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1); // Handle the button if the option is not set to equal to or below 1 (from above line)
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return; // The user shouldn't be allowed to mint more than 3 tokens at a time, per wallet, according to the contract [abi]
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">Star Sailors</Text>
                    <Text
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >
                        Preorder Star Sailors characters, items and components here
                    </Text>
                </div>

                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                            onClick={handleDecrement}>-</Button>
                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                            type="number" value={mintAmount} />
                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="10px"
                            onClick={handleIncrement}>+</Button>
                         </Flex>
                        <Button
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                        onClick={handleMint}>Mint now</Button>
                    </div>
                ) : ( // If not connected
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#d6517D"
                    >You must be connected to mint</Text>
                )}
            </Box>
        </Flex>
    );
};

export default MainMint;