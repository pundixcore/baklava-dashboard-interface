import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

import CustomCard from "../CustomCard";

// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins as CoinsIcon } from "@fortawesome/free-solid-svg-icons";
library.add(CoinsIcon);

const Exchanges = () => {
  const theme = useTheme();

  const [exchanges, setExchanges] = useState([]);

  const fetchExchanges = () => {
    axios
      .get(
        "https://ap-southeast-1.aws.data.mongodb-api.com/app/baklava-psozi/endpoint/baklava",
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        let filteredResponse =
          response.data["AllData"]["stable_coin_reserve"]["USDC"][
            "0xD2c6e7892F3131e22d05E37E9B22bA79f8C74bA0"
          ];
        setExchanges(filteredResponse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchExchanges();
  }, []);

  return (
    <CustomCard
      text="USDC [USB Swap Locker Contract]"
      value={"$" + exchanges.toString()}
      color={theme.palette.success.dark}
      icon={CoinsIcon}
    />
  );
};

export default Exchanges;
