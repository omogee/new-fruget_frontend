import axios from 'axios';
import React, { useState, useEffect, useContext,useRef } from 'react';
import { userContext } from './usercontext';
import {formater, formatermain, formateronlymain, getSentTime} from "./formatTime"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Details from './details';
import { Link } from 'react-router-dom';


function SubmittedCart() {
    const context = useContext(userContext)
    const [submittedcart, setsubmittedcart] = context["submittedcart"]
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
   const [storetorate, setstoretorate]= useState([])
   const [dispatchtorate, setdispatchtorate]= useState([])
   const [store, setstore] = useState("")
   const [ratinginputs, setratinginputs] = useState({"myrating":5,"mycomment":"Excellent Store Service"})
   const [dispatchratinginputs, setdispatchratinginputs] = useState({"myrating":5,"mycomment":"Excellent Dispatch Service"})

   const query = new URLSearchParams(window.location.search)
   const didMount = useRef(false)
   const navigate = useNavigate()
   useEffect(()=>{
    didMount.current = true;
  console.log("ratings", ratinginputs)
   },[ratinginputs])
 
   useEffect(()=>{
    if(query.get("confirmorder") && didMount.current){
        setloading(true)
        setconfirmingorder(true)
        axios.get(`http://localhost:5000/client/confirm_rateorder?invoiceNo=${query.get("skb")}&pid=${query.get("pid")}&clear=${query.get("single")}&tkt=${Cookies.get("tktplc")}&confirmId=${query.get("confirmorder")}`)
        .then(res =>{
            if(res.data.status === "success"){
                setTimeout(()=> setloading(false), 800)
                setdisplayratingmodal(true)
                setstoretorate(res.data.clearinvoice.store)
                setdispatchtorate(res.data.clearinvoice.dispatch)

            }else{
                setTimeout(()=> setloading(false), 800)
                navigate(`/profile/submitted_cart`)
                setdisplayratingmodal(false)
            }
        })
    }
   },[])
useEffect(()=>{
     setloading(true)
    setcurrentPage("order")
    document.querySelector(".overalldiv").addEventListener("click",()=>{
        setwarningmodal(false)
    })
    axios.get(`http://localhost:5000/client/fetch_submitted_cart?tkt=${Cookies.get("tktplc")}`)
    .then(res =>{
        if(res.data.status === "success"){
   setsubmittedcart(res.data.submittedcart)
   setTimeout(()=> setloading(false), 700)
        }else if(res.data.message === "unauthorized"){
            setredirect(true)
        }
       
       setloaded(true)
    })
    .catch(err => console.warn(err))
},[])
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
    axios.get(`http://localhost:5000/client/clear_singleorder?invoiceNo=${data.invoiceNo}&productId=${data.productId}&tkt=${Cookies.get("tktplc")}`)
    .then(res =>{     
        if(res.data.status === "success"){
            axios.get(`http://localhost:5000/client/fetch_submitted_cart?tkt=${Cookies.get("tktplc")}`)
            .then(response =>{
                if(response.data.status === "success"){
           setsubmittedcart(response.data.submittedcart)
           setdisplaydetails(false)
           setalertmessage(`[ACTION REQUIRED]:${res.data.message}`)
           setrequeststatus(res.data.status)
           settargetmodal("order")
           setmodaldisplay("block")
           setloading(false)
                }
               
            })
            .catch(err => console.warn(err))
           
         }else if(res.data.status === " failed"){
            setloading(false)
            setdisplaydetails(false)
            setalertmessage(res.data.message)
            setrequeststatus(res.data.status)
            settargetmodal("order")
            setmodaldisplay("block")
         }
         else{
            setredirect(true)
         }
    })
    .catch(err => console.warn(err))
}
const clearallorder =()=>{
    axios.get(`http://localhost:5000/client/clear_multipleorder?tkt=${Cookies.get("tktplc")}`)
    .then(res =>{
        if(res.data.status === "success"){
            alert(res.data.status)
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
   const ratingschange=( e)=>{
       if(e.target.value > 5){
          return setratinginputs(prev =>({...prev, [e.target.name]:1}))
       }
       else if(e.target.value < 1){
          return setratinginputs(prev =>({...prev, [e.target.name]:1}))
       }
          else if(e.target.value >4 && e.target.value <= 5){
          return    setratinginputs(prev =>({...prev,[`mycomment`]: "Excellent Store Service",[e.target.name]:e.target.value}))
          }
       else if(e.target.value >3 && e.target.value <= 4){
             setratinginputs(prev =>({...prev,[`mycomment`]: "Very Good Store Service",[e.target.name]:e.target.value}))
         }
        else if(e.target.value >2 && e.target.value <= 3){
             setratinginputs(prev =>({...prev,[`mycomment`]: "Good Store Service",[e.target.name]:e.target.value}))
         }
         else if(e.target.value >1 && e.target.value <= 2){
             setratinginputs(prev =>({...prev,[`mycomment`]: "Average Store Service",[e.target.name]:e.target.value}))
         }
        else if(e.target.value == 1){
             setratinginputs(prev =>({...prev,[`mycomment`]: "Very Poor Store Service",[e.target.name]:e.target.value}))
         }          
   }
   const dispatchcommentchange =(e)=>{
    alert(e.target.name)
    if(e.target.name === "mycomment" && dispatchratinginputs.mycomment && dispatchratinginputs.mycomment.length >= 29){
        alert("please!!! comment cannot exceed 30 characters ")
    }else{
    setdispatchratinginputs(prev =>({...prev, [e.target.name]:e.target.value}))
    }
  }
   const dispatchratingschange=(e)=>{
       if(e.target.value > 5){
          return setdispatchratinginputs(prev =>({...prev, [e.target.name]:1}))
       }
       else if(e.target.value < 1){
          return setdispatchratinginputs(prev =>({...prev, [e.target.name]:1}))
       }
          else if(e.target.value >4 && e.target.value <= 5){
          return    setdispatchratinginputs(prev =>({...prev,[`mycomment`]: "Excellent Dispatch Service",[e.target.name]:e.target.value}))
          }
       else if(e.target.value >3 && e.target.value <= 4){
             setdispatchratinginputs(prev =>({...prev,[`mycomment`]: "Very Good Dispatch Service",[e.target.name]:e.target.value}))
         }
        else if(e.target.value >2 && e.target.value <= 3){
             setdispatchratinginputs(prev =>({...prev,[`mycomment`]: "Good Dispatch Service",[e.target.name]:e.target.value}))
         }
         else if(e.target.value >1 && e.target.value <= 2){
             setdispatchratinginputs(prev =>({...prev,[`mycomment`]: "Average Dispatch Service",[e.target.name]:e.target.value}))
         }
        else if(e.target.value == 1){
             setdispatchratinginputs(prev =>({...prev,[`mycomment`]: "Very Poor Dispatch Service",[e.target.name]:e.target.value}))
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

        axios.get(`http://localhost:5000/client/confirm_clearorder?store=${store}&storeId=${storedetails.sub_storeId}&dispatchId=${storedetails.sub_dispatchId}&dispatchratings=${JSON.stringify(dispatchratinginputs)}&storeratings=${JSON.stringify(ratinginputs)}&invoiceNo=${query.get("skb")}&pid=${query.get("pid")}&tkt=${Cookies.get("tktplc")}&confirmId=${query.get("confirmorder")}`)
        .then(res =>{
            if(res.data.status === "success"){
                setsubmittedcart(res.data.submittedcart)
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
  if(displaydetail && productDetails){
    return(
        <div>
            <Details productDetails ={productDetails} allproductDetails={allproductDetails}/>
        </div>
    )
  }

    return ( 
        <div className='container' style={{marginBottom:"80px"}}>
             <div style={{position:"fixed",display:`${displaydetails ? "block" :"none"}`,top:"5%",left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",fontWeight:"bold",padding:"10px",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey"}}>
          <span className="fa fa-times" onClick={()=>setdisplaydetails(false)} style={{fontWeight:"lighter",fontSize:"20px",position:"absolute",right:"20px"}}></span>
          <p>Item Count: <span style={{fontWeight:"lighter"}}>{details.numofcart}</span></p>
          <div className='row'>
            <div className='col-8'>
            <p style={{margin:"0",fontSize:"14px"}}>Amount Due: <span style={{fontWeight:"lighter"}}>{details.invoicetotal}</span></p>
            <p style={{margin:"0",fontSize:"14px"}}>payment status: <span style={{fontWeight:"lighter"}}><b style={{padding:"2px",border:"2px solid orange"}}>{"not paid"}</b></span></p>
           <p style={{margin:"0",fontSize:"14px"}}>cart status: <span style={{fontWeight:"lighter",color:`${details.cartstatus === "pending" ? "indianred" : "green"}`}}>"{details.cartstatus}"</span></p>
            </div>
            <div className='col-6 mt-3'>
             <button style={{padding:"0px 5px"}} onClick={()=>clearsingleorder(details)} className='btn btn-danger'>
               <small style={{fontWeight:"bold"}}> clear invoice</small>
             </button>
            </div>
            <div className='col-4'>
            <img className="img-responsive"  style={{padding:"0px",margin:"0",width:"100%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${details.generalcategory}/${details.category}/${details.mainimg || 'emptyimg.jpg'}`}  ></img>
           <center>
            <Link to={`/profile/submitted_cart/${details.invoiceNo}`}><small style={{textDecoration:"none",fontSize:"12px",color:"black"}}>{details.numofcart > 1 ? ` + ${details.numofcart - 1} others ` : null}</small></Link>
           </center>
            </div>
            <br/><br/>
            {details.store_view_status === "seen" ?
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye'></span> store <b style={{color:"orange"}}> {formateronlymain(details.store_view_time)}</b></small></div> 
            : 
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye-slash'></span> store</small></div>}
             {details.dispatch_view_status === "seen" ?
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye'></span> {details.sub_dispatch} <b style={{color:"orange"}}>{formateronlymain(details.dispatch_view_time)}</b></small></div> 
            :  <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye-slash'></span> dispatch</small></div>}
            <div className='col-12'>
                    <button onClick={()=>navigate(`/shop/submitted_cart/${details.invoiceNo}`)} className='btn' style={{padding:"2px 5px",float:'right',fontWeight:"15px",boxShadow:"none",color:'white',color:"indianred"}}>
                      <small>view invoice</small>
                    </button>
                </div>
          </div>
          <div className='row mt-2'>
            <div className='col-6'>
            <i style={{fontSize:"11px"}}> <span className='fa fa-clock-o'></span> <span style={{fontWeight:"lighter"}}>{formater(details.timesubmitted)}</span></i><br/>          
            </div>
            <div className='col-6'>
            <i style={{fontSize:"11px"}}><span className='fa fa-clock-o'></span><span className='fa fa-check' style={{color:"orange",fontWeight:"bold",position:"absolute",bottom:"0px"}}></span>
             <span style={{fontWeight:"lighter",marginLeft:"10px"}}>{formater(details.deliverytime)}</span></i> 
            </div>
          </div>
            </div>
            </div>
 
              <div style={{position:"fixed",display:`${warningmodal ? "block" : "none"}`,top:"5%",left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",top:"30%",padding:"10px",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 3px lightgrey"}}>
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
                <p style={{margin:"0"}}>Are You Sure You want to clear All Invoices?</p>
                <small style={{color:"indianred"}}>
                    *Note that this action cannot be undone
                </small>
                <br/>
                <small style={{color:"grey"}}>
                    Also Note that this certifies that you have recieved all products in good condition
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
            <div id="modaldiv" style={{position:"fixed",top:"0",left:"0%",zIndex:"99909999",backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"100%"}}>
                 <div style={{position:"fixed",left:"40%",padding:"20px",zIndex:"300000",width:"30%",backgroundColor:"white",boxShadow:"2px 3px 3px 3px lightgrey",borderRadius:"10px", top:"15%"}}>        
                 <span className='fa fa-times' onClick={()=>setdisplayratingmodal(false)} style={{position:"absolute", right:"20px"}}></span>
                <center>
               <div style={{height:"52vh",overflow:"hidden"}}>
               <div style={{height:"50vh",width:"100%",position:'absolute',paddingRight:'20px', right:"-10px",overflow:"scroll"}}>
                <small style={{fontSize:"13px", fontWeight:"bold"}}>rate store</small>
                        <div style={{padding:"0px 20px"}}>
                            <p style={{margin:"0",padding:"3px"}}> <small style={{fontWeight:"bolder",textTransform:"capitalize",color:"grey"}}><span style={{backgroundColor:"orange",color:"white",boxShadow:"0.7px 1px 0.5px 1px lightgrey",borderRadius:"5px",padding:"1px 5px"}}>{storetorate[0] && storetorate[0].sub_store} </span></small> </p>
                    <input type="number"  value={ratinginputs[`myrating}`] ? ratinginputs[`myrating}`] : 5} onChange={(e)=>ratingschange(e)}  name={`myrating}`} placeholder={5} /><br/>
               <div className="outer">
          <div className="inner" style={{width:`${ ratinginputs[`myrating}`] ?  ratinginputs[`myrating}`]*20 : "100"}%`}}>
          </div>
        </div><br/>
         <input type="text" onChange={commentchange} value={ratinginputs[`mycomment`] ? ratinginputs[`mycomment`] : "Excellent Product"} name={`mycomment`} className="form-control" placeholder="excellent item, recommendable" style={{boxShadow:"none",outline:"none"}}></input>
                        </div>
               <hr/>
               <small style={{fontSize:"13px", fontWeight:"bold"}}>rate dispatch</small>
              <div style={{padding:"0px 20px"}}>
                 <p style={{margin:"0",padding:"3px"}}> <small style={{fontWeight:"bolder",textTransform:"capitalize",color:"grey"}}> <span style={{backgroundColor:"orange",color:"white",boxShadow:"0.7px 1px 0.5px 1px lightgrey",borderRadius:"5px",padding:"1px 5px"}}>{dispatchtorate[0] && dispatchtorate[0].sub_dispatch}</span></small> </p>
                <input type="number"  value={dispatchratinginputs[`myrating`] ? dispatchratinginputs[`myrating`] : 5} onChange={(e)=>dispatchratingschange(e)}  name={`myrating`} placeholder={5} /><br/>
               <div className="outer" style={{margin:"0px"}}>
          <div className="inner" style={{width:`${dispatchratinginputs[`myrating`] ? dispatchratinginputs[`myrating`]*20 : "100"}%`}}>
          </div>
        </div><br/>
        <input type="text" onChange={dispatchcommentchange} value={dispatchratinginputs[`mycomment`] ? dispatchratinginputs[`mycomment`] : "Excellent Service"} name={`mycomment`} className="form-control" placeholder="excellent item, recommendable" style={{boxShadow:"none",outline:"none"}}></input>
              </div>
                </div>
               </div>
    
         <small style={{fontWeight:"lighter",padding:"10px"}}>
                        *Dear user, kindly spend about 2 minutes to rate and drop your comments as part of our invoice policy
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
            <div className='overalldiv'>
            {submittedcart.length > 0 ?
            <h5 style={{color:"orange",padding:"10px",borderRadius:"20px",width:"100%",position:"sticky",backgroundColor:"white",zIndex:"57899927",top:"0px"}}> Order  <span className='fa fa-star'></span>  ({submittedcart.length})</h5>
        : null}
        <div>
            {submittedcart.length > 0 ?
           submittedcart.map((subcart,i)=>
           <div>    
             <div className='row' key={subcart.details} style={{margin:"0px",padding:"0",borderBottom:"1px solid lightgrey"}}>
             {i === 0 || getSentTime(subcart.timesubmitted) !== getSentTime(submittedcart[1 >0 ? i-1 : i].timesubmitted) ?
                        <div className='col-12'>
                            <center>
                                <small style={{color:`${getSentTime(subcart.timesubmitted) === "Today" ? "black":"grey"}`,padding:"1px 2px",fontSize:"11px",wordSpacing:"0.6px",border:"1px solid grey",fontWeight:"lighter"}}>{getSentTime(subcart.timesubmitted)}</small>
                            </center>
                        </div>
                        : null}
             <div className='col-3 col-md-2' style={{margin:"0", padding:"0"}}>
             <img className="img-responsive"  style={{padding:"0px",height:"100px",width:"100%",margin:"0"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${subcart.generalcategory}/${subcart.category}/${subcart.mainimg || 'emptyimg.jpg'}`} ></img>
             <p style={{margin:"0",display:"none"}}>Status  : <i style={{color:`${subcart.cartstatus === "cleared" ? "green" : "indianred"}`}}>{subcart.cartstatus ? subcart.cartstatus : "pending"}</i></p>
             <small> {subcart.cartstatus === "cleared" ?<span className='fa fa-clock-o'></span> : null} {formater(subcart.cleartime)} </small>
             </div>
             <div className='col-9 col-md-10' style={{padding:"5px",fontSize:"13px",color:`${subcart.cartstatus === "cleared" ? "rgb(160,160,160)" : "black"}`}}>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Item:</small></div>
                    <div className='col-12 col-md-9' style={{textTransform:"capitalize"}}><p onClick={()=>opendetails({details:subcart.details,productId:subcart.productId})} style={{padding:"0",margin:"0",cursor:"pointer"}}>{subcart.details}</p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Brand:</small></div>
                    <div className='col-6 col-md-2' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{subcart.brand}</p></div>
               
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Color:</small></div>
                    <div className='col-6 col-md-2' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{subcart.color}</p></div>
                
                    <div className='d-none d-md-block col-md-2' style={{textTransform:"uppercase",fontWeight:"lighter"}}><small style={{fontWeight:"bold"}}>Quantity:</small></div>
                    <div className='col-1' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0"}}>{subcart.quantity}</p></div>
                   
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>invoice code:</small></div>
                    <div className='col-12 col-md-9'><p style={{padding:"0",margin:"0"}}>{subcart.invoiceNo} + <span style={{color:"grey"}}><b>{subcart.numofcart - 1}</b> others</span></p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-3' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>payment type:</small></div>
                    <div className='col-12 col-md-9'><p style={{padding:"0",margin:"0"}}><span style={{color:"grey"}}><b>{subcart.sub_paymenttype}</b> </span></p></div>
                </div>
                <div className='row' style={{padding:"0",margin:"0"}}>
                    <div className='d-none d-md-block col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Price:</small></div>
                    <div className='col-4 col-md-3' style={{textTransform:"capitalize"}}><p style={{padding:"0",margin:"0"}}>{subcart.amount}</p></div>

                    <div className='col-4 col-md-1' style={{textTransform:"uppercase"}}><small style={{fontWeight:"bold"}}>Total:</small></div>
                    <div className='col-4 col-md-3' style={{textTransform:"uppercase"}}><p style={{padding:"0",margin:"0",fontWeight:"bold"}}>{subcart.total}</p>
                  </div>
             <div className='col-2 col-md-2'><small style={{color:"grey",border:'1px solid grey',padding:"2px",borderRadius:"5px",cursor:"pointer"}} onClick={()=> navigate(`/profile/submitted_cart/${subcart.invoiceNo}`)}>View invoice</small></div>
             <div className='col-2 col-md-2'><small style={{color:"grey",border:'1px solid orange',color:"black",padding:"2px",borderRadius:"5px",cursor:"pointer"}} onClick={()=>viewdetails(subcart)}>view status</small></div>
             {subcart.store_view_status === "seen" ?
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye'></span> store <b style={{color:"orange"}}> {formateronlymain(subcart.store_view_time)}</b></small></div> 
            : 
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye-slash'></span> store</small></div>}
             {subcart.dispatch_view_status === "seen" ?
            <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye'></span> {subcart.sub_dispatch} <b style={{color:"orange"}}>{formateronlymain(subcart.dispatch_view_time)}</b></small></div> 
            :  <div className='col-6'><small className='text-muted' style={{fontSize:"12px"}}><span className='fa fa-eye-slash'></span> dispatch</small></div>}
                </div>
                <div className='row'>
            <div className='col-6'>
            <i style={{fontSize:"11px"}}> <span className='fa fa-clock-o'></span> <span style={{fontWeight:"lighter"}}>{formater(subcart.timesubmitted)}</span></i><br/>          
            </div>
            <div className='col-6'>
            <i style={{fontSize:"11px",float:"right"}}><span className='fa fa-clock-o'></span><span className='fa fa-check' style={{color:"orange",fontWeight:"bold",position:"absolute",bottom:"0px"}}></span>
             <span style={{fontWeight:"lighter",marginLeft:"10px"}}>{formater(subcart.deliverytime)}</span></i> 
            </div>
          </div>

             </div>
         </div>
      
         </div>
            ) : null} 
            </div>
            {submittedcart.length > 0 ?
             <div className='row'>
             <div className='col-12 col-md-6' style={mobiledevice ? {left:"5px",margin:"0",width:"65%",left:"18%",backgroundColor:'white',position:"fixed",bottom:"0px",padding:'5px'} : {float:'right'}}>
                 <button onClick={clearallcartwarning} className='btn' style={{width:"70%",color:"white",backgroundColor:"orange"}}>
                     Clear All Invoices
                 </button>
             </div>
             </div>
        : null}
        {loaded && submittedcart.length === 0 ?
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

export default SubmittedCart;
