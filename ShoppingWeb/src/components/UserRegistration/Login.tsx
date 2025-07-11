import { Link, useNavigate } from "react-router-dom"
import close from '/close.png'
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 
import { toast } from "react-toastify";


const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return pattern.test(email.trim());
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Invalid Email");
        }
        else {
            setError('');
            navigate('/');
            toast.success("You're Login Successfully!");
            
        }
    }
    return (
        <div className="h-screen flex">
            <div className="closeIcn">
                <Link to='/'><img src={close} alt="Close" className="h-5 fixed sm:top-25 top-20 left-5" /></Link>
            </div>
            <form className="border rounded-xl lg:w-1/2 w-3/4 m-auto flex flex-col items-center gap-8 pt-5 pb-5 bg-zinc-200 border-zinc-400" onSubmit={handleSubmit}>
                <p className="text-2xl font-bold">Login</p>
                <div className="email flex flex-col md:w-3/4 w-7/8 gap-2">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Your Email" id="email" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} required />
                    {error && <p className="text-red-600">{error}</p>}
                </div>
                <div className="password flex flex-col md:w-3/4 w-7/8 gap-2">
                    <label htmlFor="pass">Password</label>
                    <input type={showPassword ? "text" : "password"} placeholder="Your Password" id="pass" className="border w-full h-10 rounded-lg p-2 placeholder:text-lg bg-zinc-100 outline-0 border-zinc-400" required />
                    <span
                        className="absolute right-5 top-9 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </div>
                <div className="flex justify-start md:w-3/4 w-7/8 gap-1">
                <p>Create new account</p>
                <Link to='/signup'><p className="cursor-pointer hover:underline hover:underline-offset-2 text-blue-700">Signup</p></Link>
                </div>
                <button className="border border-zinc-400 px-4 py-2 rounded-xl bg-zinc-100 cursor-pointer hover:bg-sky-600 hover:text-white font-medium">Continue</button>
            </form>
        </div>
    )
}

export default Login