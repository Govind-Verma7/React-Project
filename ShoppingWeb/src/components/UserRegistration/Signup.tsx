import { Link, useNavigate } from "react-router-dom"
import close from '/close.png'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const Signup = () => {
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [error, setError] = useState<{ fName?: string, lName?: string, email?: string, phone?: string, pass?: string, cpass?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors: typeof error = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
            newErrors.email = "Invalid Email";
        }
        if (fName.trim().length < 3) {
            newErrors.fName = "Atleast 3 characaters long"
        }
        if (lName.trim().length < 2) {
            newErrors.lName = "Atleast 2 characters long"
        }
        if (phone.trim().length != 10) {
            newErrors.phone = "Exact 10 digits long"
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass.trim())) {
            newErrors.pass = "Password must be at least 8 characters, include lowercase, uppercase, number, and special character."
        }
        if (cpass != pass) {
            newErrors.cpass = "Confirm Password must be same"
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            toast.success("You're SignUp successfully!")
            navigate('/');
        }
    }
    return (
        <div className="min-h-screen flex">
            <div className="closeIcn">
                <Link to='/'><img src={close} alt="Close" className="h-5 fixed sm:top-25 top-20 left-5" /></Link>
            </div>
            <form className="border rounded-xl xl:w-1/2 w-3/4 m-auto flex flex-col sm:mt-35 mt-27 items-center md:gap-8 gap-4 pt-5 pb-5 bg-zinc-200 border-zinc-400" onSubmit={handleSubmit}>
                <p className="text-2xl font-bold">Sign Up</p>
                <div className="md:w-3/4 w-7/8 flex justify-between md:flex-row flex-col md:gap-0 gap-4">
                    <div className="fName flex flex-col md:w-4/9 gap-2">
                        <label htmlFor="fName">First Name</label>
                        <input type="text" id="fName" placeholder="First Name" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setfName(e.target.value); }} required />
                        <p className="text-red-500">{error.fName}</p>
                    </div>
                    <div className="lName flex flex-col md:w-4/9 gap-2">
                        <label htmlFor="lName">Last Name</label>
                        <input type="text" id="lName" placeholder="Last Name" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setlName(e.target.value); }} required />
                        <p className="text-red-500">{error.lName}</p>
                    </div>
                </div>
                <div className="email flex flex-col md:w-3/4 w-7/8  gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your Email" id="email" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setEmail(e.target.value); }} required />
                    <p className="text-red-500">{error.email}</p>
                </div>
                <div className="mobile flex flex-col md:w-3/4 w-7/8  gap-2">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input type="text" inputMode="numeric" placeholder="Your Mobile Number" id="mobile" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setPhone(e.target.value); }} required />
                    <p className="text-red-500">{error.phone}</p>
                </div>
                <div className="password flex flex-col md:w-3/4 w-7/8  gap-2">
                    <label htmlFor="pass">Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Your Password" id="pass" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setPass(e.target.value); }} required />
                    <span
                        className="absolute right-5 top-9 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    <p className="text-red-500">{error.pass}</p>
                </div>
                <div className="cpassword flex flex-col md:w-3/4 w-7/8  gap-2">
                    <label htmlFor="cpass">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" id="cpass" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" onChange={(e) => { setCpass(e.target.value); }} required />
                    <span
                        className="absolute right-5 top-9 cursor-pointer"
                        onClick={() => setShowCPassword(!showCPassword)}
                    >
                        {showCPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                    <p className="text-red-500">{error.cpass}</p>
                </div>
                <div className="flex justify-start md:w-3/4 w-7/8  gap-1">
                <p className="sm:text-lg text-base">Already have an account</p>
                <Link to='/login'><p className="cursor-pointer hover:underline hover:underline-offset-2 text-blue-700 sm:text-lg text-base">Login</p></Link>
                </div>
                <button className="border border-zinc-400 px-4 py-2 rounded-xl bg-zinc-100 cursor-pointer hover:bg-sky-600 hover:text-white font-medium">Continue</button>
            </form>
        </div>
    )
}

export default Signup