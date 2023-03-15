import React, { useState, useEffect } from 'react';

function MainNavbar() {
    const [displayinput, setdisplayinput] = useState(false)
    const [displaytoplinks, setdisplaytoplinks] = useState(true)

 useEffect(()=>{
    window.addEventListener("resize",()=>{
       if(window.innerWidth < 1100){
        setdisplaytoplinks(false)
       }
    })
    if(window.innerWidth < 1100){
        setdisplaytoplinks(false)
    }
 })
    return (
        <div style={{backgroundColor:"rgba(255,255,255,0.8)",display:"none"}}>
           <div style={{display:'flex',padding:"4px 10px 3px 10px",margin:"0px",justifyContent:"space-between",flexWrap:"nowrap"}}>
             <div className='branddiv'>
                <span className='fa fa-bars fa-2x'></span>
                <small style={{fontSize:"30px"}}>
                    <span>Brand<span style={{color:"orange",fontWeight:"bold"}}>Icon</span></span>
                </small>
             </div>
             <div className='searchinputdiv mt-2'>
              <input type="text" className="form-control" placeholder='Search Products/Brands'  style={{display:`${displayinput ? "block" :"none"}`}}></input>
             <small style={{float:"right",padding:"6px",borderRadius:"20px",border:"1px solid grey",cursor:"pointer",display:`${!displayinput ? "block" : "none"}`}} onClick={()=>setdisplayinput(true)}><span className='fa fa-search mr-1'></span> Search  Products</small>
             </div>
             <div className='navlinks mt-2' style={{width:"30%",padding:"5px",display:`${displaytoplinks ? "block" : "none"}`}}>
                <small className='ml-3' style={{border:"2px solid orange",borderRadius:'25px',padding:"4px"}}>Home</small><small className='ml-3'>Categories</small>
                <small className='ml-3'>Dashboard</small>
                <small className='ml-3'>Login</small><small className='ml-3'>Register</small>
             </div>
             <div className='userimage mt-2'>
             <img style={{width:"100%",marginRight:"3px",borderRadius:"50%",border:"1px solid lightgrey"}} src={require(`./maleprofile.png`)}/>
             </div>

           </div>
           <div className='smsearchinput mb-3' style={{width:'100%',padding:"0px 5px",margin:"0px"}}>
           <input type="text" className="form-control mb-3" placeholder='Search Products/Brands'  ></input>
           </div>
        </div>
      );
}

export default MainNavbar;