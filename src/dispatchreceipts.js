import axios from 'axios';
import React, { useState, useEffect, useContext,useRef } from 'react';
import { userContext } from './usercontext';
import {formater, getSentTime} from "./formatTime"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Details from './details';
import { Link } from 'react-router-dom';


function DispatchReceipts() {
    const context = useContext(userContext)
    const [dispatchreciepts, setdispatchreciepts] = context["dispatchreciepts"]
    const [loading, setloading] = context["loading"]
   const [currentPage, setcurrentPage] = context["currentpage"]
   const [redirect, setredirect] = context["redirect"]
   const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
 const [alertmessage, setalertmessage] = context["alertmessage"]
 const [requeststatus, setrequeststatus] = context["requeststatus"]
 const [targetmodal, settargetmodal] = context["targetmodal"]
   const [warningmodal, setwarningmodal] = useState(false)
   const [warningdetails, setwarningdetails] =useState({})
   const [confirmorder, setconfirmingorder] = useState(false)
   const [productDetails, setProductDetails] =useState(null)
   const [allproductDetails, setAllProductDetails] = useState([])
   const [displaydetail, setdisplaydetail] = useState(false)
   const [mobiledevice, setmobiledevice] = context["mobiledevice"]
   const [details, setdetails] = useState({})
   const [loaded, setloaded] = useState(false)
   const [displaydetails, setdisplaydetails] = useState(false)
   const [displayratingmodal, setdisplayratingmodal]= useState(false)
   const [storetorate, setstoretorate]= useState("")
   const [store, setstore] = useState("")
   const [ratinginputs, setratinginputs] = useState({"myrating":5,"mycomment":"Excellent Store Service"})
   const [dispatchratinginputs, setdispatchratinginputs] = useState({"myrating":5,"mycomment":"Excellent Dispatch Service"})
  const [order, setorder] = useState("")
  const [morestorereciept, setmorestorereciept]=useState([])
  const [orderdetails, setorderdetails] = useState("")
  const [dispatchhires, setdispatchhires] = context["dispatchhires"]
  const [selectedimage, setselectedimage] = context["selectedimage"]

   const query = new URLSearchParams(window.location.search)
   const didMount = useRef(false)
   const navigate = useNavigate()
   useEffect(()=>{
    if(query.get("order")){
        setorder(query.get("order"))
    }else{
        setorder("invoice")
    }
   },[])
   useEffect(()=>{
    if(Cookies.get("tktplc")){
        axios.get(`http://localhost:5000/client/dispatch_status_view?tkt=${Cookies.get("tktplc")}`)
        .then(res => {
            if(res.data.status === "success"){
                console.log("updated successfully")
            }
        })
        .catch(err => console.warn(err))
       }
    if(query.get("confirmorder") && didMount.current){
        setloading(true)
        setconfirmingorder(true)
        axios.get(`http://localhost:5000/client/confirm_rateorder?skb=${query.get("skb")}&pid=${query.get("pid")}&clear=${query.get("single")}&tkt=${Cookies.get("tktplc")}&confirmId=${query.get("confirmorder")}`)
        .then(res =>{
            if(res.data.status === "success"){
                setTimeout(()=> setloading(false), 800)
                setdisplayratingmodal(true)
                setstoretorate(res.data.clearcart)
            }else{
                setTimeout(()=> setloading(false), 800)
                setdisplayratingmodal(false)
            }
        })
    }
   },[])
useEffect(()=>{
     setloading(true)
    setcurrentPage("dispatchreciepts")
    document.querySelector(".overalldiv").addEventListener("click",()=>{
        setwarningmodal(false)
    })
    axios.get(`http://localhost:5000/client/fetch_dispatchreciepts?tkt=${Cookies.get("tktplc")}&order=${query.get("order") || order}`)
    .then(res =>{
        if(res.data.status === "success"){
    setdispatchreciepts(res.data.dispatchreciepts)
   setTimeout(()=> setloading(false), 700)
        }else if(res.data.message === "unauthorized"){
            setredirect(true)
        }
       
       setloaded(true)
    })
    .catch(err => console.warn(err))
},[order])
 const clearcartwarning =(properties)=>{
    setloading(true)
    setwarningdetails(properties)
    setwarningdetails(prev => ({...prev, clearsingle:true,clearall:false}) )
    setwarningmodal(true)
    setTimeout(()=>{
        setloading(false)
    },500)
 }
 const clearallcartwarning=()=>{
    setwarningdetails({clearall:true,clearsingle:false})
    setwarningmodal(true)
 }
const clearsingleorder =(data)=>{
    setloading(true)
    axios.get(`http://localhost:5000/client/clear_singleorder?cartId=${data.cartId}&productId=${data.productId}&tkt=${Cookies.get("tktplc")}`)
    .then(res =>{     
        if(res.data.status === "success"){
            setalertmessage("A confirmation mail has been sent you you, kindly visit your mail to complete this process")
            setrequeststatus("success")
            settargetmodal("order")
            setmodaldisplay("block")
            axios.get(`http://localhost:5000/client/fetch_submitted_cart?tkt=${Cookies.get("tktplc")}`)
            .then(res =>{
                if(res.data.status === "success"){
           setdispatchreciepts(res.data.submittedcart)
           setTimeout(()=> setloading(false), 500)
                }else if(res.data.message === "unauthorized"){
                    setredirect(true)
                }          
               setloaded(true)
            })
            .catch(err => console.warn(err))
       //     alert("A confirmation mail has been sent you you, kindly visit your mail to complete this process")
         }else if(res.data.message === "unauthorized"){
            setredirect(true)
         }
    })
    .catch(err => console.warn(err))
}
const clearallorder =()=>{
    axios.get(`http://localhost:5000/client/clear_multipleorder?tkt=${Cookies.get("tktplc")}`)
    .then(res =>{
        if(res.data.status === "success"){
            console.log(res.data)
        }
    })
    .catch(err => console.warn(err))
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
  const viewdetails=(data)=>{
    setdetails(data)
    setdisplaydetails(true)
    
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
          return    setratinginputs({mycomment: "Excellent Store Service",myrating:e.target.value})
          }
       else if(e.target.value >3 && e.target.value <= 4){
             setratinginputs({mycomment: "Very Good Store Service",myrating:e.target.value})
         }
        else if(e.target.value >2 && e.target.value <= 3){
             setratinginputs({mycomment: "Good Store Service",myrating:e.target.value})
         }
         else if(e.target.value >1 && e.target.value <= 2){
             setratinginputs({mycomment: "Average Store Service",myrating:e.target.value})
         }
        else if(e.target.value == 1){
             setratinginputs({mycomment: "Very Poor Store Service",myrating:e.target.value})
         }          
   }
   const dispatchcommentchange =(e)=>{
    if(e.target.name === "mycomment" && dispatchratinginputs.mycomment && dispatchratinginputs.mycomment.length >= 29){
        alert("please!!! comment cannot exceed 30 characters ")
    }else{
    setdispatchratinginputs(prev =>({...prev, [e.target.name]:e.target.value}))
    }
  }
   const dispatchratingschange=(e)=>{
       if(e.target.value > 5){
          return setdispatchratinginputs(prev =>({...prev, myrating:1}))
       }
       else if(e.target.value < 1){
          return setdispatchratinginputs(prev =>({...prev, myrating:1}))
       }
          else if(e.target.value >4 && e.target.value <= 5){
          return    setdispatchratinginputs({mycomment: "Excellent Dispatch Service",myrating:e.target.value})
          }
       else if(e.target.value >3 && e.target.value <= 4){
             setdispatchratinginputs({mycomment: "Very Good Dispatch Service",myrating:e.target.value})
         }
        else if(e.target.value >2 && e.target.value <= 3){
             setdispatchratinginputs({mycomment: "Good Dispatch Service",myrating:e.target.value})
         }
         else if(e.target.value >1 && e.target.value <= 2){
             setdispatchratinginputs({mycomment: "Average Dispatch Service",myrating:e.target.value})
         }
        else if(e.target.value == 1){
             setdispatchratinginputs({mycomment: "Very Poor Dispatch Service",myrating:e.target.value})
         }          
   }
  const clearorder=()=>{
    if(query.get("confirmorder") && didMount.current){
        setloading(true)
        setconfirmingorder(true)
        let storedetails= storetorate[0]
        let store = storedetails.store
        setstore(store)
        storedetails.store =""
        console.log(storedetails)
        axios.get(`http://localhost:5000/client/confirm_clearorder?store=${store}&storedetails=${JSON.stringify(storedetails)}&dispatchratings=${JSON.stringify(dispatchratinginputs)}&storeratings=${JSON.stringify(ratinginputs)}&skb=${query.get("skb")}&pid=${query.get("pid")}&clear=${query.get("single")}&tkt=${Cookies.get("tktplc")}&confirmId=${query.get("confirmorder")}`)
        .then(res =>{
            if(res.data.status === "success"){
                setTimeout(()=> setloading(false), 800)
                setdisplayratingmodal(false)
                setalertmessage(`${storetorate[0] && storetorate[0].details} from "${store}" cleared successfully`)
                setrequeststatus(res.data.status)
                setmodaldisplay("block")
                settargetmodal("order")
            }
        })
        
    }
  }
  const removeratingmodal=()=>{
      query.delete("rate")
      navigate(window.location.pathname +"?"+ query.toString());
  }

  const changeorder=(e)=>{
    setmorestorereciept([])
    setorderdetails("")
    setorder(e.target.value)
    query.set("order", e.target.value)
    navigate(window.location.pathname +"?"+ query.toString())
 }
  if(displaydetail && productDetails){
    return(
        <div>
            <Details productDetails ={productDetails} allproductDetails={allproductDetails}/>
        </div>
    )
  }
  const openinvoice=(data)=>{
     setloading(true)
     if(order === "invoice" || query.get("order") === "invoice"){
         setorderdetails(data.invoiceNo)
     }else if(order === "store" || query.get("order") === "store"){
         setorderdetails(data.store)
     }else if(order === "customer" || query.get("order") === "customer"){
         setorderdetails(data.customername)
     }
     axios.get(`http://localhost:5000/client/fetch_ungroupeddispatchreciepts?tkt=${Cookies.get("tktplc")}&invoiceNo=${data.invoiceNo}&customerId=${data.customerId}&storeId=${data.storeId}&order=${query.get("order") || order}`)
     .then(res =>{
         if(res.data.status === "success"){
     setmorestorereciept(res.data.ungroupeddispatchreciepts)
    setTimeout(()=> setloading(false), 700)
         }else if(res.data.message === "unauthorized"){
             setredirect(true)
         }
     })
     .catch(err => console.warn(err))
 }
    return ( 
        <div className='container' style={{marginBottom:"300px"}}>
             <div style={{position:"fixed",display:`${displaydetails ? "block" :"none"}`,top:"5%",left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",fontWeight:"bold",padding:"10px",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey"}}>
          <span className="fa fa-times" onClick={()=>setdisplaydetails(false)} style={{fontWeight:"lighter",fontSize:"20px",position:"absolute",right:"20px"}}></span>
           <p>Item : <span style={{fontWeight:"lighter"}}>{details.details}</span></p>
          <div className='row'>
            <div className='col-8'>
            <p style={{margin:"0",fontSize:"14px"}}>Amount: <span style={{fontWeight:"bold"}}>{details.amount}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>Quantity: <span style={{fontWeight:"bold"}}>{details.quantity}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>payment status: <span style={{fontWeight:"lighter"}}><b style={{padding:"2px",border:"2px solid orange"}}>{"not paid"}</b></span></p>
            <p style={{margin:"0",fontSize:"14px"}}>Invoice: <span style={{fontWeight:"lighter"}}><b style={{padding:"2px",border:"2px solid orange"}}>{details.invoiceNo}</b></span></p>
           <p style={{margin:"0",fontSize:"14px"}}>cart status: <span style={{fontWeight:"lighter",color:`${details.cartstatus === "pending" ? "indianred" : "green"}`}}>"{details.cartstatus}"</span></p>

                <i style={{fontSize:"13px"}}>Time : <span style={{fontWeight:"lighter"}}>{formater(details.timesubmitted)}</span></i><br/>
                <i style={{fontSize:"13px"}}>Time Due : <span style={{fontWeight:"lighter"}}>{formater(details.deliverytime)}</span></i>           
            </div>
            <div className='col-4'>
            <img className="img-responsive"  style={{padding:"0px",margin:"0",width:"100%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${details.generalcategory}/${details.category}/${details.mainimg || 'emptyimg.jpg'}`}  ></img>
            </div>
            <div className='col-12'>
                <p style={{margin:"0",color:"brown",fontSize:"13px",textTransform:"uppercase",borderBottom:"2px solid grey",width:"100%"}}>Client <small style={{float:'right'}}>view profile</small></p>
            <p style={{margin:"0",fontSize:"14px"}}>name: <span style={{fontWeight:"lighter"}}>{details.name}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>address: <span style={{fontWeight:"lighter"}}>{details.address}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>contact: <span style={{fontWeight:"lighter"}}>{details.contact}</span></p>
            <p style={{margin:"0",color:"brown",fontSize:"13px",textTransform:"uppercase",borderBottom:"2px solid grey",width:"100%"}}>Dispatch <small style={{float:'right'}}>view profile</small></p>
            <p style={{margin:"0",fontSize:"14px"}}>name: <span style={{fontWeight:"lighter"}}>{details.name}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>address: <span style={{fontWeight:"lighter"}}>{details.address}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>contact: <span style={{fontWeight:"lighter"}}>{details.contact}</span></p>
            </div>
            <div className='col-12'>
            {details.cartstatus === "requested" ? 
             <div className='d-none d-md-block col-md-12' style={{width:"100%",padding:"10px"}}>
             <button onClick={()=>clearcartwarning({cartId:details.subcartId,details:details.details, productId:details.productId,gencat:details.generalcategory,cat:details.category,img:details.mainimg})} className='btn btn-primary' style={{padding:"2px 5px",fontWeight:"15px",float:"right",color:'white'}}>
               <small>resend mail</small>
             </button>
         </div>
             :
                  <div className='d-none d-md-block col-md-12'>
                    <button onClick={()=>clearcartwarning({cartId:details.subcartId,details:details.details, productId:details.productId,gencat:details.generalcategory,cat:details.category,img:details.mainimg})} className='btn btn-warning' style={{padding:"2px 5px",float:'right',fontWeight:"15px",width:"100%",color:'white',backgroundColor:"indianred"}}>
                      <small>i have recieved this item </small>
                    </button>
                </div>
}
            </div>
          </div>
            </div>
            </div>
 
              <div style={{position:"fixed",display:`${warningmodal ? "block" : "none"}`,top:"5%",left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",padding:"10px",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey"}}>
            <center>
                <span onClick={()=>setwarningmodal(false)} style={{cursor:"pointer",fontWeight:"lighter",fontSize:"30px",color:"grey",position:'absolute',right:'10px',top:'0px'}}>x</span>
               { warningdetails.details ?
                <div>
                   <div className='row'>
                   <div className='col-7'>
                    <small style={{textTransform:"uppercase",textDecoration:"underline"}}>Item</small>
                    <p style={{color:"grey",fontWeight:"lighter",textTransform:"capitalize"}}> {warningdetails.details}</p>
                    </div>
                    <div className='col-5'>
                    <img className="img-responsive"  style={{padding:"5px",width:"100%",height:'80px'}} src={`https://res.cloudinary.com/fruget-com/image/upload/${warningdetails.gencat}/${warningdetails.cat}/${warningdetails.img || 'emptyimg.jpg'}`}  ></img>           
                    </div>               
                   </div>

                </div>
               : null}
                <p style={{margin:"0"}}>Are You Sure You want to clear this Order?</p>
                <small style={{color:"indianred"}}>
                    *Note that this action cannot be undone
                </small>
                <br/>
                <small style={{color:"indianred"}}>
                    *Also Note that this certifies that you have recieved this product in good working condition
                </small>
                <br/>
                <br/>
                <div className='row'>
                    <div className='col-6'>
                        <button onClick={()=>setwarningmodal(false)} className="btn btn-danger">cancel</button>
                    </div>
                    <div className='col-6'>
                        <button onClick={warningdetails.clearsingle ? ()=>clearsingleorder({cartId:warningdetails.cartId,productId:warningdetails.productId}) : warningdetails.clearall ? ()=>clearallorder() : null} className="btn btn-success">proceed</button>
                    </div>
                </div>
            </center>
            </div>      
            </div>
            {displayratingmodal ?
            <div id="modaldiv" style={{position:"fixed",top:"0",left:"0%",zIndex:"2000",backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"100%"}}>
                 <div style={{position:"fixed",left:"40%",padding:"20px",zIndex:"300000",width:"30%",backgroundColor:"white",boxShadow:"2px 3px 3px 3px lightgrey",borderRadius:"10px", top:"20%"}}>        
                 <span className='fa fa-times' onClick={()=>setdisplayratingmodal(false)} style={{position:"absolute", right:"20px"}}></span>
                <center>
                    <p style={{fontWeight:"lighter",margin:"0"}}>Rate <small style={{fontWeight:"bolder",textTransform:"uppercase"}}>"{store ? store : "Store"}"</small> </p>
                    <input type="number"  value={ratinginputs.myrating ? ratinginputs.myrating : 5} onChange={ratingschange}  name="myrating" placeholder={5} /><br/>
               <div className="outer">
          <div className="inner" style={{width:`${ratinginputs ? ratinginputs.myrating*20 : "30"}%`}}>
          </div>
        </div><br/>
         <input type="text" onChange={commentchange} value={ratinginputs.mycomment ? ratinginputs.mycomment : "Excellent Product"} name="mycomment" className="form-control" placeholder="excellent item, recommendable" style={{boxShadow:"none",outline:"none"}}></input>
               <hr/>

               <p style={{fontWeight:"lighter",margin:"0"}}>Rate <small style={{fontWeight:"bolder",textTransform:"uppercase"}}>"{storetorate[0] && storetorate[0].dispatch ? storetorate[0].dispatch : "Dispatch"}"</small> </p>
                    <input type="number"  value={dispatchratinginputs.myrating ? dispatchratinginputs.myrating : 5} onChange={dispatchratingschange}  name="myrating" placeholder={5} /><br/>
               <div className="outer" style={{margin:"0px"}}>
          <div className="inner" style={{width:`${dispatchratinginputs ? dispatchratinginputs.myrating*20 : "30"}%`}}>
          </div>
        </div><br/>
         <input type="text" onChange={dispatchcommentchange} value={dispatchratinginputs.mycomment ? dispatchratinginputs.mycomment : "Excellent Product"} name="mycomment" className="form-control" placeholder="excellent item, recommendable" style={{boxShadow:"none",outline:"none"}}></input>
         <small style={{fontWeight:"lighter",padding:"10px"}}>
                        *Dear user, kindly spend about 2 minutes to rate and drop your comments to help other prospective buyers select a better store
                        </small>
              <br/><br/>
               <div className='row'>
                <div className='col-6'>
                    <button onClick={removeratingmodal} className='btn btn-danger'>cancel</button>
                </div>
                <div className='col-6'>
                    <button className='btn btn-primary' onClick={clearorder}>submit</button>
                </div>
               </div>
                </center>
                 </div>
            </div>
            : null}
              <div>
            {morestorereciept.length > 0 ?
         <div className='row' style={{position:'sticky',top:"0px",padding:"5px",zIndex:'64748',backgroundColor:'white'}}>
        <div className='col-12'>
        <h5 style={{color:"black",fontSize:"16px",color:"orange"}} onClick={()=> setmorestorereciept([])}> <span className='fa fa-arrow-left'></span>   grouped by {order} details: <span>{orderdetails}</span></h5>
        </div>
         </div>
        : null}
            {morestorereciept.length > 0 ?
           morestorereciept.map((subcart,i)=>
           <div>    
             <div className='row' onClick={()=>viewdetails(subcart)}  key={subcart.details} style={{margin:"0px",cursor:"pointer",padding:"3px",borderBottom:"1px solid lightgrey"}}>
             {i === 0 || getSentTime(subcart.timesubmitted) !== getSentTime(morestorereciept[1 >0 ? i-1 : i].timesubmitted) ?
                        <div className='col-12'>
                            <center>
                                <small style={{color:`${getSentTime(subcart.timesubmitted) === "Today" ? "white":"white"}`,fontWeight:"bolder",padding:"1px 2px",fontSize:"11px",wordSpacing:"0.6px",backgroundColor:"orange"}}>{getSentTime(subcart.timesubmitted)}</small>
                            </center>
                        </div>
                        : null}
             <div className='col-3 col-md-2' style={{margin:"0", padding:"0"}}>
             <img className="img-responsive"  style={{padding:"0px",width:"100%",height:"140px",margin:"0"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} ></img>
             </div>
             <div className='col-9 col-md-10' style={{padding:"0px",fontSize:"14px",color:`${subcart.cartstatus === "cleared" ? "rgb(160,160,160)" : "black"}`}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Item:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p onClick={()=>opendetails({details:subcart.details,productId:subcart.productId})} style={{padding:"0",margin:"0",cursor:"pointer"}}>{subcart.details}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Invoice:</small></div>
                    <div className='col-6 col-md-5' >
                        <small style={{fontSize:"12px"}}><Link to={`/profile/submitted_cart/${subcart.invoiceNo}`}>{subcart.invoiceNo}</Link>  <b style={{color:"grey"}}>{subcart.noofcartreciepts > 1 ? `+ ${subcart.noofcartreciepts -1} other items` : null}</b></small>
                    </div>
   
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase",fontWeight:"lighter"}}><small style={{fontWeight:"bold"}}>Quantity:</small></div>
                    <div className='col-6 col-md-1' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0"}}>{subcart.quantity}</p></div>               
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>client name:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0"}}> {subcart.name}
                    <small style={{border:"1px solid grey", color:"grey",float:"right",padding:"0px 2px",borderRadius:"10px"}}>client profile</small></p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>address:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}>{subcart.address}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Dispatch:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0"}}> {subcart.dispatch_name}
                    <small style={{border:"1px solid grey", color:"grey",float:"right",padding:"0px 2px",borderRadius:"10px"}}>dispatch profile</small></p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>address:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}>{subcart.address}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>    
                    <div className='col-4 col-md-2' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>calc fee:</small></div>
                    <div className='col-5 col-md-4' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",fontWeight:"bold"}}>{subcart.totaldispatch}</p>

                    </div>
                     <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>type:</small></div>
                    <div className='col-3 col-md-2' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",marginTop:"5px"}}>{subcart.sub_dispatch_type}</p></div>
                    <div className='col-2 col-md-2'><small style={{color:"grey",border:'1px solid grey',padding:"2px",borderRadius:"5px",cursor:"pointer"}} onClick={()=>viewdetails(subcart)}>View</small></div>
                </div> 
                 {/* onClick={()=>viewdetails(subcart)} */}
             </div>
         </div>
      
         </div>
            ) : null} 
            </div>
            <div className='overalldiv'>
            {dispatchreciepts.length > 0 ?
         <div className='row' style={{position:'sticky',top:"0px",padding:"5px",zIndex:'64748',backgroundColor:'white'}}>
        <div className='col-4'>
        <h5 style={{color:"black",fontSize:"16px",color:"orange"}}>dispatchreciepts  <span className='fa fa-shopping-cart'></span> <span style={{fontSize:"14px"}}> ({dispatchreciepts.length})</span></h5>
        </div>
        <div className='col-8'>
            <div className='row'>
                <div className='col-12 col-md-4'>
                <input type="checkbox" checked={order === "invoice" ? true : false} onChange={changeorder} name="invoice" value="invoice"/> <small>group by invoice</small>
                </div>
                <div className='col-12 col-md-4'>
                <input type="checkbox"  checked={order === "customer" ? true : false} onChange={changeorder} name="customer" value="customer"/> <small>group by customer</small>
                </div>
                <div className='col-12 col-md-4'>
                <input type="checkbox"  checked={order === "store" ? true : false} onChange={changeorder} name="store" value="store"/> <small>group by store</small>
                </div>
            </div>
        </div>
         </div>
        : null}
        <div>
            {dispatchreciepts.length > 0 ?
           dispatchreciepts.map((subcart,i)=>
           <div>    
             <div className='row' key={subcart.details} onClick={()=>openinvoice(subcart)} style={{margin:"0px",cursor:"pointer",padding:"0",borderBottom:"1px solid lightgrey"}}>
             {i === 0 || getSentTime(subcart.timesubmitted) !== getSentTime(dispatchreciepts[1 >0 ? i-1 : i].timesubmitted) ?
                        <div className='col-12'>
                            <center>
                                <small style={{color:`${getSentTime(subcart.timesubmitted) === "Today" ? "white":"white"}`,fontWeight:"bolder",padding:"1px 2px",fontSize:"11px",wordSpacing:"0.6px",backgroundColor:"orange"}}>{getSentTime(subcart.timesubmitted)}</small>
                            </center>
                        </div>
                        : null}
             <div className='col-3 col-md-2' style={{margin:"0", padding:"0"}}>
             <img className="img-responsive"  style={{padding:"0px",width:'100%',margin:"0"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} ></img>
             </div>
             <div className='col-9 col-md-10' style={{padding:"5px",fontSize:"14px",color:`${subcart.cartstatus === "cleared" ? "rgb(160,160,160)" : "black"}`}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Item:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p onClick={()=>opendetails({details:subcart.details,productId:subcart.productId})} style={{padding:"0",margin:"0",cursor:"pointer"}}>{subcart.details}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Invoice:</small></div>
                    <div className='col-6 col-md-5' >
                        <small style={{fontSize:"12px"}}><Link to={`/profile/submitted_cart/${subcart.invoiceNo}`}>{subcart.invoiceNo}</Link>  <b style={{color:"grey"}}>{subcart.noofdispatchreciepts > 1 ? `+ ${subcart.noofdispatchreciepts -1} other items` : null}</b></small>
                    </div>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase",fontWeight:"lighter"}}><small style={{fontWeight:"bold"}}>Quantity:</small></div>
                    <div className='col-6 col-md-1' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0"}}>{subcart.quantity}</p></div>               
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>client name:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}> {subcart.name}
                    <Link to={`/client/profile/${subcart.customerId}`}><small style={{border:"1px solid grey", color:"grey",float:"right",textDecoration:"none",padding:"0px 2px",borderRadius:"10px"}}>client profile</small></Link></p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>address:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}>{subcart.address}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Store:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0",fontSize:'12px'}}> {subcart.store_name}
                   <Link to={`/client/profile/${subcart.store_customerId}`}><small style={{border:"1px solid grey", color:"grey",float:"right",textDecoration:"none",padding:"0px 2px",borderRadius:"10px"}}>store profile</small></Link> </p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>address:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}>{subcart.store_address}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Price:</small></div>
                    <div className='col-6 col-md-3' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{subcart.amount}</p></div>
               
                    <div className='col-3 col-md-2' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Total:</small></div>
                    <div className='col-3 col-md-3' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",fontWeight:"bold"}}>{subcart.totaldispatch}</p>
                   </div>
                </div>
               
             </div>
         </div>
      
         </div>
            ) : null} 
            </div>
            {dispatchhires.length > 0 ?
         <div className='row mt-2' style={{position:'sticky',top:"0px",padding:"5px",zIndex:'64748',backgroundColor:'white'}}>
        <div className='col-4'>
        <h5 style={{color:"black",fontSize:"16px",color:"orange"}}>hire requests  <span className='fa fa-shopping-cart'></span> <span style={{fontSize:"14px"}}> ({dispatchhires.length})</span></h5>
        </div>
       </div>
: null}
            {dispatchhires.length> 0 && dispatchhires.map(orders=>
                <div className='row' key={orders.hireId}>
                  <div className='col-3 col-md-2' style={{margin:"0", padding:"14px"}}>
              <img onClick={()=> setselectedimage(require(`./female.png`) || false)} src={require(`./female.png`)} style={{width:"100%", padding:"3px",border:"2px solid orange", borderRadius:"50%"}}/>
             </div>
             <div className='col-9 col-md-10' style={{padding:"0px",fontSize:"14px"}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Client:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p  style={{padding:"0",margin:"0",cursor:"pointer"}}>{order.lastseen}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Invoice:</small></div>
                    <div className='col-12 col-md-9' >
                        <small style={{fontSize:"12px"}}>{orders.hire_invoiceNo}</small>
                    </div>
                    </div>
                    <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase",fontWeight:"lighter"}}><small style={{fontWeight:"bold"}}>From:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{orders.hire_from}</p></div>               
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Destination:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0",fontSize:"12px"}}>{orders.hire_to}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Description:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize",fontSize:"12px"}}><p style={{padding:"0",margin:"0"}}> {orders.hire_item}
                  </p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>status:</small></div>
                    <div className='col-3 col-md-3' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{orders.hire_status}</p></div>
                
                    <div className='col-4 col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>time:</small></div>
                    <div className='col-5 col-md-7'><p style={{padding:"0",margin:"0"}}>{orders.hire_date}</p>
                    </div>
                </div> 
                 {/* onClick={()=>viewdetails(subcart)} */}
             </div>
                </div>
                )}
            {dispatchreciepts.length > 0 ?
            <div className='row'>
            <div className='col-6' style={mobiledevice ? {left:"5px",margin:"0",width:"100%",position:"sticky",bottom:"5px",padding:'2px'} : {float:'right'}}>
                <br/><br/>
                <button onClick={clearallcartwarning} className='btn btn-danger' style={{width:"100%"}}>
                    Clear All
                </button>
            </div>
            </div>
        : null}
        {loaded && dispatchreciepts.length === 0 ?
         <div>
         <center>
         <div className="row" style={{height:"100%"}}>
           <div className="col-12">
            <center>
<small className="text-danger" style={{fontSize:"39px",fontWeight:"bolder"}}>o</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>o</small>
<small className="text-danger" style={{fontSize:"30px",fontWeight:"bolder"}}>p</small><small className="text-danger" style={{fontSize:"35px",fontWeight:"bolder"}}>s!</small><br/><br/>
              <span className="fa fa-star text-danger" style={{fontSize:"120px"}}></span>
              <p className="text-danger" style={{fontStyle:"italics",fontWeight:"bold", color:"grey"}}>Sorry!. You have no Order yet </p><br/>
              <small className="text-muted"><Link to={`/shop`}>Click Here</Link>  to return to Shopping Page</small>
            </center>
           </div>
         </div> 
         </center>
     </div>
        : null}
        </div>
        </div>
     );
}

export default DispatchReceipts;
