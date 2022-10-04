import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
export default function componentName({
  values,
  setValues,
  fetcherWithToken,
  fileCard,
  fileBookBank,
  token,
  setImgSrcCard,
  setfileCard,
  setImgSrcBookBank,
  setfileBookBank,
  setLoading,
  dispatch,
}) {
  if (
    fileCard.length === 0 ||
    fileBookBank.length === 0 ||
    !values.name ||
    !values.email ||
    !values.password ||
    !values.phone ||
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
    formData.append("partner_card_image", fileCard);
    formData.append("partner_bookbank_image", fileBookBank);
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
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image2/partners`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
        const responseFile = await axios({
          method: "POST",
          url: urlImage,
          data: formData,
          headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,
          },
        });
        console.log(responseFile.data.bookbankImage);
        console.log(responseFile.data.cardImage);

        // console.log(responseFileCard.data.filename);
        // console.log(responseFileBookBank.data.filename);
        const data = {
          partner_name: values.name,
          partner_email: values.email,
          partner_password: values.password,
          partner_card_image: responseFile.data.cardImage,
          partner_bookbank_image: responseFile.data.bookbankImage,
          partner_status: values.status,
          partner_phone: values.phone,
          partner_address: {
            Thai: values.Thai,
            Eng: values.Eng,
            Cambodia: values.Cambodia,
            Myanmar: values.Myanmar,
            Laos: values.Laos,
            China: values.China,
          },
          partner_name_center: {
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
            dispatch(setLoading(false));
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              setValues({
                name: "",
                email: "",
                password: "",
                status: true,
                phone: "",

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

              setImgSrcCard(null);
              setImgSrcBookBank(null);
              setfileCard([]);
              setfileBookBank([]);
            }, 500);
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
