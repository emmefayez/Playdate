import React, {useState, useEffect} from 'react';
import AddForm from './AddForm';
import './App.css';
import Home from './Home';


function App() {

const [activities, setActivities] = useState([]);
const [error, setError] = useState("");
const [keyword, setKeyword] = useState("");
const [age, setAge] = useState("");

useEffect(() => {
    getActivities();
  }, []);

//render list of activities
const getActivities = async () =>{
try{
  const response = await fetch('/activities');
  const data = await response.json();
  setActivities(data);

}
catch(err){
   setError(err.message);
}
  };

//FILTER SEARCH by keyword
const handleKeyword = (event) =>{
  event.preventDefault();   
  const keyword = event.target.value;
  setKeyword(keyword)
  
}


const getActivitiesByKeyword = async () =>{
try{  
  const response = await fetch(`/activities/${keyword}`);
  const data = await response.json();
  setActivities(data);
}
catch(err){
   setError(err.message);
}
  };

//FILTER SEARCH by age
const handleAge= (event) =>{
  event.preventDefault();
  const age = event.target.value;
  setAge(age)

  
}

const getActivitiesByAge = async () =>{
try{
  const response = await fetch(`/activities/${age}`);
  const data = await response.json();
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
<div className="container">
  <div className="row mb-4">

   <div className ="col-6">
<AddForm onDone={newActivity => setActivities(newActivity)} /> 
</div>
</div>
</div>

{/* {SEARCH FORM}
     do I need another useEffect and hook to render just the filtered results? so it has to be triggered no on reload but when the form is submitted?*/}
     <div id="search_activity" className="container">
     <form>
      <label>Search for keyword</label>
     <input className="form-control mb-4" type="text" placeholder="ball, chalks, montessori" name="keyword" value={keyword} onChange={(e) => handleKeyword(e)}/>
     <button aria-label="Search_button" type="button" className="btn btn-outline-warning" onClick={getActivitiesByKeyword}>Search by Keyword</button>
     <div id="searchAge">
       <hr/>
<label>Search by Age</label>
<div className="slidecontainer"aria-labelledby="age_slider">
  <label aria-label="minimum_age">From 1 to 10</label>
  <input type="number" min="1" max="10" value={age} name="age" onChange={(e) => handleAge(e)} />
  <button aria-label="Search_button" type="button" className="btn btn-outline-warning m-2" onClick={getActivitiesByAge}>Search by Age</button>
</div>
</div>

     </form>
     </div>

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
             <span className="mb-4">From children of: {activity.age_range} y.o</span>
             <span>This is an {activity.outdoor === 1 ? 'outdoor' : 'indoor'} activity</span>
             <p>{activity.description}</p>
             </div>
             
             <button className="btn btn-primary m-2">Update activity</button>
             <button className="btn btn-danger m-2" onClick={()=> deleteActivity(activity.id)}>Delete activity</button>
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

export default App;
