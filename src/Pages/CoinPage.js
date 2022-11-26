
import { useParams } from "react-router-dom";
import { CrytoState } from "../CrytoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { useEffect, useState } from "react";
import {LinearProgress, Typography } from "@mui/material";
import CoinInfo from "../components/CoinInfo";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CrytoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, [currency]);

  if (!coin) {
    return (
      <LinearProgress
        style={{
          backgroundColor: "gold",
        }}
      />
    );
  }

  function setComma(x) {
    // this is regex code for setting commas in between larger numbers
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const parse = require('html-react-parser')

  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin.image.large}
          alt={coin.name}
          height="200"
          style={{
            marginBottom: 20,
          }}
        />
        <Typography variant="h3" className="heading">{coin.name}</Typography>
        <Typography variant="subtitle1" className="description">
          {parse(coin.description.en.split(". ")[0] + coin.description.en.split(". ")[1])}
        </Typography>
        <div className="marketData">
          <span
            style={{
              display: "flex",
            }}
          >
            <Typography variant="h5" className="heading">Rank:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {setComma(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span
            style={{
              fontFamily: "Montserrat",
              display: "flex",
            }}
          >
            <Typography variant="h5" className="heading">Currency Price:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
            >
              {symbol}{" "}
              {setComma(coin.market_data.current_price[currency.toLowerCase()])}
            </Typography>
            &nbsp; &nbsp;
          </span>
          <span style={{
            display: "flex"
          }}>
            <Typography variant="h5" className="heading">Market Cap:</Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
            >
              {symbol}{" "}
              {setComma(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
            &nbsp; &nbsp;
          </span>
        </div>
      </div>
      <CoinInfo coin={coin}/>
    </div>
  );
};

export default CoinPage;
