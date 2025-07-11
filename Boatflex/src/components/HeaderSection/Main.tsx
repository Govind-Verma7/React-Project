import './Main.css';
import NavItm from './NavItm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCircleUser,faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import SignIn from './UserClick/SignIn';
import { useState, useRef, useEffect } from 'react';
import DateLockBar from './DateLocation/DateLockBar';
import payPal from '/payPal.svg'

const Main = () => {
  const [show, setShow] = useState(false);
  const signInRef = useRef<HTMLDivElement>(null);
  const userIconRef = useRef<HTMLLIElement>(null); 

  const handleUser = () => {
    setShow(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        signInRef.current &&
        !signInRef.current.contains(target) &&
        userIconRef.current &&
        !userIconRef.current.contains(target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="first">
      <div className="nav">
        <ul id='ulItms'>
          <li><h1 id='boatflexTxt'>boatflex</h1></li>
          <li id='rent-boat' className='liItm lItm'>Rent a boat</li>
          <li id='list-boat' className='liItm lItm'>List your boat</li>
          <li className='lItm'><NavItm /></li>
          <li className='ricn lItm' id='globe'>
            <FontAwesomeIcon icon={faGlobe} />
          </li>
          <li
            className='ricn lItm'
            id='usericn'
            ref={userIconRef}
            onClick={handleUser}
          >
            <FontAwesomeIcon icon={faCircleUser} id='userMainIcn'/>
            <FontAwesomeIcon icon= {faBarsStaggered} id='userStrappedIcn'/>
          </li>
        </ul>

        {show && (
          <div ref={signInRef}>
            <SignIn />
          </div>
        )}
      </div>

      <div className="heroTxt">
        <h1 id='heroHead'>SAILING IS LIVING</h1>
        <p id='heroPara'>Rent a boat with Boatflex</p>
      </div>

      <div className="dateLocation">
        <DateLockBar />
      </div>
      <div className="payPalIcn">
        <img src={payPal} alt="paypalIcn" id='ppIcn'/>
      </div>
    </div>
  );
};

export default Main;
