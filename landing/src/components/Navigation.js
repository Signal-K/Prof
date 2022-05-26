import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import Button from "./Button";

const Section = styled.section`
width: 100xw;
background-color: ${props => props.theme.body};
`

const NavBar = styled.nav`
display: flex;
justify-content: space-between;
align-items: center;

width: 85%;
height: ${props => props.theme.navHeight};
margin: 0 auto;
`

const Menu = styled.ul`
display: flex;
justify-content: space-between;
align-items center;
list-style:none;
`

const MenuItem = styled.ul`
margin: 0 1rem;
color: ${props => props.theme.text};
cursor: pointer;

&::after{
    content: ' ';
    display: block;
    width: 0%;
    height: 2px;
    background: ${props => props.theme.text};
    transition: width 0.3s ease;
}
&:hover::after{
    width: 100%;

}
`

const Navigation = () => {
    return (
        <Section>
            <NavBar>
                <Logo />
                <Menu>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>About</MenuItem>
                    <MenuItem>Showcase</MenuItem>
                    <MenuItem>Team</MenuItem>
                    <MenuItem>FAQ</MenuItem>
                </Menu>
                <Button text="Connect Wallet" link="#">Connect wallet</Button>
            </NavBar>
        </Section>
    )
}

export default Navigation;