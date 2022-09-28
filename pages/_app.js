import "~/public/sass/style.scss";
import store from "@/lib/store/store";

import { Provider } from "react-redux";
import Helmet from "react-helmet";
import Layout from "~/components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <title>Product Express : NBA</title>

        <meta name="keywords" content="React Template" />
        <meta name="description" content="Product Express : NBA" />
        <meta name="author" content="D-THEMES" />
      </Helmet>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
