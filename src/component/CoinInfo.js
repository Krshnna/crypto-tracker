/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CrytoState } from "../CrytoContext";
import { HistoricalChart } from "../config/api";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

const CoinInfo = (coin) => {

  const {id} = useParams();

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CrytoState();

  const fetchHistoricData = async()=>{
    const {data} = await axios.get(HistoricalChart(id, days, currency));
    setHistoricalData(data.prices);
  }

  // console.log(historicalData);

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
  });

  return <ThemeProvider theme={darkTheme}>
    <div className="info-container">
        {
            !historicalData  ? (
                <CircularProgress style={{color: "gold"}}
                size={250} thickness={1}/>
            ) : (
            <>
            <Line 
            data = {{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time = date.getHours() > 12 ? 
                `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "gold"
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
            />
            <div style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%"
            }}>
              {chartDays.map((day) => (
                <SelectButton key={day.value} onClick={() => {setDays(day.value)}} 
                selected = {day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
            </>)
        }
    </div>
  </ThemeProvider>
};

export default CoinInfo;
