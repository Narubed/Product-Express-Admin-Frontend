import React from "react";

import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";

function deleteBrand({ row, fetcherBrand, fetcherWithToken }) {
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
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/brand`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand/${row._id}`;

        await fetcherWithToken(urlImage, {
          method: "DELETE",
          body: JSON.stringify({ images: row.brand_image }),
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
              fetcherBrand();
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

export default deleteBrand;
