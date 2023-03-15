import React, { useState, useEffect } from 'react';

function Movielist(props) {
    return ( 
        <div >
    <section>
      <ul 
        className='styled w-100 pl-0' 
        data-testid='moviesList'
      >
     {props.movies && props.movies.map(movie=>
       <li 
       className='flex slide-up-fade-in justify-content-between'
       style={{borderBottom: '2px solid var(--primary-color)'}}
     >
       <div className='layout-column w-40'>
         {/* use this header for movie name */}
         <h3 className='my-3'>{movie.moviename}</h3>
         {/* use this paragraph for movie ratings, for example: 'Ratings: 88/100' */}
         <p className='my-0'>Ratings: {movie.movierating}</p>
       </div>
       <div className='layout-row my-auto mr-20'>
         {/* use this paragraph for movie duration, for example: '2.5 Hrs' */}
         <p className='justify-content-end'>Duration: {movie.movieduration}</p>
       </div>
     </li>  
        )}
      </ul>
    </section>
        </div>
     );
}

export default Movielist;