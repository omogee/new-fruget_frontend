import React, { useState, useEffect, createContext ,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation,Link} from "react-router-dom"
import Home from './home';
import Login from './login';
import Register from './register';
import LgSideNavbar from './lgsidenavbar';
import Navbar from './navbar';
import Profile from './profile';
import SideNavbar from './sidenavbar';
import SavedItems from './saved_items';
import Product from './product';
import Details from './details';
import axios from 'axios';
import Cookies from 'js-cookie';
import { userContext } from './usercontext';
import Shoppingcart from './shoppingcart';
import SubmittedCart from './submittedcart';
import History from './history';
import socket from './socketconn';
import Landing from './landingpage';
import Movieform from './movieform';
import Geocode from "react-geocode"
import Trending from './trending';
import Suggestion from './suggestion';
import Chatus from './chat';
import Faq from './faq';
import About from './about';
import Modal from "./modal"
import { getDistanceFromLatLonInKm } from './mapdistance';
import Connection from './connection';
import ChatApp from './chatapp';
import ClientProfile from './clientprofile';
import RegisterDispatchers from './registerdispathers';
import RegisterStore from './registerstore';
import Notfound from './notfound';
import Testrandom from './testrandom';
import HireDispatch from './hiredispatch';
import StoreProduct from './storeproducts';
import Receipts from './receipts';
import DispatchReceipts from './dispatchreceipts';
import AdminChat from './adminchat';
import ProductUpload from './productupload';
import InvoiceCart from './invoice';
import EditStore from './editstore';
import Editdispatch from './editdispatch';
import EditProduct from './edit_product';
import Stores from './stores';
import Dispatch from './dispatch';
import Footer from './footer';

//store
function App() {
  const [navwidth, setnavwidth] = useState("20%")
  const [displaylink, setdisplaylink] = useState(false)
  const [displayicon, setdisplayicon] = useState(false)
  const [userdetails, setuserdetails] = useState({})
  const [ savedProducts, setsavedProducts] = useState([])
  const [shoppingcart, setshoppingcart] = useState([])
  const [submittedcart, setsubmittedcart] = useState([])
  const [cartreciepts, setcartreciepts] = useState([])
  const [dispatchreciepts, setdispatchreciepts] = useState([])
  const [products, setproducts] = useState([])
  const [storeproducts, setstoreproducts] = useState([])
  const [productdetails, setproductdetails] = useState({})
  const [searchcat, setsearchcat] = useState([])
  const [searchsubcat, setsearchsubcat] = useState([])
  const [page, setpage] = useState(1)
  const [ displaysidenav, setdisplaysidenav] = useState(true)
  const [category, setcategory] = useState({})
  const [redirect, setredirect] = useState(false)
  const [searchinput, setsearchinput] = useState("")
  const [loading, setloading] = useState(false)
  const [shoppingcarttotal, setshoppingcarttotal]= useState(0)
  const [modaldisplay, setmodaldisplay] = useState("none")
  const [alertmessage, setalertmessage] = useState("")
  const [requeststatus, setrequeststatus] = useState("")
  const [targetmodal, settargetmodal] = useState("")
  const [currentPage, setcurrentPage] = useState("")
  const [numprod, setnumprod] = useState(0)
  const [visitedproducts, setvisitedproducts] = useState([])
  const [completed_purchase, setcompleted_purchase] = useState([])
  const [view, setview] = useState("grid")
  const [sorter, setsorter] = useState("popularity")
const [selectedqueries, setselectedqueries] = useState({})
const [displaynavbar, setdisplaynavbar] = useState(true)
const [mobiledevice, setmobiledevice] = useState(false)
const [topbrands, settopbrands] = useState([])
const [categories, setCategories] = useState([])
const [displaycategories, setdisplaycategories] = useState(false)
const [subcat, setsubcat] = useState([])
const [ displaysuggest, setdisplaysuggest] = useState(false)
const [loaded, setloaded] = useState(false)
const [coord, setcoord] = useState({})
const [storelat, setstorelat] = useState({lat:"6.483161",lng:"3.3828107"})
const [reg_coord, setreg_coord] = useState({})
const [producttrends, setproducttrends] = useState([])
const [showChat, setshowChat] = useState(false)
const [messages, setmessages]= useState([])
const [spd, setspd] = useState('')
const [sumtotalmain, setsumtotalmain] = useState(0)
const [onlineclients, setonlineclients] = useState([])
const [displayrecently, setdisplayrecently] = useState(true)
const [typingclients, settypingclients] = useState([])
const [lastseen, setlastseen] = useState({})
const [stores, setstores]=useState([])
const [availabledispatchers, setavailabledispatchers] = useState([])
const [noOfUnreadMessages, setnoOfUnreadMessages] = useState([])
const [noOfUnreadChat, setnoOfUnreadChat] = useState([])
const [registeredstores, setregisteredstores] = useState([])
const [registereddispatch, setregistereddispatch] = useState([])
const [dispatchhires, setdispatchhires] = useState([])
const [storesearchinput, setstoresearchinput] = useState("")
const [selectedimage, setselectedimage]=useState(false)
const [productDetails, setProductDetails] =useState({})
  const [allproductDetails, setAllProductDetails] = useState([])
  const [productcomments, setproductcomments] = useState([])
  const [productdetailshistory, setproductdetailshistory] = useState({})
  
Geocode.setApiKey("AIzaSyCqXwfK_tAkjq1Uib4BkfDpeAhylCEkfMY");
    Geocode.setLanguage("en")
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

  const query = new URLSearchParams(window.location.search);
  const didMount = useRef(false)
 
  useEffect(()=>{
    //recieving message
    socket.on("recievinghiredispatchrequest", data=>{
      setalertmessage(`Hi, ${data.dispatchtohire.dispatch_name} you have a dispatch request from [Client name], click to view `)
      setrequeststatus("success")
      settargetmodal("hire")
      setmodaldisplay("block")
    })
    socket.on("recieving message", data=>{
      if(currentPage !== "chat"){
      setalertmessage(`you have a new message from [client]. click to view `)
      setrequeststatus("success")
      settargetmodal("hire")
      setmodaldisplay("block")
      }
    })
  },[])
useEffect(()=>{
  axios.get(`http://localhost:5000/item/fetch_all_stores`)
  .then( res =>{
    if(res.data.status === "success"){
      setstores(res.data.stores)
    }else{
      alert("sorry,an error occured... please trey again after few minutes")
    }
  })
  .catch(err => console.warn(err))
},[])

  useEffect(()=>{
   if (Cookies.get("tktplc")){
    const tkt = Cookies.get("tktplc");
    const indexermain = parseInt(tkt.split("bkop")[1])
    socket.emit("adduser", indexermain) 
    socket.on("typers", typers=>{
      settypingclients(typers)
    })
    socket.on("onlineclients", data=>{
      setonlineclients(data)
    })
    socket.on("lastseen", data=>{
      let d = new Date()
      let userId = data.userId
       setlastseen(prev => ({...prev,[`${data.userId}`]:d.getTime()}))
    })
  }
  },[])
  useEffect(()=>{
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    setdisplaynavbar(false)
    setmobiledevice(true)
  }
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position=>{
        setcoord({lat:position.coords.latitude,lng:position.coords.longitude})
    },showError)
}

Geocode.fromAddress("no 30 owode street, iwaya yaba lagos state").then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
   setreg_coord({lat,lng})
  },
  (error) => {
    console.error(error);
  }
);
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
    console.log("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
    console.log("Location information is unavailable.")
      break;
    case error.TIMEOUT:
    console.log("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
    console.log("An unknown error occurred.")
      break;
  }
}
},[navigator,userdetails])

useEffect(()=>{
  if(query.get("view")){
    setview(query.get("view"))
  }
  if(query.get("page")){
    setpage(query.get("page"))
  }
    if(query.get("sby")){
      setsorter(query.get("sby"))
    }
    const overalldiv = document.querySelector(".overalldiv")
    if(modaldisplay && !redirect && overalldiv){
      document.querySelector(".overalldiv").addEventListener("click", ()=>{
        setmodaldisplay(false)
        setdisplaynavbar(false)
        setdisplayicon(false)
        setdisplaylink(false)
        setselectedimage(false)
    })
    
     }
   
     if(displayicon && !redirect && overalldiv){
         document.querySelector(".overalldiv").addEventListener("click", ()=>{
             setdisplayicon(false)
         })
         document.querySelector(".overalldiv").addEventListener("click", ()=>{
             setmodaldisplay("none")
         })
     }
 })

 useEffect(()=>{
  axios.get(`http://localhost:5000/item/fetch_trends`)
  .then(res => {
    settopbrands(res.data.topbrands)
    setTimeout(()=> setloading(false), 500)
  })
  .catch(err => console.warn(err))
  
    axios.get(`http://localhost:5000/item/fetch_categories`)
    .then(res =>{
      setsubcat(res.data.subcat)
      setCategories(res.data.category)})
    .catch(err => console.log(err))

  if(Cookies.get("tktplc")){
    axios.get(`http://localhost:5000/fetch_unreadmessages?tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status){
       setnoOfUnreadChat(res.data.noOfUnreadChat)
       setnoOfUnreadMessages(res.data.noOfUnreadMessages)
      }
    })
    .catch(err => console.warn(err))
      axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
      .then(res =>{
        console.log("res.data.availabledispatchers",res.data.availabledispatchers)
          setavailabledispatchers(res.data.availabledispatchers)
      })
      .catch(err => console.warn(err))

 axios.get(`http://localhost:5000/item/fetch_visitedproducts?tkt=${Cookies.get("tktplc")}`)
 .then(res =>{
  if(res.data.status === "success"){
   setvisitedproducts(res.data.visitedproducts) 
  }
 })
 .catch(err => console.warn(err))

 axios.get(`http://localhost:5000/client/fetch_verified_sales?tkt=${Cookies.get("tktplc")}`)
 .then(res =>{
  if(res.data.status === "success"){
    setcompleted_purchase(res.data.completed_purchase) 
   
   }
 })
 .catch(err => console.warn(err))
}
 },[])
  
  const urlpathname = window.location.pathname
 useEffect(()=>{
  if(urlpathname.includes("login") || window.location.pathname === "/"  || urlpathname.includes("register")){
  setdisplaysidenav(false)
  setnavwidth("0%")
 }},[urlpathname])
 useEffect(()=>{
   if(searchinput && searchinput.length > 0 || query.get("search")){
    setdisplaycategories(true)
    setloading(true)
    axios.get(`http://localhost:5000/item/search?page=${page || 1}&sorter=${query.get("sby")}&searchinput=${searchinput || query.get("search")}&setting=${query.get("search") ? true : false}`)
    .then(res => {
      setproducts(res.data.products)
      if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
       setnumprod(res.data.numprod[0].numprod/20)
       }
     setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors}))
      setsearchcat(res.data.searchcat)
      setsearchsubcat(res.data.searchsubcat)
     setloading(false)
     setloaded(true)
    })
    .catch(err => console.warn(err))
  }},[searchinput,sorter,page])
  useEffect(()=>{
    if(currentPage === "storeproducts" && storesearchinput.length === 0){
      setcurrentPage("storeproducts")
      setloading(true)
    axios.get(`http://localhost:5000/item/search/fetch_storeproducts?&storesearchinput=${storesearchinput}&store=${escape(category.store || query.get("store")) || "null"}&brand=${category.brand || query.get("brand")}&page=${page}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      setTimeout(()=> setloading(false), 700)
        setstoreproducts(res.data.products)
        if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
        setnumprod(res.data.numprod[0].numprod/20)
        }
      setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors}))
      setloaded(true)
    })
  }
  },[storesearchinput, query.get("store")])
  useEffect(()=>{
    const getpos = new Promise((resolve, reject)=>{
    if(navigator.geolocation){       
      navigator.geolocation.getCurrentPosition(position=>{
          resolve({lat:position.coords.latitude,lng:position.coords.longitude})
      },showError)
  }
  function showError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.")
          break;
        case error.TIMEOUT:
        console.log("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.")
          break;
      }
    }
  })
   getpos.then(coord=>{
    if(currentPage === "products" && searchinput.length === 0 && !query.get("search")){
      setproducts([])
      setloading(true)
      axios.get(`http://localhost:5000/item?page=${page}&coord=${JSON.stringify(coord)}&tkt=${Cookies.get("tktplc") || null}&brand=${category.brand || query.get("brand")}&sorter=${sorter}&category=${category.category || query.get("cat")}`)
      .then(res => {
        setTimeout(()=> setloading(false), 700)
          setproducts(res.data.products)
          if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
          setnumprod(res.data.numprod[0].numprod/20)
          }
        setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors,"allstores":res.data.allstores}))
        setloaded(true)
      })
      .catch(err => console.warn(err))
    }else if(currentPage === "storeproducts" && storesearchinput.length === 0 && searchinput.length === 0 && !query.get("search")){
        setcurrentPage("storeproducts")
        setloading(true)
        //store=${escape(props.store)}
      axios.get(`http://localhost:5000/item/fetch_storeproducts?store=${(category.store || query.get("store")) || "null"}&coord=${JSON.stringify(coord)}&brand=${category.brand || query.get("brand")}&page=${page}&tkt=${Cookies.get("tktplc")}`)
      .then(res => {
        setTimeout(()=> setloading(false), 700)
          setstoreproducts(res.data.products)
          if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
          setnumprod(res.data.numprod[0].numprod/20)
          }
        setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors}))
        setloaded(true)
      })
    }

   })
    didMount.current = true
  },[page,query.get("brand"),query.get("store"),sorter,storesearchinput,category,currentPage])
 
  useEffect(()=>{
    if(Cookies.get("tktplc") && (currentPage !== "login" || currentPage !== "register")){
      setloading(true)
    axios.get(`http://localhost:5000/client/fetch_userdetails?tkt=${Cookies.get("tktplc")}`)
    .then(res =>{
       if(res.data.status === "success"){
        setuserdetails(res.data.userdetails[0])
        setsavedProducts(res.data.savedItems)
        setsubmittedcart(res.data.submittedcart)
        setcartreciepts(res.data.cartreciepts)
        setshoppingcart(res.data.shoppingcart)
        setsumtotalmain(res.data.shoppingcart_sumtotal[0].sumtotalmain)
        setregisteredstores(res.data.registeredstores)
        setregistereddispatch(res.data.registereddispatch)
        setdispatchhires(res.data.dispatchhires)

        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
      //  setredirect(true)
       }
       }
    })
    .catch(err => console.log(err))
  }
  setloading(false)
  },[])
   const opencat=(data)=>{
    if(data.catdet === "details"){
      window.location.href=`/shop/details/${data.catval}?pid=${data.catId}`
    }else{
    window.location.href=`/shop?${data.catdet}=${data.catval}`
    }
   }
 
   const Suggestions=()=>{
    return(
      <div style={{backgroundColor:"white",width:"100%"}}>
     <div style={{overflowX:'auto',overflowY:"hidden"}}>
          {searchinput.length > 0 && products.length > 0 ?
          <div className='row' style={{padding:"20px",height:"100%",overflow:"hidden"}}>
                <div className='col-12 col-md-6 mb-2'>
                  <center>
                <small style={{color:"grey", fontWeight:"bold"}}>Top Products</small>
                  <br/>
                  </center>
            {products.slice(0,20).map(product=>
                <div onClick={()=>opencat({catdet:"details",catval:product.details,catId:product.productId})} className='row' style={{borderTop:"1px solid lightgrey",padding:"3px"}}>
              <div className='col-2 col-md-2'>
              <img className="img-responsive" style={{width:"100%",padding:"5px",border:"1px solid lightgrey",height:"40px",borderRadius:"50%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
              </div>
              <div className='col-9 col-md-10'>
               <small className='linker' style={{padding:"0",margin:"0"}}>{product.details && product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small><br/>
              <small style={{color:"grey", fontStyle:"italic",textTransform:"capitalize",padding:"0",margin:"0"}}>{product.brand}</small>
             </div>
             </div>
              )}     
              <Link to={`/shop?search=${searchinput}`}>
              <small className='mt-2' style={{color:"indianred", fontStyle:"italic", fontWeight:"bolder",float:"right"}}>{products.length > 6 ? "see more ..." : null}</small>   
              </Link>
              <br/>
             </div>
             <div className='col-12 col-md-3 mb-2'>
                  <small className='mb-2' style={{color:"grey", fontWeight:"bold"}}>Top Brands</small>       
            {productdetails.brand && productdetails.brand.slice(0,6).map(brand=>
                <div onClick={()=>opencat({catdet:"brand",catval:brand.brand})} className='row' style={{padding:"3px"}}>
                  <small className='linker' style={{textTransform:"capitalize"}}>{brand.brand}</small>
             </div>
              )}     
              <small className='mt-2' style={{color:"indianred", fontStyle:"italic", fontWeight:"bolder"}}>{productdetails.brand && productdetails.brand.length > 6 ? "see more ..." : null}</small>   
             </div>
             <div className='col-12 col-md-3'>
                 <div>
                 <small className='mb-2' style={{color:"grey",fontStyle:"italics", fontWeight:"bold"}}>Keywords ..</small>
            {searchsubcat.slice(0,8).map(cat=>
                <div onClick={()=>opencat({catdet:"cat",catval:cat.subcat})} className='row' style={{padding:"3px"}}>
                  <small className='linker' style={{textTransform:"capitalize"}}>{cat.subcat}</small>
             </div>
              )}     
                 </div>
                 <div>
                  <br/><br/>
                 <small style={{color:"grey", fontWeight:"bold"}}>Top Category</small>
            {searchcat.map(cat=>
                <div onClick={()=>opencat({catdet:"cat",catval:cat.category})} className='row' style={{padding:"3px"}}>
                  <small className='linker' style={{textTransform:"capitalize"}}>{cat.category}</small>
             </div>
              )}     
                 </div>
            
             </div>
          </div> :
            <div className='row'>
            <div className='col-12 col-md-4' style={{padding:"50px"}}>
             <small style={{fontWeight:"bold",color:'grey'}}>Top Category</small>
             {categories && categories.map(cat=>
              <div key={cat.categories} onClick={()=>opencat({catdet:"cat",catval:cat.category})} style={{padding:"0",margin:"0",color:"grey"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{cat.category}</small>
              </div>
              )}
             </div>
             <div className='col-12 col-md-4' style={{padding:"50px"}}>
             <small style={{fontWeight:"bold",color:'grey'}}>Sub Category</small>
             {subcat.map(subcats=>
              <div key={subcats.subcat1} onClick={()=>opencat({catdet:"cat",catval:subcats.subcat1})} style={{padding:"0",margin:"0",color:"grey"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{subcats.subcat1} <span style={{fontWeight:"bold"}}>{subcats.category}</span></small>
              </div>
              )}
             </div>
             <div className='col-12 col-md-4' style={{padding:"50px"}}>
             <small style={{fontWeight:"bold",color:'grey'}}>Top Brands</small>
             {topbrands.map(brands=>
              <div  key={brands.brand} onClick={()=>opencat({catdet:"brand",catval:brands.brand})} style={{padding:"0",margin:"0",color:"grey"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{brands.brand}</small>
              </div>
              )}
             </div>
            </div>
  }
            </div>
      </div>
    )
   }
  if(redirect){
    return(
      <userContext.Provider value={{"currentpage":[currentPage, setcurrentPage]}}>
        <Router>
          <Login />     
        </Router>
   </userContext.Provider>
    )
  }
    // className={displaysidenav ? 'col-2' : "d-none"}
    //className={displaysidenav ?  'col-9' : "col-12"}
  else if(displaysuggest){
   return(
    <userContext.Provider    
     value={{"userdetail":[userdetails, setuserdetails],
    "topbrands":[topbrands, settopbrands],
    "categories":[categories, setCategories],
    "displaycategories":[displaycategories, setdisplaycategories],
     "savedproduct":[savedProducts, setsavedProducts],
     "shoppingcart":[shoppingcart, setshoppingcart],
     "shoppingcarttotal":[shoppingcarttotal,setshoppingcarttotal],
     "submittedcart":[submittedcart, setsubmittedcart],
     "product":[products,setproducts],
     "storeproducts":[storeproducts, setstoreproducts],
     "productdetail":[productdetails, setproductdetails],
     "page":[page, setpage],
     "numprod":[numprod, setnumprod],
     "currentpage":[currentPage, setcurrentPage],
     "loading":[loading, setloading],
     "redirect":[redirect, setredirect],
     "category":[category, setcategory],
     "modaldisplay":[modaldisplay, setmodaldisplay],
     "alertmessage":[alertmessage, setalertmessage],
     "requeststatus":[requeststatus, setrequeststatus],
     "targetmodal":[targetmodal, settargetmodal],
     "search":[searchinput, setsearchinput],
     "sidenav":[ navwidth, setnavwidth],
     "displaysuggest":[displaysuggest, setdisplaysuggest],
     "mobiledevice":[mobiledevice,setmobiledevice],
     "visitedproducts":[visitedproducts, setvisitedproducts],
     "completed_purchase":[completed_purchase, setcompleted_purchase],
     "displaylink":[displaylink,setdisplaylink],
     "view":[view, setview],
     "noofunreadmessages": [noOfUnreadMessages, setnoOfUnreadMessages],
      "noofunreadchat":[noOfUnreadChat, setnoOfUnreadChat],
     "selectedqueries":[selectedqueries, setselectedqueries],
     "sorter":[sorter, setsorter],
           "displaynavbar":[displaynavbar, setdisplaynavbar],
     "displayicon":[displayicon,setdisplayicon],
     "storelat":[storelat, setstorelat],
     "coord":[coord, setcoord]}}>
     <Router>
        {(window.location.href.includes("login") || window.location.href.includes("register"))  ?
       null
       : <Navbar></Navbar>}
    <Suggestions />    
    </Router> 
</userContext.Provider>
   )
  }

  else{
    return (
      <userContext.Provider 
      value={{"userdetail":[userdetails, setuserdetails],
      "searchsubcat":[searchsubcat, setsearchsubcat],
      "searchcat":[searchcat, setsearchcat],
     "topbrands":[topbrands, settopbrands],
     "subcat":[subcat, setsubcat],
     "categories":[categories, setCategories],
     "displaycategories":[displaycategories, setdisplaycategories],
      "savedproduct":[savedProducts, setsavedProducts],
      "shoppingcart":[shoppingcart, setshoppingcart],
      "shoppingcarttotal":[shoppingcarttotal,setshoppingcarttotal],
      "submittedcart":[submittedcart, setsubmittedcart],
      "product":[products,setproducts],
      "storeproducts":[storeproducts, setstoreproducts],
      "productdetail":[productdetails, setproductdetails],
      "page":[page, setpage],
      "cartreciepts": [cartreciepts, setcartreciepts],
      "dispatchreciepts":[dispatchreciepts, setdispatchreciepts],
      "registeredstores":[registeredstores, setregisteredstores],
      "registereddispatch":[registereddispatch,setregisteredstores],
      "storesearchinput":[storesearchinput, setstoresearchinput],
      "allstores":[stores, setstores],
      "numprod":[numprod, setnumprod],
      "currentpage":[currentPage, setcurrentPage],
      "loading":[loading, setloading],
      "redirect":[redirect, setredirect],
      "category":[category, setcategory],
      "modaldisplay":[modaldisplay, setmodaldisplay],
      "alertmessage":[alertmessage, setalertmessage],
      "requeststatus":[requeststatus, setrequeststatus],
      "targetmodal":[targetmodal, settargetmodal],
      "search":[searchinput, setsearchinput],
      "sidenav":[ navwidth, setnavwidth],
      "noofunreadmessages": [noOfUnreadMessages, setnoOfUnreadMessages],
      "noofunreadchat":[noOfUnreadChat, setnoOfUnreadChat],
      "displaysuggest":[displaysuggest, setdisplaysuggest],
      "mobiledevice":[mobiledevice,setmobiledevice],
      "visitedproducts":[visitedproducts, setvisitedproducts],
      "completed_purchase":[completed_purchase, setcompleted_purchase],
      "displaylink":[displaylink,setdisplaylink],
      "view":[view, setview],
      "selectedqueries":[selectedqueries, setselectedqueries],
      "sorter":[sorter, setsorter],
            "displaynavbar":[displaynavbar, setdisplaynavbar],
      "displayicon":[displayicon,setdisplayicon],
      "loaded":[loaded, setloaded],
      "storelat":[storelat, setstorelat],
      "coord":[coord, setcoord],
      "spd" : [spd, setspd],
      "sumtotalmain":[sumtotalmain, setsumtotalmain],
      "messages":[messages, setmessages],
      "onlineclients":[onlineclients, setonlineclients],
      "displayrecently": [displayrecently, setdisplayrecently],
      "selectedimage":[selectedimage, setselectedimage],
      "productDetails":[productDetails, setProductDetails],
     "allproductDetails":[allproductDetails, setAllProductDetails],
     "productcomments":[productcomments, setproductcomments],
   "productdetailshistory":[productdetailshistory, setproductdetailshistory],
      "typingclients": [typingclients, settypingclients],
      "lastseen":[lastseen, setlastseen],
      "availabledispatchers":[availabledispatchers, setavailabledispatchers],
      "dispatchhires":[dispatchhires, setdispatchhires],
      "reg_coord":[reg_coord,setreg_coord]}}>
        <Router>
          <div style={{position:"sticky",zIndex:'999999999999',top:"0px"}}>
          {currentPage === "login" || currentPage === "chat" || currentPage === "chatapp" || currentPage === "register" ? 
       null
       : <Navbar></Navbar>}
          </div>
        </Router>
      <Router>
      {/* height:"100vh" */}
      {/* giving a page a height of 100% affects its scrollto property */}
      <div  style={{overflow:"hidden",width:"100%",height:'100%'}}>
    
       <div style={{position:"fixed", right:"10px",top:"25%"}}>
         <div style={{display:"flex", flexDirection:"column"}}>
          <div style={{width:"20%",padding:"3px"}}>
            <span className='fa fa-facebook-square fa-2x text-primary'></span>
          </div>
          <div style={{width:"20%"}}>
            <span className='fa fa-twitter fa-2x text-primary'></span>
          </div>
          <div style={{width:"20%"}}>
            <span className='fa fa-whatsapp fa-2x text-success'></span>
          </div>
          <div style={{width:"20%"}}>
            <span className='fa fa-instagram fa-2x' style={{color:"orange"}}></span>
          </div>
          <div style={{width:"20%"}}>
            <span className='fa fa-google fa-2x' style={{color:"indianred"}}></span>
          </div>
         </div>
       </div>
       {selectedimage ?
         <div className='shopcartdeldiv' style={{position:"fixed",height:"50%",top:"30%",fontWeight:"bold",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey"}}>
          <img src={selectedimage}  style={{width:"100%",padding:"0px",height:"100%"}} />
          </div>
          : null}
          {/* height:"100%" */}
            <div  style={{overflow:"scroll",width:"100%",height:"100%"}}>
        {Cookies.get("tktplc") && (currentPage !== "chat"   || currentPage !== "login" || currentPage !== "register")  ?     
           <span onClick={()=>setshowChat(prev => !prev)} style={{padding:"0px 3px",fontSize:"50px",position:'fixed',zIndex:"99999000",bottom:"10%",right:"2%",color:"orange"}} className={`fa ${showChat ? "fa-times" : "fa-comment-o"} fa-3x`}></span>
        : null}
        {showChat ?
        <div style={{position:"fixed",borderRadius:"20px",overflow:"hidden",display:`${showChat ? "block" : "none"}`,backgroundColor:"white",right:"5%",zIndex:"99990000",bottom:"17%",width:"30%",overflow:'hidden',height:"65vh"}}>
        <AdminChat admin={true}/>
        </div>
        : null}
        {!mobiledevice ? 
         <div style={{position:"fixed",right:"0px",bottom:"2px",width:"100%",borderTop:"1px solid lightgrey"}}>
            <small style={{fontSize:"15px",float:"right"}}><b>FAQ?</b> Contact Us</small>
           </div>
           : null}
           <Modal />
           {query.get("spd") === "about_us" || spd==="about_us"?
           <About />
          : null}
          {query.get("spd") === "faq" || spd==="faq"?
           <Faq />
          : null}
 
      {loading ? 
              <div style={{position:"fixed",top:"0",left:"0%",zIndex:"99999999999999900",backgroundColor:"rgba(242,242,242,0.3)",width:"100%",height:"100%"}}>
                   <div style={{position:"fixed",left:"40%", top:"30%"}}>
                   <center>
                      <img  src={`https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif`} />
                  </center>
                   </div>
              </div>
              : null}
      
   
      <div className="containerx">
      <div>
        {(currentPage !== "login" || currentPage !== "register") && displaynavbar ? 
         <div onMouseEnter={()=>setdisplayicon(true)} style={{display:`${currentPage === "login" || currentPage === "register" ? "none" : "block"}`,backgroundColor:"white",position:"fixed",left:"0",zIndex:"99999999999999999",height:"100%",width:"60%",overflow:"scroll",transition:`all 2s linear`}}>
           <SideNavbar/>          
           {/* rgba(15,20,127,0.8) */}
         </div>
         : null}
          <div className='overalldiv' style={{overflow:"hidden",position:"relative"}}>
          {currentPage !== "productupload" ?
            <div onMouseOver={()=>setdisplaycategories(true)} onMouseLeave={()=>setdisplaycategories(false)} style={{position:'absolute',overflow:'scroll',border:"5px solid orange",backgroundColor:"white",display:`${displaycategories && currentPage !== "products" ? "block" : "none"}`,zIndex:"999999999900", top:"0%",left:"1.2%",width:"97.5%",height:"470px"}}>
            <span onClick={()=> setdisplaycategories(false)} style={{position:"absolute",color:'grey',zIndex:"999999999999999", right:"10px",fontWeight:"lighter"}} className="fa fa-times fa-2x"></span>
            <Suggestion />
               </div>     
               : null}    
        <div className='mt-2' style={{height:"100%"}}>
         <Routes>    
         <Route exact path='/saved_items' element={<SavedItems/>} />
         <Route exact path='/shop' element={<Product />} />
         <Route exact path='/shop/client/product_display_section' element={<StoreProduct />} />

         <Route exact path='/cart' element={<Shoppingcart />} />
         <Route exact path='/chat_us' element={<Chatus />} />
         <Route exact path="/about-us" element={< About />} />
         <Route exact path="/faqs" element={<Faq />} />
         <Route exact path='/submitted_cart' element={<SubmittedCart />} />
         
         <Route exact path='/' element={< Home/>} />
     
         <Route exact path='/history' element={< History/>} />
         <Route exact path='/testrandom' element={< Testrandom/>} />
         <Route  path='/movieform' element={<Movieform />} />
         <Route path="/chat" element={<ChatApp />} />
         <Route path='/profile/chat' element={<ChatApp lg={true} />} />
         <Route path="/chat/:store" element={<ChatApp />} />
         <Route path="/profile/connections" element={<Connection />} />
         <Route exact path='/login' element={< Login/>} />
         <Route exact path='/register' element={< Register/>} />
         <Route exact path='/upload-item' element={<ProductUpload />} /> 
         <Route exact path='/shop/details/:productDetails' element={< Details/>} />  
         
       </Routes>
       {
        //#00264d
       }
       {mobiledevice ?
       <div className='row' style={{overflow:"scroll",height:'100%'}}>
        <Routes>   
             <Route path='/profile/chat' element={<ChatApp lg={true} />} />
          </Routes>
        {currentPage === "login" || currentPage === "chat"  || currentPage === "products" || currentPage === "home" || currentPage === "chatapp" || currentPage === "register" ? null :
       <div className='d-none d-md-block col-md-1 col-lg-2' onMouseEnter={()=>setdisplayicon(true)} style={{display:`${currentPage === "login" || currentPage === "chat" || currentPage === "chatapp" || currentPage === "register" ? "none" : "block"}`,backgroundColor:"rgba(245,245,245,0.6)",zIndex:"99990000",width:"100vh",overflow:"hidden",height:"100vh"}}>
       <div style={{width:"100%",height:"100%",top:"0",padding:"20px",overflowY:"scroll"}}>
            <LgSideNavbar />
            </div>
             </div>
  }
  {currentPage === "products" || currentPage === "home"? null :
             <div className='col-12  col-md-8 col-lg-8' style={{height:"90vh",overflow:"hidden",width:"100%"}}>
              <div style={{width:"100%",height:"100%",position:"absolute",right:"-17px",top:"0",overflowY:"scroll"}}>
             <Routes>   
             <Route path='/profile/my_profile' element={<Profile lg={true} />} />
             
             <Route path='/profile/my_profile/stores' element={<Stores lg={true} />} />
             <Route path='/profile/my_profile/dispatch' element={<Dispatch lg={true} />} />
             <Route path='/client/profile/:customerId' element={<ClientProfile lg={true}  />} />
             <Route path='/profile/cart' element={<Shoppingcart lg={true} />} />
             <Route path='/profile/trending' element={<Trending lg={true} />} />
             <Route path='/profile/chat_client' element={<Chatus lg={true} />} />
             <Route path='/profile/connection' element={<Connection lg={true} />} />
             <Route path='/profile/hire_dispatch' element={<HireDispatch lg={true} />} />
             <Route path='/profile/join dispatch' element={<RegisterDispatchers />} />
             <Route path='/profile/join store' element={<RegisterStore />} />
             <Route path="/profile/my_profile/product_edit/:productId/:storeId" element={< EditProduct/>} />
             <Route path='/profile/edit store/:storeId' element={<EditStore />} />
             <Route path='/profile/edit dispatch/:dispatchId' element={<Editdispatch />} />
             <Route path='/profile/saved_items' element={<SavedItems  lg={true}/>} />
             <Route path="/profile/cart_reciepts" element={<Receipts />} />
             <Route path="/profile/dispatch_reciepts" element={<DispatchReceipts />} />
            <Route path='/profile/submitted_cart' element={<SubmittedCart />} />
            <Route path='/profile/submitted_cart/:invoiceno' element={<InvoiceCart />} />
            </Routes>
             </div>
             </div>
  }
             {currentPage === "login" || currentPage === "chat"  || currentPage === "products" || currentPage === "home"|| currentPage === "chatapp" || currentPage === "register" ? null :
             <div className='d-none d-md-block col-md-2' style={{height:"90vh",overflow:"hidden",width:"100%"}}>
              <div style={{width:"100%",height:"100%",padding:"20px",position:"absolute",left:"0",right:"0px",top:"0",overflowY:"scroll",overflowX:"hidden"}}>        
             <History lg={true} />
             </div>
             </div>
  }
            </div>
            : null}
            
       </div>
       </div>
         </div>
       </div>     
      
         </div>
         </div>
      </Router>
      </userContext.Provider>
     );
  }
  }


export default App;
