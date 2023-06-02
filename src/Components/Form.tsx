import { FC } from "react";
import { Movie } from "../models/Movie";
import { useState } from "react";

import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export const Form: FC = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [description, setDescription] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const movie = new Movie(title, rating, description);
    console.log(movie);

    handleTransactionSubmit(movie);
  };

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), Buffer.from(movie.title)], // new TextEncoder().encode(movie.title)],
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      const txid = await sendTransaction(transaction, connection);
      alert(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`);
      console.log(`Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Movie title</h1>
        <input
          type="text"
          placeholder="Title"
          name=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h1>Movie title</h1>
        <input
          type="number"
          placeholder=""
          name=""
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
        />
        <h1>Movie Description</h1>
        <input
          type="text"
          placeholder="Description"
          name=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};
