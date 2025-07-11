import './TopRental.css'
import RentalCard from './TopRentalCard/RentalCard'
import left from '/angle-left-solid.svg'
import right from '/angle-right-solid.svg'
import topImg1 from '/topCard1.png'
import topImg2 from '/topCard2.png'
import topImg3 from '/topCard3.png'
import topImg4 from '/topCard4.png'
import topImg5 from '/topCard5.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faSailboat } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

const rentals = [
  {
    image: topImg1,
    cardHead: "QA boatnfbdskjfds fdfsd - QA Boat",
    loct: "Jodhpur, Rajasthan, India",
    price: "53",
    buttons: ['star', 'user']
  },
  {
    image: topImg2,
    cardHead: "2023 - Shalu's Boat",
    loct: "Jaisalmer, Rajasthan, India",
    price: "45",
    buttons: ['user', 'boat']
  },
  {
    image: topImg3,
    cardHead: "84Y5 - jamshed",
    loct: "Jamshedpur, JH, India",
    price: "53",
    buttons: ['star', 'user', 'boat']
  },
  {
    image: topImg4,
    cardHead: "84Y5 - SS_New_Boat",
    loct: "Jodhpur, Rajasthan, India",
    price: "50",
    buttons: ['user']
  },
  {
    image: topImg5,
    cardHead: "SSUD - S_Owner",
    loct: "Jodhpur, Rajasthan, India",
    price: "50",
    buttons: ['star', 'user']
  }
];
type RentalSectionProps = {
  cardsPerPage: number;
};

const RentalSection = ({ cardsPerPage }: RentalSectionProps) => {
  const [startIdx, setStartIdx] = useState(0);

  const handleNext = () => {
    if (startIdx + cardsPerPage < rentals.length) {
      setStartIdx(startIdx + 1);
    }
  };

  const handlePrev = () => {
    if (startIdx > 0) {
      setStartIdx(startIdx - 1);
    }
  };

  return (
    <div className="cardSection">
      <div className="prevNxtt">
        <div className="arrow1" id="left1" onClick={handlePrev}>
          <img src={left} alt="left-arrow" />
        </div>
        <div className="rentalCards">
          {rentals.slice(startIdx, startIdx + cardsPerPage).map((rental, index) => (
            <RentalCard
              key={index}
              image={rental.image}
              cardHead={rental.cardHead}
              loct={rental.loct}
              price={rental.price}
            >
              <div className="bottomBtns">
                {rental.buttons.includes('star') && (
                  <button id="starBtn" className="twoBtn">
                    <FontAwesomeIcon icon={faStar} className="starblck" /> 3.50
                  </button>
                )}
                {rental.buttons.includes('user') && (
                  <button id="userBtn" className="twoBtn">
                    <FontAwesomeIcon icon={faUser} /> 1
                  </button>
                )}
                {rental.buttons.includes('boat') && (
                  <button id="boatBtn" className="twoBtn">
                    <FontAwesomeIcon icon={faSailboat} />
                  </button>
                )}
              </div>
            </RentalCard>
          ))}
        </div>
        <div className="arrow1" id="right1" onClick={handleNext}>
          <img src={right} alt="right-arrow" />
        </div>
      </div>
    </div>
  );
};

const TopRental = () => {
  return (
    <div className="topComp">
      <div className="txtSection">
        <h1 id="topHeading">Top 10 rental boats</h1>
        <h3 id="topPara">Top 10 choices that are most likely to rock your boat</h3>
      </div>

      <div className="rentalContainerOne">
        <RentalSection cardsPerPage={3} />
      </div>

      <div className="rentalContainerTwo">
        <RentalSection cardsPerPage={2} />
      </div>

      <div className="rentalContainerThree">
        <RentalSection cardsPerPage={1} />
      </div>
    </div>
  );
};

export default TopRental;
