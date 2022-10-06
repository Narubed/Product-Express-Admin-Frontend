/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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
  Card,
  CardContent,
  CardMedia,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import { CardActionArea } from "@mui/material";
import iconEng from "~/public/static/icons/Eng.png";
import iconThai from "~/public/static/icons/Thai.png";
import iconCambodia from "~/public/static/icons/Cambodia.png";
import iconMyanmar from "~/public/static/icons/Myanmar.png";
import iconLaos from "~/public/static/icons/Laos.png";
import iconChina from "~/public/static/icons/China.png";

const ImgIcon = styled("img")(({ theme }) => ({
  width: "24px",
  height: "16px",
  borderRadius: theme.shape.borderRadius,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function componentName({ isCardSizeDetail, setCardSizeDetail }) {
  const [open, setOpen] = useState(false);
  const [isSize, setSize] = useState({
    Thai: "",
    Eng: "",
    Cambodia: "",
    Myanmar: "",
    Laos: "",
    China: "",

    Cost: 0,
    Price: 0,
    OldPrice: 0,
    NBA: 0,
    Stock: 0,
  });
  console.log(isCardSizeDetail);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSizeDetail = (prop) => (event) => {
    setSize({ ...isSize, [prop]: event.target.value });
  };

  const handleSubmitSizeDetail = (e) => {
    const newValues = isCardSizeDetail;
    newValues.push(isSize);
    setCardSizeDetail(newValues);
    setSize({
      Thai: "",
      Eng: "",
      Cambodia: "",
      Myanmar: "",
      Laos: "",
      China: "",

      Cost: 0,
      Price: 0,
      OldPrice: 0,
      NBA: 0,
      Stock: 0,
    });
    setOpen(false);
  };

  const onClickCancelCard = (props) => {
    const filterIndex = isCardSizeDetail.filter(
      (item, index) => index !== props.index
    );
    setCardSizeDetail(filterIndex);
  };

  return (
    <div style={{ paddingBottom: "16px" }}>
      <Button
        color="secondary"
        sx={{ fontSize: "14px" }}
        onClick={handleClickOpen}
      >
        เพิ่มรายละเอียดของขนาดสินค้า
      </Button>
      <Grid container spacing={2}>
        {isCardSizeDetail.length !== 0 &&
          isCardSizeDetail.map((item, index) => (
            <Grid item xs={6} sm={4} md={4} lg={4} key={item.Thai}>
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      รายละเอียดขนาดของสินค้า
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ราคาต้นทุน:{item.Cost} <br />
                      ราคาขาย: {item.Price} <br />
                      กำไรบริษัท: {item.NBA} <br />
                      สต๊อก: {item.Stock} <br />
                      ราคาก่อนขาย: {item.OldPrice} <br />
                      Thai: {item.Thai} <br />
                      Eng: {item.Eng}
                      <br />
                      Cambodia: {item.Cambodia}
                      <br />
                      Myanmar: {item.Myanmar}
                      <br />
                      Laos: {item.Laos}
                      <br />
                      China: {item.China}
                      <br />
                    </Typography>
                  </CardContent>
                  <Button
                    onClick={() => onClickCancelCard({ item, index })}
                    color="error"
                    variant="outlined"
                  >
                    ยกเลิกการ์ดนี้
                  </Button>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>กรุณากรอกรายละเอียดให้ครบ</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="Cost" sx={{ fontSize: "16px" }}>
                      ราคาต้นทุน
                    </InputLabel>
                    <Input
                      type="number"
                      sx={{ fontSize: "16px" }}
                      id="Cost"
                      value={isSize.Cost}
                      onChange={handleChangeSizeDetail("Cost")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon icon="carbon:cost" width="24" height="24" />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="Price" sx={{ fontSize: "16px" }}>
                      ราคาขาย
                    </InputLabel>
                    <Input
                      type="number"
                      sx={{ fontSize: "16px" }}
                      id="Price"
                      value={isSize.Price}
                      onChange={handleChangeSizeDetail("Price")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            icon="entypo:price-tag"
                            width="24"
                            height="24"
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
                    <InputLabel htmlFor="NBA" sx={{ fontSize: "16px" }}>
                      กำไรบริษัท NBA
                    </InputLabel>
                    <Input
                      type="number"
                      sx={{ fontSize: "16px" }}
                      id="NBA"
                      value={isSize.NBA}
                      onChange={handleChangeSizeDetail("NBA")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            icon="emojione-monotone:japanese-post-office"
                            width="24"
                            height="24"
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="Stock" sx={{ fontSize: "16px" }}>
                      คงเหลือในสต๊อก
                    </InputLabel>
                    <Input
                      type="number"
                      sx={{ fontSize: "16px" }}
                      id="Stock"
                      value={isSize.Stock}
                      onChange={handleChangeSizeDetail("Stock")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon
                            icon="carbon:data-base"
                            width="24"
                            height="24"
                          />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
              </Box>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="OldPrice" sx={{ fontSize: "16px" }}>
                  ราคาก่อนขาย (เอาไว้ทำส่วนลด กรณีลดจากจะเอาราคานี้ขึ้นก่อน)
                </InputLabel>
                <Input
                  type="number"
                  sx={{ fontSize: "16px" }}
                  id="OldPrice"
                  value={isSize.OldPrice}
                  onChange={handleChangeSizeDetail("OldPrice")}
                  startAdornment={
                    <InputAdornment position="start">
                      <Icon
                        icon="foundation:burst-sale"
                        width="24"
                        height="24"
                      />
                    </InputAdornment>
                  }
                />
              </FormControl>

              {/* ____________________________________________? */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="Thai" sx={{ fontSize: "16px" }}>
                      ชื่อขนาดภาษาไทย
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="Thai"
                      value={isSize.Thai}
                      onChange={handleChangeSizeDetail("Thai")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon src={iconThai.src} alt={iconThai.src} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="Eng" sx={{ fontSize: "16px" }}>
                      ชื่อขนาดภาษาอังกฤษ
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="Eng"
                      value={isSize.Eng}
                      onChange={handleChangeSizeDetail("Eng")}
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
                      ชื่อขนาดกัมพูชา
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="Cambodia"
                      value={isSize.Cambodia}
                      onChange={handleChangeSizeDetail("Cambodia")}
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
                      ชื่อขนาดภาษาพม่า
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="Myanmar"
                      value={isSize.Myanmar}
                      onChange={handleChangeSizeDetail("Myanmar")}
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
                      ชื่อขนาดภาษาลาว
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="Laos"
                      value={isSize.Laos}
                      onChange={handleChangeSizeDetail("Laos")}
                      startAdornment={
                        <InputAdornment position="start">
                          <ImgIcon src={iconLaos.src} alt={iconLaos.src} />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="China" sx={{ fontSize: "16px" }}>
                      ชื่อขนาดภาษาจีน
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="China"
                      value={isSize.China}
                      onChange={handleChangeSizeDetail("China")}
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmitSizeDetail}
            variant="contained"
            color="secondary"
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
