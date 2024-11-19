import { ethers, JsonRpcProvider} from "ethers";
import CONTRACT_ABI from "../utils/MyNFT.json";
const CONTRACT_ADDRESS = '0x8Df02c53Cb41A572de5402D868Fe978E437f123a';


export const getNFTs = async () => {
    try {
        if (!window.ethereum) {
            throw new Error("Metamask not installed");
        }

        // Connect to the Ethereum network
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("Signer: ", signer);
    } catch (error) {
        console.log("Error: ", error);
    }
    };