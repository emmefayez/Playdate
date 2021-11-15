import React, {useState, useEffect} from 'react';
import SearchForm from "./SearchForm";
import Navbar from "./Navbar";
import Noty from 'noty';
import "../node_modules/noty/lib/themes/sunset.css"; 
import "../node_modules/noty/lib/noty.css"; 


function Activities() {
const [activities, setActivities] = useState([]);
const [error, setError] = useState("");

//this is the parent of addForm and searchForm

useEffect(() => {
    getActivities();
  }, []);

//to display all the activities
const getActivities = async (query) =>{

let url = '/activities';

if(query){
  url += `?query=${query}`
 }
try{
  const response = await fetch(url);
  const data = await response.json();
 
  setActivities(data);
 if(!data.length){new Noty({
  layout: "center",
  type: "error",
  theme: "sunset",
  text : "No activity found",
  timeout: 2000
}).show();

 }
}
catch(err){
   setError(err.message);
}
  };

//this function will probably change once the log in works, displaying the noty only when the user is not register
const registerFirst = (event) =>{
  event.preventDefault();
  new Noty({
  layout: "center",
  type: "error",
  theme: "sunset",
  text : "You need to register or log in first!",
  timeout: 4000
}).show();
}

  return (
    <div>
     <Navbar />
      
 <div className="search mt-4">
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
             
             <button className="btn btn-primary m-2" onClick = {(event) => registerFirst(event) } addToFav={()=> setActivities(activity.id)} >Add to favorities</button>
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