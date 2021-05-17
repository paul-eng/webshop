import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal,clearModal } from "../../actions/ItemActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../../styles/Gallery.css";

const Gallery = (props) => {
  const dispatch = useDispatch();
  const active = useRef(0);
  SwiperCore.use([Pagination, Navigation]);
  const slides = props.slides.map((slide, i) => (
    <SwiperSlide key={"swiper" + i}>
      <img src={slide} alt="Product" />
    </SwiperSlide>
  ));

  useEffect(()=>{
    return ()=>dispatch(clearModal())
  })

  return (
    <div>
      <Swiper
        onActiveIndexChange={(swiper) => (active.current = swiper.realIndex)}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
      >
        <aside onClick={() => dispatch(setModal(active.current))}>+</aside>
        {slides}
      </Swiper>
    </div>
  );
};

export default Gallery;
