import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { CrytoState } from "../../CrytoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency } = CrytoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);


  const item = trending.map((coin) => {
    
    function setComma(x) {
      // this is regex code for setting commas in between larger numbers
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

    const {symbol} = CrytoState();
    let profit = coin.price_change_percentage_24h >= 0; 
    return (
      <Link className="linkItem" to={`/coin/${coin.id}`}>
        <img src={coin.image}
        alt={coin.name}
        height="90"
        style={{
          marginBottom: 15
        }}/>
        <span>
          {coin.symbol}
          &nbsp;
          <span style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red"
          }}>
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{
          marginTop: 8
        }}>
          {symbol}
          {setComma(coin.current_price.toFixed(2))}
        </span>
      </Link>
    )
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return <div className="carousel">
    <AliceCarousel mouseTracking infinite autoPlayInterval={1000}
    animationDuration={1500} responsive={responsive}
    autoPlay items={item} disableButtonsControls disableDotsControls />
  </div>;
};

export default Carousel;
