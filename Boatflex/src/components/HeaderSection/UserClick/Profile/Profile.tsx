import { useSelector } from "react-redux"
import "./Profile.css"
import { RootState } from "../../../../app/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import profileImg from '/user.png';

interface ProfileProps{
    onClose: () => void;
}
const Profile = ({ onClose }: ProfileProps) => {
    const usermail = useSelector((state:RootState) => state.logIn.username) || useSelector((state:RootState) => state.signUp.eMail);
    const userName = useSelector((state:RootState) => state.logIn.fName) || useSelector((state:RootState) => state.signUp.fName);
    const userLastName = useSelector((state:RootState) => state.logIn.lName) || useSelector((state: RootState) => state.signUp.lName);
    const userPhoneNumber = useSelector((state:RootState) => state.logIn.pNumber) || useSelector((state:RootState) => state.signUp.pNumber);
  return (
    <div className="parentProfile">
        <FontAwesomeIcon icon={faXmark} onClick={onClose} id="iconX"/>
        <div className="userData">
        <div className="profileIcn">
          <img src={profileImg} alt="UserProfile" id="UserProfile"/>
        </div>
    <div id="profile">
        <h1 id="profileHead">User Profile</h1>
        <p id="uName" className="uData">Name: {userName} {userLastName}</p>
        <p id="uMail" className="uData">Email : {usermail}</p>
        <p id="uNum" className="uData">Phone Number: {userPhoneNumber}</p>
    </div>
    </div>
    </div>
  )
}

export default Profile