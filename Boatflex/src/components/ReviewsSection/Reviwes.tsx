import Card from './Cards/Card';
import './Reviews.css';
import { useState } from 'react';
import person1 from '/person1.jpeg';
import person2 from '/person2.jpeg';
import person3 from '/person3.jpeg';
import person4 from '/person4.jpeg';
import person5 from '/person5.jpeg';
import person6 from '/person6.jpeg';
import person7 from '/person7.jpeg';
import person8 from '/person8.jpeg';
import person9 from '/person9.jpeg';
import left from '/angle-left-solid.svg';
import right from '/angle-right-solid.svg';

const cardsData = [
  { person: person1, txt: '"We used Boatflex for a corporate event. The experience was super good from start to finish. Definitely something we will do again - warm recommendation from here." - Mads Worsoe' },
  { person: person2, txt: '"Hand-held, professional assistance from start to finish when renting a larger boat in the Mediterranean sea." - Christian Olufsen' },
  { person: person3, txt: '"I highly recommend Boatflex! It was super easy and quick to find a nice boat for a company event we held. Everyone on board agreed that the day was a success." - Cecilie Faber' },
  { person: person4, txt: '"Fantastic good experience with Boatflex and with the boat! Nice with friendly service and nice trip to the water. Everything went as expected and we will definitely be back!" - Max T.' },
  { person: person5, txt: '"Highly recommendable! I had a wonderful day on the water with the family and can definitely recommend Boatflex to others in the future." - Tine Bjelland' },
  { person: person6, txt: '"Been looking for a company that can do this! Why buy a boat when Boatflex exists? Easy and simple and book through their system. Really good support and help throughout." - Dan Pedersen' },
  { person: person7, txt: '"Excellent experience! Fantastic experiences on the water at great prices! Clear recommendation!" - Joachim Udholm Knudsen' },
  { person: person8, txt: '"Boatflex is a good and safe way to rent out your boat. My boat has now been at Boatflex for almost a year. And all bookings went perfectly." - Morten F.' },
  { person: person9, txt: '"Warm recommendations on Boatflex! Really friendly and good service! We had a fantastic trip in Copenhagen with a really nice boat. Can highly recommend Boatflex!" - Ann' },
];

const Carousel = ({ cardsPerPage, containerClass }: { cardsPerPage: number; containerClass: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - cardsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + cardsPerPage < cardsData.length) {
      setCurrentIndex(currentIndex + cardsPerPage);
    }
  };

  const visibleCards = cardsData.slice(currentIndex, currentIndex + cardsPerPage);

  return (
    <div className={containerClass}>
      <div className="carousel-container">
        <div className="cardBox">
          {visibleCards.map((card, index) => (
            <Card key={index} person={card.person} txt={card.txt} />
          ))}
        </div>
      </div>

      <div className="prevNxt">
        <div className="arrow" id="left" onClick={handlePrev}>
          <img src={left} alt="left-arrow" />
        </div>
        <div className="arrow" id="right" onClick={handleNext}>
          <img src={right} alt="right-arrow" />
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h1 id="review">Reviews</h1>
      <h3 id="reviewTxt">Here's what the users say about renting with Boatflex</h3>
      <div className='reviewCards'>
      <Carousel cardsPerPage={3} containerClass="firstContainer" />
      <Carousel cardsPerPage={2} containerClass="secContainer" />
      <Carousel cardsPerPage={1} containerClass="thirdContainer" />
      </div>
    </div>
  );
};

export default Reviews;
