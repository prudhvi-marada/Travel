import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const AddPlanOwner = () => {
  const { id } = useParams();
  const [editedPlan, setEditedPlan] = useState({
    owneremail: '',
    tourname: '',
    type: '',
    price: '',
    vacancy: ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/tour/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedPlan({
            tourname: data.tourname
            
          });
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching  data:', error.message);
      }
    };

    fetchPlanDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan({
      ...editedPlan,
      [name]: value,
    });
  };

  const handleUpdatePlan = async (e) => {
    const token = localStorage.getItem('token');
    const ownerEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/api/v1/plan/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            body: JSON.stringify({
                ...editedPlan,
                owneremail: ownerEmail, 
                
            }),
        });
      if (response.ok) {
        console.log('Plan details updated successfully!');
        alert('Plan details updated successfully!')
        window.location.href = "/manage_plan_owner";
      } else {
        console.error('Failed to update plan status:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating plan status:', error.message);
    }
    document.cookie = `tourname=${editedPlan.tourname}; path=/`;
  };




  return (
    <div>
      <div>
        {/* Header Area */}
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{ color: '#020310' }}><img src={imgSmall} alt="" /> <Title /> </div>
            <div className="suha-navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#suhaOffcanvas" aria-controls="suhaOffcanvas"><span></span><span></span><span></span></div>
          </div>
        </div>
        {/* Offcanvas Area */}
        <div className="offcanvas offcanvas-start suha-offcanvas-wrap" id="suhaOffcanvas" aria-labelledby="suhaOffcanvasLabel">
          <button className="btn-close btn-close-white text-reset" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <div className="offcanvas-body">
            <div className="sidenav-profile">
              <div className="user-profile"><img src={imgBg} alt="" /></div>
              <div className="user-info">
                <h6 className="user-name mb-1">Tourism And Travel Management System</h6>
              </div>
            </div>
            <ul className="sidenav-nav ps-0">
              <li><Link to="/owner_home"><i className="lni lni-home"></i>Home</Link></li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
      {/* Page Content Wrapper */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>Create Plan </h6>
            </div>
            <div className="profile-wrapper-area py-3">
              <div className="card user-data-card">
                <div className="card-body">
                  <form onSubmit={handleUpdatePlan}>


                    
                    <div className="mb-3">
                      <div className="title mb-2"><span>Tour Name:</span></div>
                      <input
                        className="form-control"
                        name="tourname"
                        id="tourname"
                        value={editedPlan.tourname}
                        onChange={handleInputChange}
                        type="text" disabled />
                    </div>
                   
                    <div className="mb-3">
                      <div className="title mb-2"><span>Plan Type:</span></div>
                      <input
                        className="form-control"
                        name="type"
                        id="type"
                        value={editedPlan.type}
                        onChange={handleInputChange}
                        type="text" placeholder='(e.g) Economy Single Plan'/>
                    </div>

                    <div className="mb-3">
                      <div className="title mb-2"><span> Price:</span></div>
                      <input
                        className="form-control"
                        name="price"
                        id="price"
                        value={editedPlan.price}
                        onChange={handleInputChange}
                        type="number" />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2"><span>No. of Vacancy:</span></div>
                      <input
                        className="form-control"
                        name="vacancy"
                        id="vacancy"
                        value={editedPlan.vacancy}
                        onChange={handleInputChange}
                        type="number" />
                    </div>

                    <button className="btn btn-success w-100" type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Nav Area */}
      <div className="footer-nav-area" id="footerNav">
        <div className="container h-100 px-0">
          <div className="suha-footer-nav h-100">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
              <li className="active"> <Link to="/owner_home"><i className="lni lni-home"></i>Home </Link> </li>
              <li><Logout /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddPlanOwner;
