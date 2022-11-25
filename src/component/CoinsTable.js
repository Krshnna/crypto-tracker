import axios from "axios";
import React from "react";
import { CoinList } from "../config/api";
import { CrytoState } from "../CrytoContext";
import { useEffect, useState } from "react";
import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const { currency, symbol } = CrytoState();
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    // {data} is destructing the data
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  function setComma(x) {
    // this is regex code for setting commas in between larger numbers
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "Montserrat",
          }}
        >
          Cryto Prices by Market Cap
        </Typography>
        <TextField
          label="Search your favorite Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress
              style={{
                backgroundColor: "gold",
              }}
            />
          ) : (
            <Table aria-label="customized table">
              <TableHead
                style={{
                  backgroundColor: "#b2a300",
                }}
              >
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Value"].map(
                    (head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontSize: 15,
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 15, (page - 1) * 15 + 15)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coin/${row.id}`)}
                        className="row"
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: "15",
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="60"
                            style={{
                              marginBottom: 10,
                              marginRight: 14,
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 22,
                                textTransform: "uppercase",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "darkgray",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol} {setComma(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 600,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {setComma(row.market_cap.toString().slice(0, -6))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          size="large"
          style={{
            display: "flex",
            width: "100%",
            padding: 20,
            justifyContent: "center",
          }}
          className="pagination"
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
