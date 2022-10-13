import { useRouter } from "next/router";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { mainMenu } from "~/utils/data/menu";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import Image from "next/image";

function MainMenu() {
  const pathname = useRouter().pathname;
  console.log(pathname.includes("/products"));
  const { logout } = useCurrentUser();
  return (
    <nav className="main-nav mr-4">
      <ul className="menu menu-active-underline">
        <li id="menu-home" className={pathname === "/" ? "active" : ""}>
          <Link href="/">
            <a >
              Home
            </a>
          </Link>
        </li>

        <li className={`${pathname.includes("/products") ? "active" : ""}`}>
          <Link href="#">
            <a style={{ display: "flex" }}>
              สินค้าของบริษัท
              <a style={{ paddingTop: "12px" }}>
                <Icon icon="dashicons:arrow-down-alt2" width="14" height="14" />
              </a>
            </a>
          </Link>

          <ul style={{ marginLeft: "-50px" }}>
            {mainMenu.products.map((item, index) => (
              <li key={`other-${item.title}`}>
                <Link href={"/" + item.url}>
                  <a>
                    {item.title}
                    {item.new ? <span className="tip tip-new">New</span> : ""}
                    {item.hot ? <span className="tip tip-hot">Hot</span> : ""}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className={`  ${pathname.includes("/partners") ? "active" : ""}`}>
          <Link href="/partners/store">
            <a style={{ display: "flex" }}>
              พาร์ทเนอร์
              <a style={{ paddingTop: "12px" }}>
                <Icon icon="dashicons:arrow-down-alt2" width="14" height="14" />
              </a>
            </a>
          </Link>

          <div className="megamenu" style={{ marginLeft: "-150px" }}>
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">ร้านพาร์ทเนอร์ (store)</h4>
                <ul>
                  {mainMenu.partners.variation1.map((item, index) => (
                    <li key={`partners-${item.title}`}>
                      <Link href={"/" + item.url}>
                        <a>
                          {item.title}
                          {item.hot ? (
                            <span className="tip tip-hot">Hot</span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">บริษัทพาร์ทเนอร์</h4>
                <ul>
                  {mainMenu.partners.variation2.map((item, index) => (
                    <li key={`partners-${item.title}`}>
                      <Link href={"/" + item.url}>
                        <a>
                          {item.title}
                          {item.new ? (
                            <span className="tip tip-new">New</span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                <figure>
                  <Image
                    src="https://d-themes.com/react/riode/demo-medical/images/menu/banner-1.jpg"
                    alt="Menu banner"
                    width="221"
                    height="330"
                  />
                </figure>
                <div className="banner-content y-50">
                  <h4 className="banner-subtitle font-weight-bold text-primary ls-m">
                    Sale.
                  </h4>
                  <h3 className="banner-title font-weight-bold">
                    <span className="text-uppercase">Up to</span>70% Off
                  </h3>
                  <Link href={"/shop"}>
                    <a className="btn btn-link btn-underline">
                      shop now<i className="d-icon-arrow-right"></i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li
          className={`submenu  ${
            pathname.includes("/product") && !pathname.includes("/elements")
              ? "active"
              : ""
          }`}
        >
          <Link href="/product/default/medical-bed-with-intraveneous">
            <a>Products</a>
          </Link>

          <div className="megamenu" style={{ marginLeft: "-190px" }}>
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Pages</h4>
                <ul>
                  {mainMenu.product.pages.map((item, index) => (
                    <li key={`product-${item.title}`}>
                      <Link href={"/" + item.url}>
                        <a>
                          {item.title}
                          {item.hot ? (
                            <span className="tip tip-hot">Hot</span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Layouts</h4>
                <ul>
                  {mainMenu.product.layout.map((item, index) => (
                    <li key={`product-${item.title}`}>
                      <Link href={"/" + item.url}>
                        <a>
                          {item.title}
                          {item.new ? (
                            <span className="tip tip-new">New</span>
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner2 banner banner-fixed">
                <figure>
                  <Image
                    src="https://d-themes.com/react/riode/demo-medical/images/menu/banner-2.jpg"
                    alt="Menu banner"
                    width="221"
                    height="330"
                  />
                </figure>
                <div className="banner-content x-50 text-center">
                  <h3 className="banner-title text-white text-uppercase">
                    Sunglasses
                  </h3>
                  <h4 className="banner-subtitle font-weight-bold text-white mb-0">
                    $23.00 - $120.00
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li
          className={`submenu  ${pathname.includes("/pages") ? "active" : ""}`}
        >
          <Link href="#">
            <a>Pages</a>
          </Link>

          <ul style={{ marginLeft: "-50px" }}>
            {mainMenu.other.map((item, index) => (
              <li key={`other-${item.title}`}>
                <Link href={"/" + item.url}>
                  <a>
                    {item.title}
                    {item.new ? <span className="tip tip-new">New</span> : ""}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li
          className={`submenu blog-menu  ${
            pathname.includes("/blog") && !pathname.includes("/elements")
              ? "active"
              : ""
          }`}
        >
          <Link href={`/blog/classic`}>
            <a>Blog</a>
          </Link>

          <ul style={{ marginLeft: "-60px" }}>
            {mainMenu.blog.map((item, index) => (
              <li
                key={"blog" + item.title}
                className={item.subPages ? "submenu" : ""}
              >
                <Link href={"/" + item.url}>
                  <a>{item.title}</a>
                </Link>

                {item.subPages ? (
                  <ul>
                    {item.subPages.map((item, index) => (
                      <li key={`blog-${item.title}`}>
                        <Link href={"/" + item.url}>
                          <a>{item.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link href="/pages/about-us">
            <a>About Us</a>
          </Link>
        </li>
        <li>
          <a onClick={logout} style={{ cursor: "pointer" }}>
            ออกจากระบบ
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
