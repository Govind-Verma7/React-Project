import './Card.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
const Card = (props:any) => {
  return (
    <div className='cardContainer'>
        <img src={props.person} alt="person" className='personImg' />
        <div className="paraDiv">
        <p className='cardPara'>{props.txt}</p>
        </div>
        <FontAwesomeIcon icon={faStar} className='starIcn'/>
        <FontAwesomeIcon icon={faStar} className='starIcn'/>
        <FontAwesomeIcon icon={faStar} className='starIcn'/>
        <FontAwesomeIcon icon={faStar} className='starIcn'/>
        <FontAwesomeIcon icon={faStar} className='starIcn'/>
    </div>
  )
}

export default Card