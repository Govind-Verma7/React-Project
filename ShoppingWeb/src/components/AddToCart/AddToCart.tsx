import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../app/store";
import emptyCart from '/empty-cart.png'
import arrow from '/arrow.png'
import { Link } from "react-router-dom";
import { decreaseQuantity, increaseQuantity, removeFromCart, resetCart } from "../../features/CartSlice";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AddToCart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="pt-25 min-h-screen">
      <div className="fixed w-full sm:top-20 top-16 pt-4 h-20 bg-zinc-100 shadow-2xl flex items-center">
      <Link to="/"><img src={arrow} alt="Arrow" className="2xl:h-8 xl:h-8 lg:h-8 md:h-8 h-5 ml-3" /></Link>
      <p className="2xl:text-3xl xl:text-3xl lg:text-3xl text-2xl font-bold m-auto">My Cart</p>
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10 2xl:h-175 xl:h-175 lg:h-175 md:h-175 sm:h-175 h-137">
          <p className="text-2xl font-bold">Your Cart is Empty</p>
          <img src={emptyCart} alt="Empty Cart" className="md:h-120 h-80" />
          <Link to="/"><button className="cursor-pointer px-5 py-3 rounded-2xl bg-sky-700 text-white hover:bg-sky-500">Continue Shopping</button></Link>
        </div>
      ) :
        (
          <div className="flex 2xl:flex-row xl:flex-row flex-col">
            <div className="lg:w-3/4 w-full">
              {items.map(item => (
                <div key={item.id} className="rounded-2xl bg-zinc-200 shadow-xl p-4 mb-2 flex flex-col items-center 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row 2xl:w-9/10 xl:w-9/10 lg:w-9/10 md:w-3/4 sm:w-3/4 w-3/4 m-auto justify-between mt-25">
                  <img src={item.img_Address[0]} alt="Image" className="2xl:h-40 xl:h-40 lg:h-40 md:h-40 h-60" />
                  <div className="flex flex-col justify-center items-center 2xl:gap-5 xl:gap-5 lg:gap-5 md:gap-5 gap-3">
                    <h2 className="2xl:text-2xl xl:text-2xl lg:text-2xl md:text-2xl xl font-bold">{item.name}</h2>
                    <p className="2xl:text-xl xl:text-xl lg:text-xl md:text-xl lg font-semibold">Qty: {item.quantity}</p>
                    <p className="font-semibold text-xl">₹{item.price * item.quantity}</p>
                    <p className="flex justify-center gap-3 text-xl"><button onClick={() => dispatch(increaseQuantity(item.id))} className="border px-5 rounded-xl flex justify-center items-center h-10 cursor-pointer bg-gray-800 text-white hover:bg-gray-900">+</button><span>{item.quantity}</span><button onClick={() => {
                      if(item.quantity === 1){
                        MySwal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, remove it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(decreaseQuantity(item.id))
                          Swal.fire('Removed!', 'Item has been removed.', 'success');
                        }
                      });
                      }
                      else{
                      dispatch(decreaseQuantity(item.id));
                    }}} className="border px-5 rounded-xl flex justify-center items-center h-10 cursor-pointer bg-gray-800 text-white hover:bg-gray-900">-</button></p>
                  </div>
                  <button
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      MySwal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, remove it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(removeFromCart(item.id))
                          Swal.fire('Removed!', 'Item has been removed.', 'success');
                        }
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border-zinc-400 lg:mr-5 lg:pt-12 pt-8 mt-10 lg:w-1/4 w-3/4 m-auto lg:h-100 h-90 2xl:fixed xl:fixed lg:fixed right-0 top-60 flex flex-col bg-zinc-200 shadow-xl md:mb-0 mb-8">
              <div className="flex justify-center items-center text-2xl font-bold"><p>Order Summary</p></div>
              <div className="flex items-center flex-col gap-3 m-auto">
                <div><p>Total Items: <span className="text-xl bold ml-2 font-bold">{count}</span></p></div>
                <p className="flex items-center">Discount on MRP: <span className="text-xl bold ml-2 font-bold">₹{0}</span></p>
                <hr className="border border-zinc-400 w-full"/>
                <p className="flex items-center">Total amount to pay: <span className="text-xl bold ml-2 font-bold">₹{totalPrice}</span></p>
                <div className="buttons flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row sm:flex-row flex-col gap-2">
                  <Link to='/payment'><button className="mt-4 bg-green-500 text-white px-4 py-2 2xl:px-4 2xl:py-2 xl:px-4 xl:py-2 lg:px-3 lg:py-1 cursor-pointer rounded-2xl hover:bg-green-600">Proceed to Buy</button></Link>
                  <button
                    onClick={() => {
                      MySwal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, clear it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          dispatch(resetCart());
                          Swal.fire('Cleared!', 'Items have been removed.', 'success');
                        }
                      });
                    }}
                    className="mt-4 bg-red-500 text-white px-4 py-2 2xl:px-4 2xl:py-2 xl:px-4 xl:py-2 lg:px-3 lg:py-1 cursor-pointer rounded-2xl hover:bg-red-600"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default AddToCart