import Swal from "sweetalert2";
import axios from "axios";

//
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
    !values.CompanyId ||
    !values.DetailThai ||
    !values.DetailEng ||
    !values.DetailCambodia ||
    !values.DetailMyanmar ||
    !values.DetailLaos ||
    !values.DetailChina
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
        const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/brand`;
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand/${query.id}`;
        if (file.length !== 0) {
          await fetcherWithToken(urlImage, {
            method: "DELETE",
            body: JSON.stringify({ images: values.BrandImage }),
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
            brand_image: responseFile.data.filename,
            brand_name: {
              Thai: values.Thai,
              Eng: values.Eng,
              Cambodia: values.Cambodia,
              Myanmar: values.Myanmar,
              Laos: values.Laos,
              China: values.China,
            },
            brand_company_id: values.CompanyId,
            brand_detail: {
              Thai: values.DetailThai,
              Eng: values.DetailEng,
              Cambodia: values.DetailCambodia,
              Myanmar: values.DetailMyanmar,
              Laos: values.DetailLaos,
              China: values.DetailChina,
            },
          };
        } else {
          data = {
            brand_name: {
              Thai: values.Thai,
              Eng: values.Eng,
              Cambodia: values.Cambodia,
              Myanmar: values.Myanmar,
              Laos: values.Laos,
              China: values.China,
            },
            brand_company_id: values.CompanyId,
            brand_detail: {
              Thai: values.DetailThai,
              Eng: values.DetailEng,
              Cambodia: values.DetailCambodia,
              Myanmar: values.DetailMyanmar,
              Laos: values.DetailLaos,
              China: values.DetailChina,
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
              router.push("/partners/brand");
            }, 1500);
          })
          .catch(() => {
            dispatch(setLoading(false));
            Swal.fire({
              icon: "error",
              title: "ไม่สามารถแก้ไขข้อมูลนี้ได้",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  }
}
