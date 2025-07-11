import signIn from '/icon-sign-out.svg'
import acc from '/icon-add-circle.svg'
import support from '/icon-support-purple.svg'
import booking from '/appointment.png'
import policy from '/icon-license-purple.svg'
import userImg from '/user.png'
import logOutImg from '/log-out.png'
import './SignIn.css'
import { useState } from 'react'
import LogIn from './LogInForm/LogIn'
import SignForm from './SignInForm/SignForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import Profile from './Profile/Profile'
import Logout from './LogOut/Logout'
const SignIn = () => {
    const [isSignIn, setSignIn] = useState(false);
    function handleSignIn(){
        setSignIn(preState => !preState)
    }
    const [isSigned, setSigned] = useState(false);
    function handleSigned(){
        setSigned(preState => !preState)
    }
    const [isLogIn, setIsLogIn] = useState(false);
    function handleLogIn(){
        setIsLogIn(true)
    }
    const [isLogOut, setIsLogOut] = useState(false);
    function handleLogOut(){
        setIsLogOut(preState => !preState)
    }
    
    const isAuthenticated = useSelector((state:RootState) => state.logIn.isAuthenticated)
    const isSignInUser = useSelector((state:RootState) => state.signUp.isSignInUser)
  return (
    <div className='signInCom'>
        {(isAuthenticated || isSignInUser)?(
             <ul className='topUl'>
             <li>
                 <a href="#" className='signComp' onClick={handleLogIn}>
                 <img src={userImg} alt="SignIn" style={{"height":"1em", "width":"1em"}}/>
                 <p>Profile</p>
                 </a>
             </li>
             <li>
                 <a href="#" className='signComp' onClick={handleLogOut}>
                 <img src={logOutImg} alt="Account" style={{"height":"1em", "width":"1em"}}/>
                 <p>Log Out</p>
                 </a>
             </li>
         </ul>
        ):(
        <ul className='topUl'>
            <li>
                <a href="#" className='signComp' onClick={handleSignIn}>
                <img src={signIn} alt="SignIn" style={{"height":"1em", "width":"1em"}}/>
                <p>Sign in</p>
                </a>
            </li>
            <li>
                <a href="#" className='signComp' onClick={handleSigned}>
                <img src={acc} alt="Account" style={{"height":"1em", "width":"1em"}}/>
                <p>Create Account</p>
                </a>
            </li>
        </ul>
    )}
        <ul>
            <li>
                <a href="#" className='signComp'>
                <img src={support} alt="Support" style={{"height":"1em", "width":"1em"}}/>
                <p>Support Center</p>
                </a>
            </li>
            <li>
                <a href="#" className='signComp'>
            <img src={booking} alt="Booking" style={{"height":"1em", "width":"1em"}}/>
            <p>Smart Booking</p>
            </a>
            </li>
            <li> 
                <a href="#" className='signComp'>
            <img src={policy} alt="Policy" style={{"height":"1em", "width":"1em"}}/>
            <p>Legal and policies</p>
            </a>
            </li>
        </ul>
        {isSignIn && <LogIn onClose={() => setSignIn(false)}/>}
        {isSigned && <SignForm/>}
        {isLogIn && <Profile onClose={() => setIsLogIn(false)} />}
        {isLogOut && <Logout/>}
    </div>
  )
}

export default SignIn