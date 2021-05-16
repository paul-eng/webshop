import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation, Zoom } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/zoom/zoom.min.css";
import "swiper/components/navigation/navigation.min.css";
import "../../styles/Gallery.css";

const Gallery = (props) => {
  SwiperCore.use([Pagination, Navigation, Zoom]);
  const [modal, setModal] = useState(false);
  const slides = props.slides.map((slide, i) => (
    <SwiperSlide zoom={true} key={"swiper" + i} >
      <img  src={slide} alt="Product" />
    </SwiperSlide>
  ));
  // onInit={(ref) => (modal.current = ref)}
  // const modal = useRef();
  // useEffect(() => {
  //   let modalEl = modal.current.el;
  //   visible ? (modalEl.className += " modal") : (modalEl.className -= " modal");
  // }, [visible]);

  return (
    <div>
      <Swiper
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
      </Swiper>
      <Modal display={modal} slides={slides} />
    </div>
  );
};

export default Gallery;

const Modal = (props) => {
  return (
    <div className="Modal">
      <Swiper loop={true} 
      centeredSlides={true}
      navigation={true}>
        {props.slides}
      </Swiper>
    </div>
  );
};
