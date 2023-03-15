import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Notfound() {
    const [counter, setcounter]= useState(5)
    const navigate= useNavigate()
    useEffect(()=>{
        const setcount = setInterval(()=>{
         
          if(counter === 0){
          clearam()
          }else{
          setcounter(prev => prev -1)
          }
        },1000)
       
        function clearam(){
            clearInterval(setcount())
        }

    },[])
    useEffect(()=>{
        if(counter === 0){
            navigate(`/`)
        }
    },[counter])
    return (
        <div className="container">
          <center>
            <span className='fa fa-exclamation-triangle ' style={{fontSize:"150px",marginTop:"10%",color:"orange"}}></span>
           <p style={{color:"grey"}}>Sorry, This Route Doesn't Exist</p>
           <p style={{color:"indianred"}}>you would be redirected in <b>{counter}</b> seconds</p>
          </center>
        </div>
      );
}

export default Notfound;