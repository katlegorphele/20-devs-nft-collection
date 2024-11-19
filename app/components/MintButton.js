'use client';

import React, { useState } from 'react';
import { mintNFT } from '@/utils/web3'; 

const MintButton = ({ recipientAddress }) => {
  const [isMinting, setIsMinting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Mint NFT function
  const handleMint = async () => {
    if (!recipientAddress) {
      setErrorMessage("Recipient address is required.");
      return;
    }

    setIsMinting(true);
    setErrorMessage("");

    try {
      await mintNFT(recipientAddress);
      alert("NFT Minted Successfully!");
    } catch (error) {
      setErrorMessage("Minting failed. Please try again.");
      console.error("Minting error:", error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleMint}
        className="bg-white text-black px-4 py-2 mt-4 rounded-lg shadow-md disabled:opacity-50"
        disabled={isMinting}
      >
        {isMinting ? "Minting..." : "Mint NFT"}
      </button>
      {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
    </div>
  );
};

export default MintButton;
