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
     <button aria-label="Search_button" type="button" className="btn btn-primary" onClick={handleSubmit}>Search</button>
     
     <div id="searchAge">
       <hr/>
</div>

     </form>
     </div>
   
    </div>
      
    )
}

export default SearchForm