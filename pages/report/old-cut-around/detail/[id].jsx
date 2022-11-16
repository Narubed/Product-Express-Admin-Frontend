/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from "react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useRouter } from "next/router";
import numeral from "numeral";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useReactToPrint } from "react-to-print";
import Main from "@/components/main";
// material
import {
  Button,
  Stack,
  Typography,
  Container,
  Card,
  Chip,
  Grid,
  CardContent,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import PrintInvoiceFullA4 from "@/components/pages/report/old-cut-around/PrintInvoiceFullA4";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Detail() {
  const componentToPrintFullA4 = useRef(null);
  const router = useRouter();
  const { id, partner_name } = router.query;
  console.log(id, partner_name);
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isPreOrders, setPreOrders] = useState([]);
  const [isPreOrder, setPreOrder] = useState({});
  if (!currentUser) {
    return (
      <div>
        <Main />
      </div>
    );
  }
  useEffect(() => {
    if (currentUser) {
      fetchCutArount();
    }
  }, [currentUser]);

  const fetchCutArount = async () => {
    const urlCutAround = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/cut-around/${id}`;

    const urlMembers = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`;
    let members = [];
    let preorders = [];

    await fetcherWithToken(urlMembers).then(async (json) => {
      members = json.data;
    });

    await fetcherWithToken(urlCutAround).then(async (json) => {
      console.log(json.data);
      preorders = json.data;
    });
    const newPreorders = [];
    preorders.forEach((element) => {
      const findMember = members.find(
        (member) => member._id === element.po_member_id
      );
      if (findMember) {
        newPreorders.push({
          ...element,
          members_name: findMember.members_name,
          members_phone: findMember.members_phone,
          members_address1: findMember.members_address1,
          members_address2: findMember.members_address2,
          members_city: findMember.members_city,
          members_nationality: findMember.members_nationality,
          members_zip: findMember.members_zip,
        });
      }
    });
    console.log(newPreorders);
    setPreOrders(newPreorders);
  };

  const handlePrint2 = useReactToPrint({
    content: () => componentToPrintFullA4.current,
  });

  const handlePrint = async (req) => {
    await setPreOrder(req);
    handlePrint2();
  };

  return (
    <div>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          mt={4}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
            รายละเอียดการตัดรอบ (ย้อนหลัง)
          </Typography>
        </Stack>
        {isPreOrders.length !== 0 &&
          isPreOrders.map((preorder, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={8} mt={2}>
                <Card
                  key={preorder._id}
                  sx={{
                    mb: 2,
                    bgcolor: "#FFFFFD",
                    boxShadow: "1px 2px 1px 2px #888888",
                  }}
                >
                  <CardContent>
                    <div
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                    >
                      <div>เลขที่ทำรายการ : {preorder.po_number}</div>
                      <div>เลขที่ตัดรอบ : {preorder.po_cutaround_id}</div>

                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {preorder.po_status === "ตัดรอบการจัดส่งแล้ว" && (
                          <Chip label={preorder.po_status} color="secondary" />
                        )}
                        <IconButton onClick={() => handlePrint(preorder)}>
                          <Icon icon="flat-color-icons:print" width="28px" />
                        </IconButton>

                        {/* <ReactToPrint
                        trigger={() => (
                          <IconButton>
                            <Icon icon="flat-color-icons:print" width="28px" />
                          </IconButton>
                        )}
                        content={() => componentToPrintFullA4.current}
                      /> */}
                      </div>
                    </div>
                    {preorder?.po_detail?.map((item) => (
                      <Grid container spacing={2} key={item._id}>
                        <Grid item xs={12} sm={2}>
                          <Item>
                            <Image
                              style={{ borderRadius: "5px" }}
                              src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item.product_images[0]}`}
                              alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item.product_images[0]}`}
                              width="100%"
                              height="100%"
                            />
                          </Item>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                          <a>{item.product_name.Thai}</a>
                          {item.product_select_detail.map((select) => (
                            <Grid item sx={{ mb: 2 }} key={select.Thai}>
                              <Grid item xs={12}>
                                {item.product_size_name.Thai} :{" "}
                                {item.product_size_name.Thai !== "ไม่มี" &&
                                  select.Thai}{" "}
                                x {select.amount}
                                <br /> ราคาต่อชิ้น :{" "}
                                {numeral(select.Price).format("0,0.00")} รวม :{" "}
                                {numeral(select.Price * select.amount).format(
                                  "0,0.00"
                                )}{" "}
                                บาท
                              </Grid>
                            </Grid>
                          ))}
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={2}
                          sx={{
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          <Item sx={{ width: "100%", fontSize: "14px" }}>
                            ราคารวม:{" "}
                            {numeral(
                              item.product_select_detail.reduce(
                                (sum, value) =>
                                  sum + value.Price * value.amount,
                                0
                              )
                            ).format("0,0.00")}
                          </Item>
                        </Grid>
                      </Grid>
                    ))}
                    <Item sx={{ width: "100%", fontSize: "14px" }}>
                      ผลรวมทั้งหมด:{" "}
                      {numeral(preorder.po_total).format("0,0.00")}
                    </Item>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4} mt={2}>
                <Box position="sticky" top="110px">
                  <Item sx={{ marginBottom: 4 }}>
                    <a
                      style={{ fontSize: 16, borderBottom: "3px solid purple" }}
                    >
                      ข้อมูลลูกค้าที่สั่งสินค้า
                    </a>
                    <Typography variant="h6" m={2} align="left">
                      ชื่อลูกค้า : {preorder.members_name}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      เบอร์โทรศัพท์: {preorder.members_phone}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      Address1 : {preorder.members_address1}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      Addredd2 : {preorder.members_address2}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      City : {preorder.members_city}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      Nationality : {preorder.members_nationality}
                    </Typography>
                    <Typography variant="h6" m={2} align="left">
                      Zip: {preorder.members_zip}
                    </Typography>
                  </Item>
                  <Item sx={{ marginBottom: 4 }}>
                    <a style={{ fontSize: 16 }}>ข้อมูลการทำรายการ</a>
                    {preorder.po_timestamp?.map((time) => (
                      <>
                        <div key={time.timestamp}>
                          <Typography variant="h6" align="left">
                            สถานะ: {time.name}
                          </Typography>
                          {time.marklist && (
                            <Typography variant="h6" align="left">
                              ผู้ทำรายการ: {time.marklist}
                            </Typography>
                          )}

                          <Typography
                            variant="h6"
                            pb={1}
                            align="left"
                            sx={{ borderBottom: "3px solid purple" }}
                          >
                            วันที่ทำรายการ :{" "}
                            {dayjs(time.timestamp)
                              .locale("th")
                              .add(543, "year")
                              .format("DD MMMM YYYY HH:mm")}
                          </Typography>
                        </div>
                      </>
                    ))}
                  </Item>
                </Box>
              </Grid>
            </Grid>
          ))}
        <PrintInvoiceFullA4
          componentToPrintFullA4={componentToPrintFullA4}
          isReport={isPreOrder}
        />
      </Container>
    </div>
  );
}

export default Detail;
