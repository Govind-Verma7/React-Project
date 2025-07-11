import './NextTripCard.css'
const NextTripCard = (props:any) => {
  return (
    <div className='nextTripCardDiv'>
        <div className="cardImg">
            <img src={props.tripImg} alt="TripImg" id='tripImg'/>
        </div>
        <div className="cardTxt">
            <h1 id='cardTxtHead'>{props.cardHead}</h1>
            <h3 id='cardTxtSubHead'>{props.cardSubHead}</h3>
        </div>
    </div>
  )
}

export default NextTripCard