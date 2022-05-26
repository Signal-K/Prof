import React from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import Button from './Button';

const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;

  span {
    text-transform: uppercase;
    font-family: "Akaya Telivigala", cursive;
  }
  .text-1{
      color: blue;
  }
  .text-2{
      color: orange;
  }
  .text-3{
      color: red;
  }

  @media (max-width: 70em) {
    font-size: ${(props) => props.theme.fontxl};

  }
  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
  @media (max-width: 40em){
    width: 90%;
  }  
`;

const SubTitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${props => `rgba(${props.theme.textRgba}, 0.6)`};
  font-weight:600;
  margin-bottom: 1rem;
  width: 80%;
  align-self: flex-start;

  @media (max-width: 40em) {
    font-size: ${(props) => props.theme.fontmd};

  }

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;
  }
  
`

const ButtonContainer = styled.div`
 width: 80%;
  align-self: flex-start;

  @media (max-width: 48em) { 
    align-self: center;
    text-align:center;

    button{
      margin: 0 auto;
    }
  }

`

const TypeWriterText = () => {
    return (
        <>
        <Title>
            Discover the Star Sailor 
            <Typewriter
                options={{
                    autoStart: true,
                    loop: true,
                }}
                onInit={(typewriter) => {
                    typewriter.typeString('<span class="text-1">Within you</span>')
                        .callFunction(() => {
                            console.log('String typed out!');
                        })  
                        .pauseFor(2500)
                        .deleteAll()
                        //.pauseFor(2000)
                        //.typeString('Part Two, text 2 span')
                        .callFunction(() => {
                            console.log('All strings were deleted!');
                        })
                        .start();
                }}
            />
        </Title>
        <SubTitle>More than an investment, Star Sailors is an adventure </SubTitle>
        <ButtonContainer>
            <Button text="Explore" link="#home" />
        </ButtonContainer>
    </>
    )
}

export default TypeWriterText;