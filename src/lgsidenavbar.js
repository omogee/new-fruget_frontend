import React, { useState, useEffect, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { userContext } from './usercontext';
import Cookies from 'js-cookie';
import Login from './login';
import Testrandom from './testrandom';

function LgSideNavbar(props) {
    const [displaycategories, setDisplaycategories] = useState(false)
    const [displaycatclass, setdisplaycatclass] = useState("fa-chevron-down")
    const context = useContext(userContext)
    const [categories, setCategories] = context["categories"]
 const [userdetails,setuserdetails] = context["userdetail"]
 const [navwidth,setnavwidth] = context["sidenav"]
 const [category,setcategory] = context["category"]
 const [page, setpage]= context["page"]
 const [cartreciepts, setcartreciepts] = context["cartreciepts"]
 const [savedProducts, setsavedProducts] = context["savedproduct"]
 const [shoppingcart, setshoppingcart] = context["shoppingcart"]
 const [submittedcart, setsubmittedcart] = context["submittedcart"]
 const [productdetails, setproductdetails] = context["productdetail"]
 const [currentPage, setcurrentPage] = context["currentpage"]
 const [brandarrow, setbrandArrow] = useState("fa-arrow-down")
 const [colorarrow, setcolorArrow] = useState("fa-arrow-down")
 const [showbrand, setshowbrand] = useState(false)
 const [redirect, setredirect] = context["redirect"]
 const [showcolor, setshowcolor] = useState(false)
 const [displayreglinks, setdisplayreglinks] = useState(false)
 const [displaylink, setdisplaylink]= context["displaylink"]
 const [displayicon, setdisplayicon] = context["displayicon"]
 const [displaynavbar, setdisplaynavbar] = context["displaynavbar"]
 const [mobiledevice, setmobiledevice] = context["mobiledevice"]
 const [dispatchreciepts, setdispatchreciepts] = context["dispatchreciepts"]


 const [shoppingcarttotal, setshoppingcarttotal] = context["shoppingcarttotal"]
 const [spd, setspd] = context["spd"]

 

 const query = new URLSearchParams(window.location.search);
 const navigate = useNavigate()

    const [uri, seturi] = useState("")
    const onfocusStyle={
        textDecoration:"none",
        color:"black"
    }

 useEffect(()=>{
    seturi(window.location.pathname)
 },[window.location.pathname])

    const displaycat=()=>{   
        if(displaycategories === true){
            setdisplaycatclass("fa-chevron-down")
            setDisplaycategories(false)
        }else{
            setdisplaycatclass("fa-chevron-up")
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
       const openmodal=(data)=>{
        setspd(data)
         query.set("spd", data)
         query.set("pdx", Cookies.get("tktplc"))
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
   navigate("shop")
 }
 const undisplaylink =()=>{
    setdisplaylink(false)
    if(mobiledevice){
        setdisplaynavbar(false)
    }
}
const openlink=(val)=>{
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
const openregister =(data)=>{
    navigate(`/profile/${data}`)
}

       return ( 
        <div className='lg_sidenavbar' style={{overflow:"auto",margin:"0"}}>
          <div style={{overflow:"hidden",paddingTop:"0",marginTop:'0',width:'100%'}}>
        <div style={{overflow:"scroll",position:'absolute',padding:"2px 20px",margin:"0",top:"0",height:"88vh",right:"-5%",width:"100%"}}>
          <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "home" ?'lightgrey':""}`}}>
           <p className='lg_sidenavbar_p'>
             <Link to="/" style={currentPage === "home" ? onfocusStyle : {textDecoration:"none",color:"black"}}>
                <span className='col-12 d-md-none fa fa-home mr-2'></span>
                 <span className="lg_sidenavbar_links">Home</span>
            </Link>
            </p>
            </div> 
            <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "dashboard" ?'lightgrey':""}`}}>
           <p className='lg_sidenavbar_p'>
            <Link to="/profile/my_profile" style={currentPage === "dashboard" ? onfocusStyle : {textDecoration:"none",color:"black"}}>
                <span className='d-md-none fa fa-user mr-2 '></span>
                 <span className='lg_sidenavbar_links'>My Profile</span> 
                 </Link>
                 </p>
                 </div>
                 <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "hiredispatch" ?'lightgrey':""}`}}>
                 <p className='lg_sidenavbar_p'>
                 <Link to="/profile/hire_dispatch" style={currentPage === "dashboard" ? onfocusStyle : {textDecoration:"none",color:"black"}}>
                <span className='d-md-none fa fa-motorcycle mr-2'></span>
                 <span className='lg_sidenavbar_links'>hire dispatch</span> 
                 </Link>
                 </p>
                 </div>
                 <div style={{backgroundColor:"",color:"black"}}>
                 <p >
               <div onClick={()=> setdisplayreglinks(prev => !prev)} style={{cursor:"pointer",display:"none",padding:'10px 0px'}}>
               <span className={displayreglinks ? 'fa fa-chevron-circle-up mr-2' : 'fa fa-chevron-circle-down mr-2'}></span>
                 <span className="lg_links" style={{fontSize:"12px",textTransform:"uppercase",fontWeight:"bold"}}>join our team</span>
                
               </div>
                 <div style={{transform:`${displayreglinks ? "translate(0, 0)": "translate(0%,50%)"}`,display:"none",opacity:`${displayreglinks ? "1" : "0"}`,marginBottom:`${displayreglinks ? "0" : "-100px"}`,transition:"all 1s linear",backgroundColor:"white",color:"grey",padding:"5px",zIndex:`${displayreglinks ? "5000" : "-97787987"}`}}>
                <small className='linker' onClick={()=>openregister("join dispatch")} style={{fontSize:"11px",textTransform:"uppercase",fontWeight:"bold",color:`${currentPage === "join dispatch" ? "orange" :"grey"}`}}>dispatch Team <span className='fa fa-users'></span></small><br/>
                 <small  className='linker' onClick={()=>openregister("join content creator")} style={{fontSize:"11px",textTransform:"uppercase",fontWeight:"bold",color:`${currentPage === "join content creator" ? "orange" :"grey"}`}}>content creator <span className='fa fa-file'></span></small><br/>
                 <small className='linker' onClick={()=>openregister("join store")} style={{fontSize:"11px",textTransform:"uppercase",fontWeight:"bold",color:`${currentPage === "join store" ? "orange" :"grey"}`}}>store/seller</small> <span className='fa fa-store'></span><br/>
                </div>
                 </p>
                 </div>
             
                 <div style={{backgroundColor:`${currentPage === "savedproducts" ?'lightgrey':""}`,borderRadius:"7px"}}>
           <p onClick={()=>openlink("/profile/saved_items")}  style={{cursor:"pointer",padding:'5px 10px',color:'black',fontSize:"20px",margin:"0",position:"relative"}}>
                <span className='d-md-none fa fa-heart mr-2 '></span>
                 <span className="lg_links" style={{fontSize:"12px",textTransform:"uppercase",fontWeight:"bold",marginLeft:"10px"}}>
                    Saved 
                    </span> 
                    {savedProducts && savedProducts.length > 0 ?
             <small style={{backgroundColor:"lightgrey",float:"right",marginRight:"15px",fontWeight:"bolder",borderRadius:"50%",padding:`${savedProducts && JSON.stringify(savedProducts.length).length > 1 ? "0px 4px" : "0px 7px"}`,color:'grey'}}>
             <small style={{padding:"0",margin:"0"}}>{savedProducts.length}</small>
             </small>
        : null}
                </p>
       </div>
                <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "products" ?'lightgrey':""}`}}>
           <p onClick={openproducts} className='lg_sidenavbar_p'>
            <span  className="openproductbtn" style={currentPage === "products" ? onfocusStyle : {textDecoration:"none",color:"black",cursor:"pointer"}}>
            <span  className='d-md-none fa fa-list mr-2 ' ></span> 
              <span className='lg_sidenavbar_links'>Products
              </span>
                </span>         
               </p>
               </div>
               <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "shoppingcart" ?'lightgrey':""}`,zIndex:"768338"}}>
            <p  onClick={()=>openlink("/profile/cart")} className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-shopping-cart mr-2 ' ></span>
                    <span className='lg_sidenavbar_links'>
                    Cart
                    </span>
                    {shoppingcart.length && shoppingcart.length > 0 ?
             <small className='lg_sidenavbar_icons' style={{padding:`${shoppingcart && JSON.stringify(shoppingcart.length).length > 1 ? "0px 4px" : "0px 7px"}`}}>
             <small>{shoppingcart.length}</small>
             </small>
            : null}
            </p>
            </div>
            <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "order" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/submitted_cart")} className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-star mr-2' ></span>
             <span className='lg_sidenavbar_links'>
                    my orders
                    </span>
                    {submittedcart.length && submittedcart.length > 0 ?
             <small  className='lg_sidenavbar_icons' style={{padding:`${submittedcart && JSON.stringify(submittedcart.length).length > 1 ? "0px 3px" : "0px 7px"}`}}>
             <small>{submittedcart.length}</small>
             </small>
            : null}
                    </p>
            </div>
            <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "my dispath" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/my_profile/dispatch")} className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-star mr-2' ></span>
             <span className='lg_sidenavbar_links'>
                    my dispatch
                    </span>
                    </p>
            </div>
            
            <div  className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "dispatchreceipts" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/dispatch_reciepts")} className="lg_sidenavbar_p">
                    <span className='d-md-none fa fa-shopping-cart mr-2 ' ></span>
                    <span className='lg_sidenavbar_links' style={{fontWeight:"bolder", fontSize:"11px"}}>
                    dispatch orders
                    </span>
                    {dispatchreciepts.length && dispatchreciepts.length > 0 ?
             <small className='lg_sidenavbar_icons' style={{padding:`${dispatchreciepts && JSON.stringify(dispatchreciepts.length).length > 1 ? "0px 3px" : "0px 7px"}`}}>
             <small>{dispatchreciepts.length}</small>
             </small>
            : null}
            </p>
            </div>
            <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "order" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/submitted_cart")} className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-star mr-2' ></span>
             <span className='lg_sidenavbar_links'>
                    hires
                    </span>
                    {submittedcart.length && submittedcart.length > 0 ?
             <small  className='lg_sidenavbar_icons' style={{padding:`${submittedcart && JSON.stringify(submittedcart.length).length > 1 ? "0px 3px" : "0px 7px"}`}}>
             <small>{submittedcart.length}</small>
             </small>
            : null}
                    </p>
            </div>
            <div className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "my stores" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/my_profile/stores")} className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-star mr-2' ></span>
             <span className='lg_sidenavbar_links'>
                    my stores
                    </span>
                    </p>
            </div>
            <div  className='lg_sidenavbar_div' style={{backgroundColor:`${currentPage === "cartreciepts" ?'lightgrey':""}`}}>
            <p  onClick={()=>openlink("/profile/cart_reciepts")}  className='lg_sidenavbar_p'>
                    <span className='d-md-none fa fa-star mr-2' ></span>
             <span  className='lg_sidenavbar_links'>
                    store orders
                    </span>
                    {cartreciepts.length && cartreciepts.length > 0 ?
             <small  className='lg_sidenavbar_icons' style={{padding:`${cartreciepts && JSON.stringify(cartreciepts.length).length > 1 ? "0px 3px" : "0px 7px"}`}}>
             <small>{cartreciepts.length}</small>
             </small>
            : null}
                    </p>
            </div>
            <div className='lg_sidenavbar_div'>
            <p  onClick={()=>openlink("/history")} className="lg_sidenavbar_p">
                    <span className='d-md-none fa fa-history mr-2 '></span>
                 <span className='lg_sidenavbar_links'>History</span>
                     </p>
                     </div>
                     <div className='lg_sidenavbar_div'>
                     <p className="lg_sidenavbar_p">
            <a href="/login" style={{textDecoration:"none",color:"black"}}>
                <span className='d-md-none fa fa-sign-in mr-2'></span>
  <span className='lg_sidenavbar_links'>Login</span></a>
                </p>
                </div>
                <div className='lg_sidenavbar_div'>
                <p className='lg_sidenavbar_p'>
            <a href="/register" style={{textDecoration:"none",color:"black"}}>
                <span className='d-md-none fa fa-pencil-square mr-2'>
                    </span> <span className='lg_sidenavbar_links'>Register</span></a>
                    </p>
                    </div>
                    <div >
          <p onClick={()=>openmodal("about_us")} style={{margin:"3px",color:"black",width:"100%",cursor:"pointer",fontSize:"14px"}}>
                <span className='fa fa-info-circle mr-2'>
                    </span> <span className="lg_links" style={{fontSize:"12px",textTransform:"uppercase",fontWeight:"bold"}}>about us</span>
                    </p>
                    </div>
                    <div>        
           <p onClick={()=>openmodal("chat_us")} style={{margin:"3px",color:"black",cursor:"pointer",fontSize:"14px"}}>
       <span className='fa fa-comment mr-2'>
           </span> <span className="lg_links" style={{fontSize:"12px",textTransform:"capitalize",fontWeight:"bold"}}>chat us</span>
           </p>
           </div>
           <div>
           <p  onClick={()=>openmodal("faq")} style={{margin:"3px",color:"black",cursor:"pointer",fontSize:"14px"}}>
                <span className='fa fa-question-circle mr-2'>
                    </span> <span className="lg_links" style={{fontSize:"12px",textTransform:"capitalize",fontWeight:"bold"}}>faq</span>
                    </p>
           </div>
          </div>
          </div>
        </div>
     );
}

export default LgSideNavbar;
/**
 *   <div style={{width:"100%",display:`${displaycategories && displaylink ? "block" : "none"}`}}>
            { categories.map(cat =>
                    <div key={cat.category} style={{backgroundColor:'grey',cursor:"pointer"}} onClick={()=>opencategory(cat.category)} className="mb-1">
                      <small className='ml-2' style={{textTransform:"uppercase",fontSize:"12px",fontWeight:'bold',color:"white"}}>{cat.category}</small>
                    </div>
                    )
             }
            </div>
            
            {displaylink && displaycategories ?  
            <div onScroll={ChangeBrandArrow} className="branddiv" style={{height:`${showbrand ? "200px" : ""}`,backgroundColor:"rgba(68,68,68)",position:"relative",marginTop:"20px",width:"100%",overflowX:"scroll"}}>
            <div onClick={()=> setshowbrand(prev => !prev)} style={{color:"black",cursor:"pointer",backgroundColor:'lightgrey',borderBottom:"1px solid lightgrey",position:"sticky",top:"0px",padding:"3px",width:"100%"}}>
           <center> 
            <small style={{padding:"0",margin:"0",fontWeight:"bold"}}>Popular Brands <span className='fa fa-arrow-down'></span>
            <span style={{float:"right",marginRight:"15px"}}>{productdetails.brand && productdetails.brand.length}</span>
            </small></center>
            </div>
            {showbrand && displaylink && displaycategories ? 
                <div>
                      <div style={{position:"sticky", left:"20%",float:"right",marginRight:"20px",top:"50%"}} onClick={scrollBrandDown}>
              <span className={`fa-2x fa ${brandarrow}`}  style={{color:'lightgrey',zIndex:"9000000"}}></span>
            </div>
            {productdetails.brand && productdetails.brand.map(brand =>
                <div key={brand.brand}>
                    <small onClick={()=>openbrand(brand.brand)} style={{color:"white",margin:"0px 0px 0px 20px",fontWeight:"bold",cursor:"pointer",width:"50%",textTransform:"uppercase",marginLeft:"5px",padding:"0"}}>
                        {brand.brand}
                        <span style={{marginLeft:"5px"}}>({brand.brandy})</span>
                    </small>
                </div>
                )}
                </div>
                : null}
                 </div>
            : null}
           
           
            {displaycategories ? 
            <div onScroll={ChangeColorArrow} className="colordiv" style={{backgroundColor:"rgba(68,68,68)",marginTop:"20px",height:`${productdetails.color && productdetails.color.length > 8 && showcolor ? "200px" : ""}`,position:'relative',width:"100%",overflow:"scroll"}}>
            <div onClick={()=> setshowcolor(prev => !prev)} style={{cursor:"pointer",color:"black",backgroundColor:"lightgrey",borderBottom:"1px solid lightgrey",position:"sticky",top:"0px",padding:"3px",width:"100%"}}>
           <center>
             <small style={{padding:"0",margin:"0",fontWeight:"bold"}}>Colors <span className='fa fa-arrow-down'></span>
             <span style={{float:"right",marginRight:"15px"}}>{productdetails.colors && productdetails.colors.length}</span>
             </small></center>
            </div>
            {showcolor && displaycategories ?   
          <div>
          <div style={{position:"sticky", left:"20%",float:"right",marginRight:"20px",top:"50%"}} onClick={scrollColorDown}>
              <span className={`fa-2x fa ${colorarrow}`}  style={{color:'lightgrey',zIndex:"9000000"}}></span>
            </div>
            {productdetails.colors && showcolor && productdetails.colors.map(color =>
                <div key={color.color}>
                    <small onClick={()=>openbrand(color.color)} style={{color:"white",fontWeight:"bold",margin:"0px 0px 0px 20px",cursor:"pointer",width:"50%",textTransform:"uppercase",marginLeft:"5px",padding:"0"}}>
                        {color.color}
                        <span style={{marginLeft:"5px"}}>({color.colory})</span>
                    </small><br/>
                </div>
                )}
          </div>
          : null}
            </div>
            : null}
 */