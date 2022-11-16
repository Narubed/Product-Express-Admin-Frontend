/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import Barcode from "react-barcode";
import dayjs from "dayjs";
import "dayjs/locale/th";
import THBText from "thai-baht-text";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import numeral from "numeral";
import { useReactToPrint } from "react-to-print";
import imageNba from "~/public/product-express/logo/nbaonestopshop.1d35f7ce.png";
import dimension from "~/public/product-express/logo/dimension.png";
import { Image } from "primereact/image";

function PrintInvoiceFullA4({ componentToPrintFullA4, isReport }) {
  //   const [isPreOrders, setPreOrders] = React.useState([]);
  console.log(isReport);
  const isPreOrders = [];
  if (isReport) {
    isReport?.po_detail?.forEach(async (element) => {
      console.log(element);
      element.product_select_detail.forEach(async (item) => {
        isPreOrders.push({
          ...item,
          product_name: element.product_name.Thai,
          product_size_name: element.product_size_name.Thai,
          members_name: element.members_name,
          members_phone: element.members_phone,
          members_address1: element.members_address1,
          members_address2: element.members_address2,
          members_city: element.members_city,
          members_nationality: element.members_nationality,
          members_zip: element.members_zip,
        });
      });
    });
  }

  return (
    <Grid display="none">
      <div ref={(el) => (componentToPrintFullA4.current = el)}>
        <div
          className="body"
          style={{
            position: "relative",
            width: "21cm",
            height: "29.7cm",
            matgin: "0 auto",
            fontSize: "12px",
            color: "black",
          }}
        >
          <div
            className="header"
            style={{
              padding: "5px 0",
              marginBotton: "5px",
            }}
          >
            <div id="logo" style={{ textAlign: "center" }}>
              <Image src={imageNba.src} alt="Logo" width="90px" height="90px" />
            </div>
            <h1
              style={{
                paddingTop: 4,
                borderTop: "1px solid #5D6975",
                borderBottom: "1px solid #5D6975",
                color: "#5D6975",
                fontSize: "2.4em",
                lineHeight: "1.4em",
                fontWeight: "normal",
                textAlign: "center",
                margin: "4px 0 20px 0",
                background: `url(${dimension.src})`,
              }}
            >
              ใบสั่งซื้อ
            </h1>
            <div
              id="company"
              className="clearfix"
              style={{ float: "right", textAlign: "right", fontSize: "14px" }}
            >
              เลขที่ :{" "}
              <a style={{ fontSize: "12px" }}>
                {isReport && isReport.po_number}{" "}
              </a>
              <br />
              วันที่ :{" "}
              {isReport &&
                isReport?.po_timestamp &&
                dayjs(
                  isReport.po_timestamp.length !== 0
                    ? isReport.po_timestamp.find(
                        (item) => item.name === "ตัดรอบการจัดส่งแล้ว"
                      ).timestamp
                    : Date.now()
                )
                  .add(543, "year")
                  .locale("th")
                  .format("DD MMM YYYY")}
              <br />
              {isReport && (
                <a>บริษัท เอ็นบีเอ ดิจิตอล เซอร์วิส เซ็นเตอร์ จำกัด</a>
              )}{" "}
              <br />
              {isReport && (
                <a>
                  298/1 หมู่ที่ 3 ตำบล สันผักหวาน อำเภอ หางดง จังหวัด เชียงใหม่
                  50230
                </a>
              )}{" "}
              <br />
              {isReport && <a>เบอร์โทรศัพท์: 0945479111</a>} <br />
              {isReport && `เลขประจำตัวผู้เสียภาษี : 0505565006177`} <br />
              {isReport && `สาขาที่ออกใบกำกับภาษี : สำนักงานใหญ่`}
            </div>

            <div id="project" style={{ float: "left", fontSize: "14px" }}>
              {isReport && (
                <>
                  <div>
                    <span>Name : {isReport.members_name}</span>{" "}
                  </div>
                  <div>
                    <span>Phone : {isReport.members_phone}</span>{" "}
                  </div>
                  <div>
                    <span>Address1 : {isReport.members_address1} </span>{" "}
                  </div>
                  <div>
                    <span>Address2 : {isReport.members_address2} </span>{" "}
                  </div>
                  <div>
                    <span>City : {isReport.members_city} </span>{" "}
                  </div>
                  <div>
                    <span>Nationality : {isReport.members_nationality} </span>{" "}
                  </div>
                  <div>
                    <span>Zip : {isReport.members_zip} </span>{" "}
                  </div>
                </>
              )}
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                vorderSpacing: "0",
                marginBotton: "20px",
                marginTop: "190px",
              }}
            >
              <thead
                style={{
                  borderTop: "3px solid #3D6975",
                  backgroundColor: "#F0F8FF",
                }}
              >
                <tr>
                  <th className="service" style={{ textAlign: "center" }}>
                    ลำดับ
                  </th>
                  <th style={{ textAlign: "left" }}>ชื่อรายการ</th>
                  <th>จำนวน </th>
                  <th>ราคาต่อชิ้น </th>
                  <th style={{ textAlign: "right" }}>รวม</th>
                </tr>
              </thead>
              <tbody>
                {isPreOrders.length !== 0 &&
                  isPreOrders.map((item, index) => (
                    <tr
                      key={index}
                      style={
                        index % 2 > 0
                          ? { backgroundColor: "#F8F8FF" }
                          : { backgroundColor: "#FFFFFF" }
                      }
                    >
                      <td className="service" style={{ textAlign: "center" }}>
                        {index + 1}
                      </td>
                      <td className="desc" style={{ verticalAlign: "top" }}>
                        {item.product_name}{" "}
                        {item.product_size_name !== "ไม่มี" &&
                          item.product_size_name}{" "}
                        {item.Thai !== "ไม่มี" && item.Thai}
                      </td>
                      <td className="service" style={{ textAlign: "center" }}>
                        {numeral(item.amount).format("0,0")}
                      </td>
                      <td className="service" style={{ textAlign: "center" }}>
                        {numeral(item.Price).format("0,0.00")}
                      </td>
                      <td className="service" style={{ textAlign: "right" }}>
                        {numeral(item.Price * item.amount).format("0,0.00")}
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td
                    colSpan="3"
                    style={{ fontSize: "1em", textAlign: "center" }}
                  >
                    {isPreOrders &&
                      THBText(
                        isPreOrders.reduce(
                          (sum, value) => sum + value.amount * value.Price,
                          0
                        )
                      )}
                  </td>

                  <td colSpan="1" style={{ textAlign: "right" }}>
                    รวม/Total
                  </td>

                  <td
                    className="total"
                    style={{ fontSize: "1em", textAlign: "right" }}
                  >
                    {numeral(
                      isPreOrders.reduce(
                        (sum, value) => sum + value.amount * value.Price,
                        0
                      )
                    ).format("0,0.00")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "right" }}>
            <Barcode
              value={isReport._id}
              width="1"
              format="CODE128"
              height="35"
              displayValue={true}
              fontSize="10px"
            />
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default PrintInvoiceFullA4;

// return (
//     <tr
//       key={index}
//       style={
//         index % 2 > 0
//           ? { backgroundColor: "#F8F8FF" }
//           : { backgroundColor: "#FFFFFF" }
//       }
//     >
//       <td>123</td>
//     </tr>
//   );
