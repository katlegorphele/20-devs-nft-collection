'use client'

import React from 'react'
import { useState, useEffect } from 'react';
import { connectWallet, getConnectedWallet } from '@/utils/web3';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Function to handle wallet connection
  const handleConnect = async () => {
    try {
      if (!connected) {
        const address = await connectWallet();
        setWalletAddress(address);
        setConnected(true);
      } else {
        // Disconnect logic (if required)
        setWalletAddress("");
        setConnected(false);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  // Check if a wallet is already connected on load
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const address = await getConnectedWallet();
        if (address) {
          setWalletAddress(address);
          setConnected(true);
        }
      } catch (error) {
        console.error("Failed to fetch wallet address:", error);
      }
    };
    checkWalletConnection();
  }, []);
  
  
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">20 DEVS NFT Collection</h1>
      <button
        onClick={handleConnect}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        {connected ? `Disconnect (${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)})` : "Connect Wallet"}
      </button>
    </header>

  )
}

export default Header