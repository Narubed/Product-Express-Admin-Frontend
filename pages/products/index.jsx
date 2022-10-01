import React, { useEffect } from "react";
import Layout from "~/components/layout";
import LayoutDefault from "~/components/layoutDefault";
import { Helmet } from "react-helmet";

import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import Product from "@/components/pages/products/";

function Products() {
  const { currentUser, logout } = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="main home">
      <Helmet>
        <title>สินค้าทั้งหมด</title>
      </Helmet>

      <h1 className="d-none">สินค้าทั้งหมด - admin</h1>

      {currentUser ? <Product /> : <Main />}
    </div>
  );
}

export default Products;
