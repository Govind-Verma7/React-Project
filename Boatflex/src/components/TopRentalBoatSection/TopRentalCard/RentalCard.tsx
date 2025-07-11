import './RentalCard.css'
import iconHeart from '/icon-heart.svg'

const RentalCard = (props:any) => {
  return (
    <div>
        <div className="topCard">
            <img src={props.image} alt="image" id='img'/>
            <div className="heartImg">
            <img src={iconHeart} alt="HeartIcon" id='heartIcn' />
            </div>
            <div className="txtDiv">
                <p id='cHead'>{props.cardHead}</p>
                <p id='rajLoc'>{props.loct}</p>
                <p id='rajPrice'>From <span id='priceTxt'>€ {props.price}</span> / day</p>
            </div>
            <hr id='cardBreaker'/>
            <div className="bottomRental">
                {props.children}
            </div>
        </div>
    </div>
  )
}

export default RentalCard