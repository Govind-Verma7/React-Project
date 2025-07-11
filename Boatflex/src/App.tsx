import './App.css'
import RentShareBoat from './components/RentShareBoatSection/RentShareBoat'
import TopRental from './components/TopRentalBoatSection/TopRental'
import Main from './components/HeaderSection/Main'
import Reviwes from './components/ReviewsSection/Reviwes'
import Footer from './components/Footer/Footer'
import SmartBooking from './components/SmartBookingSection/SmartBooking'
import NextTrip from './components/NextTripSection/NextTrip'
import KnowBoatFlex from './components/BoatflexKnowSection/KnowBoatFlex'
import Destination from './components/PopularDestinationSection/Destination'

function App() {
  return (
    <>
      <div className='main'>
        <Main />
        <SmartBooking />
        <Destination />
        <Reviwes />
        <TopRental />
        <KnowBoatFlex />
        <NextTrip />
        <RentShareBoat />
        <Footer />
      </div>
    </>
  )
}

export default App
