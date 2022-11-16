/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import numeral from "numeral";

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
    const urlPreOrders = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders`;
    const urlPartners = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    // const urlMembers = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`;
    let preorders = [];
    let partners = [];
    await fetcherWithToken(urlPreOrders).then(async (json) => {
      preorders = json.data;
    });
    await fetcherWithToken(urlPartners).then(async (json) => {
      partners = json.data;
    });

    const newPreOrders = [];

    if (preorders.length !== 0 && partners.length !== 0) {
      preorders.forEach((element) => {
        const finded = partners.find(
          (item) => item._id === element.po_partner_id
        );
        if (finded) {
          newPreOrders.push({
            ...element,
            partner_name: finded.partner_name,
            partner_address: finded.partner_address.Thai,
            partner_id: finded._id,
          });
        }
      });
    }
    const filterStatus = newPreOrders.filter(
      (item) => item.po_status === "ตรวจสอบสำเร็จ"
    );
    console.log(filterStatus);
    const newPartner = [];
    filterStatus.forEach((element) => {
      const idx = newPartner.findIndex(
        (item) => item.partner_id === element.partner_id
      );
      if (idx === -1) {
        newPartner.push({
          ...element,
          newTotals: element.po_total,
        });
      } else {
        newPartner[idx].newTotals += element.po_total;
      }
    });
    console.log(newPartner);
    setPreOrders(newPartner);
  };

  return (
    <Container>
      ตัดรอบรายการสินค้า
      <Grid container spacing={2} sx={{ mt: 8, mb: 8 }}>
        {isPreOrders.map((item) => (
          <Grid xs={12} sm={4} key={item._id}>
            <Card sx={{ mr: 1, mb: 1, bgcolor: "#FFF4", textAlign: "center" }}>
              <Link
                href={{
                  pathname: "/report/cut-around/detail/[id]",
                  query: { id: item.partner_id },
                }}
              >
                <CardActionArea>
                  <CardContent sx={{ p: 5 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      ชื่อ : {item.partner_name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      ยอดรวมคำสั่งซื้อ :{" "}
                      {numeral(item.newTotals).format("0,0.00")}
                    </Typography>

                    <Typography variant="h6" color="text.secondary">
                      ที่อยู่ : {item.partner_address}
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
