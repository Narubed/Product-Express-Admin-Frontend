/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useCurrentUser from "@/lib/hook/useCurrentUser";
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
  const { query } = router;
  console.log(query);
  const [values, setValues] = useState({
    Thai: "",
    Eng: "",
    Cambodia: "",
    Myanmar: "",
    Laos: "",
    China: "",
    TypeImage: "ไม่มี",
  });
  const [isTypes, setTypes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetcherTypes();
    }
  }, [currentUser]);

  const fetcherTypes = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type/${query.id}`;
    await fetcherWithToken(url)
      .then((json) => {
        console.log(json.data);
        setTypes(json.data);
        setValues({
          ...values,
          TypeImage: json.data.type_image,
          Thai: json.data.type_name.Thai,
          Eng: json.data.type_name.Eng,
          Cambodia: json.data.type_name.Cambodia,
          Myanmar: json.data.type_name.Myanmar,
          Laos: json.data.type_name.Laos,
          China: json.data.type_name.China,
        });
      })
      .catch(() => {
        router.push("/404");
        setTypes([]);
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(file.length);
    console.log(values);
    if (
      !values.Thai ||
      !values.Eng ||
      !values.Cambodia ||
      !values.Myanmar ||
      !values.Laos ||
      !values.China
    ) {
      Swal.fire({
        icon: "error",
        title: "กรอกข้อมูลไม่ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = new FormData();
      formData.append("image", file);
      Swal.fire({
        title: "ยืนยันการทำรายการ?",
        text: "กรุณาเช็คข้อมูลก่อนยืนยันการเพิ่มข้อมูล!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {};
          if (file.length !== 0) {
            const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/type`;

            await fetcherWithToken(urlImage, {
              method: "DELETE",
              body: JSON.stringify({ images: values.TypeImage }),
            }).catch(() => {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถลบข้อมูลนี้ได้",
                showConfirmButton: false,
                timer: 1500,
              });
            });

            const responseFile = await axios({
              method: "POST",
              url: urlImage,
              data: formData,
              headers: {
                "Content-Type": "application/json",
                "auth-token": `Bearer ${token}`,
              },
            });
            data = {
              type_image: responseFile.data.filename,
              type_name: {
                Thai: values.Thai,
                Eng: values.Eng,
                Cambodia: values.Cambodia,
                Myanmar: values.Myanmar,
                Laos: values.Laos,
                China: values.China,
              },
            };
          } else {
            data = {
              type_name: {
                Thai: values.Thai,
                Eng: values.Eng,
                Cambodia: values.Cambodia,
                Myanmar: values.Myanmar,
                Laos: values.Laos,
                China: values.China,
              },
            };
          }
          const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type/${query.id}`;
          await fetcherWithToken(url, {
            method: "PUT",
            body: JSON.stringify(data),
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                router.push("/products/types/");
              }, 1500);
            })
            .catch(() => {
              Swal.fire({
                icon: "error",
                title: "ไม่สามารถเพิ่มข้อมูลนี้ได้",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    }
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

  if (!currentUser) return <Main />;

  return (
    <div className="main home">
      <Helmet>
        <title>แก้ไขประเภทสินค้า</title>
      </Helmet>

      <h1 className="d-none">แก้ไขประเภทสินค้า - admin</h1>
      <Container sx={{ pb: "8%", pt: "4%" }}>
        <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
          แก้ไขประเภทสินค้า
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
                  values.TypeImage === "ไม่มี" ? (
                    <ImgStyled src={imagesicon.src} alt={imagesicon.src} />
                  ) : (
                    <ImgStyled
                      src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/type/${values.TypeImage}`}
                      alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/type/${values.TypeImage}`}
                    />
                  )
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

                  <Typography
                    variant="body2"
                    sx={{ marginTop: 5, fontSize: "14px", color: "red" }}
                  >
                    แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาด 348x348 เท่านั้น.
                  </Typography>
                </Box>
              </Box>
            </Grid>

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
