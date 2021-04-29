import React, { Component } from "react";
import Slides from "./Slides";
import "../styles/Slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      active: false,
      animate: false,
    };
    this.slider = React.createRef();
    this.slides = React.createRef();
    this.setSlide = this.setSlide.bind(this);
    this.checkSlides = this.checkSlides.bind(this);
    this.touchSlides = this.touchSlides.bind(this);
    this.buttonList = this.buttonList.bind(this);
  }

  componentDidMount() {
    this.slides.current.addEventListener("transitionend", this.checkSlides);

    if ("ontouchstart" in window) {
      this.slider.current.scrollLeft = this.slider.current.offsetWidth;
      this.slider.current.addEventListener("scroll", this.touchSlides);
    } else {
      this.slides.current.addEventListener("click", () =>
        this.setSlide(this.state.selected + 1)
      );
    }
  }

  touchSlides() {
    let sliderWidth = Math.round(
      this.slides.current.getBoundingClientRect().width
    );
    let slideWidth = this.slider.current.offsetWidth;
    let scrollPos = this.slider.current.scrollLeft;
    // scroll snapped to end
    if (scrollPos + slideWidth === sliderWidth) {
      this.slider.current.scrollLeft = slideWidth;
      // scroll snapped to start
    } else if (scrollPos === 0) {
      this.slider.current.scrollLeft = sliderWidth - slideWidth * 2;
    }
  }

  componentWillUnmount() {
    this.slides.current.removeEventListener("transitionend", this.checkSlides);
    if ("ontouchstart" in window) {
      this.slider.current.removeEventListener("scroll", this.touchSlides);
    } else {
      this.slides.current.removeEventListener("click", () => this.setSlide(1));
    }
  }

  checkSlides() {
    let selected = this.state.selected;
    let slides = this.props.gallery;
    this.setState({
      selected:
        selected === slides.length
          ? 0
          : selected === -1
          ? slides.length - 1
          : selected,
      animate: false,
      active: false,
    });
  }

  setSlide(i) {
    if (this.state.active === false && i !== this.state.selected) {
      this.setState({
        selected: i,
        active: true,
        animate: true,
      });
    }
  }

  buttonList() {
    return this.props.gallery.map((el, i) => (
      <button
        style={{
          backgroundColor: i === this.state.selected ? "black" : "#aaa",
        }}
        onClick={() => this.setSlide(i)}
      />
    ));
  }

  render() {
    return (
      <div className="Slider" ref={this.slider}>
        <Slides
          ref={this.slides}
          slides={this.props.gallery}
          selected={this.state.selected}
          animate={this.state.animate}
        />
        <aside>
          <img
            src={this.props.gallery ? this.props.gallery[0] : ""}
            alt="frame"
          />
          <div>{this.props.gallery ? this.buttonList() : ""}</div>
        </aside>
      </div>
    );
  }
}

export default Slider;
