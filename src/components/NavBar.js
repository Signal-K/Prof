import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "../assets/social-media-icons/facebook_32x32.png";
import Twitter from "../assets/social-media-icons/twitter_32x32.png";
import Email from "../assets/social-media-icons/email_32x32.png";
import Github from "../assets/social-media-icons/github.png";
import Documentation from "../assets/social-media-icons/documentation.png";
import Keybase from "../assets/social-media-icons/keybase.png";

const NavBar = ({ accounts, setAccounts }) => {
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

    return (
        <Flex justify="space-between" align="center" padding="30px">
            {/*Left side of navbar */}
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="keybase://chat/signalkinetics#general/41">
                    <Image src={Keybase} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://docs.skinetics.tech/whitepaper" target="_blank">
                    <Image src={Documentation} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://github.com/signal-k" target="_blank">
                    <Image src={Github} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex> {/*Github, Dribbble, Deviantart??? Opensea*/}
            
            {/* Right side of navbar */}
            <Flex
                justify="space-around"
                align="center"
                width="40%"
                padding="30px 30px 30px 30px"
            >
                <Link style={{ textDecoration: 'none' }} color="#ffffff" href="mailto:liam@skinetics.tech" target="_blank">
                    <Box margin="0 15px">Contact</Box>
                </Link>
                <Spacer />

                <Link style={{ textDecoration: 'none' }} color="#ffffff" href="https://docs.skinetics.tech/whitepaper" target="_blank">
                    <Box margin="0 15px">Whitepaper</Box>
                </Link>
                <Spacer />
                 

                {/* Connected */} {/* If connected, add Memberstack login for docs */}
                {isConnected ? ( // Insert custom links for team members if logged in with the correct tokens
                <Flex
                    justify="space-around"
                    align="center"
                    width="40%"
                    padding="30px 30px 30px 30px"
                >
                    <Link style={{ textDecoration: 'none' }} color="#ffffff" href="https://dao.emulsion.space" target="_blank">
                        <Box margin="0 15px">Enter the DAO</Box>
                    </Link>
                    <Spacer />

                    <Box margin="0 15px">Connected</Box>
                </Flex>
                    
                    
                    /*<Link href="">
                    
    </Link>*/
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
                    onClick={connectAccount}>Connect</Button>
                )}
            </Flex>
        </Flex>
    )
}

export default NavBar;