import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import CatImage from "~/public/product-express/gif/loading-fast.gif";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/lib/store/loading";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  // const handleClickOpen = () => {
  //   dispatch(setLoading(true));
  // };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        sx={{ background: "transparent" }}
        open={loading}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ p: 1, m: 0 }}>
          {/* <CircularProgress /> */}
          <Image
            src={CatImage.src}
            width="160px"
            height="160px"
            alt={CatImage.src}
          />
          {/* <Button
            variant="outlined"
            onClick={() => dispatch(setLoading(false))}
          >
            Slide in alert dialog
          </Button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
