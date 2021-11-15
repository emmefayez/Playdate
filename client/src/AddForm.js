import React, {useState} from 'react';
import Noty from 'noty';
import "../node_modules/noty/lib/themes/bootstrap-v4.css";
import "../node_modules/noty/lib/themes/sunset.css"; 
import "../node_modules/noty/lib/noty.css";  


function AddForm(props) {   
const [newActivity, setNewActivity] = useState({name: "", age: 1, description: ""});
const [error, setError] = useState("");
const [message, setMessage] = useState("");

const handleInputsChange = (event) =>{
  const {value, name} = event.target;
  setNewActivity((state) => ({...state, [name]: value}))
  
};

//handle inputs
const handleSubmit = (e) =>{
  e.preventDefault();
  addActivity();
};

const { name, age, description } = newActivity;

//ADD 
 const addActivity = async () => {    
    try {
        
      const response = await fetch("/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newActivity)
      });
      const activities = await response.json();
      
     props.onDone(activities); 
    } catch (error) {
      setError(error.message);
    }
    new Noty({
  layout: "topRight",
  type: "success",
  theme: "sunset",
  text : "Activity added!",
  timeout: 2000
}).show();

    setNewActivity(""); 
  };

    return (
        <div className="container">
   <div><h3>{message}</h3></div>
  <form className="form-control" onSubmit={handleSubmit}>
    <div className="mb-4">
      <h2>Add new activity</h2>
      <p>Don't leave any field empty </p>
    <label><h5>Name</h5></label>
    <input className="m-4" value={name} name="name" type="text" onChange={(e) => handleInputsChange(e)} minLength="5" required />
    </div>
    <div className="mb-4">
    <label><h5>Suitable from children up to:</h5></label>
    <input className= "m-4" value={+age} type="number" name="age" min="1" max="10" required onChange={(e) => handleInputsChange(e)} />
    </div>
    <div>
      <label><h5>Description</h5> </label>
      <p>Provide a brief description of this activity, including <strong>materials</strong> you need to have, if it is an <strong>outdoor</strong> or <strong>indoor</strong> game, or any other relevant information.</p>
    <textarea value={description} name="description" required onChange={(e) => handleInputsChange(e)} rows="5" cols="65" autoFocus minLength="5"></textarea>
    </div>
    
    <button type="submit" className="btn btn-primary m-2" >Add to catalogue</button>
    
  </form>
<div>{error}</div>
</div>
    )
}

export default AddForm;
