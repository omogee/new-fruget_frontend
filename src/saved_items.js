import React, { useState, useEffect, useContext } from 'react';
import axios from "axios"
import {Link} from "react-router-dom"
import { userContext } from './usercontext';
import Cookies from "js-cookie"
import Login from './login';
import { formater } from './formatTime';
import Details from './details';
import "./main.css"
import {useNavigate} from "react-router-dom"


function SavedItems(props) {
  const context = useContext(userContext)
  const [currentPage, setcurrentPage] = context["currentpage"]
 const [savedProducts,setsavedProducts] = context["savedproduct"]
 const [loading, setloading] = context["loading"]
 // const [savedproducts, setsavedproducts] = useState([])
 const [displaydetail, setdisplaydetail] = useState(false)
 const [productDetails, setProductDetails] =useState(null)
 const [allproductDetails, setAllProductDetails] = useState([])
  const [hovergrid, setHovergrid] = useState("unhoveredapp")
  const [hoverlist, setHoverlist] = useState("")
  const [redirect, setredirect] = context["redirect"]
  const [view, setview] = context["view"]
  const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
  const [alertmessage, setalertmessage] = context["alertmessage"]
  const [requeststatus, setrequeststatus] = context["requeststatus"]
  const [targetmodal, settargetmodal] = context["targetmodal"]
  const [userdetail, setuserdetails] = context["userdetail"]
  const [askingId, setaskingId] = useState("")
  const [askingdetails, setaskingdetails] = useState("")
  const [displayaskingmodal,setdisplayaskingmodal] = useState(false)
  const [loaded, setloaded] = useState(false)
  const [shoppingcart, setshoppingcart] = context["shoppingcart"]

  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)

useEffect(()=>{
  setcurrentPage("savedproducts")
  if(Cookies.get("tktplc")){
    setloading(true)
 axios.get(`http://localhost:5000/client/fetch_saveditems?tkt=${Cookies.get("tktplc")}`)
 .then(res =>{
  if(res.data.status === "success"){
   setsavedProducts(res.data.savedItems)
  }else{
  if(res.data.message === "unauthorized"){
   setredirect(true)
  }
  }
  setTimeout(()=> setloading(false),500)
  setloaded(true)
})
 .catch(err => console.warn(err))
  }else{
    setredirect(true)
  }
},[])
const asktodelete=(properties)=>{
  setaskingId(properties.id)
  setaskingdetails(properties.details)
  setdisplayaskingmodal(true)
}
const deletefromsaved =(id)=>{
 setdisplayaskingmodal(false)
  if(Cookies.get("tktplc")){
    setloading(true)
    axios.get(`http://localhost:5000/client/delete_saveditems?tkt=${Cookies.get("tktplc")}&savedId=${id}`)
    .then(res =>{
     if(res.data.status === "success"){
      setsavedProducts(res.data.savedproducts)
      setaskingId("")
      setaskingdetails("")
      setTimeout(()=> setloading(false),1000)
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      settargetmodal("saved")
     }else if(res.data.status === "failed"){
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      setloading(false)
      settargetmodal("saved")
     }else{
      setredirect(true)
     }
   })
    .catch(err => console.warn(err))
  }else{
    setredirect(false)
  }
}
 const opendetails=(properties)=>{
  navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
  setloading(true)
  axios.get(`http://localhost:5000/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
  .then(res =>{ 
   if(res.data.status === "success"){
    setdisplaydetail(true)
    setProductDetails(res.data.details[0]) 
    setAllProductDetails(res.data.details) 
    setTimeout(()=>{
        setloading(false)
    },700)
   }else if(res.data.message === "unauthorized"){
    setloading(false)
    setredirect(true)
   }
 })
  .catch(err => console.log(err))
  // history=`/shop/details/${details}`
 }
 const hoverapp =()=>{
  setHoverlist("hoveredapp")
  setHovergrid("hoveredapp")
}
const changeview =(data)=>{
  setview(data)
  query.set("view", data)
  navigate(window.location.pathname+"?"+query.toString())
 }
 const addtocart=(properties)=>{
   setloading(true)
  const print =[
      navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
      ,navigator.deviceMemory,navigator.connection]
      print.unshift(window.screen.width)
      print.push(window.screen.height)

      const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
      const realprint = mainprint.substring(1, mainprint.length-1)
  axios.get(`http://localhost:5000/client/addtocart?productId=${properties.productId}&tkt=${Cookies.get("tktplc")}&nayv=${realprint}`)
 .then(res =>{
  if(res.data.status === "success"){     
    setshoppingcart(res.data.shoppingcart)
      setuserdetails(res.data.userdetails[0])
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      setloading(false)
      settargetmodal("cart")
  }else if(res.data.status ==="failed"){
    setalertmessage(res.data.message)
    setrequeststatus(res.data.status)
    setmodaldisplay("block")
    setloading(false)
    settargetmodal("cart")
  }
  else{
     setredirect(true)
  }
 })
 .catch(err => console.log(err))
}
if(displaydetail && productDetails){
  return(
      <div>
          <Details productDetails ={productDetails} allproductDetails={allproductDetails}/>
      </div>
  )
}
    return ( 
       <div className='container'>
       <div style={{position:"fixed",display:`${displayaskingmodal ? "block" : "none"}`,zIndex:"90000",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"10px",zIndex:"900000"}}>
            <center>
                <span onClick={()=>setdisplayaskingmodal(false)} style={{cursor:"pointer",fontWeight:"lighter",fontSize:"30px",color:"grey",position:'absolute',right:'10px',top:'0px'}}>x</span>
             
                <p style={{margin:"0",color:"grey"}}><span style={{color:"black"}}>PRODUCT <span className='fa fa-check-circle-o'></span> :</span><br/> "{askingdetails}"</p>
                <p style={{margin:"0",color:"indianred"}}>Are You Sure You want to Remove This product?</p>
                <br/>
                <br/>
                <div className='row'>
                    <div className='col-6'>
                        <button onClick={()=>setdisplayaskingmodal(false)} className="btn btn-warning">cancel</button>
                    </div>
                    <div className='col-6'>
                        <button onClick={()=>deletefromsaved(askingId)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </center>
            </div>      
            </div>
            <div className='row'>
                <div className='col-8'>
                  <p style={{textTransform:"uppercase"}}><span className='fa fa-heart' style={{color:"orange"}}></span> Saved Items ({savedProducts.length})</p>
                </div>
                <div className='col-2'>
               <div className='row'>
               <div className='col-6' style={{padding:"10px"}}>
                        <i className="fa fa-th" style={{color:`${view === "grid"  ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>changeview("grid")}></i>
                        </div>
                        <div className='col-6' style={{padding:"10px"}}>
                        <i className="fa fa-list" style={{color:`${view === "list" ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>changeview("list")}></i>
                        </div>
                </div>
               </div>
               </div>
               {loaded && savedProducts.length > 0 ? 
               <div className='row'>
            {view === "grid" && savedProducts && savedProducts.map(product=>
                  <div className={`${props.lg ? "col-6 col-md-4 col-lg-3 mb-1" :"col-6 col-md-4 col-lg-2 mb-1"}`} style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%",position:"relative"}}  key={product.productId} >        
                  <div style={{padding:"5px"}} onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
                 <div>
                  <span onClick={()=>asktodelete({details:product.details,id:product.savedProductId})} className='fa fa-trash fa-2x  deletebtn' style={{position:'absolute',zIndex:'5', top:"5px", right:"5px", color:"indianred"}}></span>
                   <center style={{position:"relative"}}>
                   {product.stock === 0 ?
                   <div style={{position:"absolute",height:"100%", width:"100%",backgroundColor:"rgba(245,245,245,0.6)"}}>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"3px",top:"50%"}}><span className='fa fa-ban'></span> Out Of Stock</b>
                   </div>
                : null}
                   <span  style={{position:"absolute",fontSize:"30px",top:"10px",left:"10px", color:"orange"}}></span>
                 <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",position:"absolute",right:"5px",top:"5px"}}>{product.discount ? `-${product.discount}%` : null}</b>
                   <small style={{position:"absolute",fontSize:"15px",bottom:"5px",right:"5px",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
                   <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div> 
       <div className="row" style={{width:"100%"}}>
         </div>
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>opendetails({details:product.details,productId:product.productId})}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details.length > 30 ? product.details.slice(0,30)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
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
                 <div className="inner" style={{width:`${product.productrating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
               </div>
               : null} 
               </div> 
                 <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.product_store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                 <br/>
                 <small><i style={{color:"green"}}>{formater(product.savedproduct_time)}</i></small>
                </div>       
               <center  >     
               <button  type="button" onClick={()=>addtocart({productId:product.productId, details:product.details})}  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
               {product.stock > 0 ? "ADD TO CART " : "Out Of Stock"}<b>{product.quantity ? 
                <span style={{color:"lightgrey"}}><span className='fa fa-shopping-cart'></span> ({product.quantity})</span>: null}</b>
                </small>
                </button>
               </center>
               </div>    
               </div>      
         </div> 
                )}
                  {view === "list" && savedProducts && savedProducts.map(product=>
                  <div className="col-12 col-md-6 col-lg-6" style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%"}}  key={product.productId} >        
                  
                  <div style={{padding:"5px"}} onMouseOver={hoverapp} className={`${hoverlist}  row`}>
                 <div className='col-5'>
                   <center style={{position:"relative"}}>
                   {product.stock === 0 ?
                   <div style={{position:"absolute",height:"100%", width:"100%",backgroundColor:"rgba(245,245,245,0.6)"}}>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"3px",top:"50%"}}><span className='fa fa-ban'></span> Out Of Stock</b>
                   </div>
                : null}
                   <span  style={{position:"absolute",fontSize:"30px",top:"10px",left:"10px", color:"orange"}}></span>
                 <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",position:"absolute",right:"5px",top:"5px"}}>{product.discount ? `-${product.discount}%` : null}</b>
                   <small style={{position:"absolute",fontSize:"15px",bottom:"5px",right:"5px",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
                   <img className="mainImg img-responsive" src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div className='col-6'> 
      
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>opendetails({details:product.details,productId:product.productId})}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 60 ? product.details.slice(0,60)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
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
               : <br/>} 
                 <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formater(product.time)}</small></div> 
                 <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
                 <br/>
                 <small><i style={{color:"green"}}>{formater(product.time)}</i></small>
                </div>       
               <center  >   
               <button  type="button" onClick={()=>addtocart({productId:product.productId, details:product.details})}  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
               {product.stock > 0 ? "ADD TO CART " : "Out Of Stock"}<b>{product.quantity ? 
                <span style={{color:"lightgrey"}}><span className='fa fa-shopping-cart'></span> ({product.quantity})</span>: null}</b>
                </small>
                </button>  
               </center>
               </div>    
               </div>      
         </div> 
                )}
                </div>
                : loaded && savedProducts.length === 0 ?
              <div style={{width:"100%"}}>
             <div style={{padding:"50px", position:'relative'}}>
              <center>
              <h1><span className='fa fa-heart-o' style={{color:"indianred",fontSize:"200px"}}></span></h1>
              <small style={{position:"absolute", top:"-20px",marginLeft:"30px", fontWeight:"bolder", fontSize:"100px", color:'indianred'}}>
                x
              </small>
              <p style={{color:"grey"}}>you haven't saved any product lately</p>
              <p><Link to={`/shop`}>Click here </Link> to explore our products </p>
              </center>
             </div>
              </div>
              : null}
       </div>
     );
}
export default SavedItems;