import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatermain } from './formatTime';
import {userContext} from "./usercontext"
import socket from './socketconn';
import Cookies from "js-cookie"
import { formateronlymain } from './formatTime';
import axios from "axios"

function HireDispatch() {
    const context = useContext(userContext)
    const [availabledispatchers, setavailabledispatchers] =context["availabledispatchers"]
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [loading, setloading] = context["loading"]
    const [dispatchtohire, setdispatchtohire] = useState(false)
    const [hireinput, sethireinput] = useState({})
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [userdetails, setuserdetails] = context["userdetail"]
    const [dispatchcomments, setdispatchcomments]= useState(false)
    const [addcommentId, setaddcommentId]= useState(false)
    const [ratinginputs, setratinginputs] = useState({"myrating":5,"mycomment":"Excellent dispatch service"})

    const navigate = useNavigate()
    const query= new URLSearchParams(window.location.search)
    const params = useParams()

    useEffect(()=>{
        setcurrentPage("hiredispatch")
        socket.on("hirerequeststatussettorecieved", data=>{
            if(data.status === "success"){
                setalertmessage(data.message)
                setrequeststatus(data.status)
                settargetmodal("dispatch")
                setmodaldisplay("block")
                setdispatchtohire(false)
            }else{
                setalertmessage(data.message)
                setrequeststatus(data.status)
                settargetmodal("dispatch")
                setmodaldisplay("block")
                setdispatchtohire(false)
            }

        })
    })
const change=(e)=>{
 setavailabledispatchers(availabledispatchers.filter(dispatch => dispatch.dispatch_name.indexOf(e.target.value) > -1))
}
const openlink =(data)=>{
   setloading(true)
    navigate(`/client/profile/${data}`)
}
const hireinputchange=(e)=>{
 sethireinput(prev=>({...prev , [`${e.target.name}`]:e.target.value}))
}
const hire =()=>{
 console.log("hireinput",hireinput)
if(hireinput && hireinput.from && hireinput.to){
    let data ={
        hireinput,
        tkt:Cookies.get("tktplc"),
        dispatchtohire
    }
    socket.emit("hiredispatchrequest",data )
    setdispatchtohire(false)
}
}
const fetchcomments =(dispatchId)=>{
    setloading(true)
    axios.get(`http://localhost:5000/item/fetch_dispatchcomments?dispatchId=${dispatchId}`)
    .then(res =>{
        if(res.data.status === "success"){
      setdispatchcomments(res.data.dispatchcomments)
      setTimeout(()=>setloading(false), 1000)
        }else{
            alert("an error occured")
        }
    })
    .catch(err => console.warn(err))
}
const followdispatch=(dispatchId)=>{
    setloading(true)
    axios.get(`http://localhost:5000/client/follow_dispatch?dispatchId=${dispatchId}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
        axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
        .then(res =>{
            setavailabledispatchers(res.data.availabledispatchers)
            setloading(false)
        })
        .catch(err => console.warn(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
   }
   const unfollowdispatch=(dispatchId)=>{
    setloading(true)
    axios.get(`http://localhost:5000/client/unfollow_dispatch?dispatchId=${dispatchId}&tkt=${Cookies.get("tktplc")}`)
    .then(res => {
      if(res.data.status === "success"){
        axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
        .then(res =>{
            setavailabledispatchers(res.data.availabledispatchers)
            setloading(false)
        })
        .catch(err => console.warn(err))
      }else{
        alert("failed")
      }
    })
    .catch( err => console.warn(err))
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
          return    setratinginputs({mycomment: "Excellent dispatch service",myrating:e.target.value})
          }
       else if(e.target.value >3 && e.target.value <= 4){
             setratinginputs({mycomment: "Very Good dispatch service",myrating:e.target.value})
         }
        else if(e.target.value >2 && e.target.value <= 3){
             setratinginputs({mycomment: "Good dispatch service",myrating:e.target.value})
         }
         else if(e.target.value >1 && e.target.value <= 2){
             setratinginputs({mycomment: "Average dispatch service",myrating:e.target.value})
         }
        else if(e.target.value == 1){
             setratinginputs({mycomment: "Very Poor",myrating:e.target.value})
         }          
   }
   const add_dispatchcomment=(dispatchId)=>{
    setloading(true)
    axios.get(`http://localhost:5000/item/rate_dispatch?dispatchId=${dispatchId}&tkt=${Cookies.get("tktplc")}&ratinginputs=${JSON.stringify(ratinginputs)}`)
    .then(res =>{
        if(res.data.status==="success"){
            axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
            .then(res =>{
                setavailabledispatchers(res.data.availabledispatchers)
                setaddcommentId(false)
                setratinginputs({"myrating":5,"mycomment":"Excellent dispatch service"})                
               setTimeout(()=> setloading(false), 1000)
            })
            .catch(err => console.warn(err))
        }
    })
    .catch(err => console.warn(err))
   }
   const likecomment=(dispatchratingId)=>{
    if(Cookies.get("tktplc")){
        setloading(true)
     axios.get(`http://localhost:5000/item/like_dispatchcomment?tkt=${Cookies.get("tktplc")}&dispatchratingId=${dispatchratingId}`)
     .then(res => {
       if(res.data.status === "success"){
        if(dispatchcomments){
            setdispatchcomments(res.data.dispatchcomments)
        }
         axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
            .then(res =>{
                setavailabledispatchers(res.data.availabledispatchers)              
               setloading(false)
            })
            .catch(err => console.warn(err))
        }
     })
     .catch(err => console.warn(err))
    }
   }
   const dislikecomment=(dispatchratingId)=>{
     if(Cookies.get("tktplc")){
        setloading(true)
       axios.get(`http://localhost:5000/item/dislike_dispatchcomment?tkt=${Cookies.get("tktplc")}&dispatchratingId=${dispatchratingId}`)
       .then(res => {
         if(res.data.status === "success"){
           if(dispatchcomments){
            setdispatchcomments(res.data.dispatchcomments)
           }
           axios.get(`http://localhost:5000/item/fetch_all_dispatch?tkt=${Cookies.get("tktplc")}`)
            .then(res =>{
                setavailabledispatchers(res.data.availabledispatchers)               
              setloading(false)
            })
            .catch(err => console.warn(err))
         }
       })
       .catch(err => console.warn(err))
      }
   }
   const confirmratestatus=(dispatchId)=>{
     if(Cookies.get('tktplc')){
        setloading(true)
        axios.get(`http://localhost:5000/item/confirm_ratedispatchmodal?tkt=${Cookies.get("tktplc")}&dispatchId=${dispatchId}`)
        .then(res=>{
            if(res.data.status === "success"){
                setaddcommentId(dispatchId)
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
    return (
        <div className='container'>
           <div className='row'  style={{position:"sticky",backgroundColor:"white", zIndex:"5634", top:"0px"}}>
            
            <div className='col-12 col-md-4'>
                <p style={{color:"orange", fontWeight:"bolder",fontSize:"14px"}}>Dispatch( {availabledispatchers.length})</p>
            </div>
            <div className='col-12 col-md-7'>
                <input type="text" onChange={change} className='form-control' placeholder="Search dispatch ..."  />
            </div>
         
            </div>
           <hr/>
           <div className='row'>
            {availabledispatchers.map(dispatchers =>
                <div key={dispatchers.dispatchId}  className='col-12 col-md-6' style={{paddingRight:"20px",cursor:"pointer"}}>
                   <div className='noheighthoveredapp container'>
                   <div className='row' onClick={()=>openlink(`${dispatchers.dispatch_customerId}`)}>
                        <div className='col-2 col-md-3'>
                            <img style={{width:'100%',borderRadius:"50%",height:"60px"}} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtiTaqebveR7HVTz0C_kxVZCOJJO9hf7rRy9Ii7Qw469KagdRGj2SgwtNCauFRm2dVGg&usqp=CAU`} />
                        </div>
                        <div className='col-10 col-md-9' style={{padding:"0",margin:"0"}}>
                       <small style={{textTransform:"capitalize"}}> {dispatchers.dispatch_name} 
                       <span className='fa fa-check-circle-o text-primary ml-1 mr-2'></span>
                       </small>
                       <small>  <div className="outer">
          <div className="inner" style={{width:`${dispatchers ? dispatchers.dispatchrating*20 : "30"}%`}}>
          </div>
        </div></small><br/>
                    <small><span className='fa fa-map-marker mr-1' style={{color:'grey',fontSize:"12px"}}></span> {dispatchers.dispatch_address}</small>
                   
                        </div>
                    </div>
                  <div className='row'>
                    <div className='col-8'>
                        <p><b>{dispatchers && dispatchers.dispatch_followers && JSON.parse(dispatchers.dispatch_followers).length}</b> followers</p>
                        <small>Type: {dispatchers.dispatch_type}</small><br/>
                    <small><b>{dispatchers.dispatch_verifieddispatch}</b> verified dispatch  </small><br/>
                   {dispatchers.dispatch_verifieddispatch_time ?  <small>Last dipatched <b>{formateronlymain(dispatchers.dispatch_verifieddispatch_time)} ago</b></small>: null}
                    </div>
                    <div className='col-4 col-md-4 col-lg-4'> 
         <div style={{width:'100%'}}>
         {dispatchers && dispatchers.dispatch_followers && JSON.parse(dispatchers.dispatch_followers).includes(userdetails.customerId)
               ?
               <button onClick={()=>unfollowdispatch(dispatchers && dispatchers.dispatchId)} className='btn' style={{float:'right',backgroundColor:"white",border:'1px solid grey',boxShadow:'none',padding:"0px 2px"}}>
               <small> <span style={{textTransform:"capitalize",color:"grey",fontSize:"13px",fontWeight:"bold"}} >following</span> </small>
            </button>
            :  
            <button onClick={()=>followdispatch(dispatchers && dispatchers.dispatchId)} className='btn' style={{float:'right',backgroundColor:"grey",color:"white",border:"0",padding:"0px 8px",boxShadow:"none"}}>
            <small> <span style={{textTransform:"capitalize",fontSize:"13px",fontWeight:"bold"}} >Follow</span> </small>
         </button>}
         </div>
        <br/><br/>
            <div style={{display:"flex", justifyContent:"space-evenly"}}>
            <button className='btn' style={{color:"white",padding:"0px 5px",backgroundColor:'orange'}}><span className='fa fa-envelope-o'></span></button>
         <button className='btn ml-2' style={{color:"white",padding:"0px 5px",backgroundColor:'orange'}}><span className='fa fa-phone-square'></span></button>
        
            </div>
             </div> 
                    <div className='col-12' style={{marginTop:"15px"}}>
                    <small onClick={()=>setdispatchtohire(dispatchers)} style={{float:"right",backgroundColor:"green",padding:"1px 6px",borderRadius:"20px",color:'white'}}>hire</small>
                    <small style={{color:"grey"}}><span className='fa fa-info-circle mr-1' style={{fontSize:'14px'}}></span> {dispatchers.dispatch_about}</small>
                    <br/>
                    <small style={{color:"grey"}}><span style={{fontWeight:"bolder"}}>{dispatchers.dispatch_lga}</span>, {dispatchers.dispatch_state}</small>
                    <br/><br/>
                    
                    <Link style={{textDecoration:"none"}} to={`/chat?pdx=${dispatchers.dispatch_customerId}&dispatch=${dispatchers.dispatch_name}&dispatchId=${dispatchers.dispatchId}`}><small style={{border:'1px solid orange',color:'grey',padding:"2px",borderRadius:"10px"}}>send message</small></Link>
                    
                    <small style={{float:'right',color:'grey',marginRight:"20px"}}><span className='fa fa-clock-o'></span> joined {formatermain(dispatchers.dispatchreg_time)} ago</small>
                   <br/><br/>
                   <small style={{color:"orange",fontWeight:"bolder"}}> comments ({dispatchers.dr_numofrating || 0})</small>
                   <small style={{color:"grey",float:"right",fontWeight:"bolder"}} onClick={()=> confirmratestatus(dispatchers.dispatchId)}> + add </small>
                 {addcommentId === dispatchers.dispatchId ?
                   <div className='row'>
                   <div className='col-12'> <small style={{float:"right",color:"grey"}} onClick={()=>setaddcommentId(false)}><span className='fa fa-times'></span></small></div>
                   <div className='col-12'>
                       <input type="text" name="comment" className='form-control form-control-sm' onChange={commentchange} value={ratinginputs.mycomment || 0} />
                       <br/>
                       <input type="number" name="comment" className='form-control form-control-sm' onChange={ratingschange} value={ratinginputs.myrating || 0} />
                       <small onClick={()=>add_dispatchcomment(dispatchers.dispatchId)} style={{fontWeight:"bold",color:"orange"}}>add comment</small>
                       <br/><br/>
                   </div>
                  </div> : null}
                    {dispatchers && dispatchers.dispatchrating_time ?
                    <div style={{lineHeight:"16px",borderTop:"1px solid lightgrey",fontSize:"12px",borderBottom:"1px solid lightgrey"}}>       
                         <div className="row" style={{padding:"10px",position:"relative"}}>
                          <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                          <img src={dispatchers.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${dispatchers.image}`: require(`./maleprofile.png`)} style={{width:"100%",padding:"0px",borderRadius:"50%",border:"1px solid lightgrey",margin:"3px 0px",height:"60px"}} alt="" />
                          </div>
                          <div className="col-10" style={{padding:"0px 0px 0px 5px",marginBottom:"10px"}}>
                          <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {dispatchers.name || "Anonymous"} </small>
                          <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified deliveries</span></small>
                                           
                   <div style={{padding:"2px"}}>
                       <small style={{padding:"3px 0px"}}>
                        <small style={{fontSize:"13px"}}> {dispatchers.dispatchcomment}</small></small>
                        <small style={{float:"right",clear:"left",padding:"8px"}}>
                           <div className="outer" style={{fontSize:"10px"}}>
                   <div className="inner" style={{fontSize:"8px",width:`${(dispatchers.dispatchrating)*20 || 0}%`}}>
                   </div>
                   </div></small><br/>
                        </div>
                  <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comment")}>Reply.</small>
                  <small className="likebutton ml-2" style={{fontSize:'18px',color:"grey"}} >
                    <span style={{color:`${dispatchers.likes && JSON.parse(dispatchers.likes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} onClick={()=>likecomment(dispatchers.dispatchratingId)} className="fa fa-thumbs-up" ></span>
                     <span className="ml-1">
                    {dispatchers.likes && JSON.parse(dispatchers.likes) ? JSON.parse(dispatchers.likes).length : 0}
                     </span>
                 </small>
                  <small className="likebutton" style={{fontSize:'18px',marginLeft:"40px",color:`grey`}} >
                    <span style={{color:`${dispatchers.dislikes && JSON.parse(dispatchers.dislikes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} onClick={()=>dislikecomment(dispatchers.dispatchratingId)} className="fa fa-thumbs-down" ></span>
                     <span className="ml-1">
                     {dispatchers.dislikes ? JSON.parse(dispatchers.dislikes).length : 0}
                     </span>
                  </small>
                  
                  </div>
                  <small style={{marginTop:"0px",bottom:"0",position:'absolute',fontSize:'11px',right:'50px',padding:"0"}} className="ml-2 text-muted">{formateronlymain(dispatchers.dispatchrating_time)}</small>
                  </div>
                  </div>  : null}  
                  <small className='text-danger' style={{fontWeight:"lighter"}}>report dispatch</small>

                     {dispatchers.dr_numofrating  && dispatchers.dr_numofrating > 1 ?
                     <small onClick={()=> fetchcomments(dispatchers.dispatchId)} style={{float:"right",fontStyle:"italic",color:"grey"}}>view more comment/ratings<br/><br/></small>
                    : null}
                  
                    </div>
                  </div>
                   </div>
                </div>
                )}
           </div>
           <div onClick={()=>setdispatchcomments(false)} style={{position:"fixed",top:"5%",display:`${dispatchcomments && dispatchcomments.length > 0 ? "block" : "none"}`,left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
                 <div className='shopcartdeldiv' style={{position:"fixed",padding:"0px",height:"70%",overflow:"hidden",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"10px",zIndex:"900000"}}>
               <div className='row'>
                <div className='col-12'>  
                 <small onClick={()=> setdispatchcomments(false)} style={{position:"absolute",cursor:"pointer", top:"1px",color:"grey", right:"15px",fontSize:"15px"}}><span className='fa fa-times'></span></small>
                <small style={{color:"grey",fontWeight:"bolder"}}>  {dispatchcomments && dispatchcomments[0].dispatch_name}</small>
                <small style={{color:"orange",float:"right",marginRight:"20px",fontWeight:"bolder"}}> comments ({dispatchcomments.length || 0})</small><br/>
                </div>
                <small style={{marginLeft:"20px"}}>  <div className="outer">
          <div className="inner" style={{width:`${dispatchcomments && dispatchcomments[0] ? dispatchcomments[0].dispatchrating*20 : "0"}%`}}>
          </div>
        </div>({dispatchcomments && dispatchcomments[0] ? dispatchcomments[0].dispatchrating : 0})</small><br/>
               </div>
                  <div className='container-fluid mb-3' style={{height:"100%",paddingBottom:"50px",overflow:"scroll"}}>
                  {dispatchcomments && dispatchcomments.length > 0 ?
                 dispatchcomments.map(dispatchcomms=>
                         <div style={{lineHeight:"16px",borderTop:"1px solid lightgrey",fontSize:"12px",borderBottom:"1px solid lightgrey"}}>       
                         <div className="row" style={{padding:"10px",position:"relative"}}>
                          <div className="col-2" style={{padding:"0px",margin:"0px"}}>
                          <img src={dispatchcomms.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${dispatchcomms.image}`: require(`./maleprofile.png`)} style={{width:"100%",padding:"0px",borderRadius:"50%",border:"1px solid lightgrey",margin:"3px 0px",height:"60px"}} alt="" />
                          </div>
                          <div className="col-10" style={{padding:"0px 0px 0px 5px",marginBottom:"10px"}}>
                          <small style={{padding:"5px 0px",fontWeight:"bold",color:"brown",fontSize:"12px"}}> {dispatchcomms.name || "Anonymous"} </small>
                          <small style={{float:"right",marginRight:"8px"}}><span className="fa fa-check-circle " style={{color:"orange",fontSize:"15px"}}></span><span className="dodo"> Verified deliveries</span></small>
                                           
                   <div style={{padding:"2px"}}>
                       <small style={{padding:"3px 0px"}}>
                        <small style={{fontSize:"13px"}}> {dispatchcomms.dispatchcomment}</small></small>
                        <small style={{float:"right",clear:"left",padding:"8px"}}>
                           <div className="outer" style={{fontSize:"10px"}}>
                   <div className="inner" style={{fontSize:"8px",width:`${(dispatchcomms.dispatchrating)*20 || 0}%`}}>
                   </div>
                   </div></small><br/>
                        </div>
                  <small  style={{fontSize:"13px"}} onClick={()=>alert("only the admin can reply comment")}>Reply.</small>
                  <small className="likebutton ml-2" style={{fontSize:'18px',color:"grey"}} >
                    <span style={{color:`${dispatchcomms.likes && JSON.parse(dispatchcomms.likes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} onClick={()=>likecomment(dispatchcomms.dispatchratingId)} className="fa fa-thumbs-up" ></span>
                     <span className="ml-1">
                    {dispatchcomms.likes && JSON.parse(dispatchcomms.likes) ? JSON.parse(dispatchcomms.likes).length : 0}
                     </span>
                 </small>
                  <small className="likebutton" style={{fontSize:'18px',marginLeft:"40px",color:`grey`}} >
                    <span style={{color:`${dispatchcomms.dislikes && JSON.parse(dispatchcomms.dislikes).includes(`${userdetails.customerId}`) ? "blue" : "grey"}`}} onClick={()=>dislikecomment(dispatchcomms.dispatchratingId)} className="fa fa-thumbs-down" ></span>
                     <span className="ml-1">
                     {dispatchcomms.dislikes ? JSON.parse(dispatchcomms.dislikes).length : 0}
                     </span>
                  </small>
                  
                  </div>
                 
                  <small style={{marginTop:"0px",bottom:"0",position:'absolute',fontSize:'11px',right:'50px',padding:"0"}} className="ml-2 text-muted">{formateronlymain(dispatchcomms.dispatchrating_time)}</small>
                  </div>
                  </div>
                    )
                 : null}  
                  </div>
         </div>
          </div>
           <div style={{position:"fixed",top:"5%",display:`${dispatchtohire ? "block" : "none"}`,left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
                 <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"10px",zIndex:"900000"}}>
            <div>
            <small style={{fontWeight:"bold", color:'indianred',textTransform:'capitalize',fontSize:'11px'}}>This request would be sent to {dispatchtohire.dispatch_name}</small>
                <br/>
                <small style={{fontWeight:"bold", color:'grey',textTransform:'capitalize',fontSize:'11px'}}>Pick up location</small>
            <input type="text" onChange={hireinputchange} value={hireinput.from || ""} className='form-control' name="from" placeholder='Location: From'/>
            <br/>
            <small style={{fontWeight:"bold", color:'grey',textTransform:'capitalize',fontSize:'11px'}}>drop off location</small>
            <input type="text" onChange={hireinputchange} value={hireinput.to || ""} className='form-control' name="to" placeholder='Location: To'/>
            <br/>
            <small style={{fontWeight:"bold", color:'grey',textTransform:'capitalize',fontSize:'11px'}}>item description</small>
            <input type="text" onChange={hireinputchange} value={hireinput.description || ""} name="description" className='form-control' placeholder='Item To Dispatch'/>
            <br/>
            <small style={{fontWeight:"bold", color:'grey',textTransform:'capitalize',fontSize:'11px'}}>how soon?</small>
            <select onChange={hireinputchange} name="time" className="form-control">
                <option value="as soon as possible">as soon as possible</option>
                <option value="immediately">immediately</option>
                <option value="tommorow">tommorow</option>
                <option value="i would communicate as soon as you respond">i would communicate as soon as you respond</option>
            </select>
            </div>
            <br/><br/>
            <div className='row'>
                <div className='col-5'>
                    <button onClick={()=> setdispatchtohire(false)} style={{padding:"5px 10px"}} className='btn btn-danger'>cancel</button>
                </div>
                <div className='col-7'>
                    <button onClick={hire} style={{float:"right",padding:"5px 20px"}} className='btn btn-primary'>send hire request</button>
                </div>
            </div>
         </div>
          </div>
        </div>
      );
}

export default HireDispatch;