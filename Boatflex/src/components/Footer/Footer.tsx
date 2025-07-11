import './Footer.css'
import appStore from '/appstore.webp'
import googlePlay from '/googleplay.webp'
import footIcn1 from '/footIcn1.svg'
import footIcn2 from '/footIcn2.svg'
import footIcn3 from '/footIcn3.svg'
import footIcn4 from '/mail-1.webp'

const Footer = () => {
    return (
        <div className="parentTable">
        <div className='footerSec'>
            <div className="footerAbove">
            <div className="firstCol">
                <h1 id='footerHead'>boatflex</h1>
                <a href="#" id='appBtn'>
                    <img src={appStore} alt="AppStore" />
                </a>
                <a href="#">
                    <img src={googlePlay} alt="GooglePlay" id='gpImg' />
                </a>
            </div>
            <div className="lastCol">
                <table>
                    <tr>
                        <th>COMPANY</th>
                        <th>BOAT OWNERS</th>
                        <th>SUPPORT</th>
                    </tr>
                    <tr>
                        <td>About Boatflex</td>
                        <td>Boatflex Charter Club</td>
                        <td>Terms of Service</td>
                    </tr>
                    <tr>
                        <td>How we work</td>
                        <td>List Boat</td>
                        <td>Boatflex Privacy Policy</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Why rent</td>
                        <td>Support Center</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Why list</td>
                        <td>Inspiration</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Insurance</td>
                    </tr>
                </table>
            </div>
            </div>
            <div className="footIcns">
                <img src={footIcn1} alt="Icn1" className='footImg' />
                <img src={footIcn2} alt="Icn2" className='footImg' />
                <img src={footIcn3} alt="Icn3" className='footImg' />
                <div className="mailImgDiv">
                    <img src={footIcn4} alt="Icn4" className='footImg' id='mailImg' />
                </div>
            </div>
        </div>
        
        <div className='hiddenDiv'>
            <div className="footerAbove">
            <div className="firstCol">
                <h1 id='footerHead'>boatflex</h1>
                <a href="#" id='appBtn'>
                    <img src={appStore} alt="AppStore" />
                </a>
                <a href="#">
                    <img src={googlePlay} alt="GooglePlay" id='gpImg' />
                </a>
            </div>
            <div className="lastCol">
                <table>
                    <tr>
                        <th>Company</th>
                    </tr>
                    <tr>
                        <td>About Boatflex</td>
                    </tr>
                    <tr>
                        <td>How we work</td>
                    </tr>
                    <tr>
                        <td>Why rent</td>
                    </tr>
                    <tr>
                        <td>Why list</td>
                    </tr>
                    <tr>
                        <td>Insurence</td>
                    </tr>
                    <tr>
                        <th>Boat Owners</th>
                    </tr>
                    <tr>
                        <td>Boatflex Charter Club</td>
                    </tr>
                    <tr>
                        <td>List Boat</td>
                    </tr>
                    <tr>
                        <th>Support</th>
                    </tr>
                    <tr>
                        <td>Terms of Service</td>
                    </tr>
                    <tr>
                        <td>Boatflex Privacy Policy</td>
                    </tr>
                    <tr>
                        <td>Support Center</td>
                    </tr>
                    <tr>
                        <td>Inspiration</td>
                    </tr>
                </table>
            </div>
            </div>
            <div className="footIcns">
                <img src={footIcn1} alt="Icn1" className='footImg' />
                <img src={footIcn2} alt="Icn2" className='footImg' />
                <img src={footIcn3} alt="Icn3" className='footImg' />
                <div className="mailImgDiv">
                    <img src={footIcn4} alt="Icn4" className='footImg' id='mailImg' />
                </div>
            </div>
        </div>
        </div>
    )
}

export default Footer