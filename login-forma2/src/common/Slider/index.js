import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Image, Slide, SlideContent, Wrapper } from "./SliderElements";
import "./index.css";
const slider = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
];
const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slider.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <Wrapper>
      <SlideContent>
        <FaChevronLeft className="leftArrow" onClick={prevSlide} />
        <FaChevronRight className="rightArrow" onClick={nextSlide} />
        {slider.map((slide, index) => {
          return (
            <Slide index={index}>
              {index === current && <Image src={slide} alt="" />}
            </Slide>
          );
        })}
      </SlideContent>
    </Wrapper>
  );
};

export default Slider;
