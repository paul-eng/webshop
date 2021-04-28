import React, { Component } from "react";
import { connect } from "react-redux";
import Slides from "./Slides";
import "../styles/Slider.css";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [
        "https://www.kidsmathgamesonline.com/images/pictures/numbers600/number1.jpg",
        "https://www.kidsmathgamesonline.com/images/pictures/numbers600/number2.jpg",
        "https://www.kidsmathgamesonline.com/images/pictures/numbers600/number3.jpg",
        "https://www.kidsmathgamesonline.com/images/pictures/numbers600/number4.jpg",
        "https://www.kidsmathgamesonline.com/images/pictures/numbers600/number5.jpg",
      ],
      selected: 0,
      active: false,
      animate: false,
    };

    this.slider = React.createRef();
    this.slides = React.createRef();
    this.setSlide = this.setSlide.bind(this);
    this.checkSlides = this.checkSlides.bind(this);
  }

  componentDidMount() {
    this.slides.current.addEventListener("transitionend", this.checkSlides);

    if ("ontouchstart" in window) {
      let slideWidth =
        this.slides.current.offsetWidth / (this.state.slides.length + 2);
      this.slider.current.scrollLeft = slideWidth;
      this.slider.current.addEventListener("scroll", this.touchSlides.bind(this));
    }
  }

  touchSlides() {
    console.log('coogie')

  }

  componentWillUnmount() {
    this.slides.current.removeEventListener("transitionend", this.checkSlides);
  }

  checkSlides() {
    let selected = this.state.selected;
    let slides = this.state.slides;
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
    if (this.state.active === false) {
      this.setState({
        selected: this.state.selected + i,
        active: true,
        animate: true,
      });
    }
  }

  render() {
    return (
      <div className="Slider" ref={this.slider}>
        <Slides
          ref={this.slides}
          slides={this.state.slides}
          selected={this.state.selected}
          animate={this.state.animate}
        />
        <aside>
          <img src={this.state.slides[0]} alt="frame" />
          <button onClick={() => this.setSlide(-1)}>{"<<"}</button>
          <button onClick={() => this.setSlide(1)}>{">>"}</button>
          <p>{this.state.selected}</p>
        </aside>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    itemInfo: state.products.itemInfo,
  };
};

export default connect(mapStateToProps)(Slider);
