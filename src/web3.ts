import { ethers } from "ethers";

type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider;
};

const windowWithEthereum = window as unknown as WindowWithEthereum;

const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
];

let provider: ethers.providers.Web3Provider | null = null;

export const getProvider = () => {
  if (!provider) {
    provider = new ethers.providers.Web3Provider(windowWithEthereum.ethereum);
  }

  return provider;
};

let tokenContract: ethers.Contract | null = null;

export const getTokenContract = () => {
  const provider = getProvider();

  if (!tokenContract) {
    tokenContract = new ethers.Contract(
      process.env.REACT_APP_TOKEN_ADDRESS!,
      TOKEN_ABI,
      provider
    );
  }

  return tokenContract;
};
