import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

import CustomCard from "../CustomCard";

// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins as CoinsIcon } from "@fortawesome/free-solid-svg-icons";
library.add(CoinsIcon);

const USDCeTotal = () => {
  const theme = useTheme();

  const [indexes, setIndexes] = useState([]);

  const fetchIndexes = () => {
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
          response.data["AllData"]["stable_coin_reserve"]["USDC.e"][
            "0xD2c6e7892F3131e22d05E37E9B22bA79f8C74bA0"
          ];
        let filteredResponseAnother =
          response.data["AllData"]["stable_coin_reserve"]["USDC.e"][
            "0x1578D79ab9777f8f1B9A5fE8abd593835492f21A"
          ];
        let x = (filteredResponse + filteredResponseAnother).toPrecision(5);
        setIndexes(x);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchIndexes();
  }, []);

  return (
    <CustomCard
      text="USDC.e Total"
      value={"$" + indexes.toString()}
      color={theme.palette.primary.main}
      icon={CoinsIcon}
    />
  );
};

export default USDCeTotal;
