import React, {useState} from 'react';


function SearchForm(props) {
const [query, setQuery] = useState("");

const handleQuery = (event) =>{
  event.preventDefault();
  const query = event.target.value;
  setQuery(query);
}

const handleSubmit = (event) => {
    event.preventDefault();
    props.submitCb(query);

 }


return (
    <div className="search_form">

 <div id="search_activity" className="container">
     <form>
      <label><h5>Search by keyword</h5></label>
     <input className="form-control mb-4" type="text" placeholder="ball, chalks, montessori" name="keyword" value={query} onChange={(e) => handleQuery(e)}/>
     <button aria-label="Search_button" type="button" className="btn btn-primary" onClick={handleSubmit}>Search by keyword</button>
     
     <div id="searchAge">
       <hr/>
{/* <label><h5>Search by Age</h5></label>
<div className="age"aria-labelledby="age">
  <label aria-label="minimum_age">From 1 to 10</label>
  <input type="number" min="1" max="10" value={query} name="age" onChange={(e) => handleQuery(e)} />
  <button aria-label="Search_button" type="button" className="btn btn-primary m-2" onClick={handleSubmit}>Search</button>
</div> */}
</div>

     </form>
     </div>
   
    </div>
      
    )
}

export default SearchForm