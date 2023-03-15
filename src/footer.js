import React, { useState, useEffect } from 'react';

function Footer() {
    return ( 
            <div style={{color:"white", backgroundColor:"black", width:'100%'}}>
          <div className='container-fluid '>
            <div className='row' style={{paddingTop:"40px"}}>
               <div className='col-4'>
               <div className='branddiv'>
                <small style={{fontSize:"40px",padding:"20px"}}>
                    <span>Brand<span style={{color:"orange",fontWeight:"bold"}}>Icon</span></span>
                </small>
             </div>
               </div>
               <div className='col-5'>
                <small style={{color:"white",textTransform:'uppercase',fontWeight:"bold", fontSize:'11px'}}>subscribe to our newsletter</small><br/>
                <input className='form-control' placeholder='example@email.com'></input>
               </div>
               <div className='col-1 mt-3'>
               <button style={{padding:"5px 10px"}} className="btn btn-primary mt-2"><small>Subscribe</small></button>
               </div>
            </div>
            <div style={{display:"flex", justifyContent:'space-evenly',marginBottom:"100px",padding:"60px 20px"}}>
            <div  style={{marginBottom:"100px", width:"10%"}}>
                 <small style={{textTransform:"uppercase",fontSize:"14px",fontWeight:"bolder"}}>Help Center</small>
                 <div style={{color:"lightgrey",fontSize:'17px', textTransform:"capitalize",fontWeight:"bold",width:"100%",alignItems:"center", justifyContent:"center"}}>
                 <small style={{fontWeight:"bold"}}>help</small><br/>
                  <small style={{fontWeight:"bold"}}>faq</small><br/>
                  <small style={{fontWeight:"bold"}}>livechat</small><br/>
                  <small style={{fontWeight:"bold"}}>track order</small><br/>
                  </div>
               </div>
               <div  style={{marginBottom:"100px", width:"10%"}}>
                 <small style={{textTransform:"uppercase",fontSize:"14px", fontWeight:"bolder"}}>Fruget</small>
                 <div style={{color:"lightgrey",fontSize:'17px', textTransform:"capitalize",fontWeight:"bold",width:"100%",alignItems:"center", justifyContent:"center"}}>
                 <small style={{fontWeight:"bold"}}>about us</small><br/>
                  <small style={{fontWeight:"bold"}}>our policy</small><br/>
                  <small style={{fontWeight:"bold"}}>terms & conditions</small><br/>
                  </div>
               </div>
               <div  style={{marginBottom:"100px", width:"10%"}}>
                 <small style={{textTransform:"uppercase",fontSize:"14px", fontWeight:"bolder"}}>Learn</small>
                 <div style={{color:"lightgrey",fontSize:'17px', textTransform:"capitalize",fontWeight:"bold",width:"100%",alignItems:"center", justifyContent:"center"}}>
                 <small style={{fontWeight:"bold"}}>stores</small><br/>
                  <small style={{fontWeight:"bold"}}>dispatch</small><br/>
                  <small style={{fontWeight:"bold"}}>orders</small><br/>
                 
                  </div>
               </div>
               <div style={{width:"35%"}}>
               <input type="text" placeholder='Type your complaints'  className='form-control'/>
               <button className='btn mt-2' style={{color:'white', backgroundColor:"orange"}}>
                        <span className="fa fa-envelope-o"></span> Subscribe</button>
               </div>
            </div>
            <div style={{display:'flex'}}>
                <div className='col-12 col-md-6' style={{border:"2px solid red"}}>
                    <input type="text" placeholder='Type your complaints'  className='form-control'/>
                </div>
                <div className='col-6 col-md-3'>
                    <button className='btn' style={{color:'white', backgroundColor:"orange"}}>
                        <span className="fa fa-envelope-o"></span> Subscribe</button>
                </div>
            </div>
            </div>
        </div>
     );
}

export default Footer;