import { detail } from "../CardDetail/CardDetail"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../features/CartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import type { RootState } from "../../app/store";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import favouriteFilled from '/love_filled.png'
import heart from '/heart.svg'
import { useEffect, useState } from "react";
import { addToWishlist, removeFromWishlist } from "../../features/WishlistSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from 'react-responsive';
import leftArrow from '/left-arrow.png'
import rightArrow from '/right-arrow.png'

const MySwal = withReactContent(Swal);
type CardsProps = {
  searchTerm: string;
};

const Cards = ({ searchTerm }: CardsProps) => {
  const { loginWithRedirect } = useAuth0();
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const allCategories = ['Phone', 'TV', 'Laptop', 'Tablet'];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>(['All', ...allCategories]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (category === 'All') {
        const isAllSelected = prev.includes('All');
        return isAllSelected ? [] : ['All', ...allCategories];
      } else {
        const isSelected = prev.includes(category);
        let updated = isSelected
          ? prev.filter(c => c !== category)
          : [...prev, category];

        if (updated.includes('All') && isSelected) {
          updated = updated.filter(c => c !== 'All');
        }

        const selectedOnlyCategories = updated.filter(c => c !== 'All');
        if (selectedOnlyCategories.length === allCategories.length) {
          updated = ['All', ...allCategories];
        }
        return updated;
      }
    });
  };

  const handleApplyFilters = () => {
    setAppliedCategories([...selectedCategories]);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredItems = detail.filter(item => {
    const matchesCategory = appliedCategories.includes("All") || appliedCategories.includes(item.category);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = (id: number) => wishlistItems.some((item: { id: number; }) => item.id === id);

  const handleWishlistToggle = (item: any) => {
    if (isInWishlist(item.id)) {
      dispatch(removeFromWishlist(item.id));
      toast.info(`${item.name} removed from wishlist`);
    } else {
      dispatch(addToWishlist(item));
      toast.success(`${item.name} added to wishlist`);
    }
  };

  const [imageIndexMap, setImageIndexMap] = useState<{ [id: number]: number }>({});
  const isSmallScreen = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (!isSmallScreen && hoveredCardId !== null) {
      const timeout = setTimeout(() => {
        setImageIndexMap(prev => {
          const currentIndex = prev[hoveredCardId] ?? 0;
          const imageCount = detail.find(d => d.id === hoveredCardId)?.img_Address.length ?? 1;
          return {
            ...prev,
            [hoveredCardId]: (currentIndex + 1) % imageCount
          };
        });
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [hoveredCardId, imageIndexMap, isSmallScreen]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage])

  const [showFilter, setShowFilter] = useState(false);
  const isApplyDisabled = selectedCategories.filter(c => c !== 'All').length === 0;
  const [displayCategory, setDisplayCategory] = useState(false);

  return (
    <div>
      <div className={`fixed top-25 z-10 ${displayCategory ? 'xl:left-[13.3%] lg:left-[13%]' : 'left-2'} lg:block hidden cursor-pointer p-1 rounded-full bg-sky-400 duration-500`} onClick={() => setDisplayCategory((prev) => !prev)} >
        {<img src={displayCategory ? leftArrow : rightArrow} className="h-5 w-5" />}</div>
      <div className="grid grid-cols-7">
        <div className={`filterBar bg-zinc-100 md:mt-20 mt-13 ${displayCategory ? 'lg:inline' : 'lg:hidden'} ${showFilter ? 'inline' : 'hidden'} lg:static fixed z-1 lg:w-full w-60 lg:h-auto sm:h-120 h-100`}>
          <div className='sticky lg:top-30 top-23'>
            <div>
              <div className="flex justify-center">
                <p className=" text-2xl font-bold">Categories</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="sm:h-80 h-60 flex flex-col justify-around">
                  <div className="flex gap-2"><input type="checkbox" value="All" id="all" name="category" className="w-6 h-6 accent-blue-600  cursor-pointer" checked={selectedCategories.includes("All")}
                    onChange={() => handleCategoryChange("All")} /><label htmlFor="all" className="text-xl font-bold cursor-pointer"
                    >All</label></div>

                  <div className="flex gap-2"><input type="checkbox" value="Phone" id="phone" name="category" className="w-6 h-6 accent-blue-600  cursor-pointer" checked={selectedCategories.includes("Phone")}
                    onChange={() => handleCategoryChange("Phone")} /><label htmlFor="phone" className="text-xl font-bold  cursor-pointer">Phone</label></div>

                  <div className="flex gap-2"><input type="checkbox" value="TV" id="tv" name="category" className="w-6 h-6 accent-blue-600  cursor-pointer" checked={selectedCategories.includes("TV")}
                    onChange={() => handleCategoryChange("TV")} /><label htmlFor="tv" className="text-xl font-bold  cursor-pointer">TV</label></div>

                  <div className="flex gap-2"><input type="checkbox" value="Laptop" id="laptop" name="category" className="w-6 h-6 accent-blue-600  cursor-pointer" checked={selectedCategories.includes("Laptop")}
                    onChange={() => handleCategoryChange("Laptop")} /><label htmlFor="laptop" className="text-xl font-bold  cursor-pointer">Laptop</label></div>

                  <div className="flex gap-2"><input type="checkbox" value="Tablet" id="tablet" name="category" className="w-6 h-6 accent-blue-600  cursor-pointer" checked={selectedCategories.includes("Tablet")}
                    onChange={() => handleCategoryChange("Tablet")} /><label htmlFor="tablet" className="text-xl font-bold  cursor-pointer">Tablet</label></div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className={`rounded-xl px-4 py-1.5 text-white text-xl sm:mt-10 mt-7 ${isApplyDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-700 cursor-pointer'
                }`} onClick={() => {
                  handleApplyFilters();
                  setDisplayCategory(false);
                }} disabled={isApplyDisabled}>Apply</button>
            </div>
          </div>
        </div>
        <div className={`min-h-screen grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 2xl:w-10/11 xl:w-10/11 lg:w-15/16 md:w-3/4 sm:w-9/10 w-30/31 m-auto gap-20 2xl:pl-5 mt-30 ${displayCategory ? 'lg:col-span-6' : 'lg:col-span-7'} col-span-7`}>
          {currentItems.map(detail => {
            const currentImage = imageIndexMap[detail.id] ?? 0;
            return (
              <div key={detail.id} className="card 2xl:w-9/10 xl:w-9/10 lg:w-9/10 md:w-9/10 sm:w-full w-full flex 2xl:flex-col xl:flex-col lg:flex-col md:flex-col flex-row shadow-2xl rounded-xl 2xl:h-160 xl:h-145 lg:h-140 md:h-140 sm:h-57 h-50 bg-zinc-200 group" onMouseEnter={() => setHoveredCardId(detail.id)} onMouseLeave={() => {
                setHoveredCardId(null);
                setImageIndexMap(prev => ({
                  ...prev, [detail.id]: 0
                }));
              }}>
                <div className="relative h-full w-full">
                  <img
                    src={isInWishlist(detail.id) ? favouriteFilled : heart}
                    alt=""
                    className="h-9 absolute top-3 right-3 p-1.5 rounded-[50%] bg-zinc-200 shadow-2xl cursor-pointer lg:hidden"
                    onClick={() => handleWishlistToggle(detail)}
                  />
                  {hoveredCardId === detail.id && <img src={isInWishlist(detail.id) ? favouriteFilled : heart} alt="wishIcon" className="h-9 absolute top-3 right-3 p-1.5 rounded-[50%] bg-zinc-200 shadow-2xl cursor-pointer hidden lg:block z-10" onClick={() => {
                    handleWishlistToggle(detail);
                  }} />}

                  <div className="hidden lg:block h-full w-full relative">
                    <img src={detail.img_Address[currentImage]} alt="image" className="rounded-tl-xl shadow-xl rounded-tr-none rounded-bl-xl 2xl:rounded-tr-xl xl:rounded-tr-xl lg:rounded-tr-xl md:rounded-tr-xl 2xl:rounded-bl-none xl:rounded-bl-none lg:rounded-bl-none md:rounded-bl-none 2xl:border-b-2 xl:border-b-2 lg:border-b-2  md:border-b-2 h-full w-full" />
                  </div>

                  <div className="block lg:hidden h-full w-full">
                    <img src={detail.img_Address[currentImage]} alt="image" className="rounded-tl-xl shadow-xl rounded-tr-none rounded-bl-xl 2xl:rounded-tr-xl xl:rounded-tr-xl lg:rounded-tr-xl md:rounded-tr-xl 2xl:rounded-bl-none xl:rounded-bl-none lg:rounded-bl-none md:rounded-bl-none 2xl:border-b-2 xl:border-b-2 lg:border-b-2  md:border-b-2 h-full w-full" />
                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          setImageIndexMap(prev => ({
                            ...prev,
                            [detail.id]: Math.max(0, (prev[detail.id] ?? 0) - 1),
                          }))
                        }
                        className="absolute top-[45%] left-[2%]"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() =>
                          setImageIndexMap(prev => {
                            const currentIndex = prev[detail.id] ?? 0;
                            const imageCount = detail.img_Address.length;
                            return {
                              ...prev,
                              [detail.id]: (currentIndex + 1) % imageCount,
                            };
                          })
                        }
                        className="absolute top-[45%] right-[2%]"
                      >
                        ▶
                      </button>
                    </div>
                  </div>

                  <div className="points flex gap-1 absolute bottom-2 left-1/2 transform -translate-x-1/2 lg:opacity-0 lg:group-hover:opacity-100">
                    {detail.img_Address.map((_, index) => (
                      <span
                        key={index}
                        className={`rounded-full lg:h-2 h-1.5 lg:w-2 w-1.5 ${index === currentImage ? 'bg-sky-600' : 'bg-zinc-300'
                          }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="div flex flex-col 2xl:p-3 xl:p-3 lg:p-3 md:p-3 sm:p-3 p-1.5 justify-around text-xl sm:gap-2 gap-0 w-full h-full">
                  <p className="2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm">{detail.name}</p>
                  <p className="2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm">{detail.description}</p>
                  <p className="2xl:text-xl xl:text-xl lg:text-xl md:text-xl sm:text-lg text-sm">₹{detail.price}</p>
                  <div className="btns flex justify-between">
                    {isAuthenticated ? (
                      <Link to='/cart'><button className="cursor-pointer px-1.5 py-1 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 md:px-2 md:py-1.5 sm:px-2 sm:py-1.5 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-sm 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-xl shadow-xl" onClick={() =>
                        handleAddToCart(detail)}>Buy Now</button></Link>
                    ) : (<button className="cursor-pointer px-1.5 py-1 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 md:px-2 md:py-1.5 sm:px-2 sm:py-1.5 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-sm 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-xl shadow-xl" onClick={() =>
                      loginWithRedirect()}>Buy Now</button>)
                    }
                    {(() => {
                      const cartItem = cartItems.find(item => item.id === detail.id);
                      if (cartItem) {
                        return (
                          <div className="flex justify-between items-center gap-2">
                            <button onClick={() => dispatch(increaseQuantity(detail.id))} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">+</button>
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
                                    dispatch(dispatch(decreaseQuantity(detail.id)))
                                    Swal.fire('Removed!', 'Item has been removed.', 'success');
                                  }
                                });
                              }
                              else {
                                dispatch(decreaseQuantity(detail.id));
                              }
                            }} className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-900">-</button>
                          </div>
                        );
                      } else {
                        return (
                          <button
                            className="cursor-pointer px-1.5 py-1 2xl:px-3 2xl:py-2 xl:px-2 xl:py-1 lg:px-1.5 lg:py-1 md:px-2 md:py-1.5 sm:px-2 sm:py-1.5 bg-green-500 hover:bg-green-400 shadow-xl rounded-xl text-sm 2xl:text-xl xl:text-lg lg:text-base md:text-base sm:text-xl"
                            onClick={() => handleAddToCart(detail)}
                          >
                            Add to Cart
                          </button>
                        );
                      }
                    })()}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="grid grid-cols-7">
        <div className={`lg:w-full w-0 ${displayCategory ? 'block' : 'hidden'} bg-zinc-100`}></div>
        <div className={`${displayCategory ? 'lg:col-span-6' : 'lg:col-span-7'} col-span-7 w-full`}>
          <div className="flex mt-15 justify-center items-center pt-5 pb-5 gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-3 py-1 rounded border ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-zinc-400 cursor-pointer'}`}>
              Previous
            </button>
            <div className=" space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded cursor-pointer ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => { handlePageChange(currentPage + 1) }}
              className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-zinc-400 cursor-pointer'}`}>
              Next
            </button>
          </div>
        </div>
      </div>
      <button className="w-full h-10 bg-sky-500 lg:hidden inline sticky bottom-0 font-bold text-white cursor-pointer" onClick={() => setShowFilter(!showFilter)}>
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>
    </div>
  )
}
export default Cards