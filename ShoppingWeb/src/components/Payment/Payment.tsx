import { Link } from 'react-router-dom'
import arrow from '/arrow.png'
import { useState } from 'react'
import { resetCart } from '../../features/CartSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { loadStripe } from '@stripe/stripe-js'
const Payment = () => {
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [selectOption, setSelectOption] = useState('');
    // const navigate = useNavigate();
    const [error, setError] = useState<{ fname?: string; lName?: string; mobile?: string; email?: string; city?: string; district?: string; state?: string; zip?: string; option?: string; }>({});
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const validate = () => {
        const newErrors: typeof error = {};
        if (fName.trim().length < 3) {
            newErrors.fname = 'First name atleast 3 characters long';
        }
        if (lName.trim().length < 2) {
            newErrors.lName = 'Last name atleast 2 characters long';
        }
        if (mobile.trim().length != 10) {
            newErrors.mobile = 'Mobile Number contains exact 10 digits'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
            newErrors.email = 'Invalid Email'
        }
        if (city.trim().length < 2) {
            newErrors.city = 'City atleast 2 characters long'
        }
        if (district.trim().length < 2) {
            newErrors.district = 'District atleast 2 characters long'
        }
        if (state.trim().length < 2) {
            newErrors.state = 'State atleast 2 characters long'
        }
        if (zip.trim().length != 6) {
            newErrors.zip = 'Exact 6 digits long'
        }
        if (!selectOption) {
            newErrors.option = 'Select one of them'
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const makepayment = async () => {
        const stripe = await loadStripe('pk_test_51RR4xKErscB5RpYRkKD78Lqxlv3jHJFC0mFGMfQrzgI8PnUVlF9Mxyy4c7NCOSI8SDyDbEyyexxwZuBdH9A25NS200WshJefzv');

        const body = {
            products: items
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await fetch('http://localhost:7000/api/create-checkout-session', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await response.json();
        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        });
        if ((await result)?.error) {
            console.log((await result)?.error)
        }
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (selectOption === 'credit_card') {
                makepayment();
                // navigate('/payment/credit_card');
            } else {
                alert('Successful!');
                window.location.reload();
                dispatch(resetCart());
            }
        }
    }
    return (
        <div className="min-h-screen flex 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-0 sm:mt-10 mt-25">
            <Link to='/cart'><img src={arrow} alt="" className='2xl:h-7 xl:h-7 lg:h-7 md:h-7 sm:h-7 h-5 2xl:mt-25 xl:mt-25 lg:mt-25 md:mt-25 sm:mt-15 mt-0 ml-5 cursor-pointer fixed' /></Link>
            <form className="w-3/4 m-auto p-4 flex flex-col gap-5 border border-zinc-400 bg-zinc-200 shadow-2xl rounded-2xl" onSubmit={handleSubmit}>
                <p className="border-b-3 m-auto 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl text-xl text-zinc-500 font-bold">Enter Your Detail: </p>
                <div className="nameField flex 2xl:flex-row xl:felx-row lg:flex-row md:flex-row flex-col 2xl:justify-between xl:justify-between lg:justify-between md:justify-between items-center 2xl:gap-0 xl:gap-0 lg:gap-0 md:gap-0 gap-3">
                    <div className="fName 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 w-full">
                        <input type="text" id="fname" placeholder="First Name" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setfName(e.target.value)} />
                        <p className='text-red-500 ml-2'>{error.fname}</p>
                    </div>
                    <div className="lName 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 w-full ">
                        <input type="text" id="lname" placeholder="Last Name" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setlName(e.target.value)} />
                        <p className='text-red-500 ml-2'>{error.lName}</p>
                    </div>
                </div>
                <div className="phone_Mail flex 2xl:flex-row xl:felx-row lg:flex-row md:flex-row flex-col 2xl:justify-between xl:justify-between lg:justify-between md:justify-between items-center 2xl:gap-0 xl:gap-0 lg:gap-0 md:gap-0 gap-3">
                    <div className="mobile 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 w-full">
                        <input type="text" inputMode='numeric' id="mNumber" placeholder="Mobile Number" value={mobile} className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" maxLength={10} required onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 10) {
                                setMobile(value);
                            }
                        }} />
                        <p className='text-red-500 ml-2'>{error.mobile}</p>
                    </div>
                    <div className="email 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 w-full">
                        <input type="email" id="email" placeholder="Email" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setEmail(e.target.value)} />
                        <p className='text-red-500 ml-2'>{error.email}</p>
                    </div>
                </div>
                <div className="address flex flex-col gap-5">
                    <label htmlFor="address" className="text-xl text-zinc-500">Address</label>
                    <div className="city_Door flex 2xl:flex-row xl:felx-row lg:flex-row md:flex-row sm:flex-row flex-col 2xl:justify-between xl:justify-between lg:justify-between md:justify-between sm:justify-between items-center 2xl:gap-0 xl:gap-0 lg:gap-0 md:gap-0 sm:gap-0 gap-3">
                        <input type="text" id="door_street" placeholder="Door No/Street" className="border border-zinc-500 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 sm:w-8/17 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required />
                        <div className="city 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 sm:w-8/17 w-full">
                            <input type="text" id="city" placeholder="City" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setCity(e.target.value)} />
                            <p className='text-red-500 ml-2'>{error.city}</p>
                        </div>
                    </div>
                    <div className="district_State flex 2xl:flex-row xl:felx-row lg:flex-row md:flex-row sm:flex-row flex-col 2xl:justify-between xl:justify-between lg:justify-between md:justify-between sm:justify-between items-center 2xl:gap-0 xl:gap-0 lg:gap-0 md:gap-0 sm:gap-0 gap-3">
                        <div className="district 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 sm:w-8/17 w-full">
                            <input type="text" id="district" placeholder="District" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setDistrict(e.target.value)} />
                            <p className='text-red-500 ml-2'>{error.district}</p>
                        </div>
                        <div className="city 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 sm:w-8/17 w-full">
                            <input type="text" id="state" placeholder="State" className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" required onChange={(e) => setState(e.target.value)} />
                            <p className='text-red-500 ml-2'>{error.state}</p>
                        </div>
                    </div>
                    <div className="zip 2xl:w-8/17 xl:w-8/17 lg:w-8/17 md:w-8/17 sm:w-8/17 w-full">
                        <input type="text" inputMode='numeric' id="zip_code" placeholder="Postal/Zip Code" value={zip} className="border border-zinc-500 w-full px-2 py-1 placeholder:text-xl rounded-xl outline-0" maxLength={6} required onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 6) {
                                setZip(value);
                            }
                        }} />
                        <p className='text-red-500 ml-2'>{error.zip}</p>
                    </div>
                </div>
                <div className="payment_option">
                    <label htmlFor="payment" className="text-xl text-zinc-700">Payment Through</label>
                    <div className="div" onChange={(e) => setSelectOption((e.target as HTMLInputElement).value)}>
                        <div className="upi flex gap-3">
                            <input type="radio" value='upi' id='upi' name="payment" className="scale-150 accent-blue-500 cursor-pointer" />
                            <label htmlFor='upi' className="text-xl text-zinc-700 cursor-pointer">UPI</label>
                        </div>
                        <div className="credit_card flex gap-3">
                            <input type="radio" value='credit_card' id='cc' name="payment" className="scale-150 accent-blue-500 cursor-pointer" />
                            <label htmlFor='cc' className="text-xl text-zinc-700 cursor-pointer">Credit Card</label>
                        </div>
                        <div className="netBanking flex gap-3">
                            <input type="radio" value='net_banking' id='nb' name="payment" className="scale-150 accent-blue-500 cursor-pointer" />
                            <label htmlFor='nb' className="text-xl text-zinc-700 cursor-pointer">Net Banking</label>
                        </div>
                        <div className="emi flex gap-3">
                            <input type="radio" id='emi' value='emi' name="payment" className="scale-150 accent-blue-500 cursor-pointer" />
                            <label htmlFor='emi' className="text-xl text-zinc-700 cursor-pointer">EMI</label>
                        </div>
                        <div className="cod flex gap-3">
                            <input type="radio" id='cod' value='cod' name="payment" className="scale-150 accent-blue-500 cursor-pointer" />
                            <label htmlFor='cod' className="text-xl text-zinc-700 cursor-pointer">Cash on Delivery(COD)</label>
                        </div>
                    </div>
                    <p className='text-red-500 ml-2'>{error.option}</p>
                </div>
                <div className="proceed flex justify-center">
                    <button className="px-4 py-2 rounded-2xl text-xl bg-blue-500 text-white cursor-pointer hover:bg-blue-700">Proceed</button>
                </div>
            </form>
        </div>
    )
}
export default Payment