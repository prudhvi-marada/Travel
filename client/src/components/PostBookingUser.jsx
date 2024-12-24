import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";  
import "./js/bootstrap.bundle.min.js";
{/*
import "./js/waypoints.min.js";
import "./js/jquery.easing.min.js";
import "./js/owl.carousel.min.js";
import "./js/jquery.magnific-popup.min.js";
*/}
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

// name  donarname itemname description quantity  landmark address city address pincode mobile 

const PostBookingUser = () => {
  const [formData, setFormData] = useState({
    owneremail: '',
    email: '',
    tourname: '',
    vacancy: '',
    type: '',
    price: parseInt(decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planPrice\s*=\s*([^;]*).*$)|^.*$/, '$1'))),
    personcount: '',
    cusname: '',
    mobile: '',
    address: '',
    amount: '',
    planId: '' 
  });
  const [validationErrors, setValidationErrors] = useState({});

  const postBookingData = async () => {
    const token = localStorage.getItem('token');
    const hostelEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)hostelEmail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const userEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)email\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const tourname = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)tourname\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const planVacancy = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planVacancy\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const planType = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planType\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    const planPrice = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planPrice\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    try {
      const response = await fetch('http://localhost:4000/api/v1/booking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          ...formData,
          owneremail: hostelEmail,
          email: userEmail,
          tourname: tourname,
          vacancy: planVacancy,
          type: planType,
          price: planPrice,
        }),
      });

      if (response.ok) {
        console.log('Booking data posted successfully!');
        // Handle success by redirecting to another page
        alert('Plan Booked Successfully!');
        window.location.href = "view_booking_user"; // Use href for redirection
      } else {
        console.error('Error posting booking data:', response.statusText);
        // Optionally, log the response status code
        console.error('Response status code:', response.status);
      }
    } catch (error) {
      console.error('Error posting booking data:', error.message);
    }
  };

  useEffect(() => {
    // Get the 'planVacancy' and 'planPrice' from cookies
    const planVacancy = parseInt(decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planVacancy\s*=\s*([^;]*).*$)|^.*$/, '$1')));
    const planPrice = parseInt(decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)planPrice\s*=\s*([^;]*).*$)|^.*$/, '$1')));

    // Update the formData with the 'planVacancy' and 'planPrice'
    setFormData(prevState => ({
      ...prevState,
      planVacancy: planVacancy,
      planPrice: planPrice
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the input field is for 'personcount'
    if (name === 'personcount') {
      // Convert the input value to a number
      const count = parseInt(value);
      // Check if the count is greater than the plan vacancy
      if (count > formData.planVacancy) {
        alert('The entered value cannot be greater than the plan vacancy.');
        return;
      }
    }

    // For other input fields, update the formData state normally
    setFormData({ ...formData, [name]: value });

    // If the input field is for 'personcount', recalculate the amount
    if (name === 'personcount') {
      // Convert the 'planPrice' cookie value to a number
      const planPrice = formData.planPrice;

      // Calculate the amount
      const amount = parseInt(value) * planPrice;

      // Update the formData state with the calculated amount
      setFormData(prevState => ({ ...prevState, amount: amount }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    
        
    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = 'This field is required';
        isValid = false;
      }
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = 'Phone must be a 10-digit number';
      isValid = false;
    }
  

    if (!/^\d{16}$/.test(formData.cardnumber)) {
      errors.cardnumber = 'Enter 16-digit card number';
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Fill all the fields');

      return;
    }
    postBookingData();
  };


  return (
    <div>
        <div>
      
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
    
        <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{color:'#020310'}}><img src={imgSmall} alt=""/> <Title /> </div>
        
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
        </div>
        </div>  

{/* tabindex="-1" */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap"  id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
      <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>

      <div className="offcanvas-body">
        <div className="sidenav-profile">
          <div className="user-profile"><img src={imgBg} alt=""/></div>
          <div className="user-info">
            <h6 className="user-name mb-1">Tourism And Travel Management System</h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/user_home"><i className="lni lni-home"></i>Home</Link></li>
          <li><Logout /></li>  
          </ul>
      </div>
    </div>
      </div>
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between">
            <h5 style={{color:'#203354'}}>TourPackage Booking Form:</h5>
          </div>
        {/* Form Scrip Start*/}
        <div className="profile-wrapper-area py-1">
          <div className="card user-data-card">
            <div className="card-body">
              <form  onSubmit={handleSubmit}>
              
              <div className="mb-3">
                  <div className="title mb-2"><span> Name:</span></div>
                  <input className="form-control"
                    name="cusname" id="cusname"
                    value={formData.cusname}
                    onChange={handleInputChange}    type="text" placeholder='Your Name...' />
                </div>
                <div className="mb-3">
                  <div className="title mb-2"><span>No of Person's:</span></div>
                  <input className="form-control" name="personcount" id="personcount"
                    value={formData.personcount}
                    onChange={handleInputChange}   type="number" placeholder='Person count...'/>
                </div>
          
                <div className="mb-3">
        <div className="title mb-2"><span>Amount:</span></div>
        <input
          className="form-control"
          name="amount"
          value={formData.amount}
          onChange={handleInputChange}
          type="number"
          readOnly
        />
      </div>

				        <div className="mb-3">
                  <div className="title mb-2"><span>Mobile:</span></div>
                  <input className="form-control" name="mobile" id="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}  type="number" placeholder='Mobile Number...' />
                </div>
                                {/* Validation for Mobile 10 Digits*/}
          {validationErrors.mobile && <p style={{ color: 'red' }}>{validationErrors.mobile}</p>}


                <div className="mb-3">
                <div className="title mb-2"><span>Address:</span></div>
                <textarea className="form-control" name="address" id="address"value={formData.address}
                  onChange={handleInputChange} 
                    placeholder='Address...'/>
                </div><hr/>

                  <h6>Card Details:-</h6>
                <div className="mb-3">
                  <div className="title mb-2"><span>Card Number:</span></div>
                  <input className="form-control" name="cardnumber" id="cardnumber"
                    value={formData.cardnumber}
                    onChange={handleInputChange}   type="number" placeholder='Card number...'/>
                </div>
                {validationErrors.cardnumber && <p style={{ color: 'red' }}>{validationErrors.cardnumber}</p>}

                <div className="mb-3">
                  <div className="title mb-2"><span>Card Name:</span></div>
                  <input className="form-control" name="cardname" id="cardname"
                    value={formData.cardname}
                    onChange={handleInputChange}   type="text" placeholder='Card name...'/>
                </div>
                <div className="mb-3 d-flex align-items-center">
  <div className="title mb-2 me-2"><span>Exp date:</span></div>
  <div className="d-flex align-items-center me-2">
    <select className="form-select me-2" name="expMonth" id="expMonth" value={formData.expMonth} onChange={handleInputChange}>
      <option value="">Month</option>
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
    <span className="mx-1">/</span>
    <select className="form-select" name="expYear" id="expYear" value={formData.expYear} onChange={handleInputChange}>
      <option value="">Year</option>
      <option value="2024">2024</option>
      <option value="2025">2025</option>
      <option value="2026">2026</option>
      <option value="2027">2027</option>
      <option value="2028">2028</option>
      <option value="2029">2029</option>
      <option value="2030">2030</option>
      <option value="2031">2031</option>
      <option value="2032">2032</option>
      <option value="2033">2033</option>
      <option value="2034">2034</option>
      <option value="2035">2035</option>
      <option value="2036">2036</option>
      <option value="2037">2037</option>
      <option value="2038">2038</option>
      {/* Add more options for other years */}
    </select>
  </div>
  <div className="title mb-2 me-2"><span>CVV number:</span></div>
  <div className="d-flex align-items-center"></div>
  <input className="form-control" style={{ width: '80px' }} name="cvv" id="cvv" value={formData.cvv} onChange={handleInputChange} type="number" placeholder="CVV" maxLength="3" />
</div>






                <button className="btn btn-success w-100"  type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
        {/* Form Scrip End*/}



        </div>
      </div>
    </div>
            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/user_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                    
                
                  </ul>
                </div>
              </div>
            </div>


</div>
</div>
  )
}

export default PostBookingUser