/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useRouter } from "next/router";
import numeral from "numeral";
import Image from "next/image";
import { styled } from "@mui/material/styles";
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
} from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { fetcherWithToken, currentUser } = useCurrentUser();
  if (!currentUser) {
    return <div></div>;
  }
  const [isPreorderId, setPreOrderId] = useState([]);
  const [isPreOrders, setPreOrders] = useState([]);
  useEffect(() => {
    fetcherPreOrders();
  }, [currentUser]);

  const fetcherPreOrders = async () => {
    const urlPreOrders = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/partner/${id}`;
    const urlMembers = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`;
    let preorders = [];
    let members = [];
    let newPreOrders = [];
    await fetcherWithToken(urlPreOrders).then(async (json) => {
      preorders = json.data;
    });

    await fetcherWithToken(urlMembers).then(async (json) => {
      members = json.data;
    });

    const filterStatus = preorders.filter(
      (item) => item.po_status === "ตรวจสอบสำเร็จ"
    );

    filterStatus.forEach((element) => {
      const finded = members.find((item) => item._id === element.po_member_id);
      if (finded) {
        newPreOrders.push({
          ...element,
          members_name: finded.members_name,
          members_phone: finded.members_phone,
          members_address1: finded.members_address1,
          members_address2: finded.members_address2,
          members_city: finded.members_city,
          members_nationality: finded.members_nationality,
          members_zip: finded.members_zip,
        });
      }
    });

    const idPreorder = [];
    filterStatus.forEach((element) => {
      idPreorder.push({ _id: element._id, po_number: element.po_number });
    });
    setPreOrderId(idPreorder);
    setPreOrders(newPreOrders);
  };

  const cutaroundPreOrder = async () => {
    const data = {
      cutaround_partner_id: id,
      cutaround_transaction: currentUser.admin_name,
      cutaround_timestamp: dayjs(Date.now()).format(),
    };
    const urlCutAround = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cut_around`;

    const cutaroundId = "";
    await fetcherWithToken(urlCutAround, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(async (json) => {
      cutaroundId = json.CutAround;
    });
    console.log(cutaroundId);

    isPreOrders.forEach(async (element) => {
      const timestamp = [];
      element.po_timestamp.map(async (item) => {
        timestamp.push({ ...item });
      });
      timestamp.push({
        name: "ตัดรอบการจัดส่งแล้ว",
        marklist: currentUser.admin_name,
        timestamp: dayjs(Date.now()).format(),
      });
      const dataCutAround = {
        po_cutaround_id: cutaroundId,
        po_status: "ตัดรอบการจัดส่งแล้ว",
        po_timestamp: timestamp,
      };
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${element._id}`;
      await fetcherWithToken(url, {
        method: "PUT",
        body: JSON.stringify(dataCutAround),
      })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "ยืนยันการตัดรอบสินค้า",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            router.push("/report/cut-around");
          }, 1500);
        })
        .catch(() => {
          Swal.fire({
            icon: "success",
            title: "ไม่สามารถตัดรอบสินค้านี้ได้",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
    console.log(isPreOrders);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
        mt={4}
      >
        <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
          รายงานทั้งหมด
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ fontSize: "14px" }}
          onClick={cutaroundPreOrder}
        >
          ตัดรอบรายการสินค้านี้ทั้งหมด
        </Button>
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
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <div>เลขที่ทำรายการ : {preorder.po_number}</div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {preorder.po_status === "ตรวจสอบสำเร็จ" && (
                        <Chip label={preorder.po_status} color="success" />
                      )}
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
                              (sum, value) => sum + value.Price * value.amount,
                              0
                            )
                          ).format("0,0.00")}
                        </Item>
                      </Grid>
                    </Grid>
                  ))}
                  <Item sx={{ width: "100%", fontSize: "14px" }}>
                    ผลรวมทั้งหมด: {numeral(preorder.po_total).format("0,0.00")}
                  </Item>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} mt={2}>
              <Box position="sticky" top="110px">
                <Item sx={{ marginBottom: 4 }}>
                  <a style={{ fontSize: 16, borderBottom: "3px solid purple" }}>
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
                    <div key={time.timestamp}>
                      <Typography variant="h6" align="left">
                        สถานะ : {time.name}
                      </Typography>
                      {time.marklist && (
                        <Typography variant="h6" align="left">
                          ผู้ทำรายการ : {time.marklist}
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
                  ))}
                </Item>
              </Box>
            </Grid>
          </Grid>
        ))}
    </Container>
  );
}
