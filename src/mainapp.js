import React, { useState, useEffect, useContext } from 'react';
import App from './App';
import Navbar from './navbar';
import {userContext} from "./usercontext"
import Cookies from 'js-cookie';
import SubmittedCart from './submittedcart';
import Shoppingcart from './shoppingcart';
import History from "./history"
import SavedItems from './saved_items';
import Login from "./login"
import Register from './register';
import Details from './details'
import Home from './home';
import Profile from './profile';
import SideNavbar from './sidenavbar';
import Product from './product';

import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom"

function MainApp() {
   const context = useContext(userContext)
   const [currentPage, setcurrentPage] = context["currentpage"]
   const [loading, setloading] = context["loading"]
const [requeststatus, setrequeststatus] = context["requeststatus"]
const [alertmessage, setalertmessage] = context["alertmessage"]
const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
const [targetmodal, settargetmodal] = context["targetmodal"]
const [userdetails, setuserdetails] = context["userdetail"]
const [displayicon, setdisplayicon] = context["displayicon"]

useEffect(()=>{
   alert(currentPage)
   },[currentPage])

useEffect(()=>{
    if(displayicon){
        document.querySelector(".overalldiv").addEventListener("click", ()=>{
            setdisplayicon(false)
        })
        document.querySelector(".overalldiv").addEventListener("click", ()=>{
            setmodaldisplay("none")
        })
    }
})
    return (       
        <div>     
             <Router>
             {(window.location.href.includes("login") || window.location.href.includes("register"))  ?
       null
       : <Navbar></Navbar>}
            <div  className='overalldiv'>
        {Cookies.get("tktplc") && currentPage !== "login" && currentPage !== "register" ? 
        <div  style={{position:'fixed',zIndex:"900000",bottom:"5%",right:"2%"}}>
          <button style={{padding:"0px 3px",backgroundColor:"indianred",color:"white"}} className='btn'>
            <p style={{padding:"0px 2px",margin:"0px"}}>Proceed to cart <span className='fa fa-shopping-cart'></span></p>
            <small>you have <b>{userdetails.noshoppingcart}</b> items</small>
          </button>
        </div>
        : null}
      <div style={{position:"fixed",display:`${modaldisplay}`,top:"0",left:"0%",zIndex:"2000",backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"100%"}}>
          <div style={{position:"fixed",left:"35%",padding:"30px",zIndex:"300000",width:"30%",backgroundColor:"white",border:"1px solid lightgrey", top:"30%"}}>
             <center style={{padding:"20px"}}>
              <span className='fa fa-times fa-2x' style={{position:"absolute",right:"20px",top:"10px",color:"grey"}}></span>

              {requeststatus === "failed" 
              ? 
              <p style={{color:"indianred",fontWeight:"bold"}}><span className='fa fa-ban'></span> Request Failed</p>
            : requeststatus === "success"
            ? <p style={{color:"green",fontWeight:"bold"}}>Request Successful <span className='fa fa-check ml-1'></span></p>
        : <small>Request</small>}
              <p>{alertmessage}</p>
             </center>
             <div className='row'>
                <div className='col-4'>
                    <button className='btn btn-danger' onClick={()=> setmodaldisplay("none")}>cancel</button>
                </div>
                <div className='col-8'>
                  {targetmodal === "cart" ?
                    <button className='btn btn-primary' style={{float:'right'}} >Proceed to cart <span className='fa fa-shopping-cart'></span></button>
                : targetmodal === "save" ?
                <button className='btn btn-primary' style={{float:'right'}} >saved items <span className='fa fa-heart'></span></button>
            : targetmodal === "rate" ?
            <button className='btn btn-primary' style={{float:'right'}} >shop</button>
        :   <button className='btn btn-primary' style={{float:'right'}} >Done</button>}
                </div>
               </div>
            </div>
       
            </div>
      {loading ? 
              <div style={{position:"fixed",top:"0",left:"0%",zIndex:"200000",backgroundColor:"rgba(242,242,242,0.3)",width:"100%",height:"100%"}}>
                   <div style={{position:"fixed",left:"40%", top:"30%"}}>
                   <center>
                      <img  src={`https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif`} />
                  </center>
                   </div>
              </div>
              : null}
      
   
      <div className="container">
      <div>
        {currentPage !== "login" || currentPage !== "register" ? 
         <div onMouseEnter={()=>setdisplayicon(true)} style={{top:"10%",display:`${currentPage === "login" || currentPage === "register" ? "none" : "block"}`,backgroundColor:"black",position:"fixed",left:"0",zIndex:"900000",overflow:"scroll",transition:`all 2s linear`}}>
           <SideNavbar/>          
         </div>
         : null}
          <div style={{overflow:"hidden"}}>
         <Routes>    
         <Route exact path='/saved_items' element={<SavedItems/>} />
         <Route exact path='/shop' element={<Product />} />
         <Route exact path='/cart' element={<Shoppingcart />} />
         <Route exact path='/submitted_cart' element={<SubmittedCart />} />
         <Route exact path="/profile" element={<Profile />} />
         <Route exact path='/' element={< Home/>} />
         <Route exact path='/history' element={< History/>} />
         <Route exact path='/login' element={< Login/>} />
         <Route exact path='/register' element={< Register/>} />
         <Route exact path='/shop/details/:productDetails' element={< Details/>} />
       </Routes>
       </div>
         </div>
       </div>     
      
         </div>
      </Router>
        </div>
    
     );
}

export default MainApp;