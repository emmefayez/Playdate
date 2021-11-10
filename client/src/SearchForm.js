import React, {useState} from 'react';


function SearchForm(props) {
const [error, setError] = useState("");
const [keyword, setKeyword] = useState("");
const [age, setAge] = useState("");
const [activities, setActivities] = useState([]);

//FILTER SEARCH by keyword
const handleKeyword = (event) =>{
  event.preventDefault();   
  const keyword = event.target.value;
  setKeyword(keyword)
  
}
const handleSubmit = (event) => {
    event.preventDefault();
    props.submitCb(keyword);

 }
// const getActivitiesByKeyword = async () =>{
// try{  
//   const response = await fetch(`/activities/${keyword}`);
//   const data = await response.json();
//   setActivities(data);//this now should be sent via props
// }
// catch(err){
//    setError(err.message);
// }
//   };

//FILTER SEARCH by age
const handleAge= (event) =>{
  event.preventDefault();
  const age = event.target.value;
  setAge(age)

  
}

// const getActivitiesByAge = async () =>{
// try{
//   const response = await fetch(`/activities/${age}`);
//   const data = await response.json();
//   setActivities(data);//this now should be sent via props

// }
// catch(err){
//    setError(err.message);
// }
//   };


return (
    <div className="search_form">

 <div id="search_activity" className="container">
     <form>
      <label>Search for keyword</label>
     <input className="form-control mb-4" type="text" placeholder="ball, chalks, montessori" name="keyword" value={keyword} onChange={(e) => handleKeyword(e)}/>
     <button aria-label="Search_button" type="button" className="btn btn-outline-warning" onClick={handleSubmit}>Search by Keyword</button>
     <div id="searchAge">
       <hr/>
<label>Search by Age</label>
<div className="slidecontainer"aria-labelledby="age_slider">
  <label aria-label="minimum_age">From 1 to 10</label>
  <input type="number" min="1" max="10" value={age} name="age" onChange={(e) => handleAge(e)} />
  <button aria-label="Search_button" type="button" className="btn btn-outline-warning m-2" onClick={handleSubmit}>Search by Age</button>
</div>
</div>

     </form>
     </div>
    <div>{error}</div>  
    </div>
      
    )
}

export default SearchForm