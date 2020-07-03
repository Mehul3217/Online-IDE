import React from 'react';
import adobe from './adobe.png';
import amazon from './amazon.png';
import google from './google.png';
import microsoft from './microsoft.png';
import paytm from './paytm.png';
import flipkart from './flipkart.png';
import './company.component.css'

const Comapny = () => {
    return(
        <div>
            <div>
                <table className="table">
                        <tr>
                            <td><img src={adobe} alt="" className="company"/></td>
                            <td><img src={amazon} alt="" className="company"/></td>
                            <td><img src={microsoft} alt="" className="company"/></td>
                            <td><img src={google} alt="" className="company"/></td>
                            <td><img src={paytm} alt="" className="company"/></td>
                            <td><img src={flipkart} alt="" className="company"/></td>
                        </tr>
                </table>
            </div>
        </div>
    )
}

export default Comapny
