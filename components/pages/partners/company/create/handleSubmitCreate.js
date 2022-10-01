import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
export default function componentName({
  values,
  setValues,
  fetcherWithToken,
  file,
  token,
  setImgSrc,
  setfile,
}) {
  if (
    file.length === 0 ||
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
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/company`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/company`;
        const responseFile = await axios({
          method: "POST",
          url: urlImage,
          data: formData,
          headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,
          },
        });
        const data = {
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
        await fetcherWithToken(url, {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then(() => {
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              setValues({
                Thai: "",
                Eng: "",
                Cambodia: "",
                Myanmar: "",
                Laos: "",
                China: "",
                AddressThai: "",
                AddressEng: "",
                AddressCambodia: "",
                AddressMyanmar: "",
                AddressLaos: "",
                AddressChina: "",
              });
              setImgSrc(null);
              setfile([]);
            }, 500);
          })
          .catch(() => {
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
