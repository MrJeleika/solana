import { FC, useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import * as web3 from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

export const MovieList: FC = () => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);

  const getAcc = async () => {
    const acc = await connection.getProgramAccounts(new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID));

    const movies: Movie[] = acc.map(({ account }) => {
      return Movie.deserialize(account.data);
    });
    setMovies(movies);
    console.log(movies);
  };

  useEffect(() => {
    getAcc();
  }, []);

  return (
    <div>{movies.map((movie, i) => (i > 1430 ? <div key={i}>{movie.title}</div> : null))}</div>
  );
};
