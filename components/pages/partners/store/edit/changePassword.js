/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Slide from "@mui/material/Slide";
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function componentName({
  query,
  fetcherWithToken,
  dispatch,
  setLoading,
}) {
  const [open, setOpen] = useState(false);
  const [isPassword, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmPassword = () => {
    setOpen(false);
    Swal.fire({
      title: "ยืนยันการเปลี่ยนรหัสผ่าน ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners/${query.id}`;
        await fetcherWithToken(url, {
          method: "PUT",
          body: JSON.stringify({ partner_password: isPassword }),
        })
          .then(() => {
            dispatch(setLoading(false));
            Swal.fire({
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
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
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        sx={{ fontSize: "14px" }}
        onClick={handleClickOpen}
      >
        แก้ไขรหัสผ่าน
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle sx={{ fontSize: "16px" }}>แก้ไขรหัสผ่าน</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={{ fontSize: "16px" }}
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            fullWidth
            variant="standard"
            inputProps={{ style: { fontSize: 16 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ fontSize: 16 }}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={confirmPassword}
            variant="contained"
            color="secondary"
            sx={{ fontSize: 16 }}
          >
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
