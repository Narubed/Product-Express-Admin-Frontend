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
  router,
  query,
}) {
  console.log(values);
  if (
    !values.name ||
    !values.email ||
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
    Swal.fire({
      title: "ยืนยันการทำรายการ?",
      text: "กรุณาเช็คข้อมูลก่อนยืนยันการแก้ไขข้อมูล!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const urlDeleteImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/partners`;
        let dataPUT = {};
        let dataDefault = {
          partner_name: values.name,
          partner_email: values.email,
          partner_password: values.password,
          // partner_card_image: responseFile.data.cardImage,
          // partner_bookbank_image: responseFile.data.bookbankImage,
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
        dispatch(setLoading(true));
        if (fileCard.length !== 0 && fileBookBank.length !== 0) {
          const formData = new FormData();
          formData.append("partner_card_image", fileCard);
          formData.append("partner_bookbank_image", fileBookBank);
          const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image2/partners`;
          const responseFile = await axios({
            method: "POST",
            url: urlImage,
            data: formData,
            headers: {
              "Content-Type": "application/json",
              "auth-token": `Bearer ${token}`,
            },
          });
          await fetcherWithToken(urlDeleteImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.CardImage }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
          await fetcherWithToken(urlDeleteImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.BookBankImage }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });

          const images = {
            partner_card_image: responseFile.data.cardImage,
            partner_bookbank_image: responseFile.data.bookbankImage,
          };
          dataPUT = {
            ...dataDefault,
            ...images,
          };
          console.log(responseFile.data.bookbankImage);
          console.log(responseFile.data.cardImage);
        } else if (fileCard.length !== 0) {
          const formData = new FormData();
          formData.append("image", fileCard);
          const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/partners`;
          const responseFile = await axios({
            method: "POST",
            url: urlImage,
            data: formData,
            headers: {
              "Content-Type": "application/json",
              "auth-token": `Bearer ${token}`,
            },
          });
          await fetcherWithToken(urlDeleteImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.CardImage }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
          const images = {
            partner_card_image: responseFile.data.filename,
          };
          dataPUT = {
            ...dataDefault,
            ...images,
          };
        } else if (fileBookBank.length !== 0) {
          const formData = new FormData();
          formData.append("image", fileBookBank);
          const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/partners`;
          const responseFile = await axios({
            method: "POST",
            url: urlImage,
            data: formData,
            headers: {
              "Content-Type": "application/json",
              "auth-token": `Bearer ${token}`,
            },
          });
          await fetcherWithToken(urlDeleteImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.BookBankImage }),
          }).catch(() => {
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถลบข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
          const images = {
            partner_bookbank_image: responseFile.data.filename,
          };
          dataPUT = {
            ...dataDefault,
            ...images,
          };
        } else {
          dataPUT = {
            ...dataDefault,
          };
        }
        console.log(dataPUT);
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners/${query.id}`;

        await fetcherWithToken(url, {
          method: "PUT",
          body: JSON.stringify(dataPUT),
        })
          .then(() => {
            dispatch(setLoading(false));
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              router.push("/partners/store");
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
        dispatch(setLoading(false));
      }
    });
  }
}
