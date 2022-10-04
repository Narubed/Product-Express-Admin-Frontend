/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/lib/store/loading";

import { Helmet } from "react-helmet";

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
import Main from "@/components/main";
import iconEng from "~/public/static/icons/Eng.png";
import iconThai from "~/public/static/icons/Thai.png";
import iconCambodia from "~/public/static/icons/Cambodia.png";
import iconMyanmar from "~/public/static/icons/Myanmar.png";
import iconLaos from "~/public/static/icons/Laos.png";
import iconChina from "~/public/static/icons/China.png";

import imagesicon from "~/public/product-express/NoImage.png";
import axios from "axios";
import HeaderSubmitCreate from "@/components/pages/partners/brand/create/handleSubmitCreate";
import AutoCompleteBrand from "@/components/pages/partners/brand/autoCompleteCreate";

const ImgStyled = styled("img")(({ theme }) => ({
  width: "25%",
  height: "25%",
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ImgIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "16px",
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
    fontSize: "16px",
  },
}));

export default function edit() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const token = useSelector((state) => state.session.token);
  const router = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    CompanyId: "",
    Thai: "",
    Eng: "",
    Cambodia: "",
    Myanmar: "",
    Laos: "",
    China: "",
    DetailThai: "",
    DetailEng: "",
    DetailCambodia: "",
    DetailMyanmar: "",
    DetailLaos: "",
    DetailChina: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    HeaderSubmitCreate({
      values,
      setValues,
      fetcherWithToken,
      file,
      token,
      setImgSrc,
      setfile,
      setLoading,
      dispatch,
    });
  };

  const [imgSrc, setImgSrc] = useState(null);
  const [file, setfile] = useState([]);

  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      setfile(files[0]);
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const resetImage = async () => {
    setfile([]);
    setImgSrc(imagesicon.src);
  };

  if (!currentUser) return <Main />;

  return (
    <div className="main home">
      <Helmet>
        <title>เพิ่มแบรนด์สินค้า</title>
      </Helmet>

      <h1 className="d-none">เพิ่มแบรนด์สินค้า - admin</h1>
      <Container sx={{ pb: "8%", pt: "4%" }}>
        <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
          เพิ่มแบรนด์สินค้า
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {file.length === 0 ? (
                  <ImgStyled src={imagesicon.src} alt={imagesicon.src} />
                ) : (
                  <ImgStyled src={imgSrc} alt="Profile Pic" />
                )}

                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                    sx={{ fontSize: "16px" }}
                  >
                    เปลี่ยนรูปภาพที่แสดง
                    <input
                      hidden
                      type="file"
                      onChange={onChange}
                      accept="image/png, image/jpeg"
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={() => resetImage()}
                    sx={{ fontSize: "16px" }}
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography
                    variant="body2"
                    sx={{ marginTop: 5, fontSize: "14px", color: "red" }}
                  >
                    แนะนำให้เป็นไฟล์ png ขนาด 348x348 เท่านั้น.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <AutoCompleteBrand
              fetcherWithToken={fetcherWithToken}
              setValues={setValues}
              values={values}
            />
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: "16px", color: "purple" }}
            >
              ชื่อแบรนด์
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
                          <ImgIcon
                            src={iconCambodia.src}
                            alt={iconCambodia.src}
                          />
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
                          <ImgIcon
                            src={iconMyanmar.src}
                            alt={iconMyanmar.src}
                          />
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
            {/* --------------------------------------------------------------------- */}

            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: "16px", color: "purple" }}
            >
              รายละเอียดแบรนด์
            </Typography>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
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
                </ListItem>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor="DetailCambodia"
                      sx={{ fontSize: "16px" }}
                    >
                      รายละเอียดกัมพูชา
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="DetailCambodia"
                      value={values.DetailCambodia}
                      onChange={handleChange("DetailCambodia")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon
                            src={iconCambodia.src}
                            alt={iconCambodia.src}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor="DetailMyanmar"
                      sx={{ fontSize: "16px" }}
                    >
                      รายละเอียดภาษาพม่า
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="DetailMyanmar"
                      value={values.DetailMyanmar}
                      onChange={handleChange("DetailMyanmar")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon
                            src={iconMyanmar.src}
                            alt={iconMyanmar.src}
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
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
                </ListItem>
              </Box>
            </Grid>
            <LoadingButton
              fullWidth
              variant="contained"
              type="submit"
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              ยืนยัน
            </LoadingButton>
          </Box>
        </form>
      </Container>
    </div>
  );
}
