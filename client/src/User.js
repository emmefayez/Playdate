import React, {useState, useEffect} from 'react';
import AddForm from './AddForm';
import Navbar from './Navbar';
import avatar_1 from './avatar_1.png';


function User() {
//don't delete this because you are sending the activity to be displayed in the "Activities" component
const [activities, setActivities] = useState([]);
const [favActivities, setFavActivities] = useState([]);
const [error, setError] = useState("");
//this will probably not being necessary with auth
const [users, setUsers] = useState([{avatar: "", name: "", email:"", password:"", repeat_password:""}])

//fetch of just the fav activities 
//using the props id
useEffect(() => {
    getUser();
  
  }, []);

//to display the profile of the user
const getUser = async (id=10) =>{

try{ 
  const response = await fetch(`/users/${id}`);
  const data = await response.json();
  setUsers(data);
}
catch(err){
  setError(err)
}

}


//THIS will be really work once auth will be incorporeted in the project, I inserted a fav activity manually rn
// const getFavActivities = async () =>{

// try{
//   const response = await fetch('/favorities');
//   const data = await response.json();
//   setFavActivities(data);

// }
// catch(err){
//    setError(err.message);
// }
//   };


return (
    <div>
     <Navbar />
      <div className="container">
        <h1>Welcome to your profile</h1>
        <p>Here you can see your data and the activities you liked the most!</p>
        <div className="row m-4">
        <div className="col-6">
            <div className="profile-card">
                    
                    <img src={avatar_1} alt="profile avatar" className="img-fluid" id="profile"/>
                    {users && users.map( user => (<div key={user.id}>
                   <h5> Welcome back, {user.name} !</h5>
                   <div className="profile-card"></div>
                  <div>Name: {user.name}</div>
                  <div>Email address: {user.email}</div>
                  </div>

                    ))}
                  
                  
                  </div>
              
      </div>
   
        <div className="col-6 mt-4">
          <h3>Your favorities activities:</h3>
         {favActivities && favActivities.map(activity => (<div key={activity.id} className="card-body">
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
         {!favActivities.length ? `You have no favorities to your activity catalogue, go take a look!` : favActivities }
        </div>
        </div>
        </div>
         
        <div className="container mt-4">
          <p>Do you want to share an activity with us? Fill the form!</p>
          <AddForm onDone={newActivity => setActivities(newActivity)}/>

        </div>
  
    </div>
    
      
    )
}

export default User
