import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import Link from "next/link";

export default function AccountMenu({
  currentUser,
  row,
  fetcherWithToken,
  fetcherPreOrders,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "กรุณาเช็กเอกสารยืนยืนการโอนเงินก่อนตกลง",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${row._id}`;
        const newTimestamp = [];
        row.po_timestamp.forEach((element) => {
          newTimestamp.push(element);
        });
        newTimestamp.push({
          name: "ตรวจสอบสำเร็จ",
          marklist: currentUser.admin_name,
          timestamp: dayjs(Date.now()).format(),
        });
        const data = {
          po_status: "ตรวจสอบสำเร็จ",
          po_timestamp: newTimestamp,
        };
        await fetcherWithToken(url, {
          method: "PUT",
          body: JSON.stringify(data),
        });

        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetcherPreOrders();
      }
    });
  };

  const handleCancelCard = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "กรุณาตรวจสอบข้อมูลก่อนยกเลิกรายการนี้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${row._id}`;
        const newTimestamp = [];
        row.po_timestamp.forEach((element) => {
          newTimestamp.push(element);
        });
        newTimestamp.push({
          name: "ผู้ดูแลยกเลิก",
          timestamp: dayjs(Date.now()).format(),
        });
        const data = {
          po_status: "ผู้ดูแลยกเลิก",
          marklist: currentUser.admin_name,
          po_timestamp: newTimestamp,
        };
        await fetcherWithToken(url, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        await fetcherPreOrders();
      }
    });
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Icon icon="ooui:recent-changes-ltr" width="24" height="24" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link
          href={{
            pathname: "/detail/[id]",
            query: { id: row._id },
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <Icon icon="ooui:view-details-ltr" width="24px" />
            </ListItemIcon>
            <a style={{ fontSize: 14 }}>ดูรายละเอียด</a>
          </MenuItem>
        </Link>
        {row.po_status === "รอตรวจสอบ" && (
          <>
            <Divider />
            <MenuItem onClick={handleClickConfirm}>
              <ListItemIcon>
                <Icon icon="game-icons:confirmed" width="24px" />
              </ListItemIcon>
              <a style={{ fontSize: 14 }}>ยืนยันการโอนเงิน</a>
            </MenuItem>
          </>
        )}

        <Divider />
        <MenuItem onClick={handleCancelCard}>
          <ListItemIcon>
            <Icon icon="icomoon-free:cancel-circle" width="24px" />
          </ListItemIcon>
          <a style={{ fontSize: 14 }}>ยกเลิกรายการนี้</a>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
