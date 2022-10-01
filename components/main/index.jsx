/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useRouter } from "next/router";

import styles from "./main.module.css";
import { Grid, Button } from "@mui/material";

import bgImage from "~/public/product-express/main/background.-01.png";

import buttonImage1 from "~/public/product-express/main/background.-02.png";

// const buttonImage2 = 'https://www.nbadigitalservice.com/static/media/web-jump_0.0323920d.png'

export default function index({ signIn }) {
  const router = useRouter();
  return (
    <>
      <Grid
        sx={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundSize: "cover",
          height: "100vh",
          padding: 5,
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",

          // backgroundPosition: 'top'
        }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            position: "absolute",
            top: "25%",
            left: "10%",
          }}
        >
          <div>
            <input
              className={styles.button}
              type="image"
              id="image"
              src={buttonImage1.src}
              onClick={() => router.push("/login")}
            />

            {/* <Button variant='contained' onClick={() => signIn()}>
              go to login page
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
