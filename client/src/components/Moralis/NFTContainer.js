import React from 'react';
import NFTCard from './NFTCard';

const NFTContainer = ({ nfts }) => {
    return (
        <div className='nft-container'>
            {nfts.map((nfts, index) => {
                return <NFTCard nft={nft} key={index} />
            })}
        </div>
    )
}

export default NFTContainer;