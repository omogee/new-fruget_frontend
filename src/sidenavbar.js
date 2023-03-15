import React, { useState, useEffect, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { userContext } from './usercontext';
import Cookies from 'js-cookie';
import Login from './login';

function SideNavbar(props) {
    const [displaycategories, setDisplaycategories] = useState(false)
    const [displaycatclass, setdisplaycatclass] = useState("fa-chevron-circle-down")
    const context = useContext(userContext)
    const [categories, setCategories] = context["categories"]
 const [userdetails,setuserdetails] = context["userdetail"]
 const [navwidth,setnavwidth] = context["sidenav"]
 const [category,setcategory] = context["category"]
 const [page, setpage]= context["page"]
 const [savedProducts, setsavedProducts] = context["savedproduct"]
 const [shoppingcart, setshoppingcart] = context["shoppingcart"]
 const [submittedcart, setsubmittedcart] = context["submittedcart"]
 const [productdetails, setproductdetails] = context["productdetail"]
 const [currentPage, setcurrentPage] = context["currentpage"]
 const [brandarrow, setbrandArrow] = useState("fa-arrow-down")
 const [colorarrow, setcolorArrow] = useState("fa-arrow-down")
 const [showbrand, setshowbrand] = useState(false)
 const [redirect, setredirect] = context["redirect"]
 const [loading, setloading] =context["loading"]
 const [showcolor, setshowcolor] = useState(false)
 const [displaylink, setdisplaylink]= context["displaylink"]
 const [displayicon, setdisplayicon] = context["displayicon"]
 const [displaynavbar, setdisplaynavbar] = context["displaynavbar"]
 const [mobiledevice, setmobiledevice] = context["mobiledevice"]
 const [shoppingcarttotal, setshoppingcarttotal] = context["shoppingcarttotal"]
 const [cartreciepts, setcartreciepts] = context["cartreciepts"]
 const [dispatchreciepts, setdispatchreciepts] = context["dispatchreciepts"]

 

 const query = new URLSearchParams(window.location.search);
 const navigate = useNavigate()

    const [uri, seturi] = useState("")
    const onfocusStyle={
        color:"orange",
        textDecoration:"none",
        padding:"3px",
        marginLeft:"3px",
        fontWeight:"bold",
        cursor:"pointer"
    }

 useEffect(()=>{
    seturi(window.location.pathname)
 },[window.location.pathname])

    const displaycat=()=>{   
        if(displaycategories === true){
            setdisplaycatclass("fa-chevron-circle-down")
            setDisplaycategories(false)
        }else{
            setdisplaycatclass("fa-chevron-circle-up")
            setDisplaycategories(true)
        }
    }
    const opencategory=(cat)=>{
        setcategory(prev => ({...prev, "category":cat}))
        query.set("cat", cat)
        setpage(1)
        query.set("page",1)
        setdisplaylink(false)
        setdisplayicon(false)
     navigate(window.location.pathname + "?" + query.toString())
    }
    const openbrand=(brand)=>{
        setpage(1)
        query.delete("cat")
        query.set("page",1)
        setdisplaylink(false)
        setdisplayicon(false)
        setcategory(prev => ({...prev, "brand":brand,"category":null}))
        query.set("brand", brand)
        navigate(window.location.pathname + "?" + query.toString())
       }
       const ChangeBrandArrow =(e)=>{
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
           setbrandArrow("fa-arrow-up")
         }else(
            setbrandArrow("fa-arrow-down")
         )
       
       }
       const ChangeColorArrow =(e)=>{
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
           setcolorArrow("fa-arrow-up")
         }else(
            setcolorArrow("fa-arrow-down")
         )
       
       }
       const scrollBrandDown=()=>{
        const element = document.querySelector(".branddiv")
        element.scrollTo(1,1)
       }
       const scrollColorDown=()=>{
        const element = document.querySelector(".colordiv")
        element.scrollTo(1,1)
       }
 const openproducts=()=>{
    const element = document.querySelector(".openproductbtn")
    
   setdisplaycatclass("fa-chevron-up")
   setDisplaycategories(true)
    setdisplaylink(true)
    setshowbrand(true)
    setshowcolor(true)
   setpage(1)
   if(query.get("page")){
    query.delete("page")
   }
   element.scrollTo(0,0)
   navigate("/shop")
 }
 const undisplaylink =()=>{
    setdisplaylink(false)
    if(mobiledevice){
        setdisplaynavbar(false)
    }
}
const openlink=(val)=>{
    setloading(true)
    setdisplaynavbar(false)
    setdisplayicon(false)
    setdisplaylink(false)
    if(Cookies.get("tktplc")){
        navigate(`${val}`)
       }else{
            setredirect(true)
 navigate(`${val}`)

       }
}
       return ( 
        <div style={{overflow:"scroll",padding:"3px 20px", color:"grey"}}>
          <div  style={{height:"100%",overflow:"scroll", position:'absolute',zIndex:"999999999958457484",height:"100%", width:'100%',top:"0px", right:"-11px"}}> 
          <span className='fa fa-ellipsis-v d-none' style={{color:'white',cursor:"pointer",fontSize:'30px'}}></span>    
          {displaylink ?
          <span onClick={undisplaylink} style={{color:'white',fontWeight:"lighter",cursor:"pointer",fontSize:'30px',right:"15%",position:"absolute",top:"3%"}}>
            <span className='fa fa-times'></span>
          </span>
        : null}
        <div style={{display:`${displayicon ? "block" : "none"}`}}>
           <p style={{margin:"20px 3px",fontSize:"15px"}}>
                <span className='fa fa-home mr-2'></span>
                {displaylink ?  <span style={{fontSize:"12px",textTransform:"capitalize",fontWeight:"bold"}}>Home</span> 
                : null}
            </p>
            <p style={{margin:"20px 3px",fontSize:"15px"}}>
                <span style={{padding:"1px", border:"2px solid grey",borderRadius:"50%"}} className='fa fa-home mr-2'></span>
                {displaylink ?  <span style={{fontSize:"12px",textTransform:"capitalize",fontWeight:"bold"}}>reg. stores</span> 
                : null}
            </p>
            <p style={{margin:"20px 3px",fontSize:"15px"}}>
                <span style={{padding:"1px 0px", border:"2px solid grey",borderRadius:"50%"}} className='fa fa-bicycle mr-2'></span>
                {displaylink ?  <span style={{fontSize:"12px",textTransform:"capitalize",fontWeight:"bold"}}>reg. dispatch</span> 
                : null}
            </p>
           <p style={{margin:"20px 3px",fontSize:"15px"}}>
                <span className='fa fa-user mr-2 '></span>
                {displaylink ?  <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>Dashboard</span> : null}
                 </p>
           <p onClick={()=>openlink("/profile/saved_items")}  style={{cursor:"pointer",fontSize:"15px",margin:"20px 3px",position:"relative"}}>
                <span className='fa fa-heart mr-2 '></span>
                {displaylink ?  <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>
                    Saved 
                    </span> 
        : null}
       {savedProducts && savedProducts.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${savedProducts && JSON.stringify(savedProducts.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{savedProducts.length}</small>
             </small>
        : null}
                </p>    
            <p  onClick={()=>openlink("/cart")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-shopping-cart mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    Cart
                    </span> : null}
                    {shoppingcart && shoppingcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{shoppingcart.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/cart")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-shopping-cart mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    Cart
                    </span> : null}
                    {shoppingcart && shoppingcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{shoppingcart.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/cart")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-shopping-cart mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    Cart
                    </span> : null}
                    {shoppingcart && shoppingcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{shoppingcart.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/cart")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-shopping-cart mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    Cart
                    </span> : null}
                    {shoppingcart && shoppingcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{shoppingcart.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/cart")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-shopping-cart mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    Cart
                    </span> : null}
                    {shoppingcart && shoppingcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{shoppingcart.length}</small>
             </small>
        : null}
                    </p>
            <p  onClick={()=>openlink("/submitted_cart")} style={{cursor:"pointer",fontSize:"15px",margin:"20px 3px",position:"relative"}}>
                    <span className='fa fa-star mr-2' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    track order
                    </span> : null}
                    {submittedcart && submittedcart.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${submittedcart && JSON.stringify(submittedcart.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{submittedcart.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/profile/cart_reciepts")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span style={{border:"3px solid orange", padding:'2px',fontSize:"12px", fontWeight:"bolder", borderRadius:'50%'}} className='fa fa-star-o mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    cart orders
                    </span> : null}
                    {cartreciepts && cartreciepts.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${cartreciepts && JSON.stringify(cartreciepts.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{cartreciepts.length}</small>
             </small>
        : null}
                    </p>
                    <p  onClick={()=>openlink("/profile/dispatch_reciepts")} style={{cursor:"pointer",fontSize:"16px",margin:"20px 3px",position:"relative"}}>
                    <span style={{border:"3px solid orange", padding:'2px',fontSize:"12px", fontWeight:"bolder", borderRadius:'50%'}} className='fa fa-bicycle mr-2 ' ></span>
                    {displaylink ?  <span style={{fontWeight:"bolder",fontSize:"12px",textTransform:"uppercase"}}>
                    dispatch orders
                    </span> : null}
                    {dispatchreciepts && dispatchreciepts.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${dispatchreciepts && JSON.stringify(dispatchreciepts.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'black'}}>
             <small style={{padding:"0",margin:"0"}}>{dispatchreciepts.length}</small>
             </small>
        : null}
                    </p>
            <p  onClick={()=>openlink("/history")} style={{cursor:"pointer",fontSize:"15px",margin:"20px 3px"}}>
                    <span className='fa fa-history mr-2 '></span>
                    {displaylink ?  <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>History</span> : null}
                     </p>
                     <p onClick={()=>openlink("/login")} style={{margin:"10px",fontSize:"15px",color:"grey"}}>
                <span className='fa fa-sign-in mr-2'></span>
                {displaylink ? <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>Login</span> : null}
                </p>
                <p onClick={()=>openlink("/register")} style={{margin:"10px",color:"grey",fontSize:"15px"}}>
                <span className='fa fa-pencil-square mr-2'>
                    </span>  {displaylink ? <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>Register</span> : null}
                    </p>
                    <p onClick={()=>openlink("?chat-us=true")}  style={{margin:"10px",color:"grey",fontSize:"15px"}}>
                <span className='fa fa-comment mr-2'>
                    </span>  {displaylink ? <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>Chat us</span> : null}
                    </p>
                    <p onClick={()=>openlink("/about-us")} style={{margin:"10px",fontSize:"20px",color:"white"}}>
                <span className='fa fa-info-circle mr-2'></span>
                {displaylink ? <span style={{fontSize:"14px", textTransform:"uppercase",fontWeight:"bolder"}}>About us</span> : null}
                </p>
                <p onClick={()=>openlink("/faq")} style={{margin:"10px",color:"white",fontSize:"15px"}}>
                <span className='fa fa-question-circle mr-2'>
                    </span>  {displaylink ? <span style={{fontSize:"12px", textTransform:"uppercase",fontWeight:"bolder"}}>Faq</span> : null}
                    </p><br/>
                    </div>
        </div>
        </div>
     );
}

export default SideNavbar;