import { FC, useMemo } from "react";
import { ConnectionProvider, WalletProvider as WalletWrapper } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

interface Props {
  children: JSX.Element;
}

export const WalletProvider: FC<Props> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint =
    "https://api.devnet.solana.com/" ||
    "https://long-dawn-mansion.solana-mainnet.discover.quiknode.pro/d5977a7e0b8f25d504474f8bd9c4a34cc4039e4e/";

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletWrapper wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletWrapper>
    </ConnectionProvider>
  );
};
