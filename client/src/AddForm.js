import React, {useState, useEffect} from 'react';



function AddForm(props) {   
const [newActivity, setNewActivity] = useState({name:"", age_range:0, indoor: 0, outdoor:0, description:"" });
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
      //console.log("hello", activities)
     props.activityList(activities); 
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
    <input value={name} name="name" type="text" onChange={(e) => handleInputsChange(e)}/>
    </div>
    <div className="mb-4">
    {/* <label>Age</label>
    <input value={age_range} type="number" min="1" max="10"/> */}
    {/* <label>Indoor
    <input value={indoor} type="checkbox" aria-label="Checkbox for following text input"/>
    </label>
    <label>Outdoor
    <input value={outdoor} type="checkbox" aria-label="Checkbox for following text input"/>
    </label> */}
    </div>
    <div>
      <label>Description</label>
    <textarea value={description} name="description" onChange={(e) => handleInputsChange(e)}></textarea>
    </div>
    <button type="submit" className="btn btn-primary" >Add activity</button>
  </form>
<div>{error}</div>
</div>
    )
}

export default AddForm;
