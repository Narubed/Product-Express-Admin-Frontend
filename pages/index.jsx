import React from "react";
import { Helmet } from "react-helmet";


// Import Apollo Server and Query

// // import Home Components
// import NewsletterModal from '~/components/features/modals/newsletter-modal';
// import IntroSection from '~/components/partials/home/intro-section';
// import ServiceBox from '~/components/partials/home/service-section';
// import FeaturedCollection from '~/components/partials/home/featured-collection';
// import BannerSection from '~/components/partials/home/banner-section';
// import NewCollection from '~/components/partials/home/new-collection';
// import CategorySection from '~/components/partials/home/category-section';
// import SmallCollection from '~/components/partials/product/small-collection';
// import BlogSection from '~/components/partials/home/blog-section';
// import BrandSection from '~/components/partials/home/brand-section';

function HomePage() {
  return (
    <div className="main home">
      <Helmet>
        <title>Riode React eCommerce Template - Home</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - Home</h1>

      <div className="page-content">
        123
        {/* <IntroSection />

                <ServiceBox />

                <FeaturedCollection products={ featured } loading={ loading } />

                <BannerSection />

                <NewCollection products={ latest } loading={ loading } />

                <CategorySection />

                <SmallCollection featured={ featured } latest={ latest } topRated={ topRated } loading={ loading } />

                <BlogSection posts={ posts } />

                <BrandSection /> */}
      </div>

      {/* <NewsletterModal /> */}
    </div>
  );
}

export default HomePage;
