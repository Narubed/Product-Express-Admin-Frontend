import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";

export default function CountrySelect({ fetcherWithToken, setValues, values }) {
  const [isBrand, setBrand] = useState([]);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    findBrand();
  }, []);
  const findBrand = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand`;
    await fetcherWithToken(url)
      .then(async (json) => {
        await setBrand(json.data);
      })
      .catch(() => setBrand([]));
  };
  const onChangeAutoComplete = (newValue) => {
    console.log(newValue);
    if (!newValue) {
      setValues({ ...values, BrandId: "" });
    } else {
      setValues({ ...values, BrandId: newValue._id });
    }
  };

  return (
    <Autocomplete
      // value={value}
      onChange={(event, newValue) => {
        onChangeAutoComplete(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={isBrand}
      sx={{ width: "100%" }}
      getOptionLabel={(option) => {
        return option.brand_name?.Thai;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Image
            alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/brand/${option.brand_image}`}
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/brand/${option.brand_image}`}
            width={40}
            height={40}
            objectFit="cover"
            quality={20}
          />
          <a
            style={{
              paddingLeft: "16px",
              color: "purple",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {option.brand_name.Thai}
          </a>
        </Box>
      )}
      renderInput={(params) => {
        return (
          <TextField
            color="secondary"
            {...params}
            sx={{ fontSize: "16px" }}
            label={
              <a
                style={{
                  color: "purple",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                เลือกแบรนด์
              </a>
            }
            inputProps={{
              ...params.inputProps,
              style: { fontSize: 16, color: "purple", fontWeight: "bold" },
            }}
          />
        );
      }}
    />
  );
}
