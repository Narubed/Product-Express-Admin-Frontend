import React, { useEffect } from "react";
import Layout from "~/components/layout";
import LayoutDefault from "~/components/layoutDefault";
import { Helmet } from "react-helmet";

import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import Type from "@/components/pages/products/types";

function Types() {
  const { currentUser, logout } = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="main home">
      <Helmet>
        <title>ประเภทสินค้า</title>
      </Helmet>

      <h1 className="d-none">ประเภทสินค้า - admin</h1>

      {currentUser ? <Type /> : <Main />}
    </div>
  );
}

export default Types;
