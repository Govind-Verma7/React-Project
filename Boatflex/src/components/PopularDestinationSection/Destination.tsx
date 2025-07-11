import './Destination.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const images = [
  { src: '/Popular-Destination-France.webp', label: 'France' },
  { src: '/Popular-Destination-Turkey.webp', label: 'Turkey' },
  { src: '/Popular-Destination-Scandinavia.webp', label: 'Scandinavia' },
  { src: '/spain.webp', label: 'Spain' },
  { src: '/italy.webp', label: 'Italy' },
  { src: '/greece.webp', label: 'Greece' },
  { src: '/croatia.webp', label: 'Croatia' },
];

const settingsList = [
  { className: 'destinationCont', settings: { dots: false, infinite: true, speed: 500, slidesToShow: 3.7, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000 } },
  { className: 'destinationContTwo', settings: { dots: false, infinite: true, speed: 500, slidesToShow: 3, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000 } },
  { className: 'destinationContThree', settings: { dots: false, infinite: true, speed: 500, slidesToShow: 2, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000 } },
  { className: 'destinationContFour', settings: { dots: false, infinite: true, speed: 500, slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000 } },
];

const Destination = () => {
  return (
    <div className="parentDestination">
      {settingsList.map(({ className, settings }, index) => (
        <div key={index} className={className}>
          <h1 id="popDesHead">Popular destinations</h1>
          <h2 id="popDesTxt">Sail through our most popular rental destinations</h2>
          <div className="slider">
            <Slider {...settings}>
              {images.map(({ src, label }, i) => (
                <div key={i} className="slideItem">
                  <div className="imageWrapper">
                    <img src={src} alt={label} className="destinationImage" />
                    <div className="imageText">{label}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Destination;
