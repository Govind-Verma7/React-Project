import './DateLockBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
const DateLockBar = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    function handleLoc(){
        inputRef.current?.focus();
    }
    return (
        <div className="parent">
        <div className='DLContainer'>
            <div className="location">
                <p className='txt'>Location</p>
                <div id="locInp" className='inpWLogo'>
                    <FontAwesomeIcon icon={faLocationArrow} className='inpIcn'/>
                    <input type="text" ref={inputRef} placeholder='Where do you want to rent a boat?' id='inputOfLoc' />
                </div>
            </div>
            <div className="pickUp">
                <p className='txt'>Pick-up</p>
                <div id="pickUpInp" className='inpWLogo'>
                    <input type="date" placeholder='Add dates' className='sameInp'/>
                </div>
            </div>
            <div className="return">
                <p className='txt'>Return</p>
                <div id="returnInp" className='inpWLogo'>
                    <input type="date" placeholder='Add dates' className='sameInp'/>
                </div>
            </div>
            <button type='button' id='srchBtn' onClick={handleLoc}> <FontAwesomeIcon icon={faMagnifyingGlass} id='magIcn'/>Search</button>
        </div>
        </div>
    )
}

export default DateLockBar