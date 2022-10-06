/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";

//

export default function componentName({
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
}) {
  if (
    isFile.length === 0 ||
    isCardSizeDetail.length === 0 ||
    !values.Thai ||
    !values.Eng ||
    !values.Cambodia ||
    !values.Myanmar ||
    !values.Laos ||
    !values.China ||
    !values.DetailThai ||
    !values.DetailEng ||
    !values.DetailCambodia ||
    !values.DetailMyanmar ||
    !values.DetailLaos ||
    !values.DetailChina ||
    !values.SizeNameThai ||
    !values.SizeNameEng ||
    !values.SizeNameCambodia ||
    !values.SizeNameMyanmar ||
    !values.SizeNameLaos ||
    !values.SizeNameChina ||
    !values.BrandId ||
    values.TypeId.length === 0 || // array
    !values.Tag
  ) {
    Swal.fire({
      icon: "error",
      title: "กรอกข้อมูลไม่ครบ",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
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
        dispatch(setLoading(true));
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`;
        const data = {
          product_images: isFile,
          product_name: {
            Thai: values.Thai,
            Eng: values.Eng,
            Cambodia: values.Cambodia,
            Myanmar: values.Myanmar,
            Laos: values.Laos,
            China: values.China,
          },
          product_detail: {
            Thai: values.DetailThai,
            Eng: values.DetailEng,
            Cambodia: values.DetailCambodia,
            Myanmar: values.DetailMyanmar,
            Laos: values.DetailLaos,
            China: values.DetailChina,
          },
          product_size_name: {
            Thai: values.SizeNameThai,
            Eng: values.SizeNameEng,
            Cambodia: values.SizeNameCambodia,
            Myanmar: values.SizeNameMyanmar,
            Laos: values.SizeNameLaos,
            China: values.SizeNameChina,
          },
          product_size_detail: isCardSizeDetail,
          product_brand_id: values.BrandId,
          product_type_id: values.TypeId.map((item) => item._id),
          product_status: true,

          product_tag: values.Tag,
          product_timestamp: dayjs(Date.now()).format(),
        };
        await fetcherWithToken(url, {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then(() => {
            dispatch(setLoading(false));
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              router.reload();
            }, 1500);
          })
          .catch(() => {
            dispatch(setLoading(false));
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถเพิ่มข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }
}
