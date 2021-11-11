import React, {useState, useEffect} from 'react';
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";


function Activities() {
const [activities, setActivities] = useState([]);
const [error, setError] = useState("");


useEffect(() => {
    getActivities();
  }, []);

const getActivities = async (query) =>{

let url = '/activities';

if(query){
  url += `?query=${query}`
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
    <div className="container mt-4">
     <Navbar />
      
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