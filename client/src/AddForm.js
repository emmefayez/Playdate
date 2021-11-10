import React, {useState, useEffect} from 'react';



function AddForm(props) {   
const [newActivity, setNewActivity] = useState({name:"", age_range: 1, indoor: 0, outdoor:0, description:"" });
const [error, setError] = useState("");

const handleInputsChange = (event) =>{
  const {value, name} = event.target;
  setNewActivity((state) => ({...state, [name]: value}))
};

//handle inputs
const handleSubmit = (e) =>{
  e.preventDefault();
  addActivity();
};

const { name, age_range, indoor, outdoor, description } = newActivity;

//ADD 
 const addActivity = async () => {
     console.log('about to try')
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


    setNewActivity("");
   
  };

    return (
        <div className="container">
   
  <form className="form-control" onSubmit={handleSubmit}>
    <div className="mb-4">
    <label>Name</label>
    <input className="m-4" value={name} name="name" type="text" onChange={(e) => handleInputsChange(e)}/>
    </div>
    <div className="mb-4">
    <label>Age</label>
    <input className= "m-4" value={age_range} type="number" onChange={(e) => handleInputsChange(e)} />
  <select name="type_of_activity">
      <option name="outdoor" value={outdoor} onChange={(e) => handleInputsChange(e)}>Outdoor</option>
       <option name="indoor" value={indoor} onChange={(e) => handleInputsChange(e)}>Indoor</option>
      </select> 
    </div>
    <div>
      <label>Description</label>
    <textarea value={description} name="description" onChange={(e) => handleInputsChange(e)}></textarea>
    </div>
    
    <button type="submit" className="btn btn-primary m-2" >Add to catalogue</button>
    
  </form>
<div>{error}</div>
</div>
    )
}

export default AddForm;
