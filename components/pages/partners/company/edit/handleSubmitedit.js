/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import axios from "axios";

export default function componentName({
  values,
  setValues,
  fetcherWithToken,
  file,
  query,
  router,
  token,
  dispatch,
  setLoading,
}) {
  if (
    !values.Thai ||
    !values.Eng ||
    !values.Cambodia ||
    !values.Myanmar ||
    !values.Laos ||
    !values.China ||
    !values.AddressThai ||
    !values.AddressEng ||
    !values.AddressCambodia ||
    !values.AddressMyanmar ||
    !values.AddressLaos ||
    !values.AddressChina
  ) {
    Swal.fire({
      icon: "error",
      title: "กรอกข้อมูลไม่ครบ",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    const formData = new FormData();
    formData.append("image", file);
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
        let data = {};
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/company`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/company/${query.id}`;
        if (file.length !== 0) {
          await fetcherWithToken(urlImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.CompanyImage }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });

          const responseFile = await axios({
            method: "POST",
            url: urlImage,
            data: formData,
            headers: {
              "Content-Type": "application/json",
              "auth-token": `Bearer ${token}`,
            },
          });
          data = {
            company_image: responseFile.data.filename,
            company_name: {
              Thai: values.Thai,
              Eng: values.Eng,
              Cambodia: values.Cambodia,
              Myanmar: values.Myanmar,
              Laos: values.Laos,
              China: values.China,
            },
            company_address: {
              Thai: values.AddressThai,
              Eng: values.AddressEng,
              Cambodia: values.AddressCambodia,
              Myanmar: values.AddressMyanmar,
              Laos: values.AddressLaos,
              China: values.AddressChina,
            },
          };
        } else {
          data = {
            company_name: {
              Thai: values.Thai,
              Eng: values.Eng,
              Cambodia: values.Cambodia,
              Myanmar: values.Myanmar,
              Laos: values.Laos,
              China: values.China,
            },
            company_address: {
              Thai: values.AddressThai,
              Eng: values.AddressEng,
              Cambodia: values.AddressCambodia,
              Myanmar: values.AddressMyanmar,
              Laos: values.AddressLaos,
              China: values.AddressChina,
            },
          };
        }

        await fetcherWithToken(url, {
          method: "PUT",
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
              router.push("/partners/company");
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
