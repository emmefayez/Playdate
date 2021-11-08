import React, {useState} from 'react';
import './App.css';


function App() {

const[activities, setActivities] = useState("");




  return (
    <div className="App">
      <div className="container">
     <h1>Playdate</h1>
     <div id="activities_catalogue">
       <h2>Activities</h2>
     </div>
     
     {/* {FORM} */}
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
<div class="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Indoor
  </label>
</div>
<label id="age_slider">Age</label>
<div class="slidecontainer"aria-labelledby="age_slider">
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
