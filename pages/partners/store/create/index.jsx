/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setLoading } from "@/lib/store/loading";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
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
import HeaderSubmitCreate from "@/components/pages/partners/store/create/handleSubmitCreate";

const ImgStyled = styled("img")(({ theme }) => ({
  width: "20%",
  height: "20%",
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
  marginLeft: theme.spacing(1.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
    fontSize: "16px",
  },
}));

export default function create() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const token = useSelector((state) => state.session.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    status: true,
    phone: "",

    Thai: "",
    Eng: "",
    Cambodia: "",
    Myanmar: "",
    Laos: "",
    China: "",

    AddressThai: "",
    AddressEng: "",
    AddressCambodia: "",
    AddressMyanmar: "",
    AddressLaos: "",
    AddressChina: "",
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
      fileCard,
      fileBookBank,
      token,

      setImgSrcCard,
      setfileCard,
      setImgSrcBookBank,
      setfileBookBank,

      setLoading,
      dispatch,
    });
  };

  const [imgSrcCard, setImgSrcCard] = useState(null);
  const [fileCard, setfileCard] = useState([]);

  const [imgSrcBookBank, setImgSrcBookBank] = useState(null);
  const [fileBookBank, setfileBookBank] = useState([]);

  const onChangeCard = (file) => {
    console.log("onChangeCard");
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      setfileCard(files[0]);
      reader.onload = () => setImgSrcCard(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const onChangeBookBank = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      setfileBookBank(files[0]);
      reader.onload = () => setImgSrcBookBank(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const resetImageCard = async () => {
    setfileCard([]);
    setImgSrcCard(imagesicon.src);
  };

  const resetImageBookBank = async () => {
    setfileBookBank([]);
    setImgSrcBookBank(imagesicon.src);
  };

  if (!currentUser) return <Main />;

  return (
    <div className="main home">
      <Helmet>
        <title>เพิ่มพาร์ทเนอร์ (store)</title>
      </Helmet>

      <h1 className="d-none">เพิ่มพาร์ทเนอร์ (store) - admin</h1>
      <Container sx={{ pb: "8%", pt: "2%" }}>
        <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
          เพิ่มพาร์ทเนอร์ (store)
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {fileCard.length === 0 ? (
                  <ImgStyled src={imagesicon.src} alt={imagesicon.src} />
                ) : (
                  <ImgStyled src={imgSrcCard} alt="Profile Pic" />
                )}

                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                    sx={{ fontSize: "16px" }}
                  >
                    เพิ่มรูปบัตร ปปช.
                    <input
                      hidden
                      type="file"
                      onChange={onChangeCard}
                      accept="image/png, image/jpeg"
                      id="account-settings-upload-image"
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={() => resetImageCard()}
                    sx={{ fontSize: "16px" }}
                  >
                    Reset
                  </ResetButtonStyled>
                </Box>
                {fileBookBank.length === 0 ? (
                  <ImgStyled src={imagesicon.src} alt={imagesicon.src} />
                ) : (
                  <ImgStyled src={imgSrcBookBank} alt="Profile Pic" />
                )}

                <Box>
                  <ButtonStyled
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image2"
                    sx={{ fontSize: "16px" }}
                  >
                    เพิ่มรูป bookbank
                    <input
                      hidden
                      type="file"
                      onChange={(e) => onChangeBookBank(e)}
                      accept="image/png, image/jpeg"
                      id="account-settings-upload-image2"
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color="error"
                    variant="outlined"
                    onClick={() => resetImageBookBank()}
                    sx={{ fontSize: "16px" }}
                  >
                    Reset
                  </ResetButtonStyled>
                </Box>
              </Box>
            </Grid>

            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: "16px", color: "purple" }}
            >
              ข้อมูลทั่วไป
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="name" sx={{ fontSize: "16px" }}>
                    ชื่อ พาร์ทเนอร์
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "16px" }}
                    id="name"
                    value={values.name}
                    onChange={handleChange("name")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="openmoji:european-name-badge" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="phone" sx={{ fontSize: "16px" }}>
                    เบอร์โทรศัพท์
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "16px" }}
                    id="phone"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="flat-color-icons:phone" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItem disablePadding>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="email" sx={{ fontSize: "16px" }}>
                    email (สำหรับ Login)
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "16px" }}
                    id="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="fxemoji:email" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                  <InputLabel htmlFor="password" sx={{ fontSize: "16px" }}>
                    password
                  </InputLabel>
                  <Input
                    sx={{ fontSize: "16px" }}
                    id="password"
                    value={values.password}
                    onChange={handleChange("password")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon icon="emojione:locked-with-key" />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </Box>
            <div
              display="flex"
              style={{
                alignItems: "center",
                justifyContent: "center",
                justifyItems: "center",
              }}
            >
              <Switch
                color="secondary"
                onChange={(e) =>
                  setValues({ ...values, status: e.target.checked })
                }
                checked={values.status}
              />

              {values.status ? "ONLINE" : "OFFLINE"}
            </div>
            {/* _________________________________________________________ */}

            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: "16px", color: "red" }}
            >
              **ชื่อพาร์ทเนอร์ (store) ที่จะแสดงให้ลูกค้าเห็น
            </Typography>

            <Grid item xs={12} sx={{ marginBottom: 3 }}>
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
            </Grid>
            {/* --------------------------------------------------------------------- */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{ mt: "16px", color: "red" }}
            >
              **ที่อยู่ของบริษัทแต่ละภาษาตามที่ลูกค้าเห็น
            </Typography>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="AddressThai" sx={{ fontSize: "16px" }}>
                      ที่อยู่ภาษาไทย
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressThai"
                      value={values.AddressThai}
                      onChange={handleChange("AddressThai")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon src={iconThai.src} alt={iconThai.src} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="AddressEng" sx={{ fontSize: "16px" }}>
                      ที่อยู่ภาษาอังกฤษ
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressEng"
                      value={values.AddressEng}
                      onChange={handleChange("AddressEng")}
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
                      htmlFor="AddressCambodia"
                      sx={{ fontSize: "16px" }}
                    >
                      ที่อยู่กัมพูชา
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressCambodia"
                      value={values.AddressCambodia}
                      onChange={handleChange("AddressCambodia")}
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
                      htmlFor="AddressMyanmar"
                      sx={{ fontSize: "16px" }}
                    >
                      ที่อยู่ภาษาพม่า
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressMyanmar"
                      value={values.AddressMyanmar}
                      onChange={handleChange("AddressMyanmar")}
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
                    <InputLabel htmlFor="AddressLaos" sx={{ fontSize: "16px" }}>
                      ที่อยู่ภาษาลาว
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressLaos"
                      value={values.AddressLaos}
                      onChange={handleChange("AddressLaos")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon src={iconLaos.src} alt={iconLaos.src} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel
                      htmlFor="AddressChina"
                      sx={{ fontSize: "16px" }}
                    >
                      ที่อยู่ภาษาจีน
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="AddressChina"
                      value={values.AddressChina}
                      onChange={handleChange("AddressChina")}
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
            {/* ________________________________________________ */}
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
