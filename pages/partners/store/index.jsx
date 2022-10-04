import React, { useEffect } from "react";
import Layout from "~/components/layout";
import LayoutDefault from "~/components/layoutDefault";
import { Helmet } from "react-helmet";

import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import PartnerStore from "@/components/pages/partners/store";

function Company() {
  const { currentUser, logout } = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="main home">
      <Helmet>
        <title>รายชื่อพาร์ทเนอร์</title>
      </Helmet>

      <h1 className="d-none">รายชื่อพาร์ทเนอร์ - admin</h1>

      {currentUser ? <PartnerStore /> : <Main />}
    </div>
  );
}

export default Company;
