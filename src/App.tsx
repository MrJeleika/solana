import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import * as Web3 from "@solana/web3.js";
import { useEffect, useState } from "react";
import { MovieList } from "./Components/Movies";
import { Form } from "./Components/Form";

function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("0");
  const [to, setTo] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendSol = async () => {
    if (+amount <= 0 || !to) return;
    const transaction = new Web3.Transaction();
    const transactionInstruction = Web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new Web3.PublicKey(to),
      lamports: +amount * Web3.LAMPORTS_PER_SOL,
    });

    transaction.add(transactionInstruction);

    await sendTransaction(transaction, connection)
      .then((tx) => connection.confirmTransaction(tx, "confirmed"))
      .then((tx) => console.log(tx));

    const balance = (await connection.getAccountInfo(publicKey)).lamports;
    console.log(balance);

    setBalance(balance / Web3.LAMPORTS_PER_SOL);
  };

  useEffect(() => {
    if (!connection || !publicKey) return;

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info.lamports / Web3.LAMPORTS_PER_SOL);
    });
  }, [connection, publicKey]);

  return (
    <>
      <WalletMultiButton />
      <div>{publicKey ? `Balance ${balance}` : ""}</div>

      {/* <h1>Amount in sol to send</h1>
      <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <h1>Send sol to</h1>
      <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      <button onClick={sendSol}>Send</button> */}
      <Form />
      <MovieList />
    </>
  );
}

export default App;
