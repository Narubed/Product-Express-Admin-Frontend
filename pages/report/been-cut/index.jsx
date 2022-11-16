/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import numeral from "numeral";
import dayjs from "dayjs";
import "dayjs/locale/th";

import {
  Container,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Grid,
} from "@mui/material";
import Link from "next/link";

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fetcherWithToken, currentUser } = useCurrentUser();
  if (!currentUser) {
    return <div></div>;
  }
  const [isPreOrders, setPreOrders] = useState([]);
  useEffect(() => {
    fetcherPreOrders();
  }, [currentUser]);

  const fetcherPreOrders = async () => {
    const urlCutAround = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cut_around`;
    const urlPreOrders = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders`;
    const urlPartners = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    let cutAround = [];
    let preorders = [];
    let partners = [];
    await fetcherWithToken(urlCutAround).then(async (json) => {
      cutAround = json.data;
    });
    await fetcherWithToken(urlPreOrders).then(async (json) => {
      preorders = json.data;
    });
    await fetcherWithToken(urlPartners).then(async (json) => {
      partners = json.data;
    });
    const newOrders = [];
    cutAround.forEach((element) => {
      const findPartner = partners.find(
        (item) => item._id === element.cutaround_partner_id
      );
      newOrders.push({
        ...element,
        partners_name: findPartner.partner_name,
        // partner_address: findPartner.partner_address,
      });
    });
    setPreOrders(newOrders);
    console.log(newOrders);
  };

  return (
    <Container>
      รายการที่ถูกตัดรอบเเล้ว
      <Grid container spacing={2} sx={{ mt: 8, mb: 8 }}>
        {isPreOrders.map((item) => (
          <Grid xs={12} sm={4} key={item._id}>
            <Card sx={{ mr: 1, mb: 1, bgcolor: "#FFF4", textAlign: "center" }}>
              <Link
                href={{
                  pathname: "/report/been-cut/detail/[id]",
                  query: { id: item._id },
                }}
              >
              <CardActionArea>
                <CardContent sx={{ p: 5 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    ชื่อ : {item.partners_name}
                  </Typography>

                  <Typography variant="h6" color="text.secondary">
                    เลขที่ตัดยอด : {item._id}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    วันที่ตัดรอบ :{" "}
                    {dayjs(item.cutaround_timestamp)
                      .locale("th")
                      .format("DD MMMM YYYY HH:mm")}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ผู้ทำการตัดรอบ : {item.cutaround_transaction}
                  </Typography>
                </CardContent>
              </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
