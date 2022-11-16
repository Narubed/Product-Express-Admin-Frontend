/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useRouter } from "next/router";
import numeral from "numeral";
import { styled } from "@mui/material/styles";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import "dayjs/locale/th";

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

  const { currentUser, fetcherWithToken } = useCurrentUser();
  if (!currentUser) return <Main />;
  const [isPreOrders, setPreOrders] = useState({});
  useEffect(() => {
    if (currentUser) {
      fetcherPreOrders();
    }
  }, [currentUser]);

  const fetcherPreOrders = async () => {
    const urlPreOrders = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${id}`;
    const urlPartners = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    const urlMembers = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`;
    let preorders = {};
    let partners = [];
    let members = [];
    await fetcherWithToken(urlPreOrders).then(async (json) => {
      preorders = json.data;
    });
    await fetcherWithToken(urlPartners).then(async (json) => {
      partners = json.data;
    });
    await fetcherWithToken(urlMembers).then(async (json) => {
      members = json.data;
    });
    let newPreOrders = {};

    const findPartnerName = partners.find(
      (item) => item._id === preorders.po_partner_id
    );
    const findMemberName = members.find(
      (item) => item._id === preorders.po_member_id
    );

    newPreOrders = { ...preorders, ...findPartnerName, ...findMemberName };
    console.log(newPreOrders);
    setPreOrders(newPreOrders);
  };

  return (
    <div>
      {isPreOrders && (
        <Container>
          <Link href="/">
            <Button variant="outlined" sx={{ fontSize: "16px" }}>
              {"  <  "} ย้อนกลับ
            </Button>
          </Link>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} mt={4}>
              <Card
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
                    <div>เลขที่ทำรายการ : {isPreOrders.po_number}</div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {isPreOrders.po_status === "รอชำระเงิน" && (
                        <Chip label={isPreOrders.po_status} color="primary" />
                      )}
                      {(isPreOrders.po_status === "ผู้ใช้ยกเลิก" ||
                        isPreOrders.po_status === "ผู้ดูแลยกเลิก") && (
                        <Chip label={isPreOrders.po_status} color="error" />
                      )}
                      {isPreOrders.po_status === "รอตรวจสอบ" && (
                        <Chip label={isPreOrders.po_status} color="secondary" />
                      )}
                      {isPreOrders.po_status === "ตรวจสอบสำเร็จ" && (
                        <Chip label={isPreOrders.po_status} color="success" />
                      )}
                    </div>
                  </div>

                  {isPreOrders?.po_detail?.map((item) => (
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
                    ผลรวมทั้งหมด:{" "}
                    {numeral(isPreOrders.po_total).format("0,0.00")}
                  </Item>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4} mt={4}>
              <Item sx={{ marginBottom: 4 }}>
                <a style={{ fontSize: 16, borderBottom: "3px solid purple" }}>
                  ข้อมูลลูกค้าที่สั่งสินค้า
                </a>
                <Typography variant="h6" m={2} align="left">
                  ชื่อลูกค้า : {isPreOrders.members_name}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  เบอร์โทรศัพท์: {isPreOrders.members_phone}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  Address1 : {isPreOrders.members_address1}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  Addredd2 : {isPreOrders.members_address2}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  City : {isPreOrders.members_city}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  Nationality : {isPreOrders.members_nationality}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  Zip: {isPreOrders.members_zip}
                </Typography>
              </Item>

              <Item sx={{ marginBottom: 4 }}>
                <a style={{ fontSize: 16, borderBottom: "3px solid purple" }}>
                  ข้อมูลพาร์ทเนอร์ที่รับสินค้า
                </a>
                <Typography variant="h6" m={2} align="left">
                  ชื่อพาร์ทเนอร์ : {isPreOrders.partner_name}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  ชื่อร้านภาษาไทย: {isPreOrders.partner_name_center?.Thai}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  เบอร์โทรศัพท์ : {isPreOrders.partner_phone}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  อีเมล : {isPreOrders.partner_email}
                </Typography>
                <Typography variant="h6" m={2} align="left">
                  ที่อยู่ : {isPreOrders.partner_address?.Thai}
                </Typography>
              </Item>

              <Item sx={{ marginBottom: 4 }}>
                <a style={{ fontSize: 16 }}>ข้อมูลการทำรายการ</a>
                {isPreOrders.po_timestamp?.map((time) => (
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
            </Grid>
          </Grid>
        </Container>
      )}
    </div>
  );
}
