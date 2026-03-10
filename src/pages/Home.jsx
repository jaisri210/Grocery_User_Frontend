import { Hero } from "../components/Hero";
import { Category } from "../components/Category";
import { FeaturedProducts } from "../components/FeaturedProducts.jsx";
import { OffersBanner } from "../components/OffersBanner";
import { TrustHighlights } from "../components/TrustHighlights";
import { Footer } from "../components/Footer";
export const Home = ({ searchQuery }) => {
  return (
    <>
      <Hero />
      <Category />
      <FeaturedProducts searchQuery={searchQuery} />
      <OffersBanner />
      <TrustHighlights />
      <Footer />
    </>
  );
};
