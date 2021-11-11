import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom"; 




function User(props) {

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
    <div className="container">
      <button className="btn btn-outline-danger m-2"><Link to="/Activities">Back to Activities catalogue</Link></button>
        <div className="user-info">
         {favActivities.map(activity => (  <div key={activity.id} className="card-body">
           <div >
             <li className="list-group-item">
               <div className="card-title">
             Title: {activity.name}
             </div>
             <div className="card-text">
             <span className="mb-4">From children of: {activity.age_range} y.o</span>
             <span>This is an {activity.outdoor === 1 ? 'outdoor' : 'indoor'} activity</span>
             <p>{activity.description}</p>
             </div>
             </li>
           </div>
         </div>))}
        </div>

        <div className="favlist">

        </div>
  
    </div>
      
    )
}

export default User
