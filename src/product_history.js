import React, { useState, useEffect,useContext } from 'react';
import { formater } from './formatTime';
import { userContext } from './usercontext';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom"
import axios from 'axios';


export const Product_History = function Product_History(props) {
    const context = useContext(userContext)
    const [loading, setloading] = context["loading"]
    const [redirect, setredirect] = context["redirect"]
    const [visitedproducts, setvisitedproducts]=  context["visitedproducts"]
   // const [hovergrid, setHovergrid] = useState("unhoveredapp")
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [displaydetail, setdisplaydetail] = useState(false)
    const [productDetails, setProductDetails] =useState(null)
    const [allproductDetails, setAllProductDetails] = useState([])
     const [hovergrid, setHovergrid] = useState("unhoveredapp")

     const navigate = useNavigate()

    const opendetails=(properties)=>{
        navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
        setloading(true)
        axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
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
      
       }
       const hoverapp =()=>{
       // setHoverlist("hoveredapp")
        setHovergrid("hoveredapp")
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
        axios.get(`https://new-frugetbackend-productions.up.railway.app/client/addtocart?productId=${properties.productId}&tkt=${Cookies.get("tktplc")}&nayv=${realprint}`)
       .then(res =>{
        alert(res.data.status)
        if(res.data.status === "success"){     
          //  setuserdetails(res.data.userdetails[0])
            setalertmessage(`'${properties.details}' added successfully`)
            setrequeststatus(res.data.status)
            setmodaldisplay("block")
            setloading(false)
            settargetmodal("cart")
            alert("added successfully")
        }else{
          alert("couldnt add")
            setalertmessage(res.data.message)
           alert(res.data.message)
            setmodaldisplay("block")
            setrequeststatus(res.data.status)
            settargetmodal("cart")
            setloading(false)
        }
       })
       .catch(err => console.log(err))
      }
    return ( 
      <div className='container-fluid'>
          <div className='row recently_visited' style={{padding:"10px"}}>
        <div className='col-12'>
        <p>Recently Visited  </p>
        </div>
        {visitedproducts.map(product =>
            <div className={`${props.lg ? "col-6 col-md-4 col-lg-3 mb-1" :"col-6 col-md-4 col-lg-3 mb-1"}`} style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%",position:"relative"}}  key={product.productId} >        
            <div style={{padding:"5px"}} onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
           <div>
             <center style={{position:"relative"}}>
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
           <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"10px"}}><b style={{color:"orange"}}>{product.store}</b> @ <span className="fa fa-map-marker-alt"></span>{product.lga}</small>
           <br/>
           <small><i style={{color:"green"}}>{formater(product.time)}</i></small>
          </div>       
         <center  >     
         <button  type="button" onClick={()=>addtocart({productId:product.productId, details:product.details})}  className="btn addtocartbtn smaddtocartbtn" >
          <small>
          ADD TO CART
          </small>
          </button>
         </center>
         </div>    
         </div>      
   </div> 
          )}
      </div>
      </div>
     );
}
export const Verified_Sales = function Verified_Sales(props) {
    const context = useContext(userContext)
    const [loading, setloading] = context["loading"]
    const [redirect, setredirect] = context["redirect"]
    const [visitedproducts, setvisitedproducts]=  context["visitedproducts"]
    const [completed_purchase, setcompleted_purchase] = context["completed_purchase"]
   // const [hovergrid, setHovergrid] = useState("unhoveredapp")
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [displaydetail, setdisplaydetail] = useState(false)
    const [productDetails, setProductDetails] =useState(null)
    const [allproductDetails, setAllProductDetails] = useState([])
     const [hovergrid, setHovergrid] = useState("unhoveredapp")

     const navigate = useNavigate()

     const opendetails=(properties)=>{
        navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
        setloading(true)
        axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
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
      
       }

    return (
        <div className='container'>
              <div classname="row verified_purchases">
      <p>Verified Purchases ({completed_purchase.length}) <span className='fa fa-check-circle-o text-primary'></span></p>
      {completed_purchase.map(product=>
          <div className={`col-12`} style={{marginBottom:"10px",borderBottom:"1px solid grey",width:"100%",padding:"10px",display:"inline-block",height:"100%",position:"relative"}}  key={product.productId} >        
           <div className='row'>
            <div className='col-3'>
            <img className="img-responsive" style={{width:"100%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>  
            </div>
            <div className='col-9 col-md-9' style={{padding:"5px",fontSize:"14px",color:`${product.cartstatus === "cleared" ? "rgb(160,160,160)" : "black"}`}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Item:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p onClick={()=>opendetails({details:product.details,productId:product.productId})} style={{padding:"0",margin:"0",cursor:"pointer"}}>{product.details}</p></div>
                </div>
              
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='col-5 col-md-4' style={{textTransform:"uppercase",fontWeight:"lighter"}}><small style={{fontWeight:"bold"}}>Quantity:</small></div>
                    <div className='col-2' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0"}}>{product.quantity}</p></div>
                   
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>SKU code:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>01000{product.productId}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Rating:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{product.amount}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='col-4 col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Total:</small></div>
                    <div className='col-8 col-md-4' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",fontWeight:"bold"}}>{product.total}</p>
                  </div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>time ordered:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{product.brand}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>time recieved:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{product.color}</p></div>
                </div>
               
             </div>
           </div>
        </div>
        )}
    </div>
        </div>
      );
}
