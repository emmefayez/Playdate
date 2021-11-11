import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom"; 
import AddForm from './AddForm';
import Navbar from './Navbar';




function User(props) {
const [activities, setActivities] = useState([]);
const [favActivities, setFavActivities] = useState([]);
const [error, setError] = useState("");

//fetch of just the fav activities 
//using the props id
useEffect(() => {
    getFavActivities();
  }, []);

const getFavActivities = async () =>{

try{
  const response = await fetch('/favorities');
  const data = await response.json();
  setFavActivities(data);

}
catch(err){
   setError(err.message);
}
  };


return (
    <div className="container mt-4">
     <Navbar />

        <div className="user-info">
          <h3>Your favorities activities:</h3>
         {favActivities.map(activity => (<div key={activity.id} className="card-body">
           <div >
             <li className="list-group-item">
               <div className="card-title">
             Title: {activity.name}
             </div>
             <div className="card-text">
             <span className="mb-4">From children of: {activity.age} y.o</span>
             <p>Description: {activity.description}</p>
             </div>
             </li>
           </div>
         </div>))}
        </div>
         
        <div className="add an activity">
          <p>Do you want to share an activity with us? Fill the form!</p>
          <AddForm onDone={newActivity => setActivities(newActivity)}/>

        </div>
  
    </div>
      
    )
}

export default User
