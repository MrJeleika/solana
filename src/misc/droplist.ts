import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export interface Drop {
  walletAddress: string,
  numLamports: number
}


export const dropList:Drop[] = [
  {
    walletAddress: '2bzqNjoUqFEDouaBK3PXHDWzWz3FW9QWbFZoNKrkoB7z',
    numLamports: 0.05 * LAMPORTS_PER_SOL
  },
  {
    walletAddress: '4WoF36XMWZAZg3MYzQUnjFCWv7o94ERGtHLxieWgiYGF',
    numLamports: 0.1 * LAMPORTS_PER_SOL
  },
];