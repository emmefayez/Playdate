import React, {useState, useEffect} from 'react';




function User(props) {

const [favActivities, setFavActivities] = useState([]);

//fetch of just the fav activities


return (
    <div className="container">
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
