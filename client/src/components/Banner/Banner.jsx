import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
      <Carousel
        className=""
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://www.opus37.com.ar/wp-content/uploads/2021/01/shows-musicales-ample-1500x600-1.jpg"
            layout="fill"
            alt="banner1"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://www.opus37.com.ar/wp-content/uploads/2021/01/taller-de-piano-ample-1500x600-1.jpg"
            layout="fill"
            alt="banner2"

          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://www.opus37.com.ar/wp-content/uploads/2020/02/mic-y-mixer-1500x600-1.jpg"
            layout="fill"
            alt="banner3"

          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://www.opus37.com.ar/wp-content/uploads/2021/01/clases-ample-1500x600-1.jpg"
            layout="fill"
            alt="banner3"

          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;