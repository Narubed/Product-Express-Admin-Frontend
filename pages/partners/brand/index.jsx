import React, { useEffect } from "react";
import Layout from "~/components/layout";
import LayoutDefault from "~/components/layoutDefault";
import { Helmet } from "react-helmet";

import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import BrandCompany from "@/components/pages/partners/brand/index";

function Company() {
  const { currentUser, logout } = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="main home">
      <Helmet>
        <title>รายชื่อแบรนด์สินค้า</title>
      </Helmet>

      <h1 className="d-none">รายชื่อแบรนด์สินค้า - admin</h1>

      {currentUser ? <BrandCompany /> : <Main />}
    </div>
  );
}

export default Company;
