
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

function Dispatch(props) {
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
   const [agreed, setagreed] = useState("false")
   const [displayterms, setdisplayterms] = useState(false)
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
    if(agreed === "true"){
      navigate(`/profile/join dispatch`)
    }
  },[agreed])
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

  axios.post(`https://new-frugetbackend-productions.up.railway.app/client/edit_profile`, formdata)
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
   axios.get(`https://new-frugetbackend-productions.up.railway.app/client/confirm_registered_email?email=${userdetails.email}&customerId=${userdetails.customerId}`)
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
const agreedchange=(data)=>{
  setagreed(data)
}
    return ( 
      <div className='container'>
    <div className='row' >
    <div className='col-12' style={{position:"sticky",height:"30px",backgroundColor:"white", zIndex:"67863", top:"0px"}}>
            <div className='row' >
 <div className='col-6 mb-2'>
    <small style={{fontWeight:"bold",color:"orange"}}>
    Registered Dispatch ({registereddispatch.length})
    </small>
 </div>
 <div className='col-6 mb-2'>
    <small style={{fontWeight:"bold",cursor:"pointer",color:"grey",padding:"2px 10px", borderRadius:"10px",border:"1px solid grey",marginRight:'30px', float:'right'}}>
    <span className='fa fa-plus-circle'> Add dispatch</span>
    </small>
 </div>
    
 </div>
        </div>
        </div>
        <div style={{position:"fixed",width:"100%",height:"90%",display:`${displayterms ? "block" : "none"}`,backgroundColor:"rgba(65,102,160,0.6)", top:"11%", zIndex:"9999888999999"}}>
      <div className='row' style={{position:"fixed",boxShadow:"2px 3px 3px 3px lightgrey",padding:"20px",height:"70vh",overflow:"scroll",backgroundColor:"rgba(245,245,245,0.6)",border:"1px solid lightgrey",borderRadius:"10px", width:"50%",top:"20%", left:"25%",backgroundColor:"white", zIndex:"6474"}}>
              <div className='col-12'>
                <small onClick={()=>setdisplayterms(false)} style={{float:"right",cursor:"Pointer"}}><span className='fa fa-times'></span></small>
              <center>
             <p style={{textAlign:'center',width:"80%",fontWeight:'lighter'}}>Kindly Go Through our Terms and Conditions to Join Our Elegant team of dispatchers <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"5px",borderRadius:'50%',fontSize:'20px'}}>!!</span></p>
             </center>

         <ol>
          <li>
       <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>Authentication Policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-4 col-md-4'>
            <img src={`${require(`./bikeman.jpg`)}`} style={{borderRadius:"50%",height:"130px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...<br/>
            At fruget we are very conscious of iour security checks and advice that you exercise a 48 hour patience with us while we check your profile and confirm your details
     </p>
      </div>
     </li>
     <br/>
     <li>
     <div className='row' style={{position:'relative'}}>
       
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>customer identity policy <span className='fa fa-lock fa-2x' style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}></span></small><br/></div>
        <div className='col-4 col-md-4'>
            <img src={`${require(`./bikeclientsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
     </li>
     <br/>
     <li>
       <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>Private credentials Policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-4 col-md-4'>
            <img src={`${require(`./bikeidentify.jpg`)}`} style={{borderRadius:"50%",height:"130px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
     </li>
     <br/>
     <li>
       <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>swift delivery policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-5 col-md-4'>
            <img src={`${require(`./bikespeed.jpg`)}`} style={{borderRadius:"50%",height:"130px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
     </li>
     <br/>
     <li>
       <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>complete gear policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-5 col-md-4'>
            <img src={`${require(`./bikecomplete.jpg`)}`} style={{borderRadius:"50%",height:"130px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
      </li>
      <br/>
      <li>
      <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>Item safety policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-5 col-md-4'>
            <img src={`${require(`./bikeitemsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",padding:"20px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
     </li>
     <br/>
     <li>
     <div className='row' style={{justifyContent:"center"}}>
       <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>customer identity policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
        <div className='col-5 col-md-4'>
            <img src={`${require(`./bikeclientsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",padding:"20px",width:"100%"}} />
        </div>
        <p style={{padding:"20px"}}>
            For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
        </p>
      </div>
     </li>
    </ol>
              </div>
              <div className='col-12' style={{marginTop:"10px",marginBottom:"50px"}}>
                <small style={{color:"grey",padding:'5px'}}>* please note that by clicking on "i agree" you have hereby mandated to follow the rules and laid down protocol of fruget...</small><br/>
                <small style={{color:"grey",padding:'5px'}}>* you would be redirected to dispatch sign up page</small><br/>
      <input type="checkbox" onClick={()=>agreedchange(agreed === "true" ? "false" : "true")} checked={agreed === "true" ? true : false}  name="termsagreed" /> I AGREE<br/>
       <span className='ml-2'>By clicking "I AGREE"</span>
      <ul>
          <li>
              <small>I fully Agree with all the policies above and if i am ever guilty of any, i should be procecuted accordingly</small>
               </li>
      </ul>
  </div>
            </div>
      </div>
            
        <div className='row'>
        {registereddispatch.length > 0 ?
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
      : 
      <div style={{width:'100%'}}>
        <div style={{ position:"absolute",left:"20%", top:"20%"}}>
    <center>
    <span style={{fontSize:"200px", color:"grey"}} className='fa fa-search' ></span>
    <p>You have no registered dispatch ....<small>Click</small> to add service</p>
    </center>
    </div>
    </div>}
  </div>   
      </div>
     );
    }
export default Dispatch;



