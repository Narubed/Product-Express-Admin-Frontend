import React, { useEffect } from "react";
import Layout from "~/components/layout";
import LayoutDefault from "~/components/layoutDefault";
import { Helmet } from "react-helmet";

import Main from "@/components/main";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import Home from "@/components/pages";

function HomePage() {
  const { currentUser, logout } = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);
  return (
    <div className="main home">
      <Helmet>
        <title>หนัาหลัก - Home</title>
      </Helmet>

      <h1 className="d-none">หนัาหลัก - Home</h1>

      {currentUser ? <Home /> : <Main />}
    </div>
  );
}

export default HomePage;
