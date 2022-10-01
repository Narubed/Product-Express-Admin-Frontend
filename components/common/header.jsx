import { useEffect } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Link from "next/link";
// import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
import Image from "next/image";
// import SearchBox from "~/components/common/partials/search-box";
// import LoginModal from "~/components/features/modals/login-modal";

import { headerBorderRemoveList } from "~/utils/data/menu";

export default function Header(props) {
  const router = useRouter();

  useEffect(() => {
    let header = document.querySelector("header");
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains("header-border")
      )
        header.classList.remove("header-border");
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector("header").classList.add("header-border");
    }
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <div className="welcome-msg">
              <Link href="/pages/contact-us">
                <a className="contact">
                  <i className="d-icon-map mr-1"></i>Find Riode Store
                </a>
              </Link>{" "}
              <Link href="#">
                <a className="help">
                  <i className="d-icon-info mr-1"></i>
                  Free Standard Shipping
                </a>
              </Link>
            </div>
          </div>
          <div className="header-right">
            <a className="call" href="tel:#">
              <i className="d-icon-phone"></i>
              <span>Call us: </span>0(800) 123-456
            </a>
            <Link href="/pages/wishlist">
              <div className="wishlist">
                <i className="d-icon-heart"></i>
                <span>Wishlist</span>
              </div>
            </Link>
            {/* <LoginModal /> */}
            {/* <CartMenu /> */}
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <Link href="#">
              <a className="mobile-menu-toggle mr-0" onClick={showMobileMenu}>
                {/* <i className="d-icon-bars2"></i> */}
                <div style={{ display: "flex", alignItem: "center" }}>
                  <Icon icon="uis:subject" width="36px" height="36px" />
                </div>

                {/* <button onClick={showMobileMenu}>152</button> */}
              </a>
            </Link>

            <Link href="/">
              <a className="logo d-none d-lg-block">
                <Image
                  src="https://d-themes.com/react/riode/demo-19/images/home/logo.png"
                  alt="logo"
                  width="154"
                  height="43"
                />
              </a>
            </Link>
          </div>

          <div className="header-center d-flex justify-content-center">
            <Link href="/">
              <a className="logo d-block d-lg-none">
                <Image
                  src="https://d-themes.com/react/riode/demo-19/images/home/logo.png"
                  alt="logo"
                  width="154"
                  height="43"
                />
              </a>
            </Link>
          </div>

          <div className="header-right">
            <MainMenu />
            <span className="divider mr-4"></span>
            {/* <SearchBox /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
