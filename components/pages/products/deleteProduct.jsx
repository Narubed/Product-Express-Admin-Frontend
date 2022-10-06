import React from "react";

import Link from "next/link";
import { Icon } from "@iconify/react";
// material
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";

function deleteProduct({
  row,
  fetcherTypes,
  fetcherWithToken,
  fetcherProducts,
}) {
  const onClickDelete = () => {
    console.log(row);
    Swal.fire({
      title: "ยืนยันการทำรายการ?",
      text: "กรุณาเช็คข้อมูลก่อนยืนยันการลบข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/product`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products/${row._id}`;
        row.product_images.map(async (item) => {
          await fetcherWithToken(urlImage, {
            method: "DELETE",
            body: JSON.stringify({ images: item }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
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
              fetcherProducts();
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

export default deleteProduct;
