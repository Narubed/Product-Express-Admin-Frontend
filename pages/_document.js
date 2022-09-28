/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-document-import-in-page */
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="vendor/riode-fonts/riode-fonts.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="vendor/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="vendor/owl-carousel/owl.carousel.min.css"
          />
          <link rel="icon" href="images/icons/favicon.png" />
        </Head>
        <body>
          <Main />
          <script src="../js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
