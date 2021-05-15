import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../../styles/Swipe.css";

SwiperCore.use([Pagination, Navigation]);

const Swipe = (props) => {
  const slides = props.slides.map((slide, i) => (
    <SwiperSlide key={"swiper" + i}>
      <img src={slide} alt="Product" />
    </SwiperSlide>
  ));

  return (
    <Swiper
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {slides}
    </Swiper>
  );
};

export default Swipe;
