import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

import CustomCard from "../CustomCard";

// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins as CoinsIcon } from "@fortawesome/free-solid-svg-icons";
library.add(CoinsIcon);

const AssetPlatforms = () => {
  const theme = useTheme();

  const [assetPlatforms, setAssetPlatforms] = useState([]);

  const fetchAssetPlatforms = () => {
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
            "0x1578D79ab9777f8f1B9A5fE8abd593835492f21A"
          ];
        setAssetPlatforms(filteredResponse);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAssetPlatforms();
  }, []);

  return (
    <CustomCard
      text="USDC.e [USB Liquidity Pool Contract]"
      value={"$" + assetPlatforms.toString()}
      color={theme.palette.warning.dark}
      icon={CoinsIcon}
    />
  );
};

export default AssetPlatforms;
