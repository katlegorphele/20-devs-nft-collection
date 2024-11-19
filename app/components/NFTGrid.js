'use client'

import React, {useState, useEffect} from 'react'
import NFTCard from './NFTCard';
import { getOwnedNFTs, getConnectedWallet, initializeContract } from '@/utils/web3';

const NFTGrid = () => {
  const [fetchedNFTs, setFetchedNFTs] = useState([]);
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const address = await getConnectedWallet();
        setWalletAddress(address);
        const nfts = await getOwnedNFTs();
        setFetchedNFTs(nfts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchNFTs();
  } , []);

  // dummy data for now
  const nfts = [
    {
      id: 1,
      name: 'NFT 1',
      description: 'This is NFT 1',
      image: '/images/4.png'
    },
    {
      id: 2,
      name: 'NFT 2',
      description: 'This is NFT 2',
      image: '/images/3.png'
    },
    {
      id: 3,
      name: 'NFT 3',
      description: 'This is NFT 3',
      image: '/images/2.png'
    },
    {
      id: 4,
      name: 'NFT 4',
      description: 'This is NFT 4',
      image: '/images/6.png'
    },
  ];


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}

    </div>
  )
}

export default NFTGrid