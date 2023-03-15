import React, { useState, useEffect, useContext } from 'react';
import {userContext} from "./usercontext"
import { useNavigate,Link} from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';

 
function Navbar(props) {
   const context = useContext(userContext)
   const [userdetails,setuserdetails] = context["userdetail"]
   const [navwidth,setnavwidth] = context["sidenav"]
   const [page,setpage] = context["page"]
   const [products, setproducts] = context["product"]
   const [searchinput, setsearchinput] = context["search"]
   const [displaylink, setdisplaylink]= context["displaylink"]
    const [displayicon, setdisplayicon] = context["displayicon"]
   const [navbarclass, setnavbarclass] = useState("fa-bars")
   const [loading, setloading] = context["loading"]
   const [currentPage, setcurrentPage] = context["currentpage"]
   const [numprod, setnumprod] = context["numprod"]
   const [sorter, setsorter]= context["sorter"]
   const [displayinput, setdisplayinput] = useState(false)
   const [displaytoplinks, setdisplaytoplinks] = useState(true)
   const [displaynavbar, setdisplaynavbar] = context["displaynavbar"]
   const [mobiledevice, setmobiledevice] = context["mobiledevice"]
   const [displaycategories, setdisplaycategories] = context["displaycategories"]
   const [displaysuggest, setdisplaysuggest] = context["displaysuggest"]
   const [displaylogout, setdisplaylogout] = useState(false)
   const [shoppingcart, setshoppingcart] = context["shoppingcart"]
   const [submittedcart, setsubmittedcart] = context["submittedcart"]
   const [sumtotalmain, setsumtotalmain] = context["sumtotalmain"]
   const [noOfUnreadChat, setnoOfUnreadChat] =context["noofunreadchat"]
   const [noOfUnreadMessages, setnoOfUnreadMessages] = context["noofunreadmessages"]

    const navigate = useNavigate()
   const query = new URLSearchParams(window.location.search)
 //  const {displaysidenav, setdisplaysidenav} = useContext(userContext)
  useEffect(()=>{
  displaylink ? setnavbarclass("fa-times") : setnavbarclass("fa-bars")
  },[displaylink])
  const searchchange=(e)=>{
   if(searchinput.length === 0){
      setproducts([])
      setpage(1)
    if(query.get("page")){
      query.delete("page")
      navigate(window.location.pathname + "?" + query.toString())
    }
   }
  setsearchinput(e.target.value)
  }
  const submitsearch =(e)=>{
  e.preventDefault()
  query.set("search", searchinput)
 navigate(window.location.pathname + "?" + query.toString())
  }
const displaynav =()=>{
  if(displaylink){
 if(mobiledevice){
  setdisplaynavbar(false)
 }
 setdisplaylink(prev => !prev)
  }else{
  if(mobiledevice){
    setdisplaynavbar(true)
  }
  setdisplaylink(prev => !prev)
  setdisplayicon(true)
  }
   setnavbarclass(navbarclass === "fa-bars" ? "fa-times" : "fa-bars")
}
const setinputblur =()=>{
  if(searchinput.length === 0){
  setdisplaysuggest(false)
  }
}
const blurinput =()=>{
  setdisplayinput(false)
}
const logout=()=>{
  Cookies.remove("tktplc")
  navigate(`/login`)
 }

    return ( 
      <div style={{position:"sticky",width:"100%",borderBottom:"1px solid rgba(242,242,242,0.6)",top:"0%",zIndex:"9900000000",backgroundColor:"rgba(255,255,255)"}}>
            <div className='navtop'>
                <div><small className='mt-2'>
                  <Link to={`/`}  style={currentPage === "home" ? {padding:"4px",color:"grey",textDecoration:"none"} : {color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >Home</Link>
                  </small>
                  </div>
                <div style={{padding:"0",margin:"0",cursor:"pointer"}} onClick={()=> setdisplaycategories(prev => !prev)} onMouseOver={()=>setdisplaycategories(true)}>
                <small style={{padding:"0",color:"white",fontWeight:"bolder",textTransform:"uppercase"}}  className='mt-2'>Categories <small style={{fontSize:"12px",color:"white"}}><span className={displaycategories ? 'fa fa-chevron-circle-up' : 'fa fa-chevron-circle-down'}></span></small></small>
                </div>
                <div>
                  <small className='mt-2'>
                  <Link to={`/profile/my_profile`} className="linker" style={currentPage === "dashboard" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",color:"grey",textDecoration:"none"} : {color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}}>Dashboard</Link>
                </small>
                </div>
                <div><small className='mt-2' style={{position:"relative"}}>
                  <Link to={`/profile/cart`}  style={currentPage === "cart" ? {color:"grey",padding:"4px",textDecoration:"none"} : {color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >Cart</Link>
                  </small>
                  </div>
                <div><small className='mt-2' style={{position:"relative"}}>
                  <Link to={`/profile/submitted_cart`}  style={currentPage === "orders" ? {border:"2px solid orange",borderRadius:'25px',padding:"4px",textDecoration:"none"} : {color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >Orders</Link>
                  </small>
                  </div>
                <div>
                <small className='mt-2'>
                <Link to={`/login`}  className="linker" style={{color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}}>Login</Link></small>
               </div>
                <div>
                  <small className='mt-2'>
                <Link to={`/register`}  className="linker" style={{color:"white",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}}>Register</Link></small>
             </div>
             <div>
                  <small className='mt-2' title={`you have ${noOfUnreadMessages.length} messages from ${noOfUnreadChat.length}`}>
                <Link to={`/connections`}  className="linker" style={{color:"white",position:"relative",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}}>
                  <span className='fa fa-comment-o' style={{fontSize:"22px",fontWeight:"bolder"}}></span>
                  <span style={{position:"absolute",border:"2px solid white",right:"-10px",top:"-10px",borderRadius:"30px",color:"white",backgroundColor:"green",fontWeight:"bolder",fontSize:"11px"}} className='badge'>{noOfUnreadChat && noOfUnreadChat.length}</span>
                  </Link></small>
             </div>
             
             </div>
            
                <div className='navdiv' style={{display:"flex",flexWrap:"wrap"}}>
                <div className='branddiv'>
                <span className={`fa ${navbarclass} mr-1`} onClick={displaynav} style={{color:"orange",fontSize:"35px",fontWeight:"lighter"}}></span>
                <small style={{fontSize:"30px"}}>
                    <span>Brand<span style={{color:"orange",fontWeight:"bold"}}>Icon</span></span>
                </small>
             </div>
                 <div className='searchinputdiv mt-2'>
                   <form method="get" onSubmit={submitsearch}>
                   <input className='form-control' name="searchinput" onChange={searchchange} onBlur={blurinput} style={{boxShadow:"none",borderRadius:"5px",display:`${displayinput ? "block" :"none"}`}} placeholder='Search Products/Brand' type="text" />
                   </form>
                   <small style={{float:"right",padding:"6px",borderRadius:"20px",border:"1px solid grey",cursor:"pointer",display:`${!displayinput ? "block" : "none"}`}} onClick={()=>setdisplayinput(true)}><span className='fa fa-search mr-1'></span> Search  {searchinput.length > 0 ? `"${searchinput}"` :  "Products"}</small>
                 </div>
                 {Cookies.get("tktplc") ?
                 <div className='navicons mt-2' style={{display:"flex",flexWrap:"nowrap"}}>
             <div className='userimage' style={{padding:"0px",position:"relative"}}>
             <b className='mt-2' onClick={()=>setdisplaylogout(!displaylogout)} style={{borderRadius:"45%",padding:"5px",marginTop:"5px",cursor:"pointer"}}>
             <span className='fa fa-question-circle fa-2x text-muted'></span> 
              </b><small style={{position:"absolute",color:"lightgrey",bottom:"2px"}}><span className='fa fa-chevron-circle-down'></span></small>
             </div>
             <div style={{position:'relative'}}><small className='mt-2'>
              <Link to={`/history`}  style={{color:"black",textDecoration:"none",textTransform:"uppercase"}} className="linker" >
                <span  className='fa fa-bell-o fa-2x text-muted'></span>
                <span style={{position:"absolute",border:"2px solid white",right:"-8px",top:"-3px",borderRadius:"30px",color:"white",backgroundColor:"indianred",fontWeight:"bolder",fontSize:"11px"}} className='badge'>0</span>
              </Link>
              </small>
              </div>
              <div style={{position:'relative'}}><small className='mt-2'>
              <Link to={`/profile/cart`}  style={{color:"black",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >
                 <span  className='fa fa-shopping-cart fa-2x text-muted'></span>
                <span style={{position:"absolute",right:"-20px",border:"2px solid white",top:"-3px",borderRadius:"30px",color:"white",backgroundColor:"indianred",fontWeight:"bolder",fontSize:"11px"}} className='badge'>{shoppingcart.length}</span>
                <span style={{position:"absolute",left:"-10px",bottom:"0px",borderRadius:"5px",color:"white",backgroundColor:"green",fontWeight:"bolder",fontSize:"11px"}} className='badge'>₦{sumtotalmain}</span>
              </Link>
              </small>
              </div>
             </div>
             : null}
                 {Cookies.get("tktplc") ?
                 <div className='navimage ' style={{display:"none",flexWrap:"nowrap"}}>
             <div className='userimage mt-2 mr-2' style={{backgroundColor:"grey",border:"1px solid grey",borderRadius:"45%"}}>
             <center><b onClick={()=>setdisplaylogout(!displaylogout)} style={{fontWeight:"bolder",color:"white",padding:"5px 0px",cursor:"pointer"}}>EO</b></center>
             </div>
             <div style={{position:'relative',marginTop:"10px"}}><small className='mt-2'>
              <Link to={`/history`}  style={{color:"black",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >
                <span  className='fa fa-bell-o fa-2x'></span>
                <span style={{position:"absolute",right:"-10px",top:"-3px",borderRadius:"30px",color:"white",backgroundColor:"indianred",fontWeight:"bolder",fontSize:"11px"}} className='badge'>0</span>
              </Link>
              </small>
              </div>
              <div style={{position:'relative',marginTop:"10px"}}><small className='mt-2'>
              <Link to={`/profile/cart`}  style={{color:"black",textDecoration:"none",fontWeight:"bolder",textTransform:"uppercase"}} className="linker" >
                 <span  className='fa fa-shopping-cart fa-2x'></span>
                <span style={{position:"absolute",right:"-20px",top:"-3px",borderRadius:"30px",color:"white",backgroundColor:"indianred",fontWeight:"bolder",fontSize:"11px"}} className='badge'>{shoppingcart.length}</span>
                <span style={{position:"absolute",left:"0px",bottom:"-3px",borderRadius:"5px",color:"white",backgroundColor:"green",fontWeight:"bolder",fontSize:"11px"}} className='badge'>₦{sumtotalmain}</span>
              </Link>
              </small>
              </div>
             </div>
             : null}
               
             {Cookies.get("tktplc") ?
             <div className='lgnavimage d-none'>
             <div className='userimage mt-2 mr-2' style={{width:"100%",backgroundColor:"grey",border:"1px solid grey",borderRadius:"45%"}}>
             <center><b onClick={()=>setdisplaylogout(!displaylogout)} style={{fontWeight:"bolder",color:"white",padding:"5px 0px",cursor:"pointer"}}>EO</b></center>
             </div>
             </div>
             : null}
                </div>
                <div className='smsearchinput mb-2 mt-2' style={{width:'100%',padding:"0px 5px 5px 5px"}}>
               <div style={{display:"flex",flexWrap:"nowrap"}}>
                <div style={{width:"10%",display:`${displaysuggest ? "block": "none"}`}}>
                  <span onClick={()=>setdisplaysuggest(false)} style={{color:"lightgrey",padding:"5px"}} className='fa fa-arrow-circle-o-left fa-2x'></span>
                </div>
                <div style={{width:`${displaysuggest ? "90%" : "100%"}`}}>
                <form method="get" onSubmit={submitsearch}>
                   <input className='form-control' name="searchinput" onFocus={()=> currentPage !== "products" ? setdisplaysuggest(true) : null} onBlur={setinputblur}  onChange={searchchange} style={{boxShadow:"none"}} placeholder='Search Products/Brand' type="text" />
                   </form>
                   </div>
                  
               </div>
           </div>
           <div style={{position:"absolute",border:"1px solid lightgrey",display:`${displaylogout ? "block" : "none"}`,padding:"8px 20px",top:"100%",zIndex:"99999999999999999",backgroundColor:"white",color:'black',right:"10%"}}>
                      <button className='btn' style={{backgroundColor:"orange",padding:"0px 30px",width:"100%", color:"white",boxShadow:"0.5px 2px 1px 2px lightgrey"}}>
                      <small style={{fontWeight:"bolder"}}><span style={{fontSize:"15px"}} className='fa fa-user mr-3'></span> Profile</small>
                      </button>
                      <hr/>
                      <button className='btn' style={{backgroundColor:"orange",padding:"0px 30px",width:"100%", color:"white",boxShadow:"0.5px 2px 1px 2px lightgrey"}}>
                      <small style={{fontWeight:"bolder"}}><span style={{fontSize:"15px"}} className='fa fa-sign-in mr-3'></span> sign up</small>
                      </button>
                      <hr/>
                      <div className="linker" style={{color:"grey",fontWeight:"bolder",borderBottom:"0.5px solid lightgrey", width:"100%",fontSize:'13px'}} onClick={logout}> <span style={{fontSize:'15px',padding:"0px 3px",backgroundColor:'orange', border:"1px solid orange",borderRadius:"50%",color:"white"}} className='fa fa-heart mr-3'></span>Saved</div>
                      <div className="linker" style={{color:"grey",fontWeight:"bolder",borderBottom:"0.5px solid lightgrey", width:"100%",fontSize:'13px'}} onClick={logout}> <span style={{fontSize:'18px',padding:"0px 3px",backgroundColor:'orange', border:"1px solid orange",borderRadius:"50%",color:"white"}} className='fa fa-question mr-3'></span>FaQ</div>
                       <div className="linker" style={{color:"grey",fontWeight:"bolder",borderBottom:"0.5px solid lightgrey", width:"100%",fontSize:'13px'}} onClick={logout}> <span style={{fontSize:'14px',padding:"3px 2px",backgroundColor:'orange',color:"white", border:"1px solid orange",borderRadius:"50%"}} className='fa fa-sign-out mr-3'></span>Log Out</div>
                   </div>
        </div>
     );
}

export default Navbar;
/**
 *  <div style={{width:"15%",position:"relative"}}>
                  <center> <span style={{position:"absolute",top:"20%",fontSize:"25px",color:"grey"}} className='fa fa-cog'></span></center>
                 </div>
                 <div style={{width:"15%",position:"relative"}}>
                  <center> <span style={{fontSize:"25px",position:"absolute",top:"20%",color:"grey"}} className='fa fa-heart-o'></span>
                  </center>
                  <small className='ml-1'>{userdetails.nosaved}</small>
                 </div>
                 <div style={{width:"15%",position:"relative"}}>
                  <center> <span style={{fontSize:"25px",position:"absolute",top:"20%",color:"grey"}} className='fa fa-bell-o'></span></center>
                 </div>
 */