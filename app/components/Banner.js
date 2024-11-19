'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTotalMinted, getTokenMetadata, getConnectedWallet, getNFTOwner } from '@/utils/web3';
import MintButton from './MintButton';

const Banner = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at token ID 1
  const [nftData, setNftData] = useState(null); // Store current NFT metadata
  const [walletAddress, setWalletAddress] = useState(null);

  // Fetch total minted NFTs, metadata for the current NFT, and wallet connection
  useEffect(() => {
    const fetchTotalMinted = async () => {
      try {
        const total = await getTotalMinted();
        setTotalMinted(total);
      } catch (error) {
        console.error("Error fetching total minted NFTs:", error);
      }
    };

    const fetchNftData = async (tokenId) => {
      try {
        const metadataURI = await getTokenMetadata(tokenId);
        const ipfsURI = metadataURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const response = await fetch(ipfsURI); // Corrected to fetch from IPFS URL
        const metadata = await response.json();
        setNftData(metadata);
      } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
      }
    };

    const checkWalletConnection = async () => {
      try {
        const address = await getConnectedWallet();
        if (address) {
          setWalletAddress(address);
        }
      } catch (error) {
        console.error("Error fetching wallet address:", error);
      }
    };

    // Call functions on component mount
    fetchTotalMinted();
    if (currentIndex > 0) fetchNftData(currentIndex);
    checkWalletConnection(); // Ensure wallet connection is checked

  }, [currentIndex]); // Dependencies only on currentIndex

  // get nft owner


  // Navigation Handlers
  const handleNext = () => {
    if (currentIndex < totalMinted) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-8 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          {nftData && nftData.image ? (
            <Image
              src={nftData.image.startsWith('ipfs://') ? nftData.image.replace('ipfs://', 'https://ipfs.io/ipfs/') : nftData.image}
              alt={nftData.name || 'NFT'}
              className="rounded-lg object-cover w-full"
              width={300}
              height={350}
              priority={true}
            />
          ) : (
            <Image
              src="/images/21.png"
              alt="Placeholder NFT"
              className="rounded-lg object-cover w-full"
              width={300}
              height={350}
              priority={true}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="md:col-span-2">
          <p className="py-2">
            The <span>20 DEVS</span> Collection
          </p>
          <p className="text-sm mt-2 text-bold">
            <strong>Total Supply: </strong> {totalMinted}/20
          </p>
          <h2 className="text-3xl font-bold">
            {nftData?.name || 'Loading NFT...'}
          </h2>
          <p className="text-sm mt-2">
            {nftData?.description ||
              'Fetching metadata for the selected NFT...'}
          </p>
          
          {/* Pass walletAddress to the MintButton */}
          {walletAddress && <MintButton recipientAddress={walletAddress} />}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentIndex <= 1}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          NFT {currentIndex} of {totalMinted}
        </p>
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalMinted}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Banner;
