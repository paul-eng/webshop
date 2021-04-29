import React, { useEffect, useState } from "react";

const Slides = React.forwardRef((props, ref) => {
  let [slides, setSlides] = useState([]);

  useEffect(() => {
    if (props.slides) {
      setSlides([
        props.slides[props.slides.length - 1],
        ...props.slides,
        props.slides[0],
      ]);
    }
  }, [props.slides]);

  let slideList = slides.map((slide, i) => (
    <article key={slide + i}>
      <img src={slide} alt="product" />
    </article>
  ));

  let slideWidth = 100 / slides.length;
  let xPos = -(slideWidth + slideWidth * props.selected);

  let style = {
    width: `${slides.length * 100}%`,
    transform: `translateX(${xPos}%)`,
    transition: props.animate ? ".5s" : "0s",
  };

  return (
    <section ref={ref} style={style} className="Slides">
      {slideList}
    </section>
  );
});

export default Slides;
