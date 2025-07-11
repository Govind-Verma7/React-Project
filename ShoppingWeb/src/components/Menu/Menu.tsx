import { useAuth0 } from "@auth0/auth0-react";
import login from "/login.png"
import profile from '/profile.svg'
import lgout from '/logout.png'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from "react-router-dom";
const MySwal = withReactContent(Swal);

type MenuProps = {
    setMenuClicked : (type:boolean) => void;
}
const Menu = ({setMenuClicked}:MenuProps) => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <div className="absolute left-0 sm:top-20 top-17 sm:w-60 w-40 bg-zinc-100">
        {isAuthenticated ? (
             <div className="flex items-center gap-5 sm:h-8 h-6 sm:p-7 p-5 border border-zinc-400" onClick={() =>
                {MySwal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, Logout!'
                }).then((result) => {
                  if (result.isConfirmed) {
                   MySwal.fire('LoggedOut!', 'Successfully logged out.', 'success').then(()=> {
                    logout({ logoutParams: { returnTo: window.location.origin } });
                    })
                  }
                });
            setMenuClicked(false);}
              } >
            <img src={lgout} alt="logout" className="h-6"/>
            <p className="sm:text-xl text-lg">Log Out</p>
        </div>
        ) :
        (<div onClick={() => {loginWithRedirect(); setMenuClicked(false);}} className="flex items-center gap-5 sm:h-8 h-6 sm:p-7 p-5 border border-zinc-400">
            <img src={login} alt="login" className="h-6"/>
            <p className="sm:text-xl text-lg">Login</p>
        </div>)
        }
        
        {
          isAuthenticated ?(<Link to='/profile'><div className="flex items-center gap-5 sm:h-8 h-6 sm:p-7 p-5 border border-zinc-400" onClick={()=>setMenuClicked(false)}>
            <img src={profile} alt="profile" className="h-6"/>
            <p className="sm:text-xl text-lg">Profile</p>
           </div></Link>) :
           (<div onClick={()=>{loginWithRedirect(); setMenuClicked(false);}} className="flex items-center gap-5 sm:h-8 h-6 sm:p-7 p-5 border border-zinc-400">
            <img src={profile} alt="profile" className="h-6"/>
            <p className="sm:text-xl text-lg">Profile</p>
           </div>)
        }
    </div>
  )
}

export default Menu