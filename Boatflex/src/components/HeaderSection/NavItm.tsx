import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavItm.css'
const NavItm = () => {
  return (
    <div id='srchBox'>
        <p id='para'>Where do you want to Rent a boat?</p>
        <div className="icn">
        <FontAwesomeIcon icon={faMagnifyingGlass} id='srchIcn' />
        </div>
    </div>
  )
}

export default NavItm