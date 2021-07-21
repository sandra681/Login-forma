import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Image, Slide, SlideContent, Wrapper } from "./SliderElements";
import "./index.css";

const Slider = (props) => {
  const [current, setCurrent] = useState(0);
  const apartment = props.apartment;

  const nextSlide = () => {
    if (apartment) {
      setCurrent(current === apartment.images.length - 1 ? 0 : current + 1);
    }
  };
  const prevSlide = () => {
    if (apartment) {
      setCurrent(current === 0 ? apartment.images.length - 1 : current - 1);
    }
  };

  return (
    <Wrapper>
      <SlideContent>
        <FaChevronLeft className="leftArrow" onClick={prevSlide} />
        <FaChevronRight className="rightArrow" onClick={nextSlide} />

        {apartment &&
          apartment.images.length > 0 &&
          apartment.images.map((slide, index) => {
            return (
              <Slide index={index} key={index}>
                {index === current && (
                  <Image
                    src={process.env.REACT_APP_BASE_URL_IMAGE + slide.filename}
                    alt=""
                  />
                )}
              </Slide>
            );
          })}
      </SlideContent>
    </Wrapper>
  );
};

export default Slider;
