import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Image, Slide, SlideContent, Wrapper } from "./SliderElements";
import "./index.css";
import apartmentServices from "../../services/apartment.services";

const Slider = (props) => {
  const [current, setCurrent] = useState(0);
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    apartmentServices
      .getHomeImages(props.home_id)
      .then((response) => {
        setSlider(response.data);
      })
      .catch((error) => console.log(error));
  }, [props.home_id]);

  const nextSlide = () => {
    setCurrent(current === slider.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? slider.length - 1 : current - 1);
  };

  return (
    <Wrapper>
      <SlideContent>
        <FaChevronLeft className="leftArrow" onClick={prevSlide} />
        <FaChevronRight className="rightArrow" onClick={nextSlide} />
        {slider.length !== 0 &&
          slider.map((slide, index) => {
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
