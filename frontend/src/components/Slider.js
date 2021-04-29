import React, { Component } from "react";
import Slides from "./Slides";
import Modal from "./Modal";
import "../styles/Slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      active: false,
      animate: false,
    };
    this.scroller = React.createRef();
    this.slides = React.createRef();
    this.modalImg = React.createRef();
    this.setSlide = this.setSlide.bind(this);
    this.setModal = this.setModal.bind(this);
    this.checkSlides = this.checkSlides.bind(this);
    this.touchSlides = this.touchSlides.bind(this);
    this.buttonList = this.buttonList.bind(this);
  }

  componentDidMount() {
    if ("ontouchstart" in window) {
      this.scroller.current.addEventListener("scroll", this.touchSlides);
    } else {
      this.slides.current.addEventListener("transitionend", this.checkSlides);
      this.modalImg.current.addEventListener("click", this.setModal);
      this.slides.current.addEventListener("click", () =>
        this.setSlide(this.state.selected + 1)
      );
    }
  }

  onLoad() {
    if ("ontouchstart" in window) {
      this.scroller.current.scrollLeft = this.scroller.current.offsetWidth;
    }
  }

  componentWillUnmount() {
    if ("ontouchstart" in window) {
      this.scroller.current.removeEventListener("scroll", this.touchSlides);
    } else {
      this.slides.current.removeEventListener(
        "transitionend",
        this.checkSlides
      );
      this.slides.current.removeEventListener("click", () => this.setSlide(1));
    }
  }

  setModal() {
    let i = this.state.selected;
    i === this.props.gallery.length - 1
      ? this.setState({ selected: 0 })
      : this.setState({ selected: i + 1 });
  }

  touchSlides() {
    let scrollerWidth = this.slides.current.getBoundingClientRect().width;
    let slideWidth = this.scroller.current.offsetWidth;
    let slideCount = Math.round(scrollerWidth / slideWidth);
    let edges = [...Array(slideCount).keys()].map((el) => el * slideWidth);
    let scrollPos = this.scroller.current.scrollLeft;
    if (edges.includes(scrollPos)) {
      let slide = edges.indexOf(scrollPos);
      if (slide === slideCount - 1) {
        // reach scrollbar end, reset to front
        this.scroller.current.scrollLeft = slideWidth;
        this.setState({ selected: 0 });
        // reach scrollbar beginning, reset to end
      } else if (slide === 0) {
        this.scroller.current.scrollLeft = scrollerWidth - slideWidth * 2;
        this.setState({ selected: slideCount - 2 });
      } else {
        this.setState({ selected: slide - 1 });
      }
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
    let length = this.props.gallery.length;
    let selected = this.state.selected;
    return this.props.gallery.map((el, i) => (
      <button
        key={el + i}
        style={{
          backgroundColor:
            i === selected
              ? "black"
              : selected === length && i === 0
              ? "black"
              : "#aaa",
        }}
        onClick={() => this.setSlide(i)}
      />
    ));
  }

  render() {
    return (
      <div className="Slider">
        <div className="wrapper" ref={this.scroller}>
          <Slides
            ref={this.slides}
            slides={this.props.gallery}
            selected={this.state.selected}
            animate={this.state.animate}
          />
          <img
            onLoad={this.onLoad.bind(this)}
            src={this.props.gallery ? this.props.gallery[0] : ""}
            alt="frame"
          />
        </div>
        <aside id="buttonwrap">
          <Modal
            ref={this.modalImg}
            slides={this.props.gallery}
            selected={this.state.selected}
          />
          {this.props.gallery ? this.buttonList() : ""}
        </aside>
      </div>
    );
  }
}

export default Slider;
