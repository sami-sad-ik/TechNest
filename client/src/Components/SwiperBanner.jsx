import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Banner from "./Banner";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const SwiperBanner = () => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}>
      <SwiperSlide>
        <Banner
          bannerImg={banner1}
          title={" Your growing Tech products platform"}
          description={`  A community-driven hub to discover, share, and celebrate the latest
          products, tools, and innovations. Join the nest and explore what’s new
          in tech, together.`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Banner
          bannerImg={banner2}
          title={` Discover tomorrow’s innovations today`}
          description={`  Stay ahead with the newest apps, gadgets, and tech solutions shaping the future. 
            Explore curated products that are transforming the way we live and
            work.`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <Banner
          bannerImg={banner3}
          title={`Connect, share, and grow together`}
          description={`  Be part of a thriving tech community where creators and enthusiasts showcase
          ideas, exchange feedback, and inspire the next wave of innovation.`}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperBanner;
