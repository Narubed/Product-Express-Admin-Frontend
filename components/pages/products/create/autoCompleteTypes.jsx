import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";

export default function CountrySelect({ fetcherWithToken, setValues, values }) {
  const [isType, setType] = useState([]);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    findType();
  }, []);
  const findType = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type`;
    await fetcherWithToken(url)
      .then(async (json) => {
        await setType(json.data);
      })
      .catch(() => setType([]));
  };
  const onChangeAutoComplete = (newValue) => {
    console.log(newValue);
    if (!newValue) {
      setValues({ ...values, TypeId: "" });
    } else {
      setValues({ ...values, TypeId: newValue });
    }
  };

  return (
    <Autocomplete
      // value={value}
      multiple
      onChange={(event, newValue) => {
        onChangeAutoComplete(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={isType}
      sx={{ width: "100%" }}
      getOptionLabel={(option) => {
        return option.type_name?.Thai;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Image
            alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/type/${option.type_image}`}
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/type/${option.type_image}`}
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
            {option.type_name.Thai}
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
                เลือกประเภทสินค้า
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
