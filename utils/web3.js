import { ethers } from "ethers";
import C_ABI from "@/utils/MyNFT.json";
const CONTRACT_ADDRESS = "0x8Df02c53Cb41A572de5402D868Fe978E437f123a";
const CONTRACT_ABI = C_ABI.abi;

let provider, signer, contract;

/**
 * Initialize the provider and contract object
 */
export async function initializeContract() {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    } catch (error) {
      alert("Failed to initialize contract. Please try again.");
      throw new Error("Contract initialization failed");
    }
  } else {
    alert("Please install Metamask");
    throw new Error("MetaMask is not installed");
  }
}

/**
 * Connect User wallet
 * @returns {string} - User's wallet address 
 */
export async function connectWallet() {
  if (!provider) await initializeContract();
  const accounts = await provider.send("eth_requestAccounts", []);
  return accounts[0];
}

/**
 * Check if wallet is connected
 * @returns {string || null} - Wallet address if connected, null otherwise
 */
export async function getConnectedWallet() {
  if (!provider) await initializeContract();
  const accounts = await provider.listAccounts();
  return accounts.length > 0 ? accounts[0] : null;
}

/**
 * Switch Network if needed
 */
export async function switchToSepolia() {
  try {
    await provider.send("wallet_switchEthereumChain", [
      { chainId: ethers.hexlify(11155111) }, // Sepolia Chain ID
    ]);
  } catch (error) {
    console.error("Failed to switch network", error);
  }
}

/**
 * Mint a new NFT
 * @param {string} recipient - The recipient's address
 */
export async function mintNFT(recipient) {
  if (!contract) await initializeContract();
  const tx = await contract.createNFT(recipient);
  await tx.wait();
  console.log("NFT Minted:", tx);
}

/**
 * Burn an NFT
 * @param {number} tokenId - The token ID to burn
 */
export async function burnNFT(tokenId) {
  if (!contract) await initializeContract();
  const tx = await contract.burnNFT(tokenId);
  await tx.wait();
  console.log("NFT Burned:", tx);
}

/**
 * Fetch metadata for a specific token
 * @param {number} tokenId - The token ID
 * @returns {string} The token's metadata URI
 */
export async function getTokenMetadata(tokenId) {
  if (!contract) await initializeContract();
  let uri = await contract.tokenURI(tokenId);
  return uri.replace("ipfs://", "https://ipfs.io/ipfs/");
}

/**
 * Fetch total minted NFTs
 * @returns {number} The total number of NFTs minted
 */
export async function getTotalMinted() {
  if (!contract) await initializeContract();
  let total = await contract.tokenCounter();
  return (Number(total));
// return 1 
}

/**
 * Fetch the owner of an NFT
 * @param {number} tokenId - Token ID
 * @returns {string} Owner's address
 */
export async function getNFTOwner(tokenId) {
  if (!contract) await initializeContract();
  return await contract.ownerOf(tokenId);
}

/**
 * Fetch all NFTs in the collection
 * @returns {Array} List of all token IDs
 */
export async function getAllNFTs() {
  const totalMinted = await getTotalMinted();
  const nfts = [];
  for (let i = 1; i <= totalMinted; i++) {
    const owner = await contract.ownerOf(i).catch(() => null);
    if (owner) nfts.push({ tokenId: i, owner });
  }
  return nfts;
}

/**
 * Fetch NFTs owned by the connected wallet
 * @returns {Array} List of token IDs owned by the wallet
 */
export async function getOwnedNFTs() {
  const walletAddress = await getConnectedWallet();
  if (!walletAddress) throw new Error("No wallet connected");
  const allNFTs = await getAllNFTs();
  return allNFTs.filter((nft) => nft.owner.toLowerCase() === walletAddress.toLowerCase());
}
