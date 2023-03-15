
import React, { useState, useEffect, useContext } from 'react';
import { formater } from './formatTime';
import { userContext } from './usercontext';
import Cookies from 'js-cookie';
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from 'axios';
import {Product_History, Verified_Sales} from './product_history';
import Product from './product';
import StoreProduct from './storeproducts';
import { getDistanceFromLatLonInKm } from './mapdistance';

const CryptoJS = require("crypto-js") 

function ClientProfile(props) {
  const [editprofile, seteditprofile] = useState(false)
  const context = useContext(userContext)
  const [profileimage, setprofileimage] = useState("")
  const [profilepicture,setprofilepicture]= useState({})
  const [inputs, setinputs] = useState({})
  const [currentPage, setcurrentPage] = context["currentpage"]
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
   const [client, setclient] = useState({})
   const [userdetails, setuserdetails] = context["userdetail"]
   const [decryptedData, setdecryptedData] = useState("")
   const [clientstore, setclientstore] = useState([])
   const [clientdispatch, setclientdispatch]= useState([])
   const [viewmorestoreId, setviewmorestoreId]= useState("")
   const [viewmoredispatchId, setviewmoredispatchId] = useState("")
   const [selectedstore, setselectedstore] = useState("")
   const [category, setcategory] = context["category"]
   const [selectedimage, setselectedimage]= context["selectedimage"]

 //  const [hoverlist, setHoverlist] = useState("")

  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const params= useParams()
useEffect(()=>{
  if(query.get("store")){
    setselectedstore(query.get("store"))
  }
})

useEffect(()=>{
      var cipheridmain = CryptoJS.AES.encrypt(JSON.stringify(13), 'my-secret-key@123').toString();
       console.log("cipheridmain",cipheridmain)
 if(params.customerId){
  
 // var bytes = CryptoJS.AES.decrypt(params.customerId, 'my-secret-key@123');
 // var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
   setdecryptedData(params.customerId)
  if(Cookies.get("tktplc")){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_client?clientId=${params.customerId}`)
    .then(res =>{
       if(res.data.status === "success"){
        setclient(res.data.clientdetails[0])
        setclientstore(res.data.clientstore)
        setclientdispatch(res.data.clientdispatch)
        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
       }
       }
    })
    .catch(err => console.log(err))
  }else{
    setredirect(true)
  }
 }
},[])
const followstore=(store)=>{
  setloading(true)
  axios.get(`https://new-frugetbackend-productions.up.railway.app/client/follow_store?store=${escape(store)}&tkt=${Cookies.get("tktplc")}`)
  .then(res => {
    if(res.data.status === "success"){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_client?clientId=${JSON.parse(decryptedData)}`)
    .then(res =>{
       if(res.data.status === "success"){
        setclient(res.data.clientdetails[0])
        setclientstore(res.data.clientstore)
        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
       }
       }
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
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_client?clientId=${JSON.parse(decryptedData)}`)
    .then(res =>{
       if(res.data.status === "success"){
        setclient(res.data.clientdetails[0])
        setclientstore(res.data.clientstore)
        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
       }
       }
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
  axios.get(`https://new-frugetbackend-productions.up.railway.app/client/follow_dispatch?dispatchId=${escape(dispatchId)}&tkt=${Cookies.get("tktplc")}`)
  .then(res => {
    if(res.data.status === "success"){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_client?clientId=${JSON.parse(decryptedData)}`)
    .then(res =>{
       if(res.data.status === "success"){
        setclient(res.data.clientdetails[0])
        setclientdispatch(res.data.clientdispatch)
        setclientstore(res.data.clientstore)
        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
       }
       }
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
  axios.get(`https://new-frugetbackend-productions.up.railway.app/client/unfollow_dispatch?dispatchId=${escape(dispatchId)}&tkt=${Cookies.get("tktplc")}`)
  .then(res => {
    if(res.data.status === "success"){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_client?clientId=${JSON.parse(decryptedData)}`)
    .then(res =>{
       if(res.data.status === "success"){
        setclient(res.data.clientdetails[0])
        setclientdispatch(res.data.clientdispatch)
        setclientstore(res.data.clientstore)
        setTimeout(()=> setloading(false),500)
       }else{
        setloading(false)
       if(res.data.message === "unauthorized"){
       }
       }
    })
    .catch(err => console.log(err))
    }else{
      alert("failed")
    }
  })
  .catch( err => console.warn(err))
 }
const selectedstorechange =(e)=>{
  setselectedstore(e.target.value)
  setcategory(prev => ({...prev, store:e.target.value}))
  query.set("store",e.target.value)
  navigate(window.location.pathname+"?"+query.toString())
}
const selectstore=(data)=>{
 if(query.get("store") && query.get("store")== data){
  setcategory(prev =>({...prev, "store":""}))
  query.delete("store")
  query.delete("page")
  query.delete("brand")
  navigate(window.location.pathname +"?"+query.toString())
 }else{
  setcategory(prev =>({...prev, "store":data}))
  query.set("store", data)
  navigate(window.location.pathname +"?"+query.toString())
 }
}
    return ( 
        <div className='container-fluid'>
          <div style={{position:"relative"}}>
        
          <div style={{backgroundColor:'white',borderRadius:"50px"}}>
            <div style={{backgroundColor:'white',borderRadius:"100px"}}>
          <div style={{width:"100%",backgroundColor:'white',padding:"10px"}}>
          <div style={{width:"100%",borderRadius:"50%"}}>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-3'>
          <center>
            <small style={{fontWeight:"bold"}}>Profile</small>
         <img onClick={()=> setselectedimage(userdetails.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${client.image}` : false)} src={profileimage.length > 0 ? profileimage : userdetails.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${client.image}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFguokLDkdb7t5QN9W8seqUgFMgCbmM1Om_Q&usqp=CAU`} style={{width:"100%",height:"150px",border:"2px solid grey",borderRadius:"50%"}} />
         </center>
          </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <center>
              <p style={{fontSize:"30px",margin:"0"}}>{client && client.name}
              <small>{client.confirmed==="true" ?  <span style={{color:"pink",fontSize:'14px'}} className='fa fa-check-circle'></span> : null}</small></p>
            <p style={{color:"grey",fontWeight:"lighter",margin:"0"}}>@{client && client.email}</p>
             <small style={{fontWeight:"bold"}}> {client.confirmed==="email sent" ? <b style={{color:"indianred"}}>Not Verified</b> :  client.confirmed==="true" ? <small style={{fontWeight:"bold",color:"grey"}}> Account Verfied <span className='fa fa-check-circle-o'></span></small>:null}</small>
             <p style={{fontSize:"13px"}}> {client.contact}</p>
      <p style={{fontSize:"13px"}}> {client.address}</p>
     <p style={{fontSize:"13px"}}> <b>{"2"}</b> registered stores</p>
      <p style={{fontSize:"13px"}}> <b>{"1"}</b> dispatch services</p> 
             {client.customer_rating && client.customer_rating > 0 
               ?  
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${client.customer_rating*100}%`}}>    
                 </div> 
                 </div> 
               </div>
               : <br/>}
              
               <div className='row' >
                <div className='col-4'>
                <center>
                <p> Stores Following</p>
                <h4>{ userdetails.following && JSON.parse(userdetails.stores_following).length ? JSON.parse(userdetails.stores_following).length : 0}</h4>
                </center>
                </div>
                <div className='col-4'>
                <center>
                <p> Dispatch Following</p>
                <h4>{ userdetails.following && JSON.parse(userdetails.dispatch_following).length ? JSON.parse(userdetails.dispatch_following).length : 0}</h4>
                </center>
                </div>
                <div className='col-4'>
                <center>
                <p> Saved</p>
                <h4>{ userdetails.following && JSON.parse(userdetails.dispatch_following).length ? JSON.parse(userdetails.dispatch_following).length : 0}</h4>
                </center>
                </div>
               </div>
              </center>
            </div>
          </div>
        <small style={{color:'grey',fontWeight:"lighter",float:"right"}}><span className='fa fa-clock-o'></span> Joined {userdetails && formater(userdetails.time_joined)}</small>

      
      </div>
      </div>
      </div>
      </div>
        </div>
      
         <div style={{marginTop:"20px"}}>
          <div>      
            <p style={{fontWeight:"lighter",color:"grey"}}><span className='fa fa-user'></span> {client && client.gender ? client.gender : "Male"}</p>
 
  <div className='container-fluid'>
 <div className='row' >
 <div className='col-12 mb-2'>Registered Stores ({clientstore.length})</div>
  <br/>
 <div className='col-12'>
     {clientstore && clientstore.map((clientstores,i) =>
       <div className='row mb-2' key={clientstores.storeId}  style={{padding:"10px",borderTop:`${i===0 ? "1px solid grey" : ""}`,borderBottom:"1px solid grey"}}>
        <hr/>
        <div className='col-11 col-md-3'>
          <img onClick={()=> setselectedimage(`${require(`./female.png`)}` || null)}  style={{width:"100%",height:`${parseInt(query.get("store")) === clientstores.storeId ?"160px" : "110px"}`,padding:"5px",borderRadius:"10px",border:"1px solid lightgrey"}} src={require(`./female.png`)} />
        </div>
        <div className='col-12 col-md-9'>
        
         <span>{clientstores.store_name} <small>
          <div className="outer">     
                 <div className="inner" style={{width:`${clientstores.averagerating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({clientstores.averagerating || 0}) </small>
          </small></span> 
          {/* setviewmorestoreId(viewmorestoreId === clientstores.storeId ? "" : clientstores.storeId */}
          <small onClick={()=>selectstore(clientstores.storeId)} style={{marginLeft:"2px",cursor:"pointer",border:'1px solid grey',color:'grey',padding:"0px 3px",borderRadius:"10px"}}>
            {parseInt(query.get("store")) === clientstores.storeId ? "view less" : "view more..."}
            </small>
            <small style={{float:'right',border:"1px solid grey",cursor:"pointer",backgroundColor:"lightgreen",padding:"0px 2px",borderRadius:"20px",display:`${parseInt(query.get("store")) === clientstores.storeId ? "block" : "none"}`}}>
              <Link to={`/chat?pdx=${clientstores.store_customerId}`}>send message</Link>
              </small><br/>
            <small><span className='fa fa-link' style={{border:"1px solid orange",color:"grey",padding:"3px",borderRadius:"4px"}}></span> : <Link>http://localhost:3000/shop/client/product_display_section?store={clientstores.store_name}</Link></small>
            <small><span className='fa fa-copy mr-2 ml-2' style={{border:"1px solid grey",fontSize:"12px",color:"grey",padding:"1px",borderRadius:"4px"}}></span></small>
            <small><span className='fa fa-share mr-2 ml-2 text-primary' style={{border:"1px solid grey",fontSize:"12px",color:"grey",padding:"1px",borderRadius:"4px"}}></span></small><br/>
            <small style={{fontWeight:"bold",border:'1px solid lightgrey',cursor:"pointer", color:"red"}}>Report This Store</small><br/>
            <small style={{display:`${parseInt(query.get("store")) === clientstores.storeId ? "none" : "block"}`,color:"grey"}}>
              {clientstores.store_followers && JSON.parse(clientstores.store_followers).includes(userdetails.customerId)
              ? <b>you and {clientstores.store_followers && JSON.parse(clientstores.store_followers).length - 1} are following this store</b>
            : null}
            </small>
           <div style={{display:`${parseInt(query.get("store")) === clientstores.storeId ? "block" : "none"}`}}>
            <small style={{color:"grey"}}>{clientstores.store_address}</small><br/>
          <small style={{textTransform:"capitalize"}}>{clientstores.store_about}</small><br/>
          <small><b style={{color:"orange",fontSize:"15px",border:"1px solid grey",backgroundColor:"blue",padding:"0px 3px",borderRadius:"20px"}}>{clientstores.store_followers ? JSON.parse(clientstores.store_followers).length : 0}</b> Followers</small><br/>
          <small>{parseInt(getDistanceFromLatLonInKm(userdetails.customerlat, userdetails.customerlng, clientstores.storelat, clientstores.storelng))} KM <span className='text-muted'>from registered location</span></small><br/><br/>
          </div>
        </div>
        <div className='col-12' style={{display:`${parseInt(query.get("store")) === clientstores.storeId ? "block" : "none"}`}}>
        <div className='row'>
         <div className='col-8'>
    <div style={{display:"flex",width:'100%',flexWrap:"nowrap", justifyContent:"space-between"}}>
                    <div style={{width:"45%"}}>
                        <button className='btn btn-primary' style={{width:'100%'}}>
                            <div style={{display:"flex",widtth:"100%"}}>
                                <div style={{width:"20%"}}>
                                    <span className='fa fa-envelope-o' style={{color:"orange"}}></span>
                                </div>
                                <div style={{width:"80%"}}>
                                    <small style={{color:'white',fontWeight:'bold'}}> {clientstores.store_name && clientstores.store_name.length > 15 ? clientstores.store_name.slice(0,15) + "..." : clientstores.store_name}</small>
                                </div>
                            </div>
                        </button>
                        </div>
                        <div style={{width:"45%"}}>
                        <button className='btn' style={{width:'100%',color:"blue",backgroundColor:"orange"}}>
                            <div style={{display:"flex",width:"100%"}}>
                                <div style={{width:"20%"}}>
                                    <span className='fa fa-phone' style={{color:"blue"}}></span>
                                </div>
                                <div style={{width:"80%"}}>
                                    <small style={{color:'white',fontWeight:'bold'}}> {clientstores.store_name && clientstores.store_name.length > 15 ? clientstores.store_name.slice(0,15) + "..." : clientstores.store_name}</small>
                                </div>
                            </div>
                        </button>
                        </div>
                </div>
    </div>
    <div className='col-4'>
    {clientstores.store_name ?
     clientstores.store_followers && JSON.parse(clientstores.store_followers).includes(userdetails.customerId)
      ?
      <button onClick={()=>unfollowstore(clientstores.store_name)} className='btn' style={{float:'right',backgroundColor:"white",border:'1px solid blue',boxShadow:'none',padding:"2px 8px"}}>
      <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >unFollow</span> this store</small>
   </button>
   :  
   <button onClick={()=>followstore(clientstores.store_name)} className='btn btn-primary' style={{float:'right',border:"0",boxShadow:"none",padding:"2px 8px"}}>
   <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >Follow</span> this store</small>
</button>
  : null}
    </div>
    {clientstores.store_name ? 
   <div className='col-12'>
     <StoreProduct store={clientstores.store_name} storeapp={true}/>
   </div>
    : null}
         </div>
        </div>
        </div>
      )}
      </div>
   
      <div className='col-12' style={{marginTop:"50px"}}>Registered Dispatch ({clientdispatch.length})</div>
 <div className='col-12' style={{marginBottom:"100px"}}>
     {clientdispatch && clientdispatch.map((clientdispatchs,i) =>
        <div className='row mb-2' key={clientdispatchs.storeId}  style={{padding:"10px",borderTop:`${i===0 ? "1px solid lightgrey" : ""}`,borderBottom:"1px solid lightgrey"}}>
        <div className='col-8 col-md-3'>
          <img onClick={()=> setselectedimage(`${require(`./female.png`)}` || null)} style={{width:"100%",padding:"5px",borderRadius:'10px',border:"1px solid lightgrey",height:`${viewmoredispatchId === clientdispatchs.dispatchId ? "160px" : "110px"}`}} src={require(`./female.png`)} />
        </div>
        <div className='col-12 col-md-9'>
         <span>{clientdispatchs.dispatch_name} <small>
          <div className="outer">     
                 <div className="inner" style={{width:`${clientdispatchs.averagerating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({clientdispatchs.averagerating || 0}) </small>
          </small></span>
          <small onClick={()=>setviewmoredispatchId(viewmoredispatchId === clientdispatchs.dispatchId ? "" : clientdispatchs.dispatchId)} style={{marginLeft:"2px",cursor:"pointer",border:'1px solid grey',color:'grey',padding:"0px 3px",borderRadius:"10px"}}>
            {viewmoredispatchId === clientdispatchs.dispatchId ? "view less" : "view more..."}
            </small>
            <small style={{float:'right',border:"1px solid grey",cursor:"pointer",backgroundColor:"lightgreen",padding:"0px 2px",borderRadius:"20px",display:`${viewmoredispatchId === clientdispatchs.dispatchId ? "block" : "none"}`}}>send message</small><br/>
            <small style={{fontWeight:"bold",border:'1px solid lightgrey',cursor:"pointer", color:"red"}}>Report This dispatch</small><br/>
            <small style={{display:`${viewmoredispatchId === clientdispatch.dispatchId ? "none" : "block"}`,color:"grey"}}>
              {clientdispatchs.dispatch_followers && JSON.parse(clientdispatchs.dispatch_followers).includes(userdetails.customerId)
              ? <b>you and {clientdispatchs.dispatch_followers && JSON.parse(clientdispatchs.dispatch_followers).length - 1} are following this store</b>
            : null}
            </small>
           <div style={{display:`${viewmoredispatchId === clientdispatchs.dispatchId ? "block" : "none"}`}}>
          <small style={{color:"grey"}}>{clientdispatchs.dispatch_address}</small><br/>
          <small style={{textTransform:"capitalize"}}>{clientdispatchs.dispatch_about}</small><br/>
          <small><b style={{color:"orange",fontSize:"15px",border:"1px solid grey",backgroundColor:"blue",padding:"0px 3px",borderRadius:"20px"}}>{clientdispatchs.dispatch_followers ? JSON.parse(clientdispatchs.dispatch_followers).length : 0}</b> Followers</small><br/>
          <small>{parseInt(getDistanceFromLatLonInKm(userdetails.customerlat, userdetails.customerlng, clientdispatchs.dispatchlat, clientdispatchs.dispatchlng))} KM <span className='text-muted'>from registered location</span></small><br/><br/>
          </div>
       
        </div>
        <div className='col-12'>
        <div className='row'>
         <div className='col-8'>
    <div style={{display:"flex",width:'100%',flexWrap:"nowrap", justifyContent:"space-between"}}>
                    <div style={{width:"45%"}}>
                        <button className='btn btn-primary' style={{width:'100%'}}>
                            <div style={{display:"flex",widtth:"100%"}}>
                                <div style={{width:"20%"}}>
                                    <span className='fa fa-envelope-o' style={{color:"orange"}}></span>
                                </div>
                                <div style={{width:"80%"}}>
                                    <small style={{color:'white',fontWeight:'bold'}}> {clientdispatchs.dispatch_name && clientdispatchs.dispatch_name.length > 15 ? clientdispatchs.dispatch_name.slice(0,15) + "..." : clientdispatchs.dispatch_name}</small>
                                </div>
                            </div>
                        </button>
                        </div>
                        <div style={{width:"45%"}}>
                        <button className='btn' style={{width:'100%',color:"blue",backgroundColor:"orange"}}>
                            <div style={{display:"flex",width:"100%"}}>
                                <div style={{width:"20%"}}>
                                    <span className='fa fa-phone' style={{color:"blue"}}></span>
                                </div>
                                <div style={{width:"80%"}}>
                                    <small style={{color:'white',fontWeight:'bold'}}> {clientdispatchs.dispatch_name && clientdispatchs.dispatch_name.length > 15 ? clientdispatchs.dispatch_name.slice(0,15) + "..." : clientdispatchs.dispatch_name}</small>
                                </div>
                            </div>
                        </button>
                        </div>
                </div>
    </div>
    <div className='col-4'>
    {clientdispatchs.dispatch_name ?
     clientdispatchs.dispatch_followers && JSON.parse(clientdispatchs.dispatch_followers).includes(userdetails.customerId)
      ?
      <button onClick={()=>unfollowdispatch(clientdispatchs.dispatchId)} className='btn' style={{float:'right',backgroundColor:"white",border:'1px solid blue',boxShadow:'none',padding:"0px 2px"}}>
      <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >unFollow</span> {clientdispatchs.dispatch_name}</small>
   </button>
   :  
   <button onClick={()=>followdispatch(clientdispatchs.dispatchId)} className='btn btn-primary' style={{float:'right',border:"0",boxShadow:"none",padding:"0px 2px"}}>
   <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >Follow</span> {clientdispatchs.dispatch_name}</small>
</button>
  : null}
    </div>
   
         </div>
        </div>
        </div>
      )}
      </div>
  </div>
  </div>
          </div>
         </div>
        </div>
     
     );
    }
export default ClientProfile;



