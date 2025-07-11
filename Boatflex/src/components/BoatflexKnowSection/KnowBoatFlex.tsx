import './KnowBoatFlex.css'
import boatImg from '/boatImg.svg'
import capImg from '/capImg.svg'
import reqImg from '/reqImg.svg'
const KnowBoatFlex = () => {
  return (
    <div className='baotflexKnow'>
        <h1 id='knowHead'>Get to know Boatflex step by step</h1>
        <div className="purpleBox">
            <h1 id='purpleBoxHead'>How does Boatflex work if i am a … ?</h1>
            <div className="twoTxt">
                <h3 id='renter' className='oneTxt'>Renter</h3>
                <h3 id='boatOwner' className='oneTxt'>Boat owner</h3>
            </div>
        </div>
        <div className="whiteBox">
            <div className="boatCircle circleTxt">
                <div className="cirImg">
                    <img src={boatImg} alt="boatImg" className='stepImg'/>
                </div>
                <div className="boatPara centerPara">
                    <p className='stepPara'>Search for a rental boat at the desired location, browse the results and choose the boat that best suits your needs.</p>
                </div>
            </div>

            <div className="reqCircle circleTxt">
                <div className="cirImg">
                    <img src={reqImg} alt="reqImg" className='stepImg'/>
                </div>
                <div className="reqPara centerPara">
                    <p className='stepPara'>Send a booking request to the boat owner and wait for approval.</p>
                </div>
            </div>

            <div className="capCircle circleTxt">
                <div className="cirImg">
                    <img src={capImg} alt="capImg" className='stepImg'/>
                </div>
                <div className="capPara centerPara">
                    <p className='stepPara'>Once the booking request is confirmed, you are ready to sail.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default KnowBoatFlex