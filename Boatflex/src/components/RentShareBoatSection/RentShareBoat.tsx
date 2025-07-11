import './RendShareBoat.css'
import rentBoat from '/rent-boat.webp'
import shareBoat from '/share-boat.webp'

const RentShareBoat = () => {
  return (
    <div className='rentShareSection'>
        <div className="rentSection">
            <img src={rentBoat} alt="rentBoat" className='rentBoatImg'/>
            <div className="rentBoatTxt">
                <p id="purpleRentBoat"> Rent a boat</p>
                <h1 id='rentBoatHead' className='rentShareHead'>Your #1 boat rental platform</h1>
                <p className='rentBoatPara'>Finding and renting the perfect boat has never been easier!</p>
                <p className='rentBoatPara'>With Boatflex you are joining the #1 boat rental platform with more than 15.000 boats to choose from. With only a few steps you will be ready to set sail.</p>
                <p className='rentBoatPara'>Our mission is to make boat rental easy and breezy – so jump aboard and set the course for your desired destination.</p>
            </div>
        </div>
        <div className="shareSection">
            <img src={shareBoat} alt="shareBoat" className='rentBoatImg' id='shareImg'/>
            <div className="shareBoatTxt">
                <p id='greenShareBoat'> Share your boat</p>
                <h1 className='rentShareHead'>Flex your boat - your boat is worth sharing</h1>
                <p className='rentBoatPara'>Want to share the joy of sailing? Boatflex makes it safe and easy to list your boat for others to enjoy.</p>
                <p className='rentBoatPara'>With Boatflex there's no longer a need to navigate through the ocean of possibilities available for you as a boat owner.</p>
                <p className='rentBoatPara'>With only 3 steps you can have your boat out on the water. Dive into the Boatflex universe and start sharing!</p>
            </div>
        </div>
    </div>
  )
}

export default RentShareBoat