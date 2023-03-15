import React, { useState, useEffect ,useRef, useContext} from 'react';
import axios from "axios"
import {useParams, useNavigate, Link} from "react-router-dom"
import {FacebookShareButton, InstapaperShareButton, LineShareButton, TwitterShareButton} from "react-share"
import Cookies from 'js-cookie';
import Login from './login';
import {formater, formateronlymain, formattime} from "./formatTime"
import { userContext } from './usercontext';
// import MapContainer from './mapcontainer';
import { getDistanceFromLatLonInKm } from './mapdistance';
import { formatermain } from './formatTime';
import {  SellerProducts, SimiliarBrands, SimiliarCategory } from './trending';
import socket from './socketconn';
//Recently_visited

const CryptoJS = require("crypto-js")

function Details(props) {
 const [topsearched, settopsearched] = useState([])
 // const [userdetails, setuserdetails] = useState({})
// const [productcomments, setproductcomments] =useState([])
 const [displayfirstratingsmodal, setdisplayfirstratingsmodal] = useState("none")
 const [ratinginputs, setratinginputs] = useState({"myrating":5,"mycomment":"Excellent Product"})
 const context = useContext(userContext)
 const [productDetails, setProductDetails] = context["productDetails"]
 const [allproductDetails, setAllProductDetails] = context["allproductDetails"]
 const [redirect, setredirect] = context["redirect"]
 const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
 const [alertmessage, setalertmessage] = context["alertmessage"]
 const [requeststatus, setrequeststatus] = context["requeststatus"]
 const [targetmodal, settargetmodal] = context["targetmodal"]
 const [savedProductIds, setsavedProductIds] = useState([])
 const [userdetails,setuserdetails] = context["userdetail"]
 const [savedProducts,setsavedProducts] = context["savedproduct"]
 const [shoppingcart, setshoppingcart] = context["shoppingcart"]
const [loading, setloading] = context["loading"]
const [visitedproducts, setvisitedproducts]= context["visitedproducts"]
const [coord, setcoord] = context["coord"]
const [reg_coord, setreg_coord] =context["reg_coord"]
const [storelat, setstorelat] = context["storelat"]
const [selectedimage, setselectedimage] = context["selectedimage"]
const [comments, setComments] = useState([])
 const [ratemodaldisplay,setratemodaldisplay] = useState(false)
 const [avgrating, setavgrating] = useState(0)
const [availabledispatchers, setavailabledispatchers] = useState([])
const [similiarstores, setsimiliarstores] = useState([])
const [productdetailshistory, setproductdetailshistory] =context["productdetailshistory"]
const [productcomments, setproductcomments]= context["productcomments"]

 const params = useParams();
 const imgelement = useRef(null)
 const mainImg = useRef()
 const navigate = useNavigate()
 const query = new URLSearchParams(window.location.search)
//setproductcomments
useEffect(()=>{
  if(query.get("rate")){
    setratemodaldisplay(true)
  }
})
useEffect(()=>{
 window.scrollTo(0,0)
},[allproductDetails])
useEffect(()=>{
  const elements = document.querySelectorAll(".dataimages")
  let options ={
      root: null,
      rootMargin:"0px",
      threshold:0.1
  }
  const callback =(entries)=>{
      entries.forEach(entry =>{
          if(entry.isIntersecting){
              entry.target.src= entry.target.dataset.src
      
          }
      })
  }
  elements.forEach(element =>{
      const observer = new IntersectionObserver(callback, options)
      observer.observe(element)
  })
  })
 useEffect(()=>{
    let savedIds =[]
  savedProducts.forEach(savedproduct => {
    savedIds.push(savedproduct.productId)
  });
  setsavedProductIds(savedIds)
 },[savedProducts])
 
useEffect(()=>{
    if(query.get("rate") || ratemodaldisplay){
     if (Cookies.get("tktplc")){
       setloading(true)
        const print =[
            navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
            ,navigator.deviceMemory,navigator.connection]
            print.unshift(window.screen.width)
            print.push(window.screen.height)
    
            const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
            const realprint = mainprint.substring(1, mainprint.length-1)
            axios.get(`https://new-frugetbackend-productions.up.railway.app/client/auth_user?tkt=${Cookies.get("tktplc")}&nayv=${realprint}`)
            .then(res=>{
                if(res.data.status === "success"){
                    setdisplayfirstratingsmodal("block")
                    setloading(false)
                }else{
                    setdisplayfirstratingsmodal("none")
                    setloading(false)
                    setredirect(true)
                }
            
            })
        }else{
            setloading(false)
            setredirect(true)
        }
    }else{
       setloading(false)
        setdisplayfirstratingsmodal("none")
    }
    },[ratemodaldisplay])
useEffect(()=>{
  if(!props.productDetails  && Cookies.get("tktplc")){ 
 axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ 
  setProductDetails(res.data.details[0])
  setAllProductDetails(res.data.details) 
  setavgrating(res.data.avgrating[0])
  setproductcomments(res.data.comments)
  setavailabledispatchers(res.data.availabledispatchers)
  setsimiliarstores(res.data.stores)
  setproductdetailshistory(res.data.producthistory)

 setTimeout(()=>setloading(false),1500)
})
 .catch(err => console.log(err))
  }else if(props.productDetails  && Cookies.get("tktplc")){
    setProductDetails(props.productDetails)
  }else{
    setredirect(true)
  }
},[])

// useEffect(()=>{
//    if(props.productDetails){ 
//     setProductDetails(props.productDetails)
//     navigate(`/shop/details/${props.productDetails.details}?pid=${props.productDetails.pid}`)
//    }
// })
//comment
const changesrc=(source)=>{
   document.getElementById("mainImg").src = source;
   document.getElementById("mainImg").style.boxShadow = "1px 2px 5px 2px lightgrey";
}

const saveItem=(properties)=>{  
    if (savedProducts.length === 18){
        return alert("saved items cannot exceed 20")
    }
    setloading(true)
   if(Cookies.get("tktplc")){
    const tkt = Cookies.get("tktplc")
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/save_item?tkt=${Cookies.get("tktplc")}&productId=${productDetails.pid}`)
    .then(res =>{
        if(res.data.status === "success"){
            setsavedProducts(res.data.savedItems)
          setalertmessage(`'${productDetails.details}' saved successfully`)
          setrequeststatus("success")
          setmodaldisplay("block")
          settargetmodal("save")
            setloading(false)
        }else{
          setalertmessage(res.data.message)
            setrequeststatus("failed")
            setmodaldisplay("block")
            settargetmodal("save")
            setloading(false)
        }
    })
    .catch(err => console.warn(err))
   }else{
    setredirect(true)
   }
}
const unsaveItem=(properties)=>{  
    if (savedProducts.length === 18){
        return alert("saved items cannot exceed 20")
    }
    setloading(true)
   if(Cookies.get("tktplc")){
    const tkt = Cookies.get("tktplc")
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/unsave_item?tkt=${Cookies.get("tktplc")}&productId=${productDetails.pid}`)
    .then(res =>{
        if(res.data.status === "success"){
            setsavedProducts(res.data.savedItems)
          setalertmessage(`'${productDetails.details}' unsaved successfully`)
          setrequeststatus("success")
          setmodaldisplay("block")
          settargetmodal("save")
            setloading(false)
        }else{
          setalertmessage(res.data.message)
            setrequeststatus("failed")
            setmodaldisplay("block")
            settargetmodal("save")
            setloading(false)
        }
    })
    .catch(err => console.warn(err))
   }else{
    setredirect(true)
   }
}

const showratemodal =()=>{
setloading(true)
if(Cookies.get("tktplc")){
axios.get(`https://new-frugetbackend-productions.up.railway.app/item/confirm_productratemodal?productId=${productDetails.productId}&tkt=${Cookies.get("tktplc")}`)
.then(res =>{
  if(res.data.status === "success"){
    query.set("rate",true);
    setratemodaldisplay(true)
    navigate(window.location.pathname +"?"+ query.toString());
    setTimeout(()=> setloading(false), 500)
  }else{
    setalertmessage(res.data.message)
    setrequeststatus(res.data.status)
    settargetmodal("rate")
    setmodaldisplay("block")
    setTimeout(()=> setloading(false), 500)
  }
})
.catch(err => console.warn(err))
}
}
const commentchange =(e)=>{
  if(e.target.name === "mycomment" && ratinginputs.mycomment && ratinginputs.mycomment.length >= 29){
      alert("please!!! comment cannot exceed 30 characters ")
  }else{
  setratinginputs(prev =>({...prev, [e.target.name]:e.target.value}))
  }
}
 const ratingschange=(e)=>{
     if(e.target.value > 5){
        return setratinginputs(prev =>({...prev, myrating:1}))
     }
     else if(e.target.value < 1){
        return setratinginputs(prev =>({...prev, myrating:1}))
     }
        else if(e.target.value >4 && e.target.value <= 5){
        return    setratinginputs({mycomment: "Excellent Product",myrating:e.target.value})
        }
     else if(e.target.value >3 && e.target.value <= 4){
           setratinginputs({mycomment: "Very Good Product",myrating:e.target.value})
       }
      else if(e.target.value >2 && e.target.value <= 3){
           setratinginputs({mycomment: "Good Product",myrating:e.target.value})
       }
       else if(e.target.value >1 && e.target.value <= 2){
           setratinginputs({mycomment: "Average Product",myrating:e.target.value})
       }
      else if(e.target.value == 1){
           setratinginputs({mycomment: "Very Poor",myrating:e.target.value})
       }          
 }
const rate=()=>{
    setloading(true)
    const print =[
        navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
        ,navigator.deviceMemory,navigator.connection]
        print.unshift(window.screen.width)
        print.push(window.screen.height)

        const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
        const realprint = mainprint.substring(1, mainprint.length-1)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/rate?productId=${productDetails.pid}&ratingsinput=${JSON.stringify(ratinginputs)}&tkt=${Cookies.get("tktplc")}&nayv=${realprint}`)
    .then(res =>{
        if(res.data.status === "success"){
      setproductcomments(res.data.comments)
      setavgrating(res.data.avgrating[0])
      setTimeout(()=>  setloading(false), 500)
       setalertmessage("Your rating/comment has been added successfully")
       setrequeststatus("success")
       settargetmodal("rate")
       setmodaldisplay("block")
       setratemodaldisplay(false)
       query.delete("rate")
       navigate(window.location.pathname +"?"+ query.toString());
        }else{
            setloading(false)
            query.delete("rate")
            navigate(window.location.pathname +"?"+ query.toString());
            setalertmessage(res.data.message)
            setrequeststatus("failed")
            settargetmodal("rate")
            setratemodaldisplay(false)
            setmodaldisplay("block")
        }
    })
}
const removeratingmodal=()=>{
    query.delete("rate")
    setratemodaldisplay(false)
    navigate(window.location.pathname +"?"+ query.toString());
}
const addtocart=()=>{
    setloading(true)
    const print =[
        navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
        ,navigator.deviceMemory,navigator.connection]
        print.unshift(window.screen.width)
        print.push(window.screen.height)

        const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
        const realprint = mainprint.substring(1, mainprint.length-1)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/addtocart?productId=${productDetails.pid}&tkt=${Cookies.get("tktplc")}&dispatch=${JSON.stringify(availabledispatchers[0])}&nayv=${realprint}`)
   .then(res =>{
    if(res.data.status === "success"){    
        setuserdetails(res.data.userdetails[0])
        setalertmessage(`'${productDetails.details}' added successfully`)
        setrequeststatus(res.data.status)
        setmodaldisplay("block")
        setloading(false)
        settargetmodal("cart")
        axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ setProductDetails(res.data.details[0])
    setAllProductDetails(res.data.details) 
setloading(false)
})
 .catch(err => console.log(err))
     
    }else if(res.data.message === "unauthorized"){
        setredirect(true)
    }
    else{
        setalertmessage(res.data.message)
        setmodaldisplay("block")
        setrequeststatus(res.data.status)
        settargetmodal("cart")
        setloading(false)
    }
   })
   .catch(err => console.log(err))
}
const opendetails=(properties)=>{
    if(Cookies.get("tktplc")){
 setloading(true)
 axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
 .then(res =>{ 
   navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
 //  setdisplaydetail(true)
   setProductDetails(res.data.details[0])
   setAllProductDetails(res.data.details) 
   setavgrating(res.data.avgrating[0])
   setproductcomments(res.data.comments)
   setavailabledispatchers(res.data.availabledispatchers)
   setsimiliarstores(res.data.stores)
   setproductdetailshistory(res.data.producthistory)
 
   setTimeout(()=>{
       setloading(false)
   },1500)
})
 .catch(err => console.log(err))
 // history=`/shop/details/${details}`
}else{
    alert("not loggedin")
}
 
}
const setfailedcarting=()=>{
  setalertmessage(`this item is out of stock`)
  setrequeststatus("failed")
  setmodaldisplay("block")
  settargetmodal("cart")
}
const followstore=(store)=>{
    setloading(true)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/follow_store?store=${escape(store)}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ 
  setProductDetails(res.data.details[0])
  setComments(res.data.comment)
setloading(false)
})
 .catch(err => console.log(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
   }
   const unfollowstore=(store)=>{
    setloading(true)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/unfollow_store?store=${escape(store)}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ 
  setProductDetails(res.data.details[0])
  setComments(res.data.comment)
setloading(false)
})
 .catch(err => console.log(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
   }
   const followdispatch=(dispatchId)=>{
    setloading(true)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/follow_dispatch?dispatchId=${dispatchId}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ 
  setavailabledispatchers(res.data.availabledispatchers)
setloading(false)
})
 .catch(err => console.log(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
   }
   const unfollowdispatch=(dispatchId)=>{
    setloading(true)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/unfollow_dispatch?dispatchId=${dispatchId}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${params.productDetails}&productId=${query.get("pid")}`)
 .then(res =>{ 
  setavailabledispatchers(res.data.availabledispatchers)
setloading(false)
})
 .catch(err => console.log(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
   }
   const opensellerprofile=(sellerId)=>{
    //    var bytes = CryptoJS.AES.decrypt(Cookies.get("cvyx"), 'my-secret-key@123');
   //   var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      var cipheridmain = CryptoJS.AES.encrypt(JSON.stringify(sellerId), 'my-secret-key@123').toString();
      navigate(`/client/profile/${cipheridmain}`)
   }
   //U2FsdGVkX18/ZOU6vCdVAe24kC6T2JT9I/4oFmmrh6c=
   //U2FsdGVkX18/ZOU6vCdVAe24kC6T2JT9I/4oFmmrh6c=
   //U2FsdGVkX19A9KxuUExKWFtmPJOxtH37J2eFRmWHDfQ=
   // setTimeout(() => window.scrollTo(0, 0), 2000);
const likecomment=(productratingId)=>{
 if(Cookies.get("tktplc")){
  axios.get(`https://new-frugetbackend-productions.up.railway.app/item/like_productcomment?tkt=${Cookies.get("tktplc")}&productratingId=${productratingId}`)
  .then(res => {
    if(res.data.status === "success"){
      setproductcomments(res.data.comments)
    }
  })
  .catch(err => console.warn(err))
 }
}
const dislikecomment=(productratingId)=>{
  if(Cookies.get("tktplc")){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/item/dislike_productcomment?tkt=${Cookies.get("tktplc")}&productratingId=${productratingId}`)
    .then(res => {
      if(res.data.status === "success"){
        setproductcomments(res.data.comments)
      }
    })
    .catch(err => console.warn(err))
   }
}
if(redirect){
    return(
        <div>
            <Login />
        </div>
    )
}else{
    return ( 
      <div style={{backgroundColor:"white"}}>
        <div className='container' >
            <div className='detailcompdiv'>
             <div id="modaldiv" style={{position:"fixed",top:"0",display:`${displayfirstratingsmodal}`,left:"0%",zIndex:"2000",backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"100%"}}>
                 <div style={{position:"absolute",left:"35%",padding:"30px",zIndex:"300000",width:"30%",backgroundColor:"white",boxShadow:"2px 3px 3px 3px lightgrey", top:"20%"}}>
                
                <center>
                    <p style={{color:"orange",fontWeight:"bold"}}>Rate Product</p>
                    <input type="number"  value={ratinginputs.myrating ? ratinginputs.myrating : 5} onChange={ratingschange}  name="myrating" placeholder={5} /><br/><br/>
                    <small style={{color:"grey",padding:"10px",fontWeight:"bold"}}>
                        *Dear user, kindly spend about 2 minutes to rate and drop your productcomments to help other prospective buyers select a better choice
                        </small><br/><br/>
                        
                <div className="outerrating">
          <div className="innerrating" style={{width:`${ratinginputs ? ratinginputs.myrating*20 : "30"}%`,fontSize:"40px"}}>
          </div>
        </div><br/><br/>
         <input type="text" onChange={commentchange} value={ratinginputs.mycomment ? ratinginputs.mycomment : "Excellent Product"} name="mycomment" className="form-control" placeholder="excellent item, recommendable" style={{boxShadow:"none",outline:"none"}}></input>
               <br/>
               <div className='row'>
                <div className='col-6'>
                    <button onClick={removeratingmodal} className='btn btn-danger'>cancel</button>
                </div>
                <div className='col-6'>
                    <button className='btn btn-primary' onClick={rate}>submit</button>
                </div>
               </div>
                </center>
                 </div>
            </div>
           <small><Link style={{color:"orange",fontWeight:"bold",textDecoration:"none"}} to={`/shop`}> <span className='fa fa-arrow-left'></span> shop</Link> <span className='fa fa-chevron-right'></span>
           <span className='mr-2 ml-2'><Link style={{color:"black",textDecoration:"none"}} to={`/shop?cat=${productDetails.generalcategory}`}>{productDetails.generalcategory}</Link></span> <span className='fa fa-chevron-right'></span>
            <span className='mr-2 ml-2'><Link style={{color:"black",textDecoration:"none"}} to={`/shop?cat=${productDetails.category}`}>{productDetails.category}</Link></span> <span className='fa fa-chevron-right'></span>
            <span className='mr-2 ml-2'><Link style={{color:"black",textDecoration:"none"}} to={`/shop?cat=${productDetails.subcat1}`}>{productDetails.subcat1}</Link></span> <span className='fa fa-chevron-right'></span>
            <span className='mr-2 ml-2 text-muted'>{productDetails.details}</span>  </small>
            <br/><br/>
            {/* <div>
              <Recently_visited />
            </div> */}
            {productDetails ? 
        <div className="row boxshadower"> 
            <div className="col-12 col-md-6 imgshowcase mb-2" style={{padding:"2px"}} >
            <center>
            <div className="lgdeviceimgshowcaseflex" >
            { productDetails && productDetails.img1 ? Object.values(JSON.parse(productDetails.img1)).map(img =>
            <div key={img} style={{border:"1px solid grey",display:"none"}}>           
               <img
onClick={() => changesrc(`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${img}`)} 
src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${img}`} 
className="img-responsive" style={{padding:"0px",maxWidth:"100%",height:'100%'}}>    
</img>
            </div>   
          ) : null} 
          </div>
         <div className="smalldeviceimgshowcase" style={{overflow:'scroll'}}>
         <div className='row' style={{position:"sticky", left:"10px",zIndex:"5637"}}>
        {savedProductIds.includes(productDetails.pid) ? 
                       <span style={{color:"orange"}} onClick={()=>unsaveItem({details:productDetails.details,productId:productDetails.pid})} className='ml-3 mt-3 fa fa-heart fa-3x'></span>   
                    : 
                    <span  style={{color:"orange"}} onClick={()=>saveItem({details:productDetails.details,productId:productDetails.pid})} className='ml-3 mt-3 fa fa-heart-o fa-3x'></span>
                }
        </div>
         {productDetails && productDetails.img1 ? Object.values(JSON.parse(productDetails.img1)).map(img =>                  
 <img  src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${img}`} className="img-responsive" style={{borderRadius:"10px",boxShadow:'0.5px 1px 0.4px 1px lightgrey',margin:"4px",height:"430px",width:`${Object.values(JSON.parse(productDetails.img1)).length === 1 ? "100%" : "80%"}`}}></img>
          ) : null} 
        </div>

<img id="mainImg"src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${productDetails.img1 ? JSON.parse(productDetails.img1)[1] : null}`} style={{width:"100%",display:"none"}} className="bigdeviceimgshowcase img-responsive"></img>
              <h2 style={{float:"right",top:"5%",right:"25%", position: "absolute"}} >  
             </h2>
           
                </center>
            </div> 
            <div className="col-12 col-md-6 mb-2 " style={{width:"100%",backgroundColor:"rgba(242,242,242,0.2)",padding:"2px"}} >
              <div className='detailmarginal' style={{backgroundColor:"rgba(242,242,242,0.7)"}}>              
        <div style={{backgroundColor:"white",boxShadow:"2px 3px 2px 3px lightgrey",padding:"0px 10px",margin:"0px"}}>
           <p style={{textTransform:"uppercase",marginBottom:"1px"}}>{productDetails.details} -{productDetails.model} -{productDetails.color}</p>
       
         <small>Brand : {productDetails.brand} | similiar productDetails from {productDetails.brand}</small><br/>
           <div style={{float:"right",fontSize:"20px"}} onClick={()=>this.save(productDetails.productId)}>         
           </div>
         <small style={{textTransform:"capitalize"}}><b>Stock left</b> : <b>{productDetails.stock}</b> items remaining in store</small>
         <small className="badge badge-sm" style={{marginLeft:"4px",color:"white",backgroundColor:"#cc0000",fontSize:"10px"}}><span className="fa fa-shield-alt" ></span></small><br/>
         
            <small>Warranty: {productDetails.warranty}</small><br/>
                   
            <div className="outer">
          <div className="inner" style={{width:`${avgrating && avgrating.avgrating*20 || 0}%`}}>
          </div>
        </div> <small style={{fontSize:"11.5px"}}><b>({productcomments.length || 0} Reviews) {productDetails.product_verifiedsales || 0 }</b>  verified sales</small><br/>
        <small style={{fontWeight:"bold",color:"grey",fontSize:"11px"}}>Last sold {formateronlymain(productDetails.product_verifiedsales_time)} ago</small>
        
</div>
 
           <div style={{backgroundColor:"white",marginTop:"5px",boxShadow:"2px 3px 2px 3px lightgrey",padding:"0px 10px",margin:"0px"}}>
           <small style={{cursor:"pointer"}}>Distance(current Location) in <b>km</b> : <b> {getDistanceFromLatLonInKm(coord.lat,coord.lng,storelat.lat,storelat.lng).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
           <small style={{cursor:"pointer"}}>Distance(registered Location) in <b>km</b> : <b> {getDistanceFromLatLonInKm(reg_coord.lat,reg_coord.lng,storelat.lat ,storelat.lng).toFixed(2)} </b> KM <small className="text-muted"> (as crow flies)</small></small><br/>
            <small><b>SKU Code </b>: 20202908{productDetails.productId}</small><br/>
            {parseInt(getDistanceFromLatLonInKm(userdetails.customerlat,userdetails.customerlng,storelat.lat ,storelat.lng)) > parseInt(getDistanceFromLatLonInKm(coord.lat,coord.lng,storelat.lat ,storelat.lng))? 
            <small>Order this item to your current location and save 
         <b>   ₦ {(parseInt(getDistanceFromLatLonInKm(coord.lat,coord.lng,storelat.lat ,storelat.lng)) - parseInt(getDistanceFromLatLonInKm(reg_coord.lat,reg_coord.lng,storelat.lat ,storelat.lng)))*1000} </b>
            from delivery<br/> </small>
            : null}
            <small>Total <b>Delivery Time (approx.)</b> :
             {parseInt(getDistanceFromLatLonInKm(userdetails.customerlat,userdetails.customerlng,storelat.lat ,storelat.lng).toFixed(2)*90) > 300 ?
            <span>{parseInt(parseInt(getDistanceFromLatLonInKm(userdetails.customerlat,userdetails.customerlng,storelat.lat ,storelat.lng).toFixed(2)*90)/350)} <b>days</b></span>
            :<span> {parseInt(getDistanceFromLatLonInKm(userdetails.customerlat,userdetails.customerlng,storelat.lat ,storelat.lng).toFixed(2)*90)} <b>mins</b></span>}</small><br/>         
           {productDetails.initialprice !== null ? <div>
           <small style={{fontSize:"20px"}}>{productDetails.mainprice}</small><small className="ml-3" style={{color:"orange"}}>- {productDetails.discount}%</small><p style={{float:"right",textDecoration:"line-through",color:"grey"}}>{productDetails.initialcost}</p>
           </div> : <h4>{productDetails.mainprice}</h4>}
        
        <small style={{color:"green",display:"none"}}>*You have <b>{userdetails.nosaved}</b> items in your repository</small>

      
           <div className="lgcartbuttondiv">
            <button type="button" className={`${productDetails.stock > 0 ? "lgcartbutton" : "lgcartbuttondisabled"}`} onClick={productDetails.stock > 0 ? addtocart : setfailedcarting}>
            {productDetails.stock > 0 ? null :
            <div style={{float:'left'}}>
              <span className='fa fa-ban text-danger'> </span>
              <small style={{fontWeight:"bold",textTransform:"uppercase"}}>Out of stock</small>
            </div>
             }
            <small style={{fontSize:"15px",color:"white",fontWeight:"bold"}}>ADD TO CART</small>
            <span style={{float:"right",fontSize:"17px",color:"white",fontWeight:"bold"}}><span className='fa fa-shopping-cart'></span> {productDetails.quantity}</span>
            </button>
            </div>
            <small><a href=""><span className="fa fa-star-half-alt" style={{color:"orange"}}></span> see our review on this product</a></small><br/>
            <small><a href="">PROMOTIONS</a></small><br/>
            <small>share this product on</small><br/>
            <div style={{display:"flex",width:"50%",justifyContent:"space-evenly"}}>
              <div>           
                <FacebookShareButton 
                 url={`http://fruget.herokuapp.com`}
                 quote={productDetails.productdescription}
                 hashtag={"#ecommerce"}
                 description={productDetails.details + " - " + productDetails.model  + " - " + productDetails.color}>
                    <span className='fa fa-facebook-square text-primary' style={{color:"blue",fontSize:'20px'}}></span>
                </FacebookShareButton>
              </div>
              <div>
              <TwitterShareButton 
                 url={`http://fruget.herokuapp.com`}
                 hashtag={"#ecommerce#webdev"}
                 title={productDetails.details + " - " + productDetails.model  + " - " + productDetails.color}>
                    <span className='fa fa-twitter text-primary' style={{color:"blue",fontSize:'20px'}}></span>
                </TwitterShareButton>
              </div>
              <div>
              <LineShareButton 
                 url={`http://fruget.herokuapp.com`}
                 hashtag={"#ecommerce#webdev"}
                 title={productDetails.details + " - " + productDetails.model  + " - " + productDetails.color}>
                    <span className='fa fa-linkedin text-primary' style={{color:"blue",fontSize:'20px'}}></span>
                </LineShareButton>
              </div>
              <div>
              <InstapaperShareButton 
                 url={`http://fruget.herokuapp.com`}
                 hashtag={"#ecommerce#webdev"}
                 title={productDetails.details + " - " + productDetails.model  + " - " + productDetails.color}>
                    <span className='fa fa-instagram ' style={{color:"brown",fontSize:'20px'}}></span>
                </InstapaperShareButton>
              </div>
              </div>
            </div>
            </div>
            </div>
            <br/>
               <br/>
            <div className='container mb-3' style={{width:'100%', boxShadow:"2px 3px 3px 3px rgba(245,245,245,0.7)",borderRadius:"20px"}}>
             <div className='row' style={{padding:'2px 10px'}}>
              <div className="col-12">
                <div className='row'>
                <div className='col-12 '><small style={{textTransform:'uppercase',fontSize:'14px',color:"orange",fontWeight:'bold'}}>Meet the seller</small></div>
                <br/>
                <div className='col-12 col-md-6 col-lg-4'>
                <div style={{display:"flex",flexWrap:"nowrap",width:"100%"}}>
                    <div style={{width:"30%"}}>
                     <img style={{width:"100%",borderRadius:"50%",padding:"10px",height:"80px"}} src={productDetails.images && JSON.parse(productDetails.images).length > 3  ? `https://res.cloudinary.com/fruget-com/image/upload/store/${Object.values(JSON.parse(productDetails.images))[0]}` : `https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg?auto=format&h=200` } />
                    </div>
                    <div style={{width:"70%",marginTop:"20px"}}>
                    <small style={{fontSize:"13px"}}> <span style={{textTransform:"capitalize"}}>{productDetails.store_name}</span></small><br/>
                    <small style={{border:"1px solid lightgrey",cursor:"pointer",color:"grey"}} onClick={()=>opensellerprofile(productDetails.customerId)}>view profile</small>
                    </div>
                </div>
              </div>
                <div className='col-12 col-md-6 col-lg-4' style={{marginTop:"20px"}}> 
             <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${productDetails.store_storerating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({productDetails.store_storerating}) <small style={{fontWeight:"bold",color:"grey",wordSpacing:"0.1px",letterSpacing:"0.0001px"}}>{productDetails.store_numofrating} people rated this store</small></small><br/>

               </div></div>
             <div className='col-12 col-md-6 col-lg-4' > <small>{productDetails.store_address}</small><br/>
             {productDetails.store_followers && JSON.parse(productDetails.store_followers).includes(userdetails.customerId)
               ?
               <button onClick={()=>unfollowstore(productDetails.product_store)} className='btn' style={{float:'right',clear:"both",backgroundColor:"white",border:'1px solid blue',boxShadow:'none',padding:"0px 2px"}}>
               <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >unFollow</span> this store</small>
            </button>
            :  
            <button onClick={()=>followstore(productDetails.product_store)} className='btn btn-primary' style={{float:'right',border:"0",boxShadow:"none",padding:"0px 2px"}}>
            <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >Follow</span> this store</small>
         </button>}
         <button className='btn' style={{color:"white",backgroundColor:'orange'}}><span className='fa fa-envelope-o'></span></button>
         <button className='btn ml-2' style={{color:"white",backgroundColor:'orange'}}><span className='fa fa-phone-square'></span></button>
         </div>
           
             <div className='col-12 col-md-6'>             
               <small style={{fontSize:"13px"}}><b>{productDetails.store_verifiedsales || 0 }</b> completed transactions </small><br/>
              {productDetails.store_verifiedsales > 0 ? <small style={{fontSize:"11px",fontWeight:"bold", color:"grey"}}>Last completed transaction was {formateronlymain(productDetails.store_verifiedsales_time)} ago<br/></small> : null}
               <small style={{fontSize:"13px"}}>{productDetails.store_followers && JSON.parse(productDetails.store_followers).length } People are following {productDetails.store_name}</small> <br/>

                <small style={{fontSize:"13px"}}><span style={{textTransform:"capitalize"}}>{productDetails.about_business}</span></small><br/>
             </div>
             <div className='col-12'>
             <SellerProducts store={productDetails.product_store}/>
             </div>             
                </div>
              </div>
             </div>
             <div className='row'>
              <div className="col-12">
              <b style={{color:"grey"}}>{similiarstores.length > 1 ? "Other stores" : null}</b>
              </div>
             {similiarstores && similiarstores.length > 1 && similiarstores.map(product=>
                  <div className={props.store ? "col-6 col-md-4 col-lg-3 mb-1" : "col-6 col-md-3 col-lg-2 mb-1"} style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%"}}  key={product.productId} >        
                  <div style={{padding:"5px"}}  className={`hoveredapp  unhoveredapp`}>
                 <div>
                   <center style={{position:"relative"}}>
                   <span  style={{position:"absolute",fontSize:"30px",top:"10px",left:"10px", color:"orange"}}></span>
                   {product.stock === 0 ?
                   <div style={{position:"absolute",height:"100%", width:"100%",backgroundColor:"rgba(245,245,245,0.6)"}}>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"3px",top:"50%"}}><span className='fa fa-ban'></span> Out Of Stock</b>
                   </div>
                : null}
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",position:"absolute",right:"5px",top:"5px"}}>{product.discount ? `-${product.discount}%` : null}</b>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"grey",backgroundColor:"rgba(245, 245, 245,0.9)",position:"absolute",left:"5px",top:"5px"}}>{product.stock > 0 && product.stock < 5 ? `limited` : null}</b>
                   <small style={{position:"absolute",fontSize:"15px",bottom:"5px",right:"5px",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
                   <img onClick={()=>setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg}` || false)}  className="mainImg img-responsive dataimages"  src={`https://cdn5.vectorstock.com/i/1000x1000/23/44/shopping-cart-icon-vector-402344.jpg`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div> 
       <div className="row" style={{width:"100%"}}>
         </div>
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>opendetails({details:product.details,productId:product.productId})}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
               </div>          
               {product.discount ?
              <div>
               <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {product.mainprice}</small>
               
                </div> 
                : 
                <br/>
                }
                <div>
               {product.numofrating && product.numofrating > 0 
               ?  
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${product.rating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
               </div>
               : null} 
                 <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formatermain(product.timeadded)}</small></div> 
                 <div>
                  <b className="badge" style={{fontSize:"12px",fontWeight:"lighter",color:"grey",backgroundColor:"rgba(245,245,245,0.5)"}}>{product.product_store && product.product_store.length > 20 ? product.product_store.slice(0,20) + "..." : product.product_store}</b>
                
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${product.averagerating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({product.averagerating || 0}) </small>
               </div>
                 <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"12px"}}><span className="fa fa-map-marker mr-1" style={{color:"indianred",fontSize:'14px'}}></span><b>{product.lga}</b>, {product.state}</small>
          
                 </div>       
                 </div>       
               <center  >     
               <button  type="button" onClick={()=>addtocart({productId:product.pid, details:product.details})}  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
               {product.stock > 0 ? "Buy from this seller" : "Out Of Stock"}<b>{product.quantity ? 
                <span style={{color:"lightgrey"}}><span className='fa fa-shopping-cart'></span> ({product.quantity})</span>: null}</b>
                </small>
                </button>
               </center>
               </div>    
               </div>      
         </div> 
                )}
             </div>
            </div>

            <div className='container'>
              <div className='row'>
                <div className='col-12'>
                  <small style={{fontWeight:"bolder", color:'grey'}}>Closest Dispatch </small></div>
                 </div>        
                <div className='row' style={{padding:'3px 10px'}}>
                <div className='col-12 col-md-6 col-lg-4'>
                <div style={{display:"flex",flexWrap:"nowrap",width:"100%"}}>
                    <div style={{width:"30%"}}>
                     <img style={{width:"100%",borderRadius:"50%",padding:"10px",height:"80px"}} src={productDetails.images && JSON.parse(productDetails.images).length > 3  ? `https://res.cloudinary.com/fruget-com/image/upload/store/${Object.values(JSON.parse(productDetails.images))[0]}` : `https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg?auto=format&h=200` } />
                    </div>
                    <div style={{width:"70%",marginTop:"20px"}}>
                    <small style={{fontSize:"13px"}}> <span style={{textTransform:"capitalize"}}>{availabledispatchers[0] && availabledispatchers[0].dispatch_name}  <small style={{borderRadius:"10px",cursor:"pointer",color:"white",padding:"1px 3px",backgroundColor:"grey"}} >{availabledispatchers[0] && availabledispatchers[0].dispatch_type}</small></span></small><br/>
                    <small style={{border:"1px solid lightgrey",cursor:"pointer",color:"grey"}} onClick={()=>opensellerprofile(availabledispatchers[0] && availabledispatchers[0].dispatch_customerId)}>view profile</small>
                    </div>
                </div>
              </div>
                <div className='col-12 col-md-6 col-lg-4' style={{marginTop:"20px"}}>
             <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${availabledispatchers[0] && availabledispatchers[0].dispatchrating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({availabledispatchers[0] && availabledispatchers[0].dispatchrating}) <small style={{color:"grey",fontWeight:'bold',letterSpacing:"0.01px"}}>{availabledispatchers[0] && availabledispatchers[0].dispatch_numofrating} people rated this dispatch</small></small>
               </div></div>
             <div className='col-12 col-md-6 col-lg-4'> <small>{availabledispatchers[0] && availabledispatchers[0].dispatch_address}</small><br/><br/>
             {availabledispatchers[0] && availabledispatchers[0].dispatch_followers && JSON.parse(availabledispatchers[0].dispatch_followers).includes(userdetails.customerId)
               ?
               <button onClick={()=>unfollowdispatch(availabledispatchers[0] && availabledispatchers[0].dispatchId)} className='btn' style={{float:'right',backgroundColor:"white",border:'1px solid blue',boxShadow:'none',padding:"0px 2px"}}>
               <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >unFollow</span> dispatch</small>
            </button>
            :  
            <button onClick={()=>followdispatch(availabledispatchers[0] && availabledispatchers[0].dispatchId)} className='btn btn-primary' style={{float:'right',border:"0",boxShadow:"none",padding:"0px 2px"}}>
            <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >Follow</span> dispatch</small>
         </button>}
                <button className='btn' style={{color:"white",backgroundColor:'orange'}}><span className='fa fa-envelope-o'></span></button>
         <button className='btn ml-2' style={{color:"white",backgroundColor:'orange'}}><span className='fa fa-phone-square'></span></button>
        
             </div>     
             <div className='col-12 col-md-6'>             
               <small style={{fontSize:"13px"}}><b>{availabledispatchers[0] && availabledispatchers[0].dispatch_verifieddispatch}</b> completed dispatches </small><br/>
              {availabledispatchers[0] && availabledispatchers[0].dispatch_verifieddispatch > 0 ? <small style={{fontSize:'11px', fontWeight:"bold", color:"grey"}}>Last dispatch was {formateronlymain(availabledispatchers[0] && availabledispatchers[0].dispatch_verifieddispatch_time)}<br/></small> : null}
               <small style={{fontSize:"13px"}}>{availabledispatchers[0] && availabledispatchers[0].dispatch_followers && JSON.parse(availabledispatchers[0].dispatch_followers).length || 0} People are following {productDetails.company_name}</small> <br/>
                <small style={{fontSize:"13px"}}><span style={{textTransform:"capitalize"}}>{availabledispatchers[0] && availabledispatchers[0].about_business}</span></small><br/>
                </div>
             </div>
                
             
            </div>
               <hr/>
               <div className='mt-3 mb-3 container'>
        <SimiliarCategory brand={productDetails.brand} category={productDetails.category} subcat1={productDetails.subcat1} subcat2={productDetails.subcat2}/>
               </div>
               <br/>
               <br/>
{/* <div style={{width:"50vw"}}>
  <MapContainer lat={8.5244905} lng={3.3792885} style={{width:"50vw",overflow:"hidden"}}/>
</div> */}
             <div className="col-12" style={{backgroundColor:'white',padding:"0px",marginTop:"40px",boxShadow:"2px 3px 3px 3px lightgrey"}}>
             <div style={{backgroundColor:"orange",margin:"0px",padding:"0px"}}>
                   <p style={{ fontWeight:"bolder",textTransform:"uppercase",textAlign:"center",padding:"10px",fontSize:"14px",color:"white"}}>Model / Entry Text / Features :</p>
                   </div>
               <center>
                   <p style={{textTransform:"uppercase",fontWeight:"bold",padding:"10px 30px", textAlign:"center"}}>{productDetails.model}</p>
         <small style={{width:"100%",padding:"40px",textTransform:"uppercase"}}>{(productDetails.entrytext)}</small>
         <br/>
         <br/>
         <small style={{fontWeight:"bolder", fontSize:"14px", textTransform:"uppercase"}}>  <span className='fa fa-history mr-2 '></span> Product History</small><br/>
         <small>Over <b>{productdetailshistory.prodhis && productdetailshistory.prodhis.totalquantity || 0} units</b> sold in last {formattime(productDetails.timeadded)}</small><br/>
         <small>Over <b>{productdetailshistory.prodhis && productdetailshistory.prodhis.totalcounter || 0} orders</b> </small><br/>
         <small> <b>{productcomments.length || 0} people</b> have rated in the last {formattime(productDetails.timeadded)}</small><br/>
         <small> <b>{productcomments.length || 0} people</b> have rated <b>over 3/5</b> in the last {formattime(productDetails.firstpurchase)}</small><br/>
         <br/>
         <br/>
         <small style={{fontWeight:"bolder", fontSize:"14px", textTransform:"uppercase"}}>  <span className='fa fa-history'></span>  <span className='fa fa-user mr-2 '></span> Your History with this product</small><br/>
         <small>You have ordered  <b>{productdetailshistory.myprodhis && productdetailshistory.myprodhis.mycounter || 0} times</b> </small><br/>
         <small>You have purchased <b>{productdetailshistory.myprodhis && productdetailshistory.myprodhis.myquantity || 0} units</b> sold in last {formattime(productDetails.myfirstpurchase)}</small><br/>
             {productDetails.brand === "lg" ? <small style={{color:"grey"}}>
             The image of the product are for illustration purpose only and may differ from actual product.
51% Energy Saving In Refrigerator with Inverter Linear Compressor(ILC).
 Based on third party test under standard test conditions (ISO 15502) conducted exclusively for energy consumption,
  Models tested GBB530NSQWB (Reciprocating Compressor),
  GBB530NCXE (Inverter Linear Compressor).
 Actual Results may vary from model to model and also depends upon the kind of usage under general conditions.
             </small> : null}
        
         <div className="row">
            <div style={{display: "flex", flexWrap:"wrap", justifyContent:"space-between",overflow:"auto"}}>
         {productDetails.img1 && productDetails.featuresimg && productDetails.img1[2] && JSON.parse(productDetails.img1)[2] !== undefined ? Object.keys(JSON.parse(productDetails.featuresimg)).map(featureimg =>
         <div  key={featureimg} style={{padding:"15px"}}>

         <div style={{color:"grey"}}>{(featureimg)}</div>
          </div>         
         ) : null }
         
         </div>
        </div>
        </center> 
        </div>
        <br/><br/>
        <div className='col-12' style={{marginTop:"20px"}}>
        <SimiliarBrands brand={productDetails.brand} category={productDetails.category} subcat1={productDetails.subcat1} subcat2={productDetails.subcat2}/>
        </div>
<br/><br/>
        <div className="col-12 col-md-6 boxshadower" style={{boxShadow:"2px 3px 3px 3px lightgrey",marginTop:"40px",padding:"0"}} >
                   <div style={{backgroundColor:"orange",margin:"0px",padding:"0px"}}>
                   <p style={{ fontWeight:"bolder",textTransform:"uppercase",textAlign:"center",padding:"10px",fontSize:"14px",color:"white"}}>some Other Features :</p>
                   </div>
                {productDetails.features !== null && productDetails.features ? JSON.parse(productDetails.features).split(',').map(feature =>
                <div style={{ padding:"1px",margin:"0px"}}>
                <small>
            <ul key={feature} >
                <li style={{textTransform: "capitalize"}}>{(feature)}</li>
            </ul>   
            </small>   
            </div>      
                ) : "N/A"}
                </div>
         
               
            {productDetails.img1 && JSON.parse(productDetails.img1)[4] !== undefined ?    
              <div className="col-12 col-md-6"  style={{marginTop:"40px"}}>
               <img id="mainImg" src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${productDetails.img1 ? JSON.parse(productDetails.img1)[4] : null}`} style={{boxShadow:"2px 3px 3px 3px lightgrey",width:"100%",display:"block"}} className="bigdeviceimgshowcase img-responsive"></img>
              </div>  : 
           <div className="col-6" style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
           {productDetails.featuresimg && JSON.parse(productDetails.featuresimg) !== null ? Object.keys(JSON.parse(productDetails.featuresimg)).map(featureimg =>
            <div key={featureimg} style={{padding:"15px"}}>
                <img src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory/productDetails.category}/${JSON.parse(productDetails.featuresimg)[featureimg]}`} alt=""/>
           <p style={{color:"grey"}}>{featureimg}</p>
            </div> 
           ) : null}
           </div>
           } 
            <br/>
      



<div className="row">
  <div className='col-12'>
  {productDetails.productdescription && productDetails.productdescription.length > 0 ? 
         <center className="boxshadower" id="abouttheproduct" style={{padding:"20px",marginTop:"40px",marginBottom:"30px"}}>
         <h3>ABOUT THE PRODUCT</h3>
         <small style={{textTransform:"capitalize"}}>
         {(productDetails.productdescription)}
         </small> <br/>
         </center>
         : null }
       </div>       
       {productDetails.img1 && JSON.parse(productDetails.img1)[2] !== undefined ?    
           <div className="col-12 col-md-6"  style={{marginTop:"40px"}}>
            <img id="mainImg" src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${productDetails.img1 ? JSON.parse(productDetails.img1)[2] : null}`} style={{boxShadow:"2px 3px 3px 3px lightgrey",width:"100%",display:"block"}} className="bigdeviceimgshowcase img-responsive"></img>
           </div>  : null}
        { productDetails.maintenance && productDetails.maintenance.length > 0 ?
                <div className="col-12 col-md-6" style={{boxShadow:"2px 3px 3px 3px lightgrey",marginTop:"40px",padding:"0px"}}>
                 <div style={{backgroundColor:"orange",margin:"0px",padding:"0px"}}>
                   <p style={{ fontWeight:"bolder",textTransform:"uppercase",textAlign:"center",padding:"10px",fontSize:"14px",color:"white"}}>usage & maintenance :</p>
                   </div>

                {productDetails.maintenance && productDetails.maintenance !== null ? JSON.parse(productDetails.maintenance)["usage"].split(',').map(usage =>
                <small>                  
                    <ul key={usage} >
                <li style={{textTransform: "capitalize"}}>{usage}</li>
               </ul>   
                </small>           
                ) : null}
                </div>
                : null}
            </div>
        
           {productDetails.branddescription && productDetails.branddescription.length > 0 ? 
    <center id="aboutthebrand" className="boxshadower" style={{padding:"20px",margin:"20px"}}>
           <h3>ABOUT THE BRAND</h3>
         <small style={{textTransform:"capitalize"}}>
         {(productDetails.branddescription)}
         </small>
         </center>
         : null}
         <br/>
          <br/><br/>
                <div className="col-12 col-md-6 " style={{marginTop:"50px"}} >
                    <div style={{border: "0.5px solid lightgrey", padding:"0px", margin:"0px"}}>
                    <div style={{backgroundColor:"orange",margin:"0px",padding:"0px"}}>
                   <p style={{ fontWeight:"bolder",textTransform:"uppercase",textAlign:"center",padding:"10px",fontSize:"14px",color:"white"}}>Specifications :</p>
                   </div>
                        <small style={{padding:"20px"}}>
                <b style={{marginLeft:"10px"}}>Brand : {productDetails.brand}</b><hr/>
                <b style={{marginLeft:"10px"}}>Model : {productDetails.model}</b><br/>
                <b style={{marginLeft:"10px"}}>Color : {productDetails.color}</b><br/>
                <b style={{marginLeft:"10px"}}>Colours : </b> {productDetails.coloursavail && JSON.parse(productDetails.coloursavail) ?
                 JSON.parse(productDetails.coloursavail).split(",").map((color, i)=>
                 <span key={color}>
                     <span style={{fontWeight:`${productDetails.color === color ? "bold" : ""}`}}> {color}
      <span className="ml-1 mr-1 " style={{borderRadius:"60%",fontSize:"8px",lineHeight:"0.2px",margin:"0px",padding:"0px 5px",border:"1px solid grey",backgroundColor:`${color}`,color:`${color}`}}><small>.</small></span> 
     <span>{i + 1 < JSON.parse(productDetails.coloursavail).split(",").length ? ", " : null}</span>
                     </span>
                 </span>  
              )  : null}
           <br/>
            <b style={{fontWeight:"bold",marginLeft:"10px"}}>Sizes : </b>
                {productDetails.inchesavail && JSON.parse(productDetails.inchesavail).split(",").length > 0 ? JSON.parse(productDetails.inchesavail).split(",").map((inches, i)=>
            <span key={inches}>
                  <span style={{fontWeight:`${productDetails.inches === inches ? "bold" : ""}`}}> {inches}
                  <span>{i + 1 < JSON.parse(productDetails.inchesavail).split(",").length ? ", " : null}</span>
                  </span>
              </span>  
           )  : null}
           {productDetails.litresavail && JSON.parse(productDetails.litresavail).split(",").length > 0 ? JSON.parse(productDetails.litersavail).split(",").map(litres=>
              <div key={litres}>
                  <span style={{fontWeight:`${productDetails.litres === litres ? "bold" : ""}`}}> {litres}</span>
              </div>  
           )  :  null}  
          {productDetails.wattageavail && JSON.parse(productDetails.wattageavail).split(",").length > 0 ? JSON.parse(productDetails.wattageavail).split(",").map(wattage=>
              <div key={wattage}>
                  <small > {wattage}</small>
              </div>  
           )  :  null} 
            {productDetails.kilogramavail && JSON.parse(productDetails.kilogramavail).split(",").length > 0 ? JSON.parse(productDetails.kilogramavail).split(",").map(kilogram=>
              <div key={kilogram}>
                  <small style={{textTransform:"uppercase"}}> {kilogram}</small>
              </div>  
           )  :  null} 
          <br/>
                <b style={{marginLeft:"10px"}}>Capacity: {productDetails.size}{productDetails.subcat1==="refrigerator" ? " Litres" : productDetails.subcat1==="fan" ? " inches" : " kg" }</b><br/>
                <b style={{marginLeft:"10px"}}>Weight : {productDetails.weight || null}</b><br/>
                <b style={{marginLeft:"10px"}}>Sku Code : 20202908{productDetails.productId}</b><br/>
                <b style={{marginLeft:"10px"}}>Store : {productDetails.store}</b><br/>
                <b style={{marginLeft:"10px"}}>Ratings : {productDetails.numOfRating || 0}</b><br/>
                <b style={{marginLeft:"10px"}}>Total no of searches : {productDetails.rating}</b><br/>
        </small>
                    </div>               
                </div>
                <div className="col-12 col-md-6 " style={{marginTop:"50px"}} >
                {productDetails.img1 && JSON.parse(productDetails.img1)[3] !== undefined ?    
           <div className="col-12 col-md-6"  style={{marginTop:"40px"}}>
            <img src={`https://res.cloudinary.com/fruget-com/image/upload/${productDetails.generalcategory}/${productDetails.category}/${productDetails.img1 ? JSON.parse(productDetails.img1)[3] : null}`} style={{boxShadow:"2px 3px 3px 3px lightgrey",height:"100%",width:"100%",display:"block"}} className="bigdeviceimgshowcase img-responsive"></img>
           </div>  : null}
                  </div>
            </div>
            : null}
          
             <div className="row" id="comments" style={{marginTop:"50px",position:"sticky", top:"0px"}}>
               <div className="col-12" style={{boxShadow: "2px 3px 3px 3px  lightgrey", borderRadius:"5px",backgroundColor:`${userdetails.background}`,color:`${userdetails.background === "black" ? "white":"black"}`,padding:"10px"}}>
   <small style={{fontSize:"15px"}}>Customer Reviews {allproductDetails.length === 1 ? null : allproductDetails.length}</small>
   {productDetails
   ? 
   <button style={{float:"right",backgroundColor:"orange",color:"white"}} 
   className="btn active" 
   onClick={()=>showratemodal(productDetails.pid)} >
       <small style={{textTransform:"uppercase",fontWeight:"bolder"}}>Rate ({productcomments && productcomments.length})</small>
     </button>
      :
      <button style={{float:"right"}} 
   className="btn btn-default" 
   onClick={()=>showratemodal(productDetails.pid)} >
    
       Rate ({productcomments && productcomments.length}) <span className="fa fa-ban"></span>
    
     </button>
      }<br/>
            
               {productcomments && productcomments.length > 0 ?
                <div className="row">
                <div className="col-12 col-md-3">
                    <small style={{padding:"0px",margin:"0px"}}>RATING ({avgrating && avgrating.avgrating && (avgrating.avgrating).toFixed(2) || 0} ) </small><br/>
               <small style={{fontSize:"20px",fontWeight:"bold"}}>{avgrating && avgrating.avgrating && (avgrating.avgrating).toFixed(2)} </small><br/>
             <div className="outer" style={{fontSize:"10px",padding:"0px"}}>
             <div className="inner" style={{width:`${avgrating && avgrating.avgrating && (avgrating.avgrating)*20 || 0}%`}}>
                </div>
               </div>
                </div>
                <div className="col-12 col-md-9" style={{overflow:"hidden"}}>
                <small style={{padding:"0px",margin:"0px"}}>REVIEWS/ COMMENTS ({productcomments.length || 0} ) </small>
                <hr/>
                <div style={{overflow:"hidden",position:"relative",width:'100%',height:`${productcomments && productcomments.length > 2 && productcomments.length < 4 ? "300px" : productcomments && productcomments.length >= 4 ? "400px" : "150px"}`}}>
                <div style={{height:`${productcomments && productcomments.length > 2 && productcomments.length < 4 ? "300px" : productcomments && productcomments.length >= 4 ? "400px" : "150px"}`,position:'absolute',width:'100%',right:"-25px",overflowY:"scroll",overflowX:"hidden"}}>
                {productcomments.length > 0 && productcomments[0].maincomment ? productcomments.map((comment)=> 
                  <div style={{lineHeight:"16px",fontSize:"12px",borderBottom:"1px solid lightgrey"}}>       
                         <div className="row" style={{padding:"10px",position:"relative"}}>
                          <div className="col-1" style={{padding:"0px",margin:"0px"}}>
                          <img src={comment.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${comment.image}`: require(`./maleprofile.png`)} style={{width:"100%",padding:"0px",borderRadius:"50%",border:"1px solid lightgrey",margin:"3px 0px",height:"60px"}} alt="" />
                          </div>
                          <div className="col-10" style={{padding:"0px 0px 0px 5px",marginBottom:"10px"}}>
                          <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {comment.name || "Anonymous"} </small>
                          <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified Purchase</span></small>
                                           
                   <div style={{padding:"2px"}}>
                       <small style={{padding:"3px 0px"}}>
                        <small style={{fontSize:"13px"}}> {comment.maincomment}</small></small>
                        <small style={{float:"right",clear:"left",padding:"8px"}}>
                           <div className="outer" style={{fontSize:"10px"}}>
                   <div className="inner" style={{fontSize:"8px",width:`${(comment.mainrating)*20 || 0}%`}}>
                   </div>
                   </div></small><br/>
                        </div>
                  <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comment")}>Reply.</small>
                  <small className="likebutton ml-2" style={{fontSize:'13px'}} >
                    <span style={{fontSize:"17px",color:`${comment.likes && JSON.parse(comment.likes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} className="fa fa-thumbs-up" onClick={()=>likecomment(comment.productratingId)} ></span>
                     <span className="ml-1">
                    {comment.likes && JSON.parse(comment.likes) ? JSON.parse(comment.likes).length : 0}
                     </span>
                 </small>
                  <small className="likebutton" style={{fontSize:'13px',marginLeft:"40px"}} >
                    <span style={{fontSize:"17px",color:`${comment.dislikes && JSON.parse(comment.dislikes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} className="fa fa-thumbs-down" onClick={()=>dislikecomment(comment.productratingId)}></span>
                     <span className="ml-1">
                     {comment.dislikes ? JSON.parse(comment.dislikes).length : 0}
                     </span>
                  </small>
                  <br/><br/>
                  </div>
                 
                  <small style={{marginTop:"10px",bottom:"0",position:'absolute',fontSize:'11px',right:'50px',padding:"0"}} className="ml-2 text-muted">{formater(comment.commenttime)}</small>
                  </div>
                  </div>            
                ) : null}
                </div>
                </div>
                </div>
                </div>
       : <center> 
         <span style={{fontSize:"40px"}} className="text-muted fa fa-comments"></span>
         <p>No Reviews Yet</p>
         </center>}
               </div>
               
           </div>  
        </div>
        </div>
        </div>
     );
    }
}

export default Details;