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
import { styled } from "@mui/material/styles";

import Main from "@/components/main";

import axios from "axios";

import FormInput from "~/components/pages/products/edit/formInput";
import ChangeImages from "~/components/pages/products/create/changeImages";
import CardSizeDetail from "~/components/pages/products/edit/cardSizeDetail";
import HandleSubmitEdit from "@/components/pages/products/edit/handleSubmitEdit";

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
    fontSize: "16px",
  },
}));

export default function edit() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const token = useSelector((state) => state.session.token);
  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  const [values, setValues] = useState({
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

    SizeNameThai: "",
    SizeNameEng: "",
    SizeNameCambodia: "",
    SizeNameMyanmar: "",
    SizeNameLaos: "",
    SizeNameChina: "",

    BrandId: "",
    Status: true,
    TypeId: [],
    Tag: "",
  });

  const [isFile, setFile] = useState([]);
  const [isCardSizeDetail, setCardSizeDetail] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (currentUser) {
      fetcherProducts();
    }
  }, [currentUser]);

  const fetcherProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products/${query.id}`;
    await fetcherWithToken(url)
      .then((json) => {
        setFile(json.data.product_images);
        setCardSizeDetail(json.data.product_size_detail);

        setValues({
          ...values,
          Thai: json.data.product_name.Thai,
          Eng: json.data.product_name.Eng,
          Cambodia: json.data.product_name.Cambodia,
          Myanmar: json.data.product_name.Myanmar,
          Laos: json.data.product_name.Laos,
          China: json.data.product_name.China,

          DetailThai: json.data.product_detail.Thai,
          DetailEng: json.data.product_detail.Eng,
          DetailCambodia: json.data.product_detail.Cambodia,
          DetailMyanmar: json.data.product_detail.Myanmar,
          DetailLaos: json.data.product_detail.Laos,
          DetailChina: json.data.product_detail.China,

          SizeNameThai: json.data.product_size_name.Thai,
          SizeNameEng: json.data.product_size_name.Eng,
          SizeNameCambodia: json.data.product_size_name.Cambodia,
          SizeNameMyanmar: json.data.product_size_name.Myanmar,
          SizeNameLaos: json.data.product_size_name.Laos,
          SizeNameChina: json.data.product_size_name.China,

          BrandId: json.data.product_brand_id,
          Status: true,
          TypeId: json.data.product_type_id,
          Tag: json.data.product_tag,
        });
      })
      .catch((err) => {
        router.push("/404");
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onChange = async (file) => {
    const { files } = file.target;

    if (files && files.length !== 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/product`;
      const responseFile = await axios({
        method: "POST",
        url: urlImage,
        data: formData,
        headers: {
          "Content-Type": "application/json",
          "auth-token": `Bearer ${token}`,
        },
      });
      const images = isFile;
      images.push(responseFile.data.filename);
      console.log(images);
      setFile(images);
      setCount(count + 1);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    HandleSubmitEdit({
      values,
      setValues,
      fetcherWithToken,
      token,
      isFile,
      setFile,
      dispatch,
      setLoading,
      isCardSizeDetail,
      router,
      query,
    });
    console.log(values);
    console.log(isFile);
    console.log(isCardSizeDetail);
  };

  if (!currentUser) return <Main />;

  return (
    <div className="main home">
      <Helmet>
        <title>แก้ไขสินค้า</title>
      </Helmet>

      <h1 className="d-none">แก้ไขสินค้า - admin</h1>
      <Container sx={{ pb: "8%", pt: "4%" }}>
        <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
          แก้ไขสินค้า
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* <form> */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <ButtonStyled
                    color="secondary"
                    component="label"
                    variant="contained"
                    htmlFor="account-settings-upload-image"
                    sx={{ fontSize: "16px" }}
                  >
                    เพิ่มรูปภาพสินค้า
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
                    แนะนำให้เป็นไฟล์ png หรือ jpeg ขนาด 300x338 เท่านั้น. <br />
                    หากลบรูปเเล้ว รูปจะถูกลบออกจากฐานข้อมูลทันที
                    จะไม่สามารถกู้คืนมาได้ กรุณาตรวจสอบก่อนลบ !!
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                {isFile.map((row) => (
                  <Grid item xs={6} sm={4} md={4} lg={4} key={row}>
                    <ChangeImages
                      row={row}
                      isFile={isFile}
                      setFile={setFile}
                      fetcherWithToken={fetcherWithToken}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <FormInput
              values={values}
              handleChange={handleChange}
              fetcherWithToken={fetcherWithToken}
              setValues={setValues}
              query={query}
            />

            <CardSizeDetail
              isCardSizeDetail={isCardSizeDetail}
              setCardSizeDetail={setCardSizeDetail}
            />

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
