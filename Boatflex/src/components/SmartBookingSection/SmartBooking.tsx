import './SmartBooking.css'
import bookingImg from '/temp.webp'
const SmartBooking = () => {
  return (
    <div className='secondContainer'>
        <img src={bookingImg} alt="bookingImg" id='bookImg'/>
        <div className="smarBookTxt">
            <h3 id='rentBoatTxt'>Rent a boat</h3>
            <h1 id='smartHead'>Boatflex SmartBooking</h1>
            <p id='largeTxtOne' className='largeTxt'>Want to lean back and let boat owners contact you with an offer on a boat that match your criteria?</p>
            <p id='largeTxtTwo' className='largeTxt'>Create a smart booking, lean back and wait for an offer to pop in!</p>
            <button type='button' id='smartBtn'>Create SmartBooking</button>
        </div>
    </div>
  )
}

export default SmartBooking