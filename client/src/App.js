import React from 'react';
import './App.css';


function App() {

const[activities, setActivities] = useState("");




  return (
    <div className="App">
     <h1>Playdate</h1>
     <h2>Activities</h2>
     
     <div id="search_activity">
     <form>
      <label>Search for an activity by name</label>
     <input/>
     <div id="filters">
       <input/>
       <input/>
     </div>
     <button>Search</button>
     </form>
     </div>
    </div>
  );
}

export default App;
