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
    };
    this.slider = React.createRef();
    this.slides = React.createRef();
    this.setSlide = this.setSlide.bind(this);
  }

  componentDidUpdate() {
    if ("ontouchstart" in window) {
      this.slider.current.scrollLeft = this.slider.current.offsetWidth;
    } else {
      this.slides.current.style.transform = "translateX(-20%)"
    }
  }

  setSlide() {}

  render() {
    return (
      <div className="Slider" ref={this.slider}>
        <Slides ref={this.slides} slides={this.state.slides} />
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
