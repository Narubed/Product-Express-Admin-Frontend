import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export default function AutoCompleteTag({
  values,
  fetcherWithToken,
  setValues,
}) {
  const onChangeAutoComplete = (newValue) => {
    console.log(newValue);
    if (!newValue) {
      setValues({ ...values, Tag: "" });
    } else {
      setValues({ ...values, Tag: newValue.label });
    }
  };

  return (
    <Autocomplete
      onChange={(event, newValue) => {
        onChangeAutoComplete(newValue);
      }}
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <a
            style={{
              paddingLeft: "16px",
              color: "purple",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {option.label}
          </a>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            style: { fontSize: 16, color: "purple", fontWeight: "bold" },
          }}
          label={
            <a
              style={{
                color: "purple",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              เลือก Tag ที่จะขึ้นอยู่บนรูปสินค้า
            </a>
          }
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { label: "ไม่มี" },
  { label: "Hot" },
  { label: "New" },
  { label: "Sale" },
];
