import FeaturedSection from "../../Components/Featured Section/FeaturedSection";
import SwiperBanner from "../../Components/SwiperBanner";
import TrendingSection from "../../Components/Trending Section/TrendingSection";

const Home = () => {
  return (
    <div className="">
      <SwiperBanner />
      <FeaturedSection />
      <TrendingSection />
    </div>
  );
};

export default Home;
