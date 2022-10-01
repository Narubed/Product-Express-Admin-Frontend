import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CountrySelect({
  fetcherWithToken,
  setValues,
  values,
  currentUser,
}) {
  const router = useRouter();
  const { query } = router;
  const [isCompany, setCompany] = useState([]);
  const [value, setValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    findCompany();
  }, []);

  const findCompany = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/company`;
    await fetcherWithToken(url)
      .then(async (json) => {
        await setCompany(json.data);
        const findIndexCompany = await json.data.find(
          (item) => item._id === query.company_id
        );
        await setValue(findIndexCompany);
      })
      .catch(() => setCompany([]));
  };


  const onChangeAutoComplete = (newValue) => {
    setValues({ ...values, CompanyId: newValue._id });
    setValue(newValue);
  };

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChangeAutoComplete(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={isCompany}
      sx={{ width: "100%" }}
      getOptionLabel={(option) => {
        return option.company_name?.Thai;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <Image
            alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/company/${option.company_image}`}
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/company/${option.company_image}`}
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
            {option.company_name.Thai}
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
                เลือกเจ้าของแบรนด์
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
