
import React, { useState, useEffect, useContext } from 'react';
import { formater } from './formatTime';
import { userContext } from './usercontext';
import Cookies from 'js-cookie';
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from 'axios';
import {Product_History, Verified_Sales} from './product_history';
import { getDistanceFromLatLonInKm } from './mapdistance';
import StoreProduct from './storeproducts';
import MyStoreProduct from './mystoreproduct';

const CryptoJS = require("crypto-js") 

function Profile(props) {
  const [editprofile, seteditprofile] = useState(false)
  const context = useContext(userContext)
  const [userdetails, setuserdetails] = context["userdetail"]
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
  const [registeredstores, setregisteredstores] = context["registeredstores"]
  const [registereddispatch, setregistereddispatch] = context["registereddispatch"]
  const [displaydetail, setdisplaydetail] = useState(false)
  const [productDetails, setProductDetails] =useState(null)
  const [allproductDetails, setAllProductDetails] = useState([])
   const [hovergrid, setHovergrid] = useState("unhoveredapp")
   const [client, setclient] = useState("")
   const [viewmorestoreId, setviewmorestoreId]= useState("")
   const [viewmoredispatchId, setviewmoredispatchId] = useState("")
   const [unconfirmedemailwarning, setunconfirmedemailwarning] = useState(false)
   const [selectedstore, setselectedstore] = useState("")
   const [selectedimage, setselectedimage]= context["selectedimage"]
 //  const [hoverlist, setHoverlist] = useState("")

  const navigate = useNavigate()
  const query = new URLSearchParams(window.location.search)
  const params= useParams()

  const selectedstorechange =(e)=>{
    alert("hello")
  }
  useEffect(()=>{
    let userId=7
    let userIdpos = Math.floor(Math.random()*100)
    let dividerpos = Math.floor(Math.random()*10)
   // alert(userIdpos)
  
    let alpha =`tygdh0897djdn4222cn45792yeg4j8432732mdo3333jyu4i5o3rrubrtafyhofltpoljkgutokmnbigj84353td7ehvivnkdndsy3bucnutdye7eyeueui8u74hrurj`
    let divider = alpha.slice(0,dividerpos)
    alpha =alpha.slice(0, userIdpos)+`${userId}`+divider+userIdpos+alpha.slice(userIdpos, alpha.length)+`-${divider}`
    let alpha2 =alpha.slice(0, userIdpos)+`${userId}`+divider+userIdpos+alpha.slice(userIdpos, alpha.length)+`-${divider}`
  //  alert(alpha)
    let x = alpha.split("-")[1]
    let y = alpha.split(`${x}`)[1]
    let z = y.slice(0,2)
  //  alert(`z ${z}`)
    let q = alpha2.split(`${x}`)[0]
    let tee = q.slice(0,z)[1]
   //  alert(`tee ${tee}`)
  
    
  },[])
  useEffect(()=>{
    if(userdetails.confirmed === "email sent"){
      setunconfirmedemailwarning(true)
    }
  },[userdetails])
useEffect(()=>{
 if(params.customerId){
  var bytes = CryptoJS.AES.decrypt(params.customerId, 'my-secret-key@123');
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  alert(decryptedData)
  setclient(decryptedData)
 }
})
  useEffect(()=>{
    setcurrentPage("dashboard")
   setinputs(
    {"name":userdetails.name,"customerId":userdetails.customerId,
     "email":userdetails.email, "contact":userdetails.contact,
    "address":userdetails.address}
   )
  },[userdetails])
 useEffect(()=>{
  if(query.get("store")){
    setviewmorestoreId(parseInt(query.get("store")))
  }
 },[])
const submitprofile =()=>{
  setloading(true)
   const formdata = new FormData()
 formdata.append("inputs", JSON.stringify(inputs))
 formdata.append("files", profilepicture)

  axios.post(`http://localhost:5000/client/edit_profile`, formdata)
  .then( res => {
    if(res.data.status === "success"){
   setloading(false)
   alert("update successful")
    }else if(res.data.message === "message"){
      setloading(false)
      setredirect(true)
    }
  })
  .catch(err => console.warn(err))
}
const change =(e)=>{
  setinputs(prev => ({...prev, [e.target.name]:e.target.value}))
}
const filechange =(e)=>{
  console.log(e.target.files[0])
  setprofilepicture(e.target.files[0])
  const reader = new FileReader()
  reader.onload = e =>{
    let imgprev = document.querySelector(".profileimage")
    imgprev.src = reader.result
    setprofileimage(reader.result)
}
reader.readAsDataURL(e.target.files[0])
}

const settoshow=(show)=>{
 query.set("sub", show)
 navigate(window.location.pathname +"?"+query.toString())
}
const sendconfirmation=()=>{
   setloading(true)
   axios.get(`http://localhost:5000/client/confirm_registered_email?email=${userdetails.email}&customerId=${userdetails.customerId}`)
   .then(res =>{
    if(res.data.status === "success"){
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      setloading(false)
      settargetmodal("confirmation")
    }else{
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      setloading(false)
      settargetmodal("confirmation")
      }
   })
   .catch(err => console.warn(err))
  
}
const openstoredetails =(data)=>{
  const randOne = Math.floor(Math.random()*100000)
  const randTwo = Math.floor(Math.random()*100000)
  const rand = randOne*randTwo

if(query.get("edit_temp") && query.get("store")){
  query.delete("edit_temp")
  query.delete("store")
 navigate(window.location.pathname + "?" + query.toString())
}else{
  query.set("store", data.storeId)
  query.set("edit_temp", rand)
  navigate(window.location.pathname + "?" + query.toString())
}

}

    return ( 
      <div className='container'>
      <div style={{position:"fixed",top:"5%",display:`${unconfirmedemailwarning ? "block" : "none"}`,left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",fontWeight:"bold",padding:"10px",zIndex:"900000",backgroundColor:"white",boxShadow:"2px 2px 3px 2px indianred"}}>
          <p style={{color:"indianred"}}>Action Required For [@{userdetails.email}]</p>
          <small>Dear User, kindly proceed to your email inbox or spam file to confirm your account has there would be so many restrictions on your acount
    <br/>

    "Peradventure you cannot find mail you may select the "resend mail" button below.."
    <br/>
    <span style={{color:"grey"}}>Note that maximum resend count is 3 and after which you may need to file a complaint kinldy proceed to <Link to={`/our policies`}>our policies</Link> to learn more </span> 
          </small>
          <br/><br/>
        <div className='row'>
        <div className='col-6'>
            <button className='btn btn-primary' onClick={sendconfirmation} style={{textTransform:"upercase",padding:"3px 10px "}}><span className='fa fa-envelope-o'></span> resend mail</button>
          </div>
          <div className='col-6'>
            <button className='btn btn-danger' onClick={()=> setunconfirmedemailwarning(false)} style={{textTransform:"upercase",float:"right",padding:"3px 10px "}}>i Understand</button>
          </div>
        </div>
            </div>
          </div>
      <div style={{backgroundColor:"white",padding:"0",margin:"0"}}>
        <div>
          <div style={{position:"relative"}}>
          <div onClick={()=> seteditprofile(prev => !prev)} style={{position:"absolute",cursor:"pointer",right:"20px",color:"white",top:"20px"}}>
        <span  className={`${editprofile ? 'fa fa-times fa-2x' :'fa fa-pencil fa-2x'}`}></span><br/>
        <small >Edit Profile</small>
      </div>
      <div style={{backgroundColor:'white',borderRadius:"50px"}}>
            <div style={{backgroundColor:'white',borderRadius:"100px"}}>
          <div style={{width:"100%",backgroundColor:'white',borderRadius:"200px",padding:"10px"}}>
          <div style={{width:"100%",borderRadius:"50%"}}>
        <div className='row'>
          <div className='col-4'></div>
          <div className='col-3'>
          <center>
            <small style={{fontWeight:"bold"}}>Profile</small>
         <img onClick={()=>setselectedimage(userdetails.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${userdetails.image}`: false)} src={profileimage.length > 0 ? profileimage : userdetails.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${userdetails.image}` : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFguokLDkdb7t5QN9W8seqUgFMgCbmM1Om_Q&usqp=CAU`} style={{width:"100%",height:"150px",border:"2px solid grey",borderRadius:"50%"}} />
         </center>
          </div>
          </div>
          <div className='row'>
            <div className='col-12'>
              <center>
              <p style={{fontSize:"30px",margin:"0"}}>{userdetails && userdetails.name}
              <small> <span style={{color:"pink",fontSize:'14px'}} className='fa fa-check-circle'></span></small></p>
            <p style={{color:"lightgrey",fontWeight:"lighter",margin:"0"}}>@{userdetails && userdetails.email}</p>
             <small style={{fontWeight:"bold"}}>Account Verfied {userdetails.confirmed==="email sent" ? <b style={{border:"1px solid red",padding:"0px 3px"}}>mail sent</b> : userdetails.confirmed==="true" ? <small style={{fontWeight:"bold",color:"grey"}}> <span className='fa fa-check-circle-o'></span></small>:<small onClick={sendconfirmation} style={{color:"indianred",fontWeight:"bold",cursor:"pointer"}}>Click to confirm email</small>}</small>
             <p style={{fontSize:"13px"}}> {userdetails.contact}</p>
      <p style={{fontSize:"13px"}}> {userdetails.address}</p>
      <p style={{fontSize:"13px"}}> <b>{registeredstores.length}</b> stores</p>
      <p style={{fontSize:"13px"}}> <b>{registereddispatch.length}</b> dispatch services</p>
             {userdetails.customer_rating && userdetails.customer_rating > 0 
               ?  
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${userdetails.customer_rating*100}%`}}>    
                 </div> 
                 </div> 
               </div>
               : <br/>}
               <br/>
               <div className='row' style={{padding:"30px"}}>
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
          <br/><br/>
        <small style={{color:'black',fontWeight:"bold",float:"left",position:'absolute',bottom:"5px"}}><span className='fa fa-clock-o'></span> Joined {userdetails && formater(userdetails.time_joined)}</small>
       {editprofile ?
       <label for="profileimage">
         <span  className='fa fa-camera fa-2x' style={{position:"absolute",top:"20px",color:"lightgrey",left:"50px",zIndex:"900000"}}></span>
       </label>
      : null}

      <input type="file" name="files" style={{display:"none"}} onChange={filechange} id="profileimage" className='profileimage' />
    <br/>
     
      </div>
      </div>
      </div>
      </div>
        </div>
         {!editprofile ? 
         <div style={{marginTop:"20px"}}>
          <div>
    <p style={{fontWeight:"lighter",color:"grey"}}><span className='fa fa-user'></span> {userdetails.gender === undefined || userdetails.gender === null ? userdetails.gender : "Male"}</p>

    <div className='row' >
 <div className='col-12 mb-2'>Registered Stores ({registeredstores.length})</div>
  <br/>
 <div className='col-12'>
     {registeredstores && registeredstores.map((clientstores,i) =>
       <div className='row mb-2' key={clientstores.storeId}  style={{padding:"10px",borderTop:`${i===0 ? "1px solid grey" : ""}`,borderBottom:"1px solid grey"}}>
        <hr/>
        <div className='col-11 col-md-2'>
          <img style={{width:"100%",height:"130px"}} src={require(`./female.png`)} />
        </div>
        <div className='col-12 col-md-10'>
        
         <span>{clientstores.store_name} <small>
          <div className="outer">     
                 <div className="inner" style={{width:`${clientstores.averagerating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({clientstores.averagerating || 0}) </small>
          </small></span> 
          <small onClick={()=>setviewmorestoreId(viewmorestoreId === clientstores.storeId ? "" : clientstores.storeId)} style={{marginLeft:"2px",cursor:"pointer",border:'1px solid grey',color:'grey',padding:"0px 3px",borderRadius:"10px"}}>
            {viewmorestoreId === clientstores.storeId ? "view less" : "view more..."}
            </small>
            <small className='bg-primary' style={{float:'right',marginRight:"30px",color:'white',border:"1px solid grey",cursor:"pointer",padding:"2px 5px",borderRadius:"20px",display:`${viewmorestoreId === clientstores.storeId ? "block" : "none"}`}}>
            <Link style={{color:"white", textDecoration:"none"}} to={`/profile/edit store/${clientstores.storeId}`}> edit store </Link>
              </small>
        <br/>
            <small><span className='fa fa-link' style={{border:"1px solid orange",color:"grey",padding:"3px",borderRadius:"4px"}}></span> : <Link>http://localhost:3000/shop/client/product_display_section?store={clientstores.store_name}</Link></small>
            <small><span className='fa fa-copy mr-2 ml-2' style={{border:"1px solid grey",fontSize:"12px",color:"grey",padding:"1px",borderRadius:"4px"}}></span></small>
            <small><span className='fa fa-share mr-2 ml-2 text-primary' style={{border:"1px solid grey",fontSize:"12px",color:"grey",padding:"1px",borderRadius:"4px"}}></span></small>
           <div style={{display:`${viewmorestoreId === clientstores.storeId ? "block" : "none"}`}}>
            <small style={{color:"grey"}}>{clientstores.store_address}</small><br/>
          <small style={{textTransform:"capitalize"}}>{clientstores.store_about}</small><br/>
        <div className='row'>
          <div className='col-4'>
          <small><b style={{color:"white",fontSize:"15px",backgroundColor:"blue",padding:"2px 7px",borderRadius:"20px"}}>{clientstores.store_followers ? JSON.parse(clientstores.store_followers).length : 0}</b> Followers</small>
          </div>
          <div className='col-4'>
         <small><b style={{color:"white",fontSize:"15px",backgroundColor:"orange",padding:"2px 7px",borderRadius:"20px"}}>{clientstores.store_followers ? JSON.parse(clientstores.store_followers).length : 0}</b> Followers</small><br/>
         </div>
         <div className='col-4'>
         <small><b style={{color:"white",fontSize:"15px",backgroundColor:"indianred",padding:"2px 7px",borderRadius:"20px"}}>38</b> uploads +</small><br/>
         </div>
         <br/>
         <div className='col-4 mt-2'>
      <center>
      <small className='bg-primary' onClick={()=>openstoredetails(clientstores)} style={{marginRight:"30px",color:"white",border:"1px solid grey",cursor:"pointer",padding:"2px 5px",borderRadius:"20px",display:`${viewmorestoreId === clientstores.storeId ? "block" : "none"}`}}>
              <span className='fa fa-pencil-square-o'></span> edit uploads <span style={{float:'right',padding:"5px"}} className={`${query.get("edit_temp") && parseInt(query.get("store")) === clientstores.storeId ? 'fa fa-chevron-circle-down':'fa fa-chevron-circle-up'}`}></span>
              </small>
      </center>
       </div>
        </div>
          </div>
        
        </div>
        <div style={{display:`${viewmorestoreId === clientstores.storeId ? "block" : "none"}`}} className='col-12 mt-3'>
        {query.get("edit_temp") && parseInt(query.get("store")) === clientstores.storeId
        ? <MyStoreProduct   store={clientstores.store_name} storeapp={true}/>
      : null}
        </div>
        </div>
      )}
      </div>
   
      <div className='col-12' style={{marginTop:"50px"}}>Registered Dispatch ({registereddispatch.length})</div>
 <div className='col-12' style={{marginBottom:"100px"}}>
     {registereddispatch && registereddispatch.map((clientdispatchs,i) =>
        <div className='row mb-2' key={clientdispatchs.storeId}  style={{padding:"10px",borderTop:`${i===0 ? "1px solid lightgrey" : ""}`,borderBottom:"1px solid lightgrey"}}>
        <div className='col-8 col-md-2'>
          <img style={{width:"100%",height:"130px"}} src={require(`./female.png`)} />
        </div>
        <div className='col-12 col-md-10'>
         <span>{clientdispatchs.dispatch_name} <small>
          <div className="outer">     
                 <div className="inner" style={{width:`${clientdispatchs.averagerating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({clientdispatchs.averagerating || 0}) </small>
          </small></span>
          <small onClick={()=>setviewmoredispatchId(viewmoredispatchId === clientdispatchs.dispatchId ? "" : clientdispatchs.dispatchId)} style={{marginLeft:"2px",cursor:"pointer",border:'1px solid grey',color:'grey',padding:"0px 3px",borderRadius:"10px"}}>
            {viewmoredispatchId === clientdispatchs.dispatchId ? "view less" : "view more..."}
            </small>
            <small className='bg-primary' style={{float:'right',marginRight:"30px",border:"1px solid grey",cursor:"pointer",padding:"2px 5px",borderRadius:"20px",display:`${viewmoredispatchId === clientdispatchs.dispatchId ? "block" : "none"}`}}>
              <Link style={{color:"white", textDecoration:"none"}} to={`/profile/edit dispatch/${clientdispatchs.dispatchId}`}>edit dispatch</Link>
              </small>
<br/>
           <div style={{display:`${viewmoredispatchId === clientdispatchs.dispatchId ? "block" : "none"}`}}>
          <small style={{color:"grey"}}>{clientdispatchs.dispatch_address}</small><br/>
          <small style={{textTransform:"capitalize"}}>{clientdispatchs.dispatch_about}</small><br/>
          <small><b style={{color:"orange",fontSize:"15px",border:"1px solid grey",backgroundColor:"blue",padding:"0px 3px",borderRadius:"20px"}}>{clientdispatchs.store_followers ? JSON.parse(clientdispatchs.store_followers).length : 0}</b> Followers</small><br/>
          </div>
        </div>
        </div>
      )}
      </div>
  </div>
  <br/>
  <div className='row' style={{borderBottom:"1px solid grey", display:"none",backgroundColor:"white",position:"sticky",top:"0",padding:"0"}}>
    <div onClick={()=>settoshow("details")} className='col-4'  style={{cursor:"pointer",borderBottom:`${query.get("sub")==="details" ? "2px solid orange" : ""}`,color:`${query.get("sub")==="details" ? "orange" : "grey"}`,padding:"0",margin:"0"}}>
      <p   style={{padding:"0",margin:"0",fontWeight:`${query.get("sub")==="details" ? "bolder" : "lighter"}`,textAlign:"center"}}>Details</p>
    </div>
    <div onClick={()=>settoshow("recent")} className='col-4' style={{cursor:"pointer",borderBottom:`${query.get("sub")==="recent" ? "2px solid orange" : ""}`,color:`${query.get("sub")==="recent" ? "orange" : "grey"}`,padding:"0",margin:"0"}}>
      <p   style={{padding:"0",margin:"0",fontWeight:`${query.get("sub")==="recent" ? "bolder" : "lighter"}`,textAlign:"center"}}>recent activites</p>
    </div>
    <div onClick={()=>settoshow("verified_sales")} className='col-4'  style={{cursor:"pointer",borderBottom:`${query.get("sub")==="verified_sales" ? "2px solid orange" : ""}`,color:`${query.get("sub")==="verified_sales" ? "orange" : "grey"}`,padding:"0",margin:"0"}}>
      <p   style={{padding:"0",margin:"0",fontWeight:`${query.get("sub")==="verified_sales" ? "bolder" : "lighter"}`,textAlign:"center"}}>verified purches</p>
    </div>
    </div>
   {query.get("sub")=== "details" || !query.get("sub")?
    <div className='row' style={{padding:"20px",border:"1px solid grey"}}>  
    
  </div>
  : null}
   
    {query.get("sub")==="recent" ?
   <Product_History />
   : null}
    {query.get("sub")==="verified_sales" ?
   <Verified_Sales />
   : null}
          </div>
         </div>
          : 
          <div>
            <br/><br/>
            <div className="row" >
              <div className='col-4'>
                <p>Name :</p>
              </div>
              <div className='col-8'>
                <input type="text" name="name" onChange={change} value={inputs.name} className='form-control' />
              </div>
            </div>
            <br/>
            <div className="row" >
              <div className='col-4'>
                <p>Email :</p>
              </div>
              <div className='col-8'>
                <input type="text"  name="email"  onChange={change}value={inputs.email} className='form-control' />
              </div>
            </div>
            <br/>
            <div className="row" >
              <div className='col-4'>
                <p>Contact :</p>
              </div>
              <div className='col-8'>
                <input type="text"  name="contact" onChange={change}value={inputs.contact} className='form-control' />
              </div>
            </div>
            <br/>
            <div className="row" >
              <div className='col-4'>
                <p>Gender :</p>
              </div>
              <div className='col-8'>
                <input type="text" name="gender" onChange={change} className='form-control' value='Male' readonly={true}/>
              </div>
            </div>
 <br/>
            <div className="row" >
              <div className='col-4'>
                <small>current/permanent</small>
                <p>Address :</p>
              </div>
              <div className='col-8'>
                <input type="text" onChange={change} name="address" className='form-control' value={inputs.address}/>
              </div>
            </div>

            <br/>
            <div className='row'>
              <div className='col-12'>
                <button className='btn btn-primary' onClick={submitprofile}>Submit</button>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
     
      </div>
     );
    }
export default Profile;



