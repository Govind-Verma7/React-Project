import { useDispatch } from "react-redux";
import { resetCart } from "../../features/CartSlice";
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import arrow from '/arrow.png'

const Success = () => {
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(resetCart());
        },[dispatch])
  return (
 <div>
     <Link to='/cart'><img src={arrow} alt="Arrow" className='h-8 fixed top-25 left-3'/></Link> 
    <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Payment Successful!
    </div>
    </div>  )
}

export default Success