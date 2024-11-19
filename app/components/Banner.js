'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getTotalMinted, getTokenMetadata } from '@/utils/web3';

const Banner = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1); // Start at token ID 1
  const [nftData, setNftData] = useState(null); // Store current NFT metadata

  // Fetch total minted NFTs and metadata for the current NFT
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
        const response = await fetch(metadataURI);
        const metadata = await response.json();
        setNftData(metadata);
      } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
      }
    };

    fetchTotalMinted();
    if (currentIndex > 0) fetchNftData(currentIndex);
  }, [currentIndex]);

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
          {nftData && (
            <Image
              src={nftData.image || '/images/placeholder.png'}
              alt={nftData.name || 'NFT'}
              className="rounded-lg object-cover w-full"
              width={300}
              height={350}
              priority={true}
            />
          )}
        </div>

        {/* Details Section */}
        <div className="md:col-span-2">
          <p className="py-5">
            The <span>20 DEVS</span> Collection
          </p>
          <h2 className="text-3xl font-bold">
            {nftData?.name || 'Loading NFT...'}
          </h2>
          <p className="text-sm mt-2">
            {nftData?.description ||
              'Fetching metadata for the selected NFT...'}
          </p>
          <p className="text-sm mt-2">
            <strong>Total Minted: </strong> {totalMinted}
          </p>
          <button className="bg-white text-black px-4 py-2 mt-4 rounded-lg shadow-md">
            Mint NFT
          </button>
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
