import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext } from 'react';
import { formater } from './formatTime';
import { useNavigate } from 'react-router-dom';
import { userContext } from './usercontext';
import Details from './details';
import { Link } from 'react-router-dom';
import {PaystackButton} from "react-paystack"
import {getDistanceFromLatLonInKm} from "./mapdistance"
import Geocode from "react-geocode"

function Shoppingcart(props) {
    const context = useContext(userContext)
    const [shoppingcart, setshoppingcart] = context["shoppingcart"]
    const [shoppingcarttotal, setshoppingcarttotal] = context["shoppingcarttotal"]
    const [savedProducts,setsavedProducts] = context["savedproduct"]
    const [loading, setloading] = context["loading"]
    const [userdetails, setuserdetails]=context["userdetail"]
    const [savedProductIds, setsavedProductIds] = useState([])
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [redirect, setredirect] = context["redirect"]
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [warningmodal, setwarningmodal] = useState(false)
    const [warningdetails, setwarningdetails] =useState({})
    const [mobiledevice,setmobiledevice] = context["mobiledevice"]
    const [productDetails, setProductDetails] =useState(null)
    const [allproductDetails, setAllProductDetails] = useState([])
    const [displaydetail, setdisplaydetail] = useState(false)
    const [loaded, setloaded] = useState(true)
    const [paymenttype, setpaymenttype] = useState("")
    const [paymentselectionmodal, setpaymentselectionmodal] = useState(false)
    const [storelat, setstorelat] = context["storelat"]
    const [coord, setcoord] = context["coord"]
    const [reg_coord, setreg_coord] = context["reg_coord"]
    const [sumtotalmain, setsumtotalmain] = context["sumtotalmain"]
    const [dispatchfee, setdispatchfee] = useState(0)
    const [setting, setsetting] = useState("list")
    const [curdispatchfee,setcurdispatchfee] = useState(0)
    const [quantityalertid, setquantityalertid]=useState("")

    const query= new URLSearchParams(window.location.search)
    const [config, setconfig] = useState( {
      reference: (new Date()).getTime().toString(),
      email: "user@example.com",
      text:"pay now",
  //    amount: 200000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: 'pk_live_108d5aa4d51072bf2e643ae38e8b8d5d256a734b',
      onSuccess:(reference) => {
        console.log(reference);
      },
      onClose:() => {
        console.log('closed')
      }
    })
    useEffect(()=>{
      setTimeout(()=>setquantityalertid(''),10000)
    },[quantityalertid])

    const navigate=useNavigate()
     useEffect(()=>{
      if(query.get("gby_z")){
        setsetting("grid")
      }
     },[query])
   
  useEffect(()=>{
      const getcurdistance = async()=>{
        return await parseInt(getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000);
      }
      document.querySelector(".overalldiv").addEventListener("click", ()=>{
        setwarningmodal(false)
      })
        setcurrentPage("shoppingcart")
        if(Cookies.get("tktplc")){
        if(!query.get("gby_z") || setting === "list"){
          setloading(true)
        axios.get(`http://localhost:5000/client/fetch_shoppingcart?tkt=${Cookies.get("tktplc")}`)
        .then(res =>{
          var totalregdispatch =0;
          var totalcurdispatch=0;
         if(res.data.status === "success"){
        setloaded(true)
         setdispatchfee(res.data.shoppingcart_sumtotal[0].totaldispatchfee)
           setsumtotalmain(res.data.shoppingcart_sumtotal[0].sumtotalmain)

           getcurdistance().then(value =>{
            for(var i =0; i<res.data.shoppingcart.length; i++){
             if(i > 0 && res.data.shoppingcart[i].store === res.data.shoppingcart[i-1].store){
             if(res.data.shoppingcart[i].itemsize === "small"){
               totalcurdispatch += (value*0.2)
               console.log("its a small item, same store",totalcurdispatch)
              }else if(res.data.shoppingcart[i].itemsize === "medium"){
               totalcurdispatch += (value*0.4)
               console.log("its a medium item, same store",totalcurdispatch)
              }else  if(res.data.shoppingcart[i].itemsize === "large"){
               totalcurdispatch += (value*0.5)
               console.log("its a large item, same store",totalcurdispatch)
              }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
               totalcurdispatch += (value*0.7)
               console.log("its a extra large item, same store",totalcurdispatch)
              }
             }else{
               if(res.data.shoppingcart[i].itemsize === "small"){
                 totalcurdispatch += (value*0.5)
                 console.log("its a small item, different store",totalcurdispatch)
                }else if(res.data.shoppingcart[i].itemsize === "medium"){
                 totalcurdispatch += (value*0.7)
                 console.log("its a medium item, different store",totalcurdispatch)
                }else  if(res.data.shoppingcart[i].itemsize === "large"){
                 totalcurdispatch += (value*1)
                 console.log("its a large item, different store",totalcurdispatch)
                }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
                 totalcurdispatch += (value*1.2)
                 console.log("its a extra large item, different store",totalcurdispatch)
                }
             }
            }
            setcurdispatchfee(totalcurdispatch)
           })
            setshoppingcart(res.data.shoppingcart)
            
           setconfig(prev => ({...prev, amount:res.data.shoppingcart_sumtotal[0].sumtotalmain*100}))
            setshoppingcarttotal(res.data.shoppingcart_sumtotal[0])
       
            setTimeout(()=>{
           setloading(false)
            },700)
         }else if(res.data.message === "unauthorized"){
            setloading(false)
            setredirect(true)
            setloaded(true)
            }
          })
        .catch(err => console.warn(err))
        }
        }else{
       setredirect(true)
        }
      
      },[userdetails, storelat,coord, setting])
  
    useEffect(()=>{
        const savedIds =[]
       for(let i=0; i<savedProducts.length; i++){
      savedIds.push(savedProducts[i].productId)
       }
      setsavedProductIds(savedIds)
    },[savedProducts])
    
    useEffect(()=>{
      if(Cookies.get("tktplc")){
      if(query.get("gby_z") || setting==="grid"){
        setsetting("grid")
          setloading(true)
        axios.get(`http://localhost:5000/client/fetch_groupedshoppingcart?tkt=${Cookies.get("tktplc")}`)
        .then(res =>{
         if(res.data.status === "success"){
            setshoppingcart(res.data.shoppingcart)
            setloaded(true)
           setconfig(prev => ({...prev, amount:res.data.shoppingcart_sumtotal[0].sumtotalmain*100}))
            setshoppingcarttotal(res.data.shoppingcart_sumtotal[0])
            setdispatchfee(res.data.shoppingcart_sumtotal[0].totaldispatchfee)
            setsumtotalmain(res.data.shoppingcart_sumtotal[0].sumtotalmain)
                  
            setcurdispatchfee(parseFloat(query.get("gby_z").split("sc")[1]))
      
            setTimeout(()=>{
           setloading(false)
            },700)
         }else if(res.data.message === "unauthorized"){
            setloading(false)
            setredirect(true)
            setloaded(true)
         }
          })
        .catch(err => console.warn(err))
        }
      }else{
       setredirect(true)
        }
    },[setting,query.get("gby_z") ,userdetails])

 const displayoutofstockerr =()=>{
  setalertmessage(`this item is out of stock`)
  setrequeststatus("failed")
  setmodaldisplay("block")
  settargetmodal("cart")
 }
  const updatequantity=(data)=>{
 
    const getcurdistance = async()=>{
      return await parseInt(getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000);
    }
    setloading(true)
    if((data.quantity === 1 && data.action === "decrease") || (data.quantity === 30 && data.action === "increase")){
    setloading(false)
    if(mobiledevice){
      setquantityalertid(data.id)
    }else{
      setalertmessage(`quantity cannot go above 20 or below 1 unit`)
      setrequeststatus("failed")
      setmodaldisplay("block")
      settargetmodal("cart")
    }
    }else{
      setquantityalertid("")
   axios.get(`http://localhost:5000/client/updatequantity?shoppingcartId=${data.id}&productId=${data.productId}&action=${data.action}&tkt=${Cookies.get("tktplc")}`)
   .then( res =>{
 if(res.data.status === "success"){
  var totalregdispatch =0;
  var totalcurdispatch=0;

  setdispatchfee(res.data.shoppingcart_sumtotal[0].totaldispatchfee)
  setsumtotalmain(res.data.shoppingcart_sumtotal[0].sumtotalmain)
        
   getcurdistance().then(value =>{
    for(var i =0; i<res.data.shoppingcart.length; i++){
     if(i > 0 && res.data.shoppingcart[i].store === res.data.shoppingcart[i-1].store){
     if(res.data.shoppingcart[i].itemsize === "small"){
       totalcurdispatch += (value*0.2)
       console.log("its a small item, same store",totalcurdispatch)
      }else if(res.data.shoppingcart[i].itemsize === "medium"){
       totalcurdispatch += (value*0.4)
       console.log("its a medium item, same store",totalcurdispatch)
      }else  if(res.data.shoppingcart[i].itemsize === "large"){
       totalcurdispatch += (value*0.5)
       console.log("its a large item, same store",totalcurdispatch)
      }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
       totalcurdispatch += (value*0.7)
       console.log("its a extra large item, same store",totalcurdispatch)
      }
     }else{
       if(res.data.shoppingcart[i].itemsize === "small"){
         totalcurdispatch += (value*0.5)
         console.log("its a small item, different store",totalcurdispatch)
        }else if(res.data.shoppingcart[i].itemsize === "medium"){
         totalcurdispatch += (value*0.7)
         console.log("its a medium item, different store",totalcurdispatch)
        }else  if(res.data.shoppingcart[i].itemsize === "large"){
         totalcurdispatch += (value*1)
         console.log("its a large item, different store",totalcurdispatch)
        }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
         totalcurdispatch += (value*1.2)
         console.log("its a extra large item, different store",totalcurdispatch)
        }
     }
    }
    setcurdispatchfee(totalcurdispatch)
   })
    setshoppingcart(res.data.shoppingcart)
    if(!mobiledevice){
    setalertmessage(`quantity updated successfully`)
    setrequeststatus(res.data.status)
    setmodaldisplay("block")
    settargetmodal("cart")
    }
    setconfig(prev => ({...prev, amount:res.data.shoppingcart_sumtotal[0].sumtotalmain*100}))
    setshoppingcarttotal(res.data.shoppingcart_sumtotal[0])
    
    setTimeout(()=> setloading(false),700)
 }else if(res.data.status === "failed"){
  setalertmessage(res.data.message)
  setrequeststatus(res.data.status)
  setmodaldisplay("block")
  settargetmodal("cart")
  setloading(false)
 }else{
  setloading(false)
  setredirect(true)
 }
   })
   .catch(err =>{ 
    console.warn(err)
  setloaded(true)})
   }
  }
  const deletecart =(shoppingcartId)=>{
  
    const getcurdistance = async()=>{
      return await parseInt(getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000);
    }
    setwarningmodal(false)
    setwarningdetails({})
    setloading(true)
   axios.get(`http://localhost:5000/client/deletecart?shoppingcartId=${shoppingcartId}&tkt=${Cookies.get("tktplc")}`)
   .then( res =>{
 if(res.data.status === "success"){
  var totalcurdispatch=0;

  setdispatchfee(res.data.shoppingcart_sumtotal[0].totaldispatchfee)
  setsumtotalmain(res.data.shoppingcart_sumtotal[0].sumtotalmain)
               
   getcurdistance().then(value =>{
    for(var i =0; i<res.data.shoppingcart.length; i++){
     if(i > 0 && res.data.shoppingcart[i].store === res.data.shoppingcart[i-1].store){
     if(res.data.shoppingcart[i].itemsize === "small"){
       totalcurdispatch += (value*0.2)
       console.log("its a small item, same store",totalcurdispatch)
      }else if(res.data.shoppingcart[i].itemsize === "medium"){
       totalcurdispatch += (value*0.4)
       console.log("its a medium item, same store",totalcurdispatch)
      }else  if(res.data.shoppingcart[i].itemsize === "large"){
       totalcurdispatch += (value*0.5)
       console.log("its a large item, same store",totalcurdispatch)
      }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
       totalcurdispatch += (value*0.7)
       console.log("its a extra large item, same store",totalcurdispatch)
      }
     }else{
       if(res.data.shoppingcart[i].itemsize === "small"){
         totalcurdispatch += (value*0.5)
         console.log("its a small item, different store",totalcurdispatch)
        }else if(res.data.shoppingcart[i].itemsize === "medium"){
         totalcurdispatch += (value*0.7)
         console.log("its a medium item, different store",totalcurdispatch)
        }else  if(res.data.shoppingcart[i].itemsize === "large"){
         totalcurdispatch += (value*1)
         console.log("its a large item, different store",totalcurdispatch)
        }else  if(res.data.shoppingcart[i].itemsize === "extra large"){
         totalcurdispatch += (value*1.2)
         console.log("its a extra large item, different store",totalcurdispatch)
        }
     }
    }
    setcurdispatchfee(totalcurdispatch)
   })

    setshoppingcart(res.data.shoppingcart)
    setalertmessage(`item deleted successfully`)
    setrequeststatus(res.data.status)
    setmodaldisplay("block")
    settargetmodal("cart")
    setconfig(prev => ({...prev, amount:res.data.shoppingcart_sumtotal[0].sumtotalmain*100}))
    setshoppingcarttotal(res.data.shoppingcart_sumtotal[0])
    setTimeout(()=> setloading(false),700)
 }else{
    alert(res.data.message)
    setloading(false)
 }
   })
   .catch(err => console.warn(err))
  }
  const saveItem=(data)=>{  
    if (savedProducts.length === 20){
        return alert("saved items cannot exceed 20")
    }
    setloading(true)
   if(Cookies.get("tktplc")){
    const tkt = Cookies.get("tktplc")
    axios.get(`http://localhost:5000/client/save_item?tkt=${Cookies.get("tktplc")}&productId=${data.productId}`)
    .then(res =>{
        if(res.data.status === "success"){
          setsavedProducts(res.data.savedItems)
           if(!mobiledevice){
            setalertmessage(`'${data.details}' saved successfully`)
           }else{
            setalertmessage(res.data.message)
           }
          setrequeststatus("success")
          setmodaldisplay("block")
          settargetmodal("save")
        }else{
          setalertmessage(res.data.message)
            setrequeststatus("failed")
            setmodaldisplay("block")
            settargetmodal("save")
        }
        setTimeout(()=>setloading(false),700)
    })
    .catch(err => console.warn(err))
   }else{
    setloading(false)
    setredirect(true)
   }
}
const unsaveItem=(data)=>{  
    if (savedProducts.length === 20){
        return alert("saved items cannot exceed 20")
    }
    setloading(true)
   if(Cookies.get("tktplc")){
    setloading(true)
    const tkt = Cookies.get("tktplc")
    axios.get(`http://localhost:5000/client/unsave_item?tkt=${Cookies.get("tktplc")}&productId=${data.productId}`)
    .then(res =>{
        if(res.data.status === "success"){
            setsavedProducts(res.data.savedItems)
          setalertmessage(`'${data.details}' unsaved successfully`)
          setrequeststatus("success")
          setmodaldisplay("block")
          settargetmodal("save")
        }else{
          setalertmessage(res.data.message)
            setrequeststatus("failed")
            setmodaldisplay("block")
            settargetmodal("save")
        }
        setTimeout(()=>setloading(false),700)
    })
    .catch(err => console.warn(err))
   }else{
    setredirect(true)
   }
}
const paymentsystemchange=(e)=>{
  setpaymenttype(e.target.value)
}
const submitcart =()=>{
   setloading(true)
    axios.get(`http://localhost:5000/client/submit_cart?tkt=${Cookies.get("tktplc")}&sumtotalmain=${sumtotalmain}&paymenttype=${paymenttype}`)
    .then(res =>{
       if(res.data.status === "success"){
       setshoppingcart(res.data.shoppingcart)
        setpaymentselectionmodal(false)
        setshoppingcarttotal(res.data.shoppingcart_sumtotal[0])
        setalertmessage(res.data.message)
        setrequeststatus(res.data.status)
        settargetmodal("cart")
        setmodaldisplay("block")
        setloading(false)
       }else if(res.data.status === "failed"){
        setalertmessage(res.data.message)
        setrequeststatus(res.data.status)
        settargetmodal("cart")
        setmodaldisplay("block")
        setloading(false)
       }
       else{
        setloading(false)
        setredirect(true)
       }
    })
    .catch(err => console.warn(err))
    
}
const deletecartwarning =(properties)=>{
    setloading(true)
    setwarningdetails(properties)
    setwarningmodal(true)
    setTimeout(()=>{
        setloading(false)
    },500)
 }
 const opendetails=(properties)=>{
  if(Cookies.get("tktplc")){
setloading(true)
axios.get(`http://localhost:5000/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
.then(res =>{ 
  setdisplaydetail(true)
  console.log(res.data.details[0])
  setProductDetails(res.data.details[0])
  setAllProductDetails(res.data.details) 
  setTimeout(()=>{
      setloading(false)
  },2000)
})
.catch(err => console.log(err))
// history=`/shop/details/${details}`
}else{
 setredirect(true)
}
}
const changesetting=()=>{
  if(query.get("gby_z")){
    setsetting("list")
    query.delete("gby_z")
  }else{
    setsetting("grid")
    query.set("gby_z", `${Math.floor(Math.random()*1000000000)}/78d${dispatchfee}sc${curdispatchfee}sbm${sumtotalmain}`)
  }
  navigate(window.location.pathname+"?"+query.toString())
}
if(displaydetail && productDetails){
  return(
      <div>
          <Details productDetails ={productDetails} allproductDetails={allproductDetails}/>
      </div>
  )
}
    return ( 
        <div className={props.lg ? "container-fluid" : 'container'} style={{marginBottom:"200px"}}>
           <div style={{display:`${paymentselectionmodal ? "block" : "none"}`,position:"fixed",zIndex:"999999900",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"30px",zIndex:"900000"}}>
           <span className="fa fa-times" onClick={()=>setpaymentselectionmodal(false)} style={{fontWeight:"lighter",fontSize:"20px",position:"absolute",right:"20px"}}></span>
           <center>
            <p>Amount Due: {shoppingcarttotal.sumtotal}</p>
         <p style={{fontWeight:"lighter",padding:"0",margin:"0"}}>
           <input type="checkbox" checked={paymenttype==="online" ? true : false} value="online" name="paymenttype" onChange={paymentsystemchange} /> I prefer Online Payment <span className='fa fa-credit-card'></span></p>
         <small style={{color:"grey",fontWeight:"lighter",fontSize:'12px'}}> * Please note that this payment is completely secured end-to-end and your details are inaccessible</small>
         <br/><br/>

         <p style={{fontWeight:"lighter",padding:"0",margin:"0"}}>
           <input style={{zIndex:"99999999"}} type="checkbox"  checked={paymenttype==="offline" ? true : false} value="offline" name="offline" onChange={paymentsystemchange} /> I would rather pay directly  <span className='fa fa-hand-o-right'></span></p>
         <small style={{color:"grey",fontWeight:"lighter",fontSize:'12px'}}>
          <p style={{color:"black",padding:"0",margin:"0"}}>* select your preferred means of communication the click "proceed"</p>
          <p style={{color:"black",padding:"0",margin:"0"}}> <span className='fa fa-phone-square'></span> 08169319476 <span style={{border:"1px solid grey",padding:"1px",borderRadius:"5px"}}> copy</span></p>
          <p className='mt-2' style={{color:"black",padding:"0",margin:"0"}}> <span className='fa fa-envelope'></span> yexies4ogb@gmail <span style={{border:"1px solid grey",padding:"1px",borderRadius:"5px"}}> copy</span></p>
           </small>
         <br/><br/>
         {paymenttype === "online" ?           
               <PaystackButton {...config} />
               : paymenttype === "offline" ? 
           <button className='btn' onClick={submitcart} style={{backgroundColor:"green",color:"white"}}>
            Proceed 
           </button>
           : null}
           </center>
          </div>
          </div>
               <div style={{position:"fixed",display:`${warningmodal ? "block" : "none"}`,zIndex:"90000",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"8px",zIndex:"999999900"}}>
            <center>
                <span onClick={()=>setwarningmodal(false)} style={{cursor:"pointer",fontWeight:"lighter",fontSize:"23px",color:"grey",position:'absolute',right:'3px',top:'0px'}}>x</span>
                <div className='row'>
                   <div className='col-7'>
                    <small style={{textTransform:"uppercase",textDecoration:"underline"}}>Item</small>
                    <p style={{color:"grey",fontWeight:"lighter",textTransform:"capitalize"}}> {warningdetails.details}</p>
                    </div>
                    <div className='col-5'>
                    <img className="img-responsive"  style={{padding:"5px",height:"90px",width:"100%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${warningdetails.gencat}/${warningdetails.cat}/${warningdetails.img || 'emptyimg.jpg'}`}  ></img>           
                    </div>
                   
                   </div>
                <p style={{margin:"0",color:"indianred"}}>Are You Sure You want to Remove This product?</p>
                <div className='row'>
                    <div className='col-6'>
                        <button onClick={()=>setwarningmodal(false)} className="btn btn-warning">cancel</button>
                    </div>
                    <div className='col-6'>
                        <button onClick={()=>deletecart(warningdetails.shopcartId)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </center>
            </div>      
            </div>
<div className='overalldiv'>
  

            {shoppingcart.length > 0 ?
            (mobiledevice || props.lg) ?
              <div className='row' style={{position:'sticky',top:"0",zIndex:"5625",backgroundColor:"white"}}>
                <div className='col-12 col-md-7'>
                <h5 style={{color:"indianred"}}>Shopping Cart  ({shoppingcart && shoppingcart.length})<span className='fa fa-shopping-cart'></span></h5>
                <small style={{padding:"2px",color:"grey",margin:"0"}}><span>Dispatch Fee(current location)</span>:  <span style={{fontWeight:"bold",padding:"0",color:"indianred",margin:"0"}}>
                {shoppingcarttotal.sumtotal ?
                 "₦"+ curdispatchfee.toFixed(2)
             : null}</span></small><br/>
                {parseInt(getDistanceFromLatLonInKm(reg_coord.lat, reg_coord.lng, storelat.lat, storelat.lng)*1000)  > parseInt(getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000)
                ? 
              <small style={{color:"grey",fontWeight:"lighter"}}>*considering the price of your current location, kindly update your registered address from your profile temporarily to save dispatch cost and enable a faster delivery</small>
            : null}
                </div>
              <div className='d-none d-md-block col-md-5' style={{padding:"1px",zIndex:"5",color:"white"}}>
                 <small style={{padding:"2px",color:"grey",margin:"0"}}><span>TOTAL</span>:  <span style={{fontWeight:"bold",padding:"0",color:"black",margin:"0"}}>{shoppingcarttotal.sumtotal ?
                 "₦"+shoppingcarttotal.sumtotal
             : null}</span></small><br/>
              <small style={{padding:"2px",color:"grey",margin:"0"}}><span>Dispatch Fee (registered location)</span>:  <span style={{fontWeight:"bold",padding:"0",color:"indianred",margin:"0"}}>{shoppingcarttotal.sumtotal ?
                 "₦"+ (dispatchfee.toFixed(2))
             : null}</span></small><br/>
              <small style={{padding:"2px",color:"grey",margin:"0"}}><span>SUM_TOTAL</span>:  <span style={{fontWeight:"bold",padding:"0",color:"green",margin:"0"}}>{shoppingcarttotal.sumtotal ?
                 "₦"+`${sumtotalmain}`
             : null}</span></small><br/>
                
             </div>        
            </div>
            :
              <div>
              <div style={{position:'fixed',padding:"1px",zIndex:"5",color:"white",backgroundColor:"white",border:"2px solid lightgrey", top:"40%", right:"10px"}}>
                 <small style={{padding:"2px",color:"grey",margin:"0"}}>SUMTOTAL: </small>
                 <p style={{fontWeight:"lighter",padding:"0",color:"black",margin:"0"}}>{shoppingcarttotal.sumtotal ?
                 "₦"+shoppingcarttotal.sumtotal
             : null}</p>
             </div>
             <h5 style={{color:"black"}}>Shopping Cart  ({shoppingcart && shoppingcart.length})<span className='fa fa-shopping-cart'></span></h5>
          
            </div>
            : null}
           {shoppingcart.length > 0 ?
           shoppingcart.map(shopcart=>
           <div>
             
             <div className='row' key={shopcart.details} style={{margin:"0px",padding:"0",borderBottom:"1px solid lightgrey"}}>
             <div className='col-4 col-md-3 col-lg-2' style={{position:"relative",width:"100%",margin:"0"}}>
             <img className="img-responsive"  style={{padding:"10px",height:"140px",width:"100%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${shopcart.generalcategory}/${shopcart.category}/${shopcart.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${shopcart.generalcategory}/${shopcart.category}/${shopcart.mainimg || 'emptyimg.jpg'}`} ></img>       
                  <button className='btn' onClick={()=>deletecartwarning({shopcartId:shopcart.shoppingcartId,details:shopcart.details, productId:shopcart.productId,gencat:shopcart.generalcategory,cat:shopcart.category,img:shopcart.mainimg})}  style={{padding:"3px 5px",fontSize:"25px",color:"indianred",position:"absolute",bottom:"0px",left:"0"}}>
                     <span className='fa fa-trash'></span>
                  </button>
                 {savedProductIds.includes(shopcart.productId) ?
                     <span className='fa fa-heart'  onClick={()=>unsaveItem({details:shopcart.details,productId:shopcart.productId})} style={{padding:"3px 5px",position:"absolute",bottom:"0px",right:"0",float:"right",fontSize:"25px",marginRight:"15px",color:"orange"}}></span>
                  : 
                  <span className='fa fa-heart-o' onClick={()=>saveItem({details:shopcart.details,productId:shopcart.productId})} style={{padding:"3px 5px",position:"absolute",bottom:"0px",right:"0",float:'right',fontSize:"25px",marginRight:"15px",color:"orange"}}></span>
              }
              </div>
             <div className='col-8 col-md-9 col-lg-10' style={{margin:"0",fontSize:"14px"}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-2 col-lg-1' style={{textTransform:"uppercase"}}>
                      <small style={{fontWeight:"bold"}}>Item:</small>
                    </div>
                    <div className='col-12 col-md-10 col-lg-11' style={{textTransform:"capitalize",fontSize:"12px"}}>
                      <p className='mt-1' onClick={()=>opendetails({details:shopcart.details,productId:shopcart.productId})} style={{padding:"0",margin:"0",cursor:"pointer"}}>{shopcart.details}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>Brand:</small></div>
                    <div className='col-4 col-md-2' style={{textTransform:"capitalize",fontSize:"12px"}}><p className='mt-1' style={{padding:"0",margin:"0"}}>{shopcart.brand}</p></div>
              
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>Color:</small></div>
                    <div className='col-4 col-md-2' style={{textTransform:"capitalize",fontSize:"12px"}}><p className='mt-1' style={{padding:"0",margin:"0"}}>{shopcart.color}</p></div>

                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>Dis. type:</small></div>
                    <div className='col-4 col-md-2' style={{textTransform:"capitalize",fontSize:"12px"}}><p className='mt-1' style={{padding:"0",margin:"0"}}>{shopcart.shop_dispatch_type}</p></div>
                     
                    <div className='col-4 col-md-2'>
                    
                    </div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>store:</small></div>
                    <div className='col-8 col-md-7' style={{textTransform:"capitalize",fontSize:"11px"}}><p className='mt-1' style={{padding:"0",margin:"0"}}>{shopcart.shop_store.length > 25 ? shopcart.shop_store.slice(0,25) + "..." : shopcart.shop_store} ( <small>{parseInt(getDistanceFromLatLonInKm(userdetails.customerlat, userdetails.customerlng, shopcart.storelat, shopcart.storelng))} KM <span className='text-muted'>from reg. loc</span></small>)</p></div>
                    <div className='col-4 col-md-3' style={{display:"none"}}>
                     <div style={{display:'flex',flexWrap:"nowrap",justifyContent:"space-evenly"}}>
                      <div style={{width:'30%',padding:"3px"}}>
                      <span className="fa fa-phone" style={{fontSize:"16px",color:"orange",border:"1px solid orange",padding:"2px 5px",borderRadius:"50%"}}></span>
                      </div>
                      <div style={{width:'30%',padding:"3px"}}>
                       <a href={`mailto:${shopcart.store_email}`}> <span className='fa fa-envelope-o' style={{fontSize:"20px",color:"orange"}}></span></a>
                      </div>
                     </div>
                    </div>
              </div>
              <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>dispatch:</small></div>
                    <div className='col-8 col-md-7' style={{textTransform:"capitalize",fontSize:"12px"}}><p className='mt-1' style={{padding:"0",margin:"0"}}>{shopcart.shop_dispatch} <b style={{color:"grey", fontSize:'10px', textTransform:"uppercase"}}>({shopcart.dispatch_type})</b> </p></div>
                    <div className='col-4 col-md-3' style={{display:"none"}}>
                     <div style={{display:'flex',flexWrap:"nowrap",justifyContent:"space-evenly"}}>
                      <div style={{width:'30%'}}>
                      <span className="fa fa-phone" style={{fontSize:"16px",color:"orange",border:"1px solid orange",padding:"2px 5px",borderRadius:"50%"}}></span>
                      </div>
                      <div style={{width:'30%'}}>
                      <a href={`mailto:${shopcart.dispatch_email}`}><span className='fa fa-envelope-o' style={{fontSize:"20px",color:"orange"}}></span></a>
                      </div>
                     </div>
                    </div>
              </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-4' style={{textTransform:"uppercase",fontWeight:"lighter"}}>
                    <small style={{fontWeight:"bold"}}>Quantity:</small></div>
                    <div className='col-3 col-md-1'><p style={{padding:"0",margin:"0"}}>
                        <button className='btn text-muted' style={shopcart.stock > 0 ? {padding:"0px 3px",margin:"0px",backgroundColor:'orange'}: {padding:"0px 3px",margin:"0px",backgroundColor:'grey'}}>
                        <span className='fa fa-plus-circle' onClick={shopcart.stock > 0 ? ()=>updatequantity({action:"increase",productId:shopcart.productId, id:shopcart.shoppingcartId,quantity:shopcart.quantity}) : displayoutofstockerr} style={shopcart.stock > 0 ? {fontSize:'18px',backgroundColor:"orange",color:"white"} : {fontSize:'18px',backgroundColor:"grey",color:"white"}}></span>
                        </button>
                        </p></div>
                        <div className='col-4 col-md-2 col-lg-1' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",textAlign:"center"}}>{shopcart.quantity}</p></div>
                    <div className='col-3 col-md-1'>
                        <p style={{padding:"0",margin:"0"}}>
                        <button className='btn text-muted' style={shopcart.quantity === 1 ? {padding:"0px 3px",margin:"0px",backgroundColor:'grey'} : {padding:"0px 3px",margin:"0px",backgroundColor:'orange'}}>
                        <span className='fa fa-minus-circle' onClick={()=>updatequantity({action:"decrease",productId:shopcart.productId, id:shopcart.shoppingcartId,quantity:shopcart.quantity})} style={shopcart.quantity === 1 ? {fontSize:'18px',backgroundColor:"grey",color:"white"} :{fontSize:'18px',backgroundColor:"orange",color:"white"}}></span>
                        </button>
                        </p></div>
                        <div className='col-6 col-md-4'>
                        { quantityalertid === shopcart.shoppingcartId ?
                        <small style={{color:"indianred",fontWeight:"bold",position:"absolute",top:"0px"}}><span className='fa fa-ban'></span> quantity cannot exceed 20 or go below 1 unit</small>
                        : shopcart.stock > 0 ?
                          <small style={{color:"grey"}}><b style={{color:"black"}}>{shopcart.stock}</b> items left in stock</small>
                          : <small style={{fontWeight:"bold", color:"indianred", fontSize:'14px'}}>Out of stock</small>}
                        </div>
                        <div className='col-6 d-md-none'>
                    <small style={{color:"grey"}}>
                <i> <b>{formater(shopcart.time_added)}</b></i><br/>
               
             </small>
             </div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>Price :</small></div>
                    <div className='col-6 col-md-2' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{shopcart.amount}</p></div>
            
                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase"}}>
                    <small style={{fontWeight:"bold"}}>Total:</small></div>
                    <div className='col-6 col-md-4' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",fontWeight:"bold"}}>{shopcart.total}</p>               
                </div>
                </div>
                  <div className='row'>
                  {shopcart.counter ?
                  <div className='col-12 col-md-8'>
                     <small style={{color:'black'}}> + <b>{shopcart.counter}</b> other items</small>
                     <small onClick={()=>changesetting(query.get("gby_z") ? "list" : "grid")} style={{padding:"3px",marginLeft:"10px",textTransform:"lowercase",borderRadius:"20px",border:"1px solid lightgrey"}}>view more</small>
                  </div>
                   :
                   <div className='d-none'>
                    <small style={{color:"grey"}}>
                <i> <b>{formater(shopcart.time_added)}</b></i>
               
             </small>
             </div>}
                   
             </div>
             </div>
         </div>
      
         </div>
            ): loaded ? 
            <div>
                <center>
                <div className="row" style={{height:"100%"}}>
                  <div className="col-12">
                   <center>
<small className="text-danger" style={{fontSize:"39px",fontWeight:"bolder"}}>o</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small>
<small className="text-danger" style={{fontSize:"30px",fontWeight:"bolder"}}>p</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>s!</small><br/><br/>
                     <span className="fa fa-shopping-cart text-danger" style={{fontSize:"120px"}}></span>
                     <p className="text-danger" style={{fontStyle:"italics",fontWeight:"bold"}}>Sorry!. You have no pre-selected cart </p><br/>
                     <small className="text-muted">Click <button className="btn btn-warning" style={{padding:"3px",color:"white"}}>Continue</button> to return to Shopping Page</small>
                   </center>
                  </div>
                </div> 
                </center>
            </div>
           :     
            <div style={{position:"fixed",top:"0",left:"0%",zIndex:"200000",backgroundColor:"rgba(242,242,242,0.3)",width:"100%",height:"100%"}}>
                 <div style={{position:"fixed",left:"40%", top:"30%"}}>
                 <center>
                    <img  src={`https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif`} />
                </center>
                 </div>
            </div>}
            <br/><br/>
            {shoppingcart.length > 4 ?
            props.lg || mobiledevice ?
            <div className='row' style={{position:'sticky',top:"0",backgroundColor:"white"}}>
            <div className='col-5 col-md-7'>
            <p style={{color:"indianred"}}>Shopping Cart  ({shoppingcart && shoppingcart.length})<span className='fa fa-shopping-cart'></span></p>
            {parseInt(getDistanceFromLatLonInKm(reg_coord.lat, reg_coord.lng, storelat.lat, storelat.lng)*1000)  > parseInt(getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000)
                ? 
              <small style={{color:"grey",fontWeight:"lighter"}}>*considering the price of your current location, kindly update your registered address from your profile temporarily to save dispatch cost and enable a faster delivery</small>
            : null}
            </div>
          <div className='col-7 col-md-5' style={{padding:"1px",zIndex:"5",color:"white"}}>
             <small style={{padding:"2px",color:"grey",margin:"0"}}><span>TOTAL</span>:  <span style={{fontWeight:"bold",padding:"0",color:"black",margin:"0"}}>{shoppingcarttotal.sumtotal ?
             "₦"+shoppingcarttotal.sumtotal
         : null}</span></small><br/>
          <small style={{padding:"2px",color:"grey",margin:"0"}}><span>Dispatch Fee(current location)</span>:  <span style={{fontWeight:"bold",padding:"0",color:"indianred",margin:"0"}}>{shoppingcarttotal.sumtotal ?
             "₦"+ (getDistanceFromLatLonInKm(coord.lat, coord.lng, storelat.lat, storelat.lng)*1000).toFixed(2)
         : null}</span></small><br/>
          <small style={{padding:"2px",color:"grey",margin:"0"}}><span>Dispatch Fee (registered location)</span>:  <span style={{fontWeight:"bold",padding:"0",color:"indianred",margin:"0"}}>{shoppingcarttotal.sumtotal ?
             "₦"+ (dispatchfee.toFixed(2))
         : null}</span></small><br/>
          <small style={{padding:"2px",color:"grey",margin:"0"}}><span>SUM_TOTAL</span>:  <span style={{fontWeight:"bold",padding:"0",color:"green",margin:"0"}}>{shoppingcarttotal.sumtotal ?
                  "₦"+`${sumtotalmain}`
             : null}</span></small><br/>
            
         </div>
        
      
        </div>
            : null
             : null}
            
     {shoppingcart.length > 0 ?
        <div className='row' style={mobiledevice ? {position:"fixed",width:"100%",padding:"10px",backgroundColor:"white",bottom:"0px"} : null}>
        <div className='col-7 col-md-4'>
        <Link to={`/shop`}>
        <button className='btn btn-primary'>
            Continue shopping 
         </button>
        </Link>
        </div>
        <div className="col-1 col-md-2 fiterdiv-col"  style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey",padding:"4px"}}>
                   <center>
            <i style={{border:"1px solid orange",padding:"5px",borderRadius:"50%"}} onClick={()=>changesetting(query.get("gby_z") ? "list" : "grid")} className={`${setting && setting === "list"  ? "fa fa-list" : "fa fa-th"}`} ></i>
                   </center>
                 </div>
        <div className='col-4 col-md-4'>
        <button onClick={()=>setpaymentselectionmodal(true)} className='btn btn-success'>
             Proceed <span className='fa fa-shopping-cart'></span> 
         </button>
        </div>
        </div>
        : null}
          </div>
        </div>
     );
}

export default Shoppingcart;