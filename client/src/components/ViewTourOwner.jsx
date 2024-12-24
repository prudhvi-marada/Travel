import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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

const ViewTourOwner = () => {


  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////
  
  const [tourId, setTourId] = useState(''); // Set the initial value accordingly
  // Function to get user location and update on the server
  const getUserLocation = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          console.log(`ID: ${tourId}`);
          updateLocationOnServer(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
   // Update location on the server
   async function updateLocationOnServer(latitude, longitude) {
  //  const tourId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual tour ID
    const url = `http://localhost:4000/api/v1/tour/map/` + tourId;
  
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({
          lat: latitude,
          long: longitude,
        }),
      });
  
      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }
  // Trigger getUserLocation when tourId changes
  useEffect(() => {
    if (tourId) {
      getUserLocation();
    }
  }, [tourId]);

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //////////////Update Delete Code ///////////////
  ////////////////////////////////////////////////

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm('Do you want to remove?')) {
      const token = localStorage.getItem('token');

        fetch("http://localhost:4000/api/v1/tour/" + id, {
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
 const LoadPhoto = (id) => {
   navigate("/Upload_Image/" + id);
}



 const LoadPlan = (id) => {
   navigate("/add_plan_owner/" + id);
 }


const LoadEdit = (id) => {
  navigate("/update_tour/" + id);
}

const UpdateLocation = (id) => {
  navigate("/geolocation/" + id);
}
  
  const [tourData, setTourData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/tour/');
        const data = await response.json();

        // Assuming 'donaremail' is the key in cookies
        const owneremail = decodeURIComponent(document.cookie.replace(/(?:(?:^|.*;\s*)owneremail\s*=\s*([^;]*).*$)|^.*$/, '$1'));
         // Filter tour data based on donaremail
         const filteredTour = data.filter((tour) => tour.owneremail === owneremail);
         setTourData(filteredTour);
         setFilteredData(filteredTour);
         //console.log(filteredTour);
         setLoading(false);
      } catch (error) {
        console.error('Error fetching Tour data:', error.message);
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);



  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = tourData.filter((tour) =>
      Object.values(tour).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  
  if (loading) {
    return <div>Loading...</div>;
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
    </div>
    <div className="page-content-wrapper">
      <div className="top-products-area py-3">
        <div className="container">
          
        <div className="section-heading d-flex align-items-center justify-content-between">
            <h6>View My Tour Details</h6>
			
          </div>
          <div className="row g-3" >
              <div className="top-search-form">
                <form>
                  <input className="form-control"  type="text"  placeholder="Search..."     value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>

            {/* Show if Null data in table */}

            {filteredData.length > 0 ? (
            <div className="row" style={{marginTop:10}}>
            {/* Get Details Map field and id */}          
                {filteredData.map((tour) => (
              <div key={tour._id} className="col-12 col-md-20">                                        
              <div className="card product-card" style={{marginBottom:10}}>
                <div className="card-body"    >
                      <a className="product-title d-block"  >E-Mail: <b>{tour.owneremail}</b></a>
                      <a className="product-title d-block"  >Name: <b>{tour.tourname}</b></a>
                      <a className="product-title d-block"  >Area: <b>{tour.area}</b></a>
                      <a className="product-title d-block"  >Duration: {tour.duration}</a>
                      <a className="product-title d-block"  >Tour Type: {tour.tourtype}</a>	
                      <a className="product-title d-block"  >Itinerary: {tour.itinerary}</a>
                      <a className="product-title d-block"  >Departure Arrival: {tour.deparrival}</a>
                      <a className="product-title d-block"  >Accommodation Details : {tour.accdetails}</a>
                      <a className="product-title d-block"  >Reporting & Dropping : {tour.reportdrop}</a>
                      <a className="product-title d-block"  >Tour Information : {tour.tourinfo}</a>


                      
                      <a className="product-title d-block"  >Lat : {tour.lat}  </a>
                      <a className="product-title d-block"  >Long : {tour.long}  </a>
                      <a className="product-title d-block">Date : {new Date(tour.dateCreated).toLocaleDateString('en-GB',timeOptions)}  </a>
                      <a className="product-title d-block" >Status : <b style={{ animation: 'blinkingText 1s infinite', color:"indigo" }}> {tour.status}</b>
                      </a>
                      <td>
  {/* Display the tour image */}
  {tour.image && (
    <a href={`http://localhost:4000/${tour.image}`} target="_blank" rel="noopener noreferrer" className="product-title d-block">

      <img src={`http://localhost:4000/${tour.image}`} alt="tour Image" style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
    </a>
  )}
</td><br></br>


                    </div>
                  </div>   
                  <a className="btn btn-danger" onClick={() => { LoadPhoto(tour.id) }}>Upload Photo</a>
                  <a className="btn btn-danger" onClick={() => { LoadEdit(tour.id) }}>Update</a>
                  <a className="btn btn-danger" onClick={() => { Removefunction(tour.id) }}>Delete</a>
                 <a className="btn btn-danger" onClick={() => setTourId(tour.id)}>Geo Map</a> 

                 <a className="btn btn-danger" target="_blank"
                  href={`https://maps.google.com/?q=${tour.lat},${tour.long}`}>
                  Show Map
                </a>
                <a className="btn btn-danger" onClick={() => { LoadPlan(tour.id) }}>Plan</a>
              </div>
              ))}

              
        </div>
                  ) : (
                    <p>No tour details found for the specified owner email or search term.</p>
            )}

           {/* Show if Null data in table */}

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

export default ViewTourOwner