import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../../styles/Gallery.css";

const Gallery = (props) => {
  SwiperCore.use([Pagination, Navigation]);
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState(0);
  const slides = props.slides.map((slide, i) => (
    <SwiperSlide key={"swiper" + i}>
      <img src={slide} alt="Product" />
    </SwiperSlide>
  ));

  return (
    <div>
      <Swiper
        onActiveIndexChange={(swiper) => setActive(swiper.realIndex)}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
      >
        <aside
          className={modal ? "modal" : ""}
          onClick={() => setModal(!modal)}
        >
          +
        </aside>
        {slides}
        <Modal display={modal} active={active} slides={props.slides} />
      </Swiper>
    </div>
  );
};

export default Gallery;

const Modal = (props) => {
  console.log(props.active);
  return (
    <div
      style={{ display: props.display ? "block" : "none" }}
      className="Modal"
    >
      <img src={props.slides[props.active]} alt="Product Modal" />
    </div>
  );
};
