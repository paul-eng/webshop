import React, { useEffect, useState } from "react";

const Slides = React.forwardRef((props, ref) => {
  let [slides, setSlides] = useState([]);
  let [loaded, setLoad] = useState([]);
  window.loaded = loaded;
  useEffect(() => {
    if (props.slides) {
      setSlides([
        props.slides[props.slides.length - 1],
        ...props.slides,
        props.slides[0],
      ]);
    }
  }, [props.slides]);

  let onLoad = () => {
    setLoad([...loaded, ""]);
  };

  let slideList = slides.map((slide, i) => (
    <article key={slide + i}>
      <img onLoad={onLoad} src={slide} alt="product" />
    </article>
  ));

  let slideWidth = 100 / slides.length;
  let xPos = -(slideWidth + slideWidth * props.selected);

  let style = {
    width: `${slides.length * 100}%`,
    // if touch device, css disables all transform so slider can use scroll instead
    transform: `translateX(${xPos}%)`,
    transition: props.animate ? ".5s" : "0s",
    visibility: slides.length === loaded.length ? "visible" : "hidden",
  };

  return (
    <section ref={ref} style={style} className="Slides">
      {slideList}
    </section>
  );
});

export default Slides;
