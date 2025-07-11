import { Link } from 'react-router-dom'
import emptyCart from '/empty-cart.png'
import arrow from '/arrow.png'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { removeFromWishlist, resetWishlist } from '../../features/WishlistSlice'
import favouriteFilled from '/love_filled.png'
import heart from '/heart.svg'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { addToCart, decreaseQuantity, increaseQuantity } from "../../features/CartSlice";

const MySwal = withReactContent(Swal);

const Wishlist = () => {
    const items = useSelector((state: RootState) => state.wishlist.items);
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
    const isInWishlist = (id: number) => wishlistItems.some(item => item.id === id);
    const handleWishlistToggle = (item: any) => {
        if (isInWishlist(item.id)) {
            dispatch(removeFromWishlist(item.id));
            toast.info(`${item.name} removed from wishlist`);
        }
    };
    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
        toast.success(`${product.name} added to cart!`);
    }
    return (
        <div className="flex min-h-screen justify-center items-center">
            <div className="fixed w-full sm:top-20 top-16 pt-4 md:h-20 h-15 bg-zinc-100 shadow-2xl flex items-center z-10">
                <Link to="/"><img src={arrow} alt="Arrow" className="2xl:h-8 xl:h-8 lg:h-8 md:h-8 h-5 ml-3" /></Link>
                <p className="2xl:text-3xl xl:text-3xl lg:text-3xl text-2xl font-bold m-auto">My Wishlist</p>
            </div>
            {items.length === 0 ?
                (<div className="flex flex-col items-center justify-center md:mt-10 mt-30 sm:h-175 h-137">
                    <p className="text-2xl font-bold">Your Wishlist is Empty</p>
                    <img src={emptyCart} alt="Empty Cart" className="md:h-120 h-80" />
                    <Link to="/"><button className="cursor-pointer sm:px-5 sm:py-3 px-3 py-2 rounded-2xl bg-sky-700 text-white hover:bg-sky-500">Continue Shopping</button></Link>
                </div>) : (
                    <div className='flex flex-col items-center'>
                        <div className="min-h-screen grid xl:grid-cols-3 sm:grid-cols-2 md:w-3/4 sm:w-9/10 w-3/4 m-auto gap-20 2xl:pl-5 mt-50 z-0">
                            {
                                items.map(item => (
                                    <div className='md:w-9/10 w-full flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-row shadow-2xl rounded-xl md:h-140 sm:h-120 h-100 bg-zinc-200 ' onMouseEnter={() => setHoveredCardId(item.id)} onMouseLeave={() => setHoveredCardId(null)}>
                                        <div className='flex flex-col h-full'>
                                            <div className="relative 2xl:max-h-80 xl:max-h-80 lg:max-h-70 md:max-h-60 sm:max-h-50 max-h-42 w-full">
                                                <img
                                                    src={isInWishlist(item.id) ? favouriteFilled : heart}
                                                    alt=""
                                                    className="h-9 absolute top-3 right-3 p-1.5 rounded-[50%] bg-zinc-200 shadow-2xl cursor-pointer lg:hidden"
                                                    onClick={() => handleWishlistToggle(item)}
                                                />
                                                {hoveredCardId === item.id && <img src={isInWishlist(item.id) ? favouriteFilled : heart} alt="" className="h-9 absolute top-3 right-3 p-1.5 rounded-[50%] bg-zinc-200 shadow-2xl cursor-pointer hidden lg:block" onClick={() => {
                                                    handleWishlistToggle(item);
                                                }} />}
                                                <img src={item.img_Address[0]} alt="image" className="shadow-xl rounded-t-xl  border-b-2 h-full w-full" />
                                            </div>
                                            <div className="div flex flex-col 2xl:p-3 xl:p-3 lg:p-3 md:p-3 sm:p-3 p-1.5 justify-around text-xl 2xl:gap-2 xl:gap-2 lg:gap-2 md:gap-2 sm:gap-2 gap-0 w-full h-full">
                                                <p className='2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm'>{item.name}</p>
                                                <p className='2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm'>{item.description}</p>
                                                <p className='2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm'>₹{item.price}</p>
                                                <div className="btns flex justify-between">
                                                    <Link to='/cart'><button className="cursor-pointer px-1.5 py-1 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 md:px-2 md:py-1.5 sm:px-2 sm:py-1.5 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-sm 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-xl shadow-xl" onClick={() =>
                                                        handleAddToCart(item)}>Buy Now</button></Link>
                                                    {(() => {
                                                        const cartItem = cartItems.find(itm => itm.id === item.id);
                                                        if (cartItem) {
                                                            return (
                                                                <div className="flex justify-between items-center gap-2">
                                                                    <button onClick={() => dispatch(increaseQuantity(item.id))} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">+</button>
                                                                    <span>{cartItem.quantity}</span>
                                                                    <button onClick={() => {
                                                                        if (cartItem.quantity === 1) {
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
                                                                                    dispatch(dispatch(decreaseQuantity(item.id)))
                                                                                    Swal.fire('Removed!', 'Item has been removed.', 'success');
                                                                                }
                                                                            });
                                                                        }
                                                                        else {
                                                                            dispatch(decreaseQuantity(item.id));
                                                                        }
                                                                    }} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">-</button>
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <button
                                                                    className="cursor-pointer px-1.5 py-1 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 md:px-2 md:py-1.5 sm:px-2 sm:py-1.5 bg-green-500 hover:bg-green-400 shadow-xl rounded-xl text-sm 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-xl"
                                                                    onClick={() => handleAddToCart(item)}
                                                                >
                                                                    Add to Cart
                                                                </button>
                                                            );
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
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
                                        dispatch(resetWishlist());
                                        Swal.fire('Cleared!', 'Items have been removed.', 'success');
                                    }
                                });
                            }}
                            className="bg-red-500 text-white px-4 py-2 cursor-pointer rounded-2xl hover:bg-red-600 mt-10 lg:mb-0 mb-8"
                        >
                            Clear Wishlist
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Wishlist

