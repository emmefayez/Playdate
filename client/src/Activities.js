import { Link } from "react-router-dom"; 
import React, {useState, useEffect} from 'react';
import SearchForm from "./SearchForm";


function Activities() {
const [activities, setActivities] = useState([]);
const [error, setError] = useState("");


useEffect(() => {
    getActivities();
  }, []);

//render list of activities

const getActivities = async (query) =>{
let url = '/activities';
// const {keyword, age} = query;
// if(keyword){
//   url += `/?=${keyword}`
//  }
// if(age){
//   url += `/?=${age}`
//  }
if(query){
  url += `/?=${query}`
 }
try{
  const response = await fetch(url);
  const data = await response.json();
  setActivities(data);

}
catch(err){
   setError(err.message);
}
  };

  return (
    <div className="Home">
       <nav>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <Link to="/Admin">Admin</Link>
  </button>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <Link to="/users">User</Link>
  </button>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <Link to="/">Home</Link>
  </button>
      </nav>
      
 <div className="search">
             <SearchForm submitCb={(query) => getActivities(query)}/>    
        </div>

  <div className="container">
     <h1></h1>
     <div id="activities_catalogue">
       <h2>Activities</h2>
       { activities.map((activity) => (
         <div key={activity.id} className="card-body">
           <div >
             <li className="list-group-item">
               <div className="card-title">
             Title: {activity.name}
             </div>
             <div className="card-text">
             <span className="mb-4">From children of: {activity.age_range} y.o</span>
             <p>Description: {activity.description}</p>
             </div>
             
             <button className="btn btn-primary m-2" addToFav={()=> setActivities(activity.id)} >Add to favorities</button>
             </li>
           </div>
         </div>
       ))}
     </div>
     <div id="errorMsg">{error}</div>
     
     
     </div>
      
    </div>
  );
}

export default Activities;