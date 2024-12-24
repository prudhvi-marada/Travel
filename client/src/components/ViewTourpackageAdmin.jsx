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

const ViewTourpackageAdmin = () => {
  
  
  const navigate = useNavigate();

  const UpdateStatusAdmin = (id) => {
    navigate("/update_status_admin/" + id);
  }

  const [tourpackageData, setTourpackageData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTourpackageData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/tour/`);
        if (response.status === 200) {
          setTourpackageData(response.data);
        } else {
          console.error('Error fetching Tourpackage data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching Tourpackage data:', error.message);
      }
    };

    fetchTourpackageData();
  }, []);

   // Filter data based on the search term
   const filteredData = tourpackageData.filter((tourpackage) =>{ 
        const isMatch = Object.values(tourpackage).some((field) =>
     field.toString().toLowerCase().includes(searchTerm.toLowerCase() )
     );

    // Add an additional condition to filter based on "Approved" status
    //const isApproved = business.status.toLowerCase() === 'approved';

    return isMatch;
  });  


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
            <h6 className="user-name mb-1">Tourism And Travel Management System </h6>
         
          </div>
        </div>
    
        <ul className="sidenav-nav ps-0">
          <li><Link to="/admin_home"><i className="lni lni-home"></i>Home</Link></li>
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
            <h6>Search Tourpackage Details</h6>
			
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
                {filteredData.map((tourpackage) => (
              <div key={tourpackage._id} className="col-12 col-md-6">                                        
        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                <a className="product-title d-block"  >E-Mail :<b>{tourpackage.owneremail}</b></a>
                
                      <a className="product-title d-block"  >Name: <b>{tourpackage.tourname}</b></a>
                      <a className="product-title d-block"  >Area: <b>{tourpackage.area}</b></a>
                      <a className="product-title d-block"  >Duration: {tourpackage.duration}</a>
                      <a className="product-title d-block"  >Tour Type: {tourpackage.tourtype}</a>	
                      <a className="product-title d-block"  >Itinerary: {tourpackage.itinerary}</a>
                      <a className="product-title d-block"  >Departure Arrival: {tourpackage.deparrival}</a>
                      <a className="product-title d-block"  >Accommodation Details : {tourpackage.accdetails}</a>
                      <a className="product-title d-block"  >Reporting & Dropping : {tourpackage.reportdrop}</a>
                      <a className="product-title d-block"  >Tour Information : {tourpackage.tourinfo}</a>


                      
                      
                      <a className="product-title d-block"  >Lat : {tourpackage.lat}  </a>
                      <a className="product-title d-block"  >Long : {tourpackage.long}  </a>
                      <a className="product-title d-block">Date :{new Date(tourpackage.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block" style={{color:'green'}}  >Status: {tourpackage.status}  </a>
                      <td>
  {/* Display the tourpackage image */}
  {tourpackage.image && (
    <a href={`http://localhost:4000/${tourpackage.image}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">

      <img src={`http://localhost:4000/${tourpackage.image}`} alt="tourpackage Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br>
                    </div>
                  </div>   
                  
            <a className="btn btn-danger"  onClick={() => UpdateStatusAdmin(tourpackage.id)}>Update Status</a>

        
            <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${tourpackage.lat},${tourpackage.long}`}>
                  Show Map </a>           

          			 
              </div>


              ))}
              
        </div>
           
        </div>
    </div>


            
            <div className="footer-nav-area" id="footerNav">
              <div className="container h-100 px-0">
                <div className="suha-footer-nav h-100">
                  <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                    <li className="active"> <Link to="/admin_home" ><i className="lni lni-home"></i>Home </Link> </li>
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

export default ViewTourpackageAdmin