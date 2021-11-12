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
     <div id="activities_catalogue">
       <h2>Activities</h2>
       { activities.map((activity) => (
         <div key={activity.id} className="card-body">
           
           <div >
             <li className="list-group-item">
               <div className="card-title">
             <h5>Title: {activity.name}</h5>
             </div>
             <div className="card-text">
             <span className="mb-4"><h5>From children of: {activity.age} y.o</h5></span>
             <h5>Description:</h5> <p>{activity.description}</p>
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