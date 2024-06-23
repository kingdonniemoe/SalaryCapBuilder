import React from "react";
import Carousel from "react-bootstrap/Carousel";
import MLB from "../assets/MLB_logo.png";
import NBA from "../assets/NBA_logo.png";
import NFL from "../assets/NFL_logo.png";
import NHL from "../assets/NHL_logo.png";

const SportsCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://e0.365dm.com/23/01/2048x1152/skysports-nfl-playoffs-cincinnati-bengals_6033835.jpg?20230123165021"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbac2bfe0-2638-4d21-a44f-d51d5acd580f_1980x1320.jpeg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w1024/mlb/rwddj1rp5oirwwdqgfdl"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://a.espncdn.com/photo/2022/1012/fc_nhl_gm_1296x729.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default SportsCarousel;
