import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";

export default function CountrySelect({
  fetcherWithToken,
  setValues,
  values,
  query,
}) {
  const [isBrand, setBrand] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isValueComplete, setValueComplete] = React.useState({});

  useEffect(() => {
    findBrand();
  }, []);
  const findBrand = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand`;
    const urlProduct = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products/${query.id}`;
    let valueBrands = [];
    await fetcherWithToken(url)
      .then(async (json) => {
        await setBrand(json.data);
        valueBrands = json.data;
      })
      .catch(() => setBrand([]));
    await fetcherWithToken(urlProduct).then((json) => {
      const findBeand = valueBrands.find(
        (item) => item._id === json.data.product_brand_id
      );
      setValueComplete(findBeand);
    });
  };

  const onChangeAutoComplete = (newValue) => {
    if (!newValue) {
      setValues({ ...values, BrandId: "" });
    } else {
      setValues({ ...values, BrandId: newValue._id });
      setValueComplete(newValue);
    }
  };

  return (
    <Autocomplete
      value={isValueComplete}
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
