'use client'

import React from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  // Function to connect/disconnect the wallet
  async function connectWallet() {
    if (!connected) {
      // Connect the wallet using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setWalletAddress(_walletAddress);
    } else {
      // Disconnect the wallet
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setWalletAddress("");
    }
  }
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold"> 20 DEVS NFT Collection</h1>
      <button onClick={connectWallet} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
      {connected ? "Disconnect Wallet" : "Connect Wallet"}
      </button>
    </header>
  )
}

export default Header