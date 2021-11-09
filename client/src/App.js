import React, {useState, useEffect} from 'react';
import AddForm from './AddForm';
import './App.css';


function App() {

const [activities, setActivities] = useState([]);
const [error, setError] = useState("");

useEffect(() => {
    getActivities();
  }, []);

//render list of activities
const getActivities = async () =>{
try{
  const response = await fetch('/activities');
  console.log(response)
  const data = await response.json();
  console.log("DATA",data)
  setActivities(data);

}
catch(err){
   setError(err.message);
}
  };




//FOR THE UPDATE ANOTHER COMPONENT?


//DELETE
  const deleteActivity = async (id) =>{
try{
  const response = await fetch(`/activities/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }});
  getActivities();
}
catch(err){
   setError(err);
}
  };


  return (
    <div className="App">
      <nav>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    Admin
  </button>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    User
  </button>
      </nav>

<AddForm onDone={newActivity => setActivities(newActivity)} />

      {/* {CATALOGUE} */}
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
             <span className="mb-4">From children up to: {activity.age_range} y.o</span>
             <span>This is an {activity.outdoor === 1 ? 'outdoor' : 'indoor'} activity</span>
             <p>{activity.description}</p>
             </div>
             
             <button className="btn btn-primary">Update activity</button>
             <button className="btn btn-danger" onClick={()=> deleteActivity(activity.id)}>Delete activity</button>
             </li>
           </div>
         </div>
       ))}
     </div>
     <div id="errorMsg">{error}</div>
     
     {/* {SEARCH} */}
     <div id="search_activity" className="container">
     <form>
      <label>Search for keyword</label>
     <input className="form-control" type="text" placeholder="ball, chalks, montessori"/>
     <div id="filters">
       <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    Outdoor
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Indoor
  </label>
</div>
<label id="age_slider">Age</label>
<div className="slidecontainer"aria-labelledby="age_slider">
  <label aria-label="minimum_age">1</label>
  <input type="range" min="1" max="10"  className="slider" id="myRange" />
  <label aria-label="maximum_age">10</label>
</div>

     </div>
     <button aria-label="Search_button" type="button" className="btn btn-outline-warning">Search</button>
     </form>
     </div>
     </div>
     
    </div>
  );
}

export default App;
