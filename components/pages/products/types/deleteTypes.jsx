import React from "react";

import Link from "next/link";
import { Icon } from "@iconify/react";
// material
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Stack,
  Typography,
  Container,
  Card,
  TablePagination,
  Chip,
  IconButton,
} from "@mui/material";
import Swal from "sweetalert2";

function deleteTypes({ row, fetcherTypes, fetcherWithToken }) {
  const onClickDelete = () => {
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
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/type`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type/${row._id}`;

        await fetcherWithToken(urlImage, {
          method: "DELETE",
          body: JSON.stringify({ images: row.type_image }),
        }).catch(() => {
          Swal.fire({
            icon: "error",
            title: "ไม่สามารถลบข้อมูลนี้ได้",
            showConfirmButton: false,
            timer: 1500,
          });
        });

        await fetcherWithToken(url, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              fetcherTypes();
            }, 1500);
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  return (
    <IconButton color="error" aria-label="add an alarm" onClick={onClickDelete}>
      <Icon icon="akar-icons:circle-x-fill" width="24" height="24" />
    </IconButton>
  );
}

export default deleteTypes;
