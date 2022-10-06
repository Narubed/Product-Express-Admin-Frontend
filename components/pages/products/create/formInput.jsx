import React from "react";
import {
  Stack,
  TextField,
  Container,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Form,
  Button,
  ListItem,
  InputAdornment,
  Grid,
  Box,
  FormControlLabel,
  Switch,
  Autocomplete,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import Swal from "sweetalert2";

import iconEng from "~/public/static/icons/Eng.png";
import iconThai from "~/public/static/icons/Thai.png";
import iconCambodia from "~/public/static/icons/Cambodia.png";
import iconMyanmar from "~/public/static/icons/Myanmar.png";
import iconLaos from "~/public/static/icons/Laos.png";
import iconChina from "~/public/static/icons/China.png";
import AutoCompleteCreate from "@/components/pages/products/create/autoCompleteCreate";
import AutoCompleteTypes from "@/components/pages/products/create/autoCompleteTypes";
import AutoCompleteTag from "@/components/pages/products/create/autoCompleteTag";
const ImgIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "16px",
  borderRadius: theme.shape.borderRadius,
}));

function formInput({ values, handleChange, fetcherWithToken, setValues }) {
  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
        ชื่อสินค้า
      </Typography>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem disablePadding>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="Thai" sx={{ fontSize: "16px" }}>
                ชื่อภาษาไทย
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="Thai"
                value={values.Thai}
                onChange={handleChange("Thai")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconThai.src} alt={iconThai.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="Eng" sx={{ fontSize: "16px" }}>
                ชื่อภาษาอังกฤษ
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="Eng"
                value={values.Eng}
                onChange={handleChange("Eng")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconEng.src} alt={iconEng.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem disablePadding>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="Cambodia" sx={{ fontSize: "16px" }}>
                ชื่อกัมพูชา
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="Cambodia"
                value={values.Cambodia}
                onChange={handleChange("Cambodia")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconCambodia.src} alt={iconCambodia.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="Myanmar" sx={{ fontSize: "16px" }}>
                ชื่อภาษาพม่า
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="Myanmar"
                value={values.Myanmar}
                onChange={handleChange("Myanmar")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconMyanmar.src} alt={iconMyanmar.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem disablePadding>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="Laos" sx={{ fontSize: "16px" }}>
                ชื่อภาษาลาว
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="Laos"
                value={values.Laos}
                onChange={handleChange("Laos")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconLaos.src} alt={iconLaos.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="China" sx={{ fontSize: "16px" }}>
                ชื่อภาษาจีน
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="China"
                value={values.China}
                onChange={handleChange("China")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconChina.src} alt={iconChina.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </Box>
      </Grid>
      {/* ___________________________________________________________________________________ */}
      <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
        รายละเอียดอื่น ๆ
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AutoCompleteCreate
            values={values}
            fetcherWithToken={fetcherWithToken}
            setValues={setValues}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AutoCompleteTypes
            values={values}
            fetcherWithToken={fetcherWithToken}
            setValues={setValues}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <AutoCompleteTag
            values={values}
            fetcherWithToken={fetcherWithToken}
            setValues={setValues}
          />
        </Grid>
      </Grid>
      {/* ___________________________________________________________________________________ */}

      <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
        รายละเอียดสินค้า
      </Typography>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailThai" sx={{ fontSize: "16px" }}>
            รายละเอียดภาษาไทย
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailThai"
            value={values.DetailThai}
            onChange={handleChange("DetailThai")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconThai.src} alt={iconThai.src} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailEng" sx={{ fontSize: "16px" }}>
            รายละเอียดภาษาอังกฤษ
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailEng"
            value={values.DetailEng}
            onChange={handleChange("DetailEng")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconEng.src} alt={iconEng.src} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailCambodia" sx={{ fontSize: "16px" }}>
            รายละเอียดกัมพูชา
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailCambodia"
            value={values.DetailCambodia}
            onChange={handleChange("DetailCambodia")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconCambodia.src} alt={iconCambodia.src} />
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailMyanmar" sx={{ fontSize: "16px" }}>
            รายละเอียดภาษาพม่า
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailMyanmar"
            value={values.DetailMyanmar}
            onChange={handleChange("DetailMyanmar")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconMyanmar.src} alt={iconMyanmar.src} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailLaos" sx={{ fontSize: "16px" }}>
            รายละเอียดภาษาลาว
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailLaos"
            value={values.DetailLaos}
            onChange={handleChange("DetailLaos")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconLaos.src} alt={iconLaos.src} />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="DetailChina" sx={{ fontSize: "16px" }}>
            รายละเอียดภาษาจีน
          </InputLabel>
          <Input
            sx={{ fontSize: "16px" }}
            id="DetailChina"
            value={values.DetailChina}
            onChange={handleChange("DetailChina")}
            startAdornment={
              <InputAdornment position="start">
                <ImgIcon src={iconChina.src} alt={iconChina.src} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      {/* ___________________________________________________________________________________ */}
      <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
        ชื่อขนาดของสินค้า (ไซต์,แพ็ค,เซต)
      </Typography>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem disablePadding>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameThai" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้าภาษาไทย
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameThai"
                value={values.SizeNameThai}
                onChange={handleChange("SizeNameThai")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconThai.src} alt={iconThai.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameEng" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้าภาษาอังกฤษ
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameEng"
                value={values.SizeNameEng}
                onChange={handleChange("SizeNameEng")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconEng.src} alt={iconEng.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameCambodia" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้ากัมพูชา
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameCambodia"
                value={values.SizeNameCambodia}
                onChange={handleChange("SizeNameCambodia")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconCambodia.src} alt={iconCambodia.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ListItem disablePadding>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameMyanmar" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้าภาษาพม่า
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameMyanmar"
                value={values.SizeNameMyanmar}
                onChange={handleChange("SizeNameMyanmar")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconMyanmar.src} alt={iconMyanmar.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameLaos" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้าภาษาลาว
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameLaos"
                value={values.SizeNameLaos}
                onChange={handleChange("SizeNameLaos")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconLaos.src} alt={iconLaos.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="SizeNameChina" sx={{ fontSize: "16px" }}>
                ชื่อขนาดสินค้าภาษาจีน
              </InputLabel>
              <Input
                sx={{ fontSize: "16px" }}
                id="SizeNameChina"
                value={values.SizeNameChina}
                onChange={handleChange("SizeNameChina")}
                startAdornment={
                  <InputAdornment position="start">
                    <ImgIcon src={iconChina.src} alt={iconChina.src} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </ListItem>
        </Box>
      </Grid>
    </div>
  );
}

export default formInput;
