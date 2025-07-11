import logo from '/shopping.png'
import cart from '/cart.png'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { Link } from 'react-router-dom'
import wishlist from '/wishlist.png'
import searchIcn from '/search.png'
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import menu from '/menu.png'
import Menu from '../Menu/Menu'
import { useState } from 'react'
type NavbarProps = {
  setSearchTerm: (term: string) => void;
};

const MySwal = withReactContent(Swal);

const Navbar = ({ setSearchTerm }: NavbarProps) => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const count = useSelector((state: RootState) => state.cart.items.reduce((total) => total + 1, 0));
  const [menuClicked, setMenuClicked] = useState(false);
  return (
    <div className='py-5 xl:px-10 lg:px-7 md:px-5 flex sm:px-3 px-3 bg-zinc-400 items-center justify-between fixed w-full top-0 shadow-xl z-20'>
      <div className='lg:hidden'>
        <img src={menu} alt="menu" className='h-7' onClick={() => setMenuClicked(!menuClicked)} />
        {menuClicked && <Menu setMenuClicked={setMenuClicked}/>}
      </div>
      <Link to='/'><div className="div flex 2xl:gap-4 xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 gap-1 items-center cursor-pointer">
        <img src={logo} alt="Logo" className='sm:h-10 h-6' />
        <p className='sm:text-2xl text-base font-bold'>E-Mart</p>
      </div></Link>
      <div className="home lg:block hidden">
        <Link to='/'><p className='sm:text-xl text-sm underline underline-offset-4 cursor-pointer'>Home</p></Link>
      </div>
      <div className='w-5/12 flex border items-center rounded-xl sm:px-3 px-2'>
        <img src={searchIcn} alt="" className='sm:h-4 h-2.5' />
        <input type="text" placeholder='Search Items' className='sm:px-3 px-2 sm:py-1 py-0 outline-0 w-full sm:placeholder:text-xl placeholder:text-sm' onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className='flex justify-between md:gap-5 gap-2'>
        <div className='lg:block hidden'>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {user && (
                <div className="items-center gap-2 lg:flex hidden">
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              )}
              <button
                onClick={() =>
                  MySwal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Logout!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      MySwal.fire('LoggedOut!', 'Successfully logged out.', 'success').then(() => {
                        logout({ logoutParams: { returnTo: window.location.origin } });
                      })
                    }
                  })
                }
                className="bg-red-500 text-white md:px-3 sm:px-2 px-0.5 py-0.5 md:text-base text-sm rounded cursor-pointer hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="bg-blue-500 text-white md:px-3 sm:px-2 px-0.5 py-0.5 md:text-base text-sm rounded cursor-pointer hover:bg-blue-600"
            >
              Log In
            </button>
          )}
        </div>
        {isAuthenticated ?
          (<div className="wishlist flex gap-2 cursor-pointer relative">
            <Link to='/wishlist'><img src={wishlist} alt="wishlist" className='sm:h-7 h-5' /></Link>
          </div>) : (
            <div className="wishlist flex gap-2 cursor-pointer relative">
              <img src={wishlist} alt="wishlist" className='sm:h-7 h-5' onClick={() => loginWithRedirect()} />
            </div>
          )
        }
        {isAuthenticated ? (
          <div className="cart flex cursor-pointer relative">
            <Link to="/cart"><img src={cart} alt="Cart" className='sm:h-7 h-5' /></Link>
            <Link to='/cart'> <span className='rounded-full sm:h-5 sm:w-5 h-4 w-4 flex justify-center items-center bg-white absolute sm:left-4  sm:-top-2 left-3 -top-2 sm:text-lg text-xs'>{count}</span></Link>
          </div>) : (
          <div className="cart flex cursor-pointer relative">
            <img src={cart} alt="Cart" className='sm:h-7 h-5' onClick={() => loginWithRedirect()} />
            <span className='rounded-full sm:h-5 sm:w-5 h-4 w-4 flex justify-center items-center bg-white absolute sm:left-4  sm:-top-2 left-3 -top-2 sm:text-lg text-xs' onClick={() => loginWithRedirect()}>{count}</span>
          </div>)
        }
      </div>
    </div >
  )
}

export default Navbar