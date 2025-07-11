import { useDispatch } from 'react-redux'
import { logout } from '../../../../features/userLogInSlice';
import { logout2 } from '../../../../features/userDetailSlice';
import { useState } from 'react';
import "./Logout.css"
const Logout = () => {
  const dispatch = useDispatch();
  const [isDisplay, setIsDisplay] = useState(true);
  const handleIsDisplay = () => {
    setIsDisplay(val => !val);
  }
  if (!isDisplay) return null;
  return (
    <div className="parentLogOut">
      <div className='logOutConfirmation'>
        <div className="confiramtionPara">
        <h1 id='confirmation'>Are you want to LogOut?</h1>
        </div>
        <div className="lgOutBtn">
        <button className='logBtn' onClick={() => {
          dispatch(logout())
          dispatch(logout2())
          handleIsDisplay();
        }}>Yes</button>
        <button className='logBtn' onClick={handleIsDisplay}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Logout