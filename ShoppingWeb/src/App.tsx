import { Route, Routes } from 'react-router-dom'
import AddToCart from './components/AddToCart/AddToCart'
import Cards from './components/Cards/Cards'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Payment from './components/Payment/Payment'
import { useState } from 'react'
// import CreditCardPayment from './components/Payment/CreditCardPayment'
import Success from './components/PaymentConfirmation/Success'
import Cancel from './components/PaymentConfirmation/Cancel'
import Wishlist from './components/Wishlist/Wishlist'
import Profile from './components/Profile/Profile'

function App() {
    const [searchTerm, setSearchTerm] = useState("");

  return (
   <div className='min-h-screen'>
    <Navbar setSearchTerm={setSearchTerm} />
    <Routes>
      <Route path='/' element={<Cards searchTerm={searchTerm}/>}/>
      <Route path='/cart' element={<AddToCart/>}/>
      <Route path='/payment' element={<Payment/>}/>
      {/* <Route path='/payment/credit_card' element={<CreditCardPayment/>}/> */}
      <Route path='/success' element={<Success/>}/>
      <Route path='/cancel' element={<Cancel/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App
