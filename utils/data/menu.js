export const mainMenu = {
  products: [
    {
      title: "ประเภทสินค้า",
      url: "products/types",
      hot: true,
    },
    {
      title: "เพิ่มประเภทสินค้า",
      url: "products/types/create",
    },
    {
      title: "สินค้าทั้งหมด",
      url: "products",
      hot: true,
    },
    {
      title: "เพิ่มสินค้าใหม่",
      url: "products/create",
    },
  ],
  partners: {
    variation1: [
      {
        title: "พาร์ทเนอร์ (Store)",
        url: "partners/store",
      },
      {
        title: "เพิ่มพาร์ทเนอร์ (Store)",
        url: "partners/store/create",
      },
    ],
    variation2: [
      {
        title: "บริษัททั้งหมด",
        url: "partners/company",
      },
      {
        title: "เพิ่มบริษัทใหม่",
        url: "partners/company/create",
        new: true,
      },
      {
        title: "แบรนด์ สินค้าทั้งหมด",
        url: "partners/brand",
      },
      {
        title: "เพิ่มแบรนด์ สินค้าใหม่",
        url: "partners/brand/create",
        new: true,
      },
    ],
  },
  report: {
    variation1: [
      {
        title: "รายการที่รอตัดรอบ",
        url: "report/cut-around",
      },
      {
        title: "รายการที่ถูกตัดรอบแล้ว",
        url: "report/been-cut",
      },
    ],
    variation2: [
      {
        title: "รายการที่กำลังจัดส่ง (Store)",
        url: "report/wait-delivery",
      },
      {
        title: "รายการที่ถูกตัดรอบทั้งหมด (ย้อนหลัง)",
        url: "report/old-cut-around",
      },
    ],
  },

  product: {
    pages: [
      {
        title: "Simple Product",
        url: "product/default/2-minute-thermometer",
      },
      {
        title: "Variable Product",
        url: "product/default/blue-for-one-time-medical-mask",
      },
      {
        title: "Sale Product",
        url: "product/default/disease-of-the-respiratory-organs",
      },
      {
        title: "Feature & On Sale",
        url: "product/default/disease-of-the-respiratory-organs/",
      },
      {
        title: "With Left Sidebar",
        url: "product/left-sidebar/blue-for-one-time-medical-mask",
      },
      {
        title: "With Right Sidebar",
        url: "product/right-sidebar/blue-for-one-time-medical-mask",
      },
      {
        title: "Add Cart Sticky",
        url: "product/sticky-cart/blue-for-one-time-medical-mask",
        hot: true,
      },
      {
        title: "Tab Inside",
        url: "product/tab-inside/blue-for-one-time-medical-mask",
      },
    ],
    layout: [
      {
        title: "Grid Images",
        url: "product/grid/blue-for-one-time-medical-mask",
        new: true,
      },
      {
        title: "Masonry",
        url: "product/masonry/white-roentgenometer",
      },
      {
        title: "Gallery Type",
        url: "product/gallery/blue-for-one-time-medical-mask",
      },
      {
        title: "Full Width Layout",
        url: "product/full-width/blue-for-one-time-medical-mask",
      },
      {
        title: "Sticky Info",
        url: "product/sticky-info/blue-for-one-time-medical-mask",
      },
      {
        title: "Left & Right Sticky",
        url: "product/sticky-both/blue-for-one-time-medical-mask",
      },
      {
        title: "Horizontal Thumb",
        url: "product/horizontal/blue-for-one-time-medical-mask",
      },
      {
        title: "Build Your Own",
        url: "",
      },
    ],
  },
  other: [
    {
      title: "About",
      url: "pages/about-us",
    },
    {
      title: "Contact Us",
      url: "pages/contact-us",
    },
    {
      title: "My Account",
      url: "pages/account",
    },
    {
      title: "FAQs",
      url: "pages/faqs",
    },
    {
      title: "Error 404",
      url: "pages/404",
    },
    {
      title: "Coming Soon",
      url: "pages/coming-soon",
    },
  ],
};

export const elementsList = [
  {
    url: "accordions",
    class: "element-accordian",
    title: "accordions",
  },
  {
    url: "blog-posts",
    class: "element-blog",
    title: "blog posts",
  },
  {
    url: "buttons",
    class: "element-button",
    title: "buttons",
  },
  {
    url: "cta",
    class: "element-cta",
    title: "call to action",
  },
  {
    url: "icon-boxes",
    class: "element-icon-box",
    title: "icon boxes",
  },
  {
    url: "icons",
    class: "element-icon",
    title: "Icons",
  },
  {
    url: "instagrams",
    class: "element-portfolio",
    title: "instagrams",
  },
  {
    url: "categories",
    class: "element-category",
    title: "product categories",
  },
  {
    url: "products",
    class: "element-product",
    title: "products",
  },
  {
    url: "tabs",
    class: "element-tab",
    title: "tabs",
  },
  {
    url: "testimonials",
    class: "element-testimonial",
    title: "testimonials",
  },
  {
    url: "titles",
    class: "element-title",
    title: "titles",
  },
  {
    url: "typography",
    class: "element-typography",
    title: "typography",
  },
  {
    url: "alerts",
    class: "element-video",
    title: "Notification",
  },
];

export const headerBorderRemoveList = [
  "/",
  "/shop",
  "/shop/infinite-scroll",
  "/shop/horizontal-filter",
  "/shop/navigation-filter",
  "/shop/off-canvas-filter",
  "/shop/right-sidebar",
  "/shop/grid/[grid]",
  "/pages/404",
  "/elements",
  "/elements/products",
  "/elements/typography",
  "/elements/titles",
  "/elements/product-category",
  "/elements/buttons",
  "/elements/accordions",
  "/elements/alerts",
  "/elements/tabs",
  "/elements/testimonials",
  "/elements/blog-posts",
  "/elements/instagrams",
  "/elements/cta",
  "/elements/icon-boxes",
  "/elements/icons",
];
