import React, { useState, useEffect } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
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
import imgMech from "./img/mechanic.png";
import Logout from './Logout.jsx';
import Title from './Title.jsx';

const ManagePlanOwner = ({ email }) => {
  
  
  const navigate = useNavigate();

  const PlanUpdate = (id) => {
    navigate("/update_plan_owner/" + id);
  }

  const LoadPhoto = (id) => {
    navigate("/upload_image_plan/" + id);
  }

  const [planData, setPlanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/plan/');
        const data = await response.json();

        // Assuming 'owneremail' is the key in cookies
        const ownerEmail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter Plan data based on vendoremail
         const filteredPlan = data.filter((plan) => plan.owneremail === ownerEmail);
         setPlanData(filteredPlan);
         setFilteredData(filteredPlan);
        
      } catch (error) {
        console.error('Error fetching Plan data:', error.message);
      
      }
    };

    fetchPlanData();
  }, []);

   // Filter data based on the search term
   const filteredData = planData.filter((plan) =>{ 
        const isMatch = Object.values(plan).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = business.status.toLowerCase() === 'approved';

    return isMatch;
  });  

const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');

        fetch("http://localhost:4000/api/v1/plan/" + id, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
        }).then((res) => {
          //  alert('Removed successfully.')
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

  const timeOptions = { hour: '2-digit', minute: '2-digit' };
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
            <h6 className="user-name mb-1">Tour Package Travel Agency Booking App </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/owner_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Search plan Details</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            <div className="row" style={{marginTop:10}}>
                {filteredData.map((plan) => (
              <div key={plan._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                <td>
  {/* Display the plan image */}
  {plan.image && (
    <a href={`http://localhost:4000/${plan.image}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">

      <img src={`http://localhost:4000/${plan.image}`} alt="plan Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br>
                      <a className="product-title d-block"  >E-Mail : <b>{plan.owneremail}</b></a>
                      <a className="product-title d-block"  >Tour Name : <b>{plan.tourname}</b></a>
                      <a className="product-title d-block"  >Plan Type : <b style={{color:"darkblue"}}>{plan.type}</b></a>
                      <a className="product-title d-block"  >Price Range : {plan.price}</a>
                      <a className="product-title d-block" style={{ color: "darkblue", animation: "blinkingText 1.5s infinite" }}>No. of Vacancy : {plan.vacancy}</a>
	
                      
                     
                      
                    </div>
                  </div>   
                  
            <a className="btn btn-danger"  onClick={() => PlanUpdate(plan.id)}>Update</a>
            <a className="btn btn-danger"  onClick={() => Removefunction(plan.id)}>Delete</a>
            <a className="btn btn-danger" onClick={() => { LoadPhoto(plan.id) }}>Upload Photo</a>
              </div>


              ))}
              
        </div>
           
        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/owner_home" ><i className="lni lni-home"></i>Home </Link> </li>
                    <li><Logout /></li> 
                  </ul>
                </div>
              </div>
            </div>



</div>


</div>
</div>
  )
}

export default ManagePlanOwner