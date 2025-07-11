import './NextTrip.css'
import trip1 from '/trip1.webp'
import trip2 from '/trip2.webp'
import trip3 from '/trip3.webp'
import trip4 from '/trip4.webp'

import NextTripCard from './NextTripCards/NextTripCard'
const NextTrip = () => {
  return (
    <div className='nextTripSection'>
        <div className="nextTripTxt">
            <h1 id='nextTripHead'>Your next trip is waiting on the horizon</h1>
            <h3 id='nextTripSubHead'>You have the dream - we have the boat</h3>
        </div>
        <div className="nextTripCards">
            <div className="rowOne">
            <NextTripCard tripImg={trip1} cardHead="Family holiday" cardSubHead="Gather the family, relax & enjoy!"/>
            <NextTripCard tripImg={trip2} cardHead="Blasting fast" cardSubHead="Speed, watersports and adrenalin"/>
            </div>
            <div className="rowTwo">
            <NextTripCard tripImg={trip3} cardHead="Romantic vacation" cardSubHead="Vacation for two … or more"/>
            <NextTripCard tripImg={trip4} cardHead="Fun & experiences" cardSubHead="Adventures on the ocean"/>
            </div>
        </div>
    </div>
  )
}

export default NextTrip