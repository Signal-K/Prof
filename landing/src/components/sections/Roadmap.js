import React from 'react';
import styled from 'styled-components';
import DrawSvg from './Roadmap/DrawSvg';

const Section = styled.section`
    min-height: 100vh;
    width: 100vw;
    background-color: ${props => props.theme.body};
    position: relative;
`

const Title = styled.h2`
    font-size: ${(props) => props.theme.fontxxl};
    text-transform: capitalize;
    color: ${(props) => props.theme.text};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    border-bottom: 2px solid ${(props) => props.theme.text};
    width: fit-content;
`

const Container = styled.div`
    width: 70%;
    height: 200vh;
    background-color: ${(props) => props.theme.body};
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SvgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Items = styled.ul`
    list-style:none;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: lightblue;

    &>*:nth-of-type(2n +1){
        justify-content: start;
    }
    &>*:nth-of-type(2n){
        justify-content: end;
    }
`

const Item = styled.li`
    width: 100%;
    height: 100%;
    display: flex;
`

const ItemContainer = styled.div`
    width: 40%;
    height: fit-content;
    padding: 1rem;
    border: 3px solid ${props => props.theme.text};
`

const Box = styled.p`
    height: fit-content;
    background-color: ${props => props.theme.carouselColor};
    color: ${props => props.theme.text};
    padding: 1rem;
    position: relative;
    border: 1px solid ${props => props.theme.text};
`

const SubTitle = styled.span`
    display: block;
    font-size: ${props => props.theme.fontxl};
    text-transform:capitalize;
    color: ${props => props.theme.text};
`;

const Text = styled.span`
    display: block;
    font-size: ${props => props.theme.fontsm};
    text-transform:capitalize;
    color: ${props => props.theme.text};

    font-weight:400;
    margin: 0.5rem 0;
`;

const RoadmapItem = ({title, subtext}) => {
    return(
        <Item>
            <ItemContainer>
                <Box>
                    <SubTitle>{title} </SubTitle>
                    <Text>{subtext}</Text>
                </Box>
            </ItemContainer>
        </Item>
    )
}

const Roadmap = () => {
    return (
        <Section>
            <Title>Roadmap</Title>
            <Container>
                <SvgContainer>
                    <DrawSvg />
                </SvgContainer>
                <Items>
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                    <RoadmapItem title="This is the title" subtext="this is subtitle" />
                </Items>
            </Container>
        </Section>
    )
}

export default Roadmap;