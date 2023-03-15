import React, { useState, useEffect } from 'react';
import Movielist from './movielist';

function Search(props) {
    const [searchinput, setsearchinput] = useState("")
    const [filteredmovies, setfilteredmovies] = useState([])

 useEffect(()=>{
    console.log("input change")
    const filteredmoviesarray=[]
    if(searchinput.length > 2){
        console.log("input is > 2",props.movies.length)
     for(var i=0; i<props.movies.length; i++){
        if(props.movies[i].moviename.indexOf(searchinput) > -1){
            filteredmoviesarray.push(props.movies[i])
        }
        console.log("filtered array",filteredmoviesarray)
        setfilteredmovies(filteredmoviesarray)
     }
    }else{
        setfilteredmovies([])
    }
 },[searchinput])
    const change=(e)=>{
     setsearchinput(e.target.value)
    }
    return ( 
        <div>
        
     <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        name="searchinput"
        value={searchinput}
        placeholder='Search for movie by name' 
        className='w-75 py-2 form-control'
        onChange={change}
        data-testid='search'
      />
    </section>
    <Movielist movies={filteredmovies} />
        </div>
     );
}

export default Search;