import React from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import axios from "axios";
import Swal from "sweetalert2";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditImage({ row, isFile, setFile, fetcherWithToken }) {
  console.log(isFile);
  const [open, setOpen] = React.useState(false);
  const onClickDeleteImage = async () => {
    const newImage = [];
    isFile.forEach((element) => {
      if (element !== row) {
        newImage.push(element);
      }
    });

    const urlImage = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/product`;
    await fetcherWithToken(urlImage, {
      method: "DELETE",
      body: JSON.stringify({ images: row }),
    }).catch(() => {
      Swal.fire({
        icon: "error",
        title: "ไม่สามารถลบข้อมูลนี้ได้",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    setFile(newImage);
  };
  return (
    <>
      <div>
        <Box
          borderRadius="xl"
          shadow="lg"
          minHeight="10rem"
          sx={{
            overflow: "hidden",
            transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
            transformOrigin: "50% 0",
            backfaceVisibility: "hidden",
            willChange: "transform, box-shadow",
            transition: "transform 200ms ease-out",

            "&:hover": {
              transform:
                "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
            },
          }}
        >
          <Box position="absolute" top={0} right={0} zIndex={2} p={0}>
            <IconButton
              onClick={() => onClickDeleteImage()}
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ m: 0, p: 0 }}
            >
              <Icon icon="typcn:delete" color="red" width="24" height="24" />
            </IconButton>
          </Box>
          <Box position="absolute" top={0} left={0} zIndex={2} p={0}>
            <IconButton
              onClick={() => setOpen(true)}
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ m: 0, p: 0 }}
            >
              <Icon
                icon="fluent:search-visual-24-filled"
                color="purple"
                width="24"
                height="24"
              />
            </IconButton>
          </Box>
          <Box
            component="img"
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${row}`}
            width="100%"
            my="auto"
          />
        </Box>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              component="img"
              src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${row}`}
              width="100%"
              my="auto"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditImage.propTypes = {
  item: PropTypes.string,
  isFile: PropTypes.array,
  setFile: PropTypes.func,
  fetcherWithToken: PropTypes.func,
};
