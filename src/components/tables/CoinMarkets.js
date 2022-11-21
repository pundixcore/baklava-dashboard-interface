import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SvgIcon from "@mui/material/SvgIcon";
import { keyframes, useTheme } from "@mui/material/styles";
import TablePaginationActions from "./TablePaginationActions";
import BasicDatePicker from "../BasicDatePicker";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CoinMarkets = ({ index }) => {
  const theme = useTheme();

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = useState("");
  const [originalData, setOriginalData] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //const filteredCoins = Object.entries(coins); // turns into a list
  //const filteredCoins = ((key) => (coins[key] ? coins[key] : []))(search);

  const dataFilter = (search) => {
    const addressTokenMap = {
      2: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      1: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    };

    const address = addressTokenMap[search] ? addressTokenMap[search] : "";

    if (search === 0) {
      if (value === "") {
        return Object.entries(coins);
      } else {
        const valueFormmatted = moment(value["$d"]).format("YYYY-MM-DD");
        console.log("originalData: issei", originalData);
        const USDC =
          originalData["0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"][
            valueFormmatted
          ];
        const USDC_e =
          originalData["0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"][
            valueFormmatted
          ];
        console.log("issei kumagai", USDC, USDC_e);

        return Object.entries(coins);
      }
    }

    if (value === "") {
      return coins[address] ? [[address, coins[address]]] : [];
    } else {
      console.log(value["$d"]);
      console.log(value["$d"].toLocaleDateString());
      console.log(moment(value["$d"]).format("YYYY-MM-DD"));
      return coins[address] ? [[address, coins[address]]] : [];
    }
    //["ccc", [["2012-11-11", 100], ["2012-11-12", 33]]]
  };

  const amountDue = (date) => {
    const USDC =
      originalData["0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"][date];
    const USDC_e =
      originalData["0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"][date];
    let usdcData;
    let usdceData;
    if (USDC !== undefined) {
    } else {
    }
    if (USDC_e !== undefined) {
    } else {
    }
  };

  const filteredCoins = dataFilter(index);

  // const filteredCoins = (function (search) {
  //   if (search === 0) {
  //     return Object.entries(coins);
  //   }
  //   const addressTokenMap = {
  //     2: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
  //     1: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
  //   };
  //   const address = addressTokenMap[search] ? addressTokenMap[search] : "";

  //   if (value === "") {
  //     return coins[address] ? [[address, coins[address]]] : [];
  //   } else {
  //     console.log(value["$d"].toISOString().split("T")[0]);
  //     return coins[address] ? [[address, coins[address]]] : [];
  //   }
  // })(index);

  // const filteredCoins = coins.filter((coin) =>
  //   coin.name.toLowerCase().includes(search.toLowerCase())
  // ); // Issei

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchCoinMarkets = () => {
    axios
      .get(
        "https://ap-southeast-1.aws.data.mongodb-api.com/app/baklava-psozi/endpoint/baklava",
        //"https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false", //Issei
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        let responseData = response.data["AllData"]["stable_coin_distribution"];
        let responseDataOriginal =
          response.data["AllData"]["stable_coin_distribution"]["original"];
        console.log("responseData", responseData);
        console.log("responseDataOriginal", responseDataOriginal);
        delete responseData._id;

        setOriginalData(responseDataOriginal);
        //setOriginalData(originalData);
        delete responseData.original;
        console.log("responseData", responseData);
        setCoins(responseData);
      })
      .catch((error) => {
        console.log(1);
        console.log(error);
      });
  };

  //let c = [["aaa", [["2012-11-11", 100], ["2012-11-12", 33]]], ["ccc", [["2012-11-11", 100], ["2012-11-12", 33]]]]
  function HelperFunctionOne({ array, metaData }) {
    const addressTokenMap = {
      "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664": "USDC.e",
      "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E": "USDC",
    };

    return array.map((tempArr) => {
      return (
        <TableRow>
          <TableCell>{addressTokenMap[metaData]}</TableCell>
          <TableCell>{tempArr[0]}</TableCell>
          <TableCell>{tempArr[1] / 10 ** 6}</TableCell>
        </TableRow>
      );
    });
  }

  useEffect(() => {
    fetchCoinMarkets();
  }, []);

  console.log("originalData:", originalData);

  console.log("filteredCoins:", filteredCoins);
  const a = value["$d"];
  console.log(a instanceof Date);
  //console.log(a.toISOString().split("T")[0]);
  //const x = JSON.stringify(value["$d"]);
  console.log("hello");

  return (
    <React.Fragment>
      {/* <Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Search a cryptocurrency"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box> */}
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
              console.log(dataFilter(index));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box sx={{ pt: 3 }}>
        {/* <Card>
          <BasicTabs />
        </Card> */}
        <Card>
          <Box sx={{ minWidth: 1050, pb: 3 }}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Token</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Date Amount Due
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Amount Due in $USD
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCoins.map((arr) => {
                  let smartContractAddress = arr[0];
                  return (
                    <HelperFunctionOne
                      array={arr[1]}
                      metaData={smartContractAddress}
                    />
                  );
                })}
              </TableBody>
              {/* <TableBody>
                
                {(rowsPerPage > 0
                  ? filteredCoins.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredCoins
                ).map((coin) => (
                  <TableRow hover key={coin.id}>
                    <TableCell>
                      <img
                        src={coin.image}
                        alt=""
                        style={{ height: "30px", width: "30px" }}
                      />
                    </TableCell>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>{coin.symbol}</TableCell>
                    <TableCell>${coin.current_price.toFixed(2)}</TableCell>
                    <TableCell>
                      {coin.price_change_percentage_24h > 0 ? (
                        <span
                          style={{
                            color:
                              theme.palette.mode === "dark"
                                ? theme.palette.success.main
                                : theme.palette.success.dark,
                          }}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      ) : (
                        <span
                          style={{
                            color:
                              theme.palette.mode === "dark"
                                ? theme.palette.error.main
                                : theme.palette.error.dark,
                          }}
                        >
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </span>
                      )}
                    </TableCell>
                    <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
                    <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
            {/* <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={coins.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
              sx={{ display: "flex", justifyContent: "center" }}
            /> */}
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
};

export default CoinMarkets;
