import { Link } from 'react-router-dom'
import arrow from '/arrow.png'
const Cancel = () => {
  return (
    <div>
     <Link to='/cart'><img src={arrow} alt="Arrow" className='h-8 fixed top-25 left-3'/></Link> 
    <div className="h-screen flex justify-center items-center text-2xl font-bold">
        Payment Failed!
    </div>
    </div>
  )
}

export default Cancel