import React, { Component } from 'react';

class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlideIndex: 0,
    };
  }

  nextSlide = () => {
    this.setState((prevState) => ({
      currentSlideIndex:
        (prevState.currentSlideIndex + 1) % this.props.slides.length,
    }));
  };

  prevSlide = () => {
    this.setState((prevState) => ({
      currentSlideIndex:
        (prevState.currentSlideIndex - 1 + this.props.slides.length) %
        this.props.slides.length,
    }));
  };

  render() {
    const { slides } = this.props;
    const { currentSlideIndex } = this.state;

    return (
      <div className="slideshow">
        <div className="slide">
          <img src={slides[currentSlideIndex]} alt={`Slide ${currentSlideIndex + 1}`} />
        </div>
        <button onClick={this.prevSlide}>Previous</button>
        <button onClick={this.nextSlide}>Next</button>
      </div>
    );
  }
}

export default Slideshow;
