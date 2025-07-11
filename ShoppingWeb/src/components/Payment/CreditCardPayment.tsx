import { useState } from "react"
import { useDispatch } from "react-redux";
import { resetCart } from "../../features/CartSlice";

const CreditCardPayment = () => {
    const [name, setName] = useState('');
    const [cardNumb, setCardNumb] = useState('');
    const [cvv, setCvv] = useState('');
    const [value, setValue] = useState('');
    const [error, setError] = useState<{ name?: string; cardNumb?: string; cvv?: string; date?: string; }>({});
    const dispatch = useDispatch();

    const validate = () => {
        const newError: typeof error = {};
        if (name.trim().length < 3) {
            newError.name = 'Name atleast 3 character long';
        }
        if (cardNumb.trim().length != 16) {
            newError.cardNumb = 'Card Number exact 16 digit long';
        }
        if (cvv.trim().length != 3) {
            newError.cvv = "CVV exact 3 digit long";
        }
        if (!/^\d{2}\/\d{2}$/.test(value)) {
            newError.date = 'Enter valid MM/YY';
        } else {
            const [monthStr, yearStr] = value.split('/');
            const month = parseInt(monthStr, 10);
            const year = parseInt(yearStr, 10) + 2000;

            const now = new Date();
            const currentMonth = now.getMonth() + 2;
            const currentYear = now.getFullYear();

            if (month < 1 || month > 12) {
                newError.date = 'Month must be between 01 and 12';
            } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newError.date = 'Card has expired';
            }
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }
    const formatCardNumber = (value: string) => {
        return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert("Successful");
            window.location.reload();
            dispatch(resetCart());
        }
    }
    return (
        <div className="mt-25 min-h-screen">
            <form className="border border-zinc-400 bg-zinc-200 rounded-2xl shadow-2xl flex flex-col 2xl:w-3/4 xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-3/4 w-10/11 m-auto p-3 gap-5" onSubmit={handleSubmit}>
                <p className="border-b-2 text-zinc-500 text-xl font-bold m-auto">Credit Card Details</p>
                <div className="name flex flex-col gap-2">
                    <label htmlFor="name" className="text-xl text-zinc-500">Cardholder name</label>
                    <input type="text" id="name" placeholder="Name" value={name} className="border rounded-xl p-1 placeholder:text-lg outline-none border-zinc-400" onChange={(e) => setName(e.target.value)} required />
                    <p className="text-red-500">{error.name}</p>
                </div>
                <div className="cardNum flex flex-col gap-2">
                    <label htmlFor="cardNo" className="text-xl text-zinc-500">Card Number</label>
                    <input type="text" inputMode="numeric" id="cardNo" placeholder="0000 0000 0000 0000" value={formatCardNumber(cardNumb)} className="border rounded-xl p-1 placeholder:text-lg outline-none border-zinc-400" maxLength={19} onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 16) {
                            setCardNumb(value);
                        }
                    }} required />
                    <p className="text-red-500">{error.cardNumb}</p>
                </div>
                <div className="bottom flex justify-between 2xl:flex-row xl:flex-row lg:flex-row md:flex-row flex-col">
                    <div className="endDate flex flex-col gap-2 2xl:w-1/3 xl:w-1/3 lg:w-1/3">
                        <label htmlFor="endDate" className="text-xl text-zinc-500">End Date</label>
                        <div className="date flex justify-between">
                            <input type="text" inputMode="numeric" className="border rounded-xl p-1 outline-none border-zinc-400 w-full" value={value} placeholder="DD/YY" maxLength={5} onChange={(e) => {
                                let input = e.target.value.replace(/[^\d]/g, ''); // Only digits

                                if (input.length >= 2) {
                                    let mm = parseInt(input.slice(0, 2), 10);

                                    if (mm > 12) {
                                        mm = 12;
                                    }

                                    const mmStr = mm.toString().padStart(2, '0');
                                    const yyStr = input.slice(2, 4);

                                    input = yyStr ? `${mmStr}/${yyStr}` : mmStr;
                                }

                                if (input.length > 5) {
                                    input = input.slice(0, 5);
                                }

                                setValue(input);
                            }}
                                required />
                        </div>
                        <p className="text-red-500">{error.date}</p>
                    </div>
                    <div className="cvv flex flex-col 2xl:w-1/3 xl:w-1/3 lg:w-1/3 gap-2">
                        <label htmlFor="cvv" className="text-xl text-zinc-500">CVV</label>
                        <input type="password" inputMode="numeric" placeholder="000" maxLength={3} value={cvv} className="border rounded-xl p-1 outline-none border-zinc-400 w-full" onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                                setCvv(value);
                            }
                        }} required />
                        <p className="text-red-500">{error.cvv}</p>
                    </div>
                </div>
                <button className="m-auto px-8 py-2 rounded-2xl text-xl bg-sky-500 text-white hover:bg-sky-700 cursor-pointer">Pay</button>
            </form>
        </div>
    )
}

export default CreditCardPayment