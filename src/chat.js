import React, { useState, useEffect, useContext } from 'react';
import socket from './socketconn';
import { userContext } from './usercontext';
import {Link, useNavigate, useParams} from "react-router-dom"
import { formater, getSentTime, formatermain } from './formatTime';
import Cookies from 'js-cookie';
import axios from 'axios';

function Chatus(props) {
    const context = useContext(userContext)
    const [spd, setspd] = context["spd"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]
    const [message, setmessage] = useState("")
    const [messages, setmessages] = context["messages"]
    const [onlineclients, setonlineclients] = context["onlineclients"]
    const [user, setuser] = useState([])
    const [userdetails, setuserdetails] = context["userdetail"]
    const [indexermain, setindexermain] = useState("")
    const [pendingmessage, setpendingmessage] = useState(false)
    const [typingclients, settypingclients] = context["typingclients"]
    const [lastseen, setlastseen] = context["lastseen"]
    const [messagebox, setmessagebox] = useState(false)
    const [store, setstore] = useState("")
    const [storeId, setstoreId] = useState("")
    const [dispatch, setdispatch] = useState("")
    const [dispatchId, setdispatchId] = useState("")
    const [savedmessages, setsavedmessages] = useState({})

     const params = useParams()
      const navigate = useNavigate()
     const query = new URLSearchParams(window.location.search)
     const [currentPage, setcurrentPage] = context["currentpage"]

     useEffect(()=>{
      setcurrentPage("chat")
      if(query.get("store")){
        setstore(query.get("store"))
      }
      if(query.get("storeId")){
        setstoreId(query.get("storeId"))
      }
     })
     useEffect(()=>{
      socket.emit("addlastchatuser", {thirdparty:query.get("pdx"),currentuser:indexermain} )
      if(Cookies.get("tktplc")){
      axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch_messages?tkt=${Cookies.get("tktplc")}&pdx=${query.get("pdx")}`)
      .then(res => {
        if( res.data.status === "success"){
          setmessages(res.data.messages)
        }else{
          alert("an error occured")
        }
      })
      .catch(err=> console.warn(err))
    }
     },[indexermain, query.get("pdx")])
     
     useEffect(()=>{
      socket.on("recieving message", (data)=>{
        setmessages(prev => ([...prev, data]))
      })
     },[])
     useEffect(()=>{
      if(Cookies.get("tktplc")){
        const tkt = Cookies.get("tktplc");
        const indexermain_var = parseInt(tkt.split("bkop")[1])
        setindexermain(indexermain_var)
      }

    axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch_user?pdx=${query.get("pdx")}`)
  .then(res => {
    if(res.data.status === "success"){
      setuser(res.data.user[0])
    }
  })
  .catch(err => console.warn(err))
  },[query.get("pdx")])
  useEffect(()=>{
    console.log(savedmessages)
    if(savedmessages && savedmessages[`${query.get("pdx")}`] && savedmessages[`${query.get("pdx")}`].length > 0){
      setmessage(savedmessages[`${query.get("pdx")}`])
    }else{
      setmessage(message)
    }
  },[savedmessages])
  useEffect(()=>{
 socket.emit("fetchsavedmessages", indexermain)
 socket.on("savedmessages", data=>{
  setsavedmessages(data)
 })
  })
  useEffect(()=>{
 if(message.length === 0){
socket.emit("untyping", {typingclient:indexermain, recievingclient:query.get("pdx") })
 }
},[message])

  useEffect(()=>{
    socket.on("message status sent", data=>{
    let allmessages = []
    allmessages = allmessages.concat(messages)
   for(var i=0; i<allmessages.length ; i++){
       if(allmessages[i].messageId === data.messageId){
         allmessages[i].status = "sent"
       }
      }
      setTimeout(()=>setmessages(allmessages), 1000)
   })
   socket.on("message status delivered", data=>{
    let allmessagesTwo = []
    allmessagesTwo = allmessagesTwo.concat(messages)
   for(var i=0; i<allmessagesTwo.length ; i++){
       if(allmessagesTwo[i].messageId === data.messageId){
         allmessagesTwo[i].status = "delivered"
       }
      }
      setTimeout(()=>setmessages(allmessagesTwo), 2000)

      setTimeout(()=>{
        for(var i=0; i<messages.length ; i++){
          if(parseInt(messages[i].reciever) === parseInt(indexermain) ){
           messages[i].status = "seen"
          }
          }
       },3000)
 })
  },[messages])
     const closemodal =()=>{
        setspd("")
        query.delete("spd")
        navigate(window.location.pathname +"?"+ query.toString())
     }
   const change =(e)=>{
     setmessage(e.target.value)
     const data ={
      messageId:Math.floor(Math.random()*100000000),
      message :e.target.value,
      typingclient: indexermain,
      sender: indexermain,
      store: store ? store : "",
      dispatch: dispatch ? dispatch : "",
      storeId: storeId? storeId : "",
      dispatchId:dispatchId ? dispatchId : "",
      reciever: query.get("pdx"),
      recievingclient: query.get("pdx"),
      time:Date.now()
  }
     socket.emit("typingto", data)
   }
   const sendmessage =(e)=>{
    e.preventDefault()
   const randOne = Math.floor(Math.random()*10000)
   const randTwo =Math.floor(Math.random()*10000)
   const rand = randTwo*randOne
    const data ={
        messageId:rand,
        message,
        sender: indexermain,
        store: store ? store : "",
      dispatch: dispatch ? dispatch : "",
      storeId: storeId? storeId : "",
      dispatchId:dispatchId ? dispatchId : "",
        status:"pending",
        reciever: query.get("pdx"),
        time:Date.now()
    }
    setmessages(prev => ([...prev, data]))
    setmessagebox(data)
  // socket.emit("send message", data)
    setmessage("")
   }
   useEffect(()=>{
  if(messagebox){
    socket.emit("send message", messagebox) 
    setmessagebox(false)
  }
   },[messagebox])
   if(mobiledevice){
        return ( 
            <div style={{width:"100%",borderRadius:"20px",backgroundColor:"white",overflow:"hidden",height:"100%",padding:"0",margin:"0"}}>
            <div  style={{borderRadius:"20px",height:"100vh",overflow:"hidden",padding:"0",margin:"0"}}>
            <div className="row inbox_top" style={{padding:`${props.admin ? "3px" : "5px"}`}}>
                <div className='col-1 d-md-none'>
                 <Link to={`/profile/connections`}>
                 <span style={{position:"absolute",top:"30%",left:"0",fontSize:"23px",color:'white'}} className="fa fa-arrow-left"></span>
                 </Link>
                </div>
                  <div className="col-2" style={{padding:"0",margin:"0"}}>
                  <img style={{width:`${props.admin ? "100%" : "100%"}`,borderRadius:"50%",margin:"0",height:"60px",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
                  </div>
                  {props.admin ? 
                   <div className='col-10 mt-2' style={{color:"white"}}>
                   <p>Admin</p>
                   </div>
                   :
                  <div className="col-9 col-md-10" style={{justifyContent:"center",lineHeight:"2.5vh",position:"relative",alignContent:"center",alignItems:"center"}}>
                      <p className='mt-1' style={{padding:"0px",margin:"0",fontWeight:"bolder",color:"white"}}>{user.name}
                      {store ? <small>@{store}</small> : null}</p>
                   <small style={{fontStyle:"italic",color:"lightgrey",padding:"0px",margin:"0px"}}>
                   {typingclients.includes(parseInt(query.get("pdx"))) ? 
                                <i style={{fontSize:"12px",color:"lightgreen",fontWeight:"bold"}}> typing...</i>
                                 : onlineclients.includes(parseInt(query.get("pdx"))) ?                         
                                 <i style={{fontSize:"12px",color:"yellow",fontWeight:"bold"}}> Active Now</i>
                                 : lastseen[`${user.customerId}`] ? 
                                 <i style={{fontSize:"12px",color:"lightgrey",fontWeight:"bold"}}>{formatermain(lastseen[`${user.customerId}`])}</i>
                                 : 
                                 <i style={{fontSize:"12px",color:"lightgrey",fontWeight:"bold"}}>{formatermain(user.lastseen)}</i>
                                }
                    </small> 
                  </div>
                  }
              </div>
            
              <div className='inbox_body'>
                        <div className='inbox_body_main'>
                         {messages.map((message, i)=>
                   <div key={message.time} style={{padding:"0",margin:"0"}}>
                   {i === 0 || getSentTime(message.time) !== getSentTime(messages[i > 0 ? i-1 : 0].time) ? 
           <center>
            <button style={{padding:"2px",border:"none",clear:"both",textAlign:"center",backgroundColor:"white",marginTop:`${i === 0 ? "0px" : "25px"}`,textTransform:"uppercase",fontWeight:"bold"}}>
             <small style={{color:"grey"}}>{getSentTime(message.time)}
             </small>
             </button>
           </center>
       : null}
  
       <div>
     <div>
     {parseInt(message.sender) === parseInt(indexermain) ?
       <div>
         <div className={`${parseInt(message.sender) === parseInt(indexermain) ? "" : ""}`} style={{backgroundColor:`${parseInt(message.sender) === parseInt(indexermain) ? "white" : "indianred"}`,float:`${parseInt(message.sender) === parseInt(indexermain) ? "right" : "left"}`,marginBottom:"30px",maxWidth:"70%",padding:"5px 10px",borderRadius:"30px",clear:"both",border:`${parseInt(message.sender) === parseInt(indexermain) ? "1px solid #FF6347" : ""}`}} >
        <small style={{fontSize:"13px",color:`${parseInt(message.sender) === parseInt(indexermain) ? "indianred" : "white"}`}} >{message.message} </small>
        <small className='mt-1' style={{float:"right",clear:"both",padding:"2px",color:`${parseInt(message.sender) === parseInt(indexermain) ? "grey" : "lightgrey"}`,marginLeft:"5px",fontSize:'11px'}}>
         {formatermain(message.time)} 
         {parseInt(message.sender) === parseInt(indexermain) ?
         message.status === "pending" ? 
      <small className='fa fa-clock-o' style={{fontFamily:"FontAwesome"}}></small>
      :message.status === "sent" ? 
      <small style={{fontFamily:"FontAwesome"}}> &#xf00c;</small>
     : message.status === "delivered" ? 
     <small style={{fontFamily:"FontAwesome"}} > &#xf00c;&#xf00c;</small>
    : message.status === "seen" ?
    <small style={{fontFamily:"FontAwesome",color:"#1E90FF"}}> &#xf00c;&#xf00c;</small> 
   : null : null}
   <br/>
        </small>
        <br/>
        </div> 
       
       </div>
    :
    
    <div style={{clear:"both"}}>
      {message.message_store ?
      <small style={{marginRight:"5px",color:"grey",clear:"both",float:"right"}}>@{message.message_store}</small>
     :
    store && !props.admin ?
           <small style={{marginRight:"5px",color:"grey",clear:"both",float:"right"}}>@{store}</small>
    : null}
    <div style={{display:"flex",margin:"0",maxWidth:"70%"}}>
      <div style={{width:`${props.admin ? "20%" : "15%"}`}}> <img style={{width:"100%",borderRadius:"50%",display:`${message.sender === indexermain ? "none" : "inline-block"}`,float:"left",height:"45px",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} /></div>
      <div className={`${message.sender === indexermain ? "" : "mb-2"}`} style={{position:"relative",backgroundColor:`${message.sender === indexermain ? "white" : "indianred"}`,float:`${message.sender === indexermain ? "right" : "left"}`,maxWidth:"80%",padding:"5px 10px",borderRadius:"30px",clear:"both",border:`${message.sender === indexermain ? "1px solid #FF6347" : ""}`}} >
    <small style={{fontSize:"13px",color:`${message.sender === indexermain ? "indianred" : "white"}`}} >
      {message.message} </small>
    <small className='mt-1' style={{float:"right",clear:"both",padding:"2px",color:`${message.sender === indexermain ? "grey" : "lightgrey"}`,marginLeft:"5px",fontSize:'11px'}}>
     {formatermain(message.time)} 
    </small>
    </div>
    </div>
    </div>
     }
     </div>
                       </div>
                  
                  </div>
                  )}   
                 </div>
              </div>
              <div className='container inbox_footer'>
              <div className="row inbox_footer_main">
                  <div className="col-10">
                    <form onSubmit={sendmessage}>
                      <input type="text" value={message} onChange={change} placeholder='Type in messages/complaint' style={{borderRadius:"10px",boxShadow:"none",outline:"none"}} className="form-control form-control-md" name="message" />
                      </form>
                  </div>
                  <div className="col-1">
                      <button onClick={sendmessage} className={`${message.length > 0 ? "btn btn-success": "btn btn-warning"}`}>
                        <span className='fa fa-paper-plane'></span>
                      </button>
                  </div>
              </div>
              </div>
              </div>
        </div>
         );
   }else{
        return ( 
          <div style={{zIndex:"2000",width:"100%",boxShadow:`${props.admin ? "2px 3px 3px 3px grey" : "none"}`,padding:"0",margin:"0"}}>
          <div  style={{zIndex:"300000",backgroundColor:"white",padding:"0",margin:"0"}}>
          <div className="row" style={{backgroundColor:"indianred",position:'fixed', top:"0%",width:"100%",padding:"10px 10px",margin:"0",width:"100%"}}>
                <div className='col-1'>
               <Link to={`/profile/connections?display=messages`}>
               <span style={{position:"absolute", top:"30%",fontSize:"18px",color:'lightgrey'}} className='fa fa-chevron-circle-left'></span>{user.customerId}</Link>
                </div>
                <div className="col-1" style={{padding:"0",margin:"0"}}>
                <img style={{width:"130%",borderRadius:"50%",margin:"0",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
                </div>
                <div className="col-10" style={{justifyContent:"center",lineHeight:"0.5vh",position:"relative",alignContent:"center",alignItems:"center"}}>
                    <p className='mt-3 ml-2' style={{padding:"0px",marginTop:"10%",fontWeight:"bolder",color:"white"}}>{user.name} <small>@{user.username}</small></p>
                 <small className='ml-3' style={{fontStyle:"italic",color:"lightgrey",padding:"0px",margin:"0px"}}>   
                 {typingclients.includes(parseInt(query.get("pdx"))) ? 
                                <i style={{fontSize:"12px",color:"green",fontWeight:"bold"}}> typing...</i>
                                 : onlineclients.includes(parseInt(query.get("pdx"))) ?                         
                                 <i style={{fontSize:"12px",color:"yellow",fontWeight:"bold"}}> Active</i>
                                 : lastseen[`${user.customerId}`] ? 
                                 <i style={{fontSize:"12px",color:"lightgrey",fontWeight:"bold"}}>{formatermain(lastseen[`${user.customerId}`])}</i>
                                 : 
                                 <i style={{fontSize:"12px",color:"lightgrey",fontWeight:"bold"}}>{formatermain(user.lastseen)}</i>
                                }
                                 
                   </small> 
                </div>
            </div>
          
            <div style={{padding:"0px",marginTop:"17%",marginBottom:"5px",overflow:"scroll"}}>
              {messages.map((message, i)=>
                   <div className='mr-1 ml-1 mb-2 mt-1' key={message.time} style={{padding:"0",margin:"0"}}>
                   {i === 0 || getSentTime(message.time) !== getSentTime(messages[i > 0 ? i-1 : 0].time) ? 
       <div style={{width:"100%",clear:"both"}}>
       <center>
         <small>
           <button style={{padding:"2px",border:"none",backgroundColor:"white",marginTop:`${i === 0 ? "0px" : "25px"}`,textTransform:"uppercase",fontWeight:"bold"}}>
             <small style={{color:"grey"}}>{getSentTime(message.time)}
             </small>
             </button>
           </small>
       </center>
       </div>
       : null}
       {
        /**
         * style={{backgroundColor: "pink",float:"right",maxWidth:"70%",padding:"5px 10px",borderRadius:"5px",clear:"both",border:"1px solid #FF6347" }}
         */
       }
        <div className='mt-2' style={{backgroundColor:`${message.sender === indexermain ? "white" : "pink"}`,float:`${message.sender === indexermain ? "right" : "left"}`,maxWidth:"70%",padding:"10px",borderRadius:"5px",clear:"both",border:`${message.sender === indexermain ? "1px solid #FF6347" : "1px solid lightgrey"}`}} >
                       <small style={{fontSize:"13px"}} >{message.message} </small>
                       <small className='mt-1' style={{float:"right",clear:"both",padding:"2px",color:"indianred",marginLeft:"5px",fontSize:'11px'}}>
                        {formatermain(message.time)} 
                        {message.sender === indexermain ?
                        message.status === "pending" ? 
                     <small className='fa fa-clock-o' style={{fontFamily:"FontAwesome"}}></small>
                     :message.status === "sent" ? 
                     <small style={{fontFamily:"FontAwesome"}}> &#xf00c;</small>
                    : message.status === "delivered" ? 
                    <small style={{fontFamily:"FontAwesome"}} > &#xf00c;&#xf00c;</small>
                   : message.status === "seen" ?
                   <small style={{fontFamily:"FontAwesome",color:"#1E90FF"}}> &#xf00c;&#xf00c;</small> 
                  : null : null}
                       </small>
                       </div> 
                    <br/>
                  </div>
                  )}
              
                  <br/><br/><br/><br/>
            </div>
     
            <div style={{position:'fixed',backgroundColor:"white",marginTop:"10px",padding:"10px",marginBottom:"10px",borderRadius:"10px", bottom:"0px",width:"100%"}}>
            <div className="row" style={{position:"absolute",left:"15px",backgroundColor:"white",borderRadius:"10px",bottom:"0px",width:"95%"}}>
                <div className="col-11">
                <form onSubmit={sendmessage}>
                    <input type="text" value={message} onChange={change} placeholder='Type in messages/complaint' style={{borderRadius:"10px",boxShadow:"none",outline:"none"}} className="form-control form-control-md" name="message" />
                </form>
                </div>
                <div className="col-1">
                    <button type="submit" onClick={sendmessage} className={`${message.length > 0 ? "btn btn-success": "btn btn-warning"}`}>
                      <span className='fa fa-paper-plane'></span>
                    </button>
                </div>
            </div>
            </div>
            </div>
      </div>
         );
   }
}
/**
 * for chating an admin, this design is fine
 *   return ( 
            <div style={{position:"fixed",top:"5%",left:"0%",zIndex:"2000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
            <span className='fa fa-times-circle-o fa-2x' onClick={closemodal} style={{cursor:'pointer',fontWeight:"lighter",position:"absolute",top:"15%",left:"70%",padding:"10px",color:"white"}}></span>
            <div className='shopcartdeldiv' style={{position:"fixed",borderRadius:"10px",top:"20%",left:"30%",width:"40%",zIndex:"300000",backgroundColor:"white"}}>
            <div className="row" style={{backgroundColor:"indianred",borderTopRightRadius:"10px",borderTopLeftRadius:"10px",position:"fixed",padding:"3px 10px",margin:"0",width:"40%"}}>
                  <div className="col-1" style={{padding:"0",margin:"0"}}>
                  <img style={{width:"110%",borderRadius:"50%",margin:"0",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
                  </div>
                  <div className="col-11" style={{justifyContent:"center",position:"relative",alignContent:"center",padding:"10px",alignItems:"center"}}>
                     <div style={{lineHeight:"2.5vh"}}>
                      <small style={{padding:"0px",margin:"0",fontSize:"15px",fontWeight:"bolder",color:"white"}}>{user[0] && user[0].name}</small><br/>
                      {Cookies.get("pvtghg") === "0000" ?
                     <small style={{fontStyle:"italic",color:"lightgrey",padding:"0px",margin:"0px"}}>{onlineclients.includes("admin") ? "Online" : "last seen"}</small> 
                    : (onlineclients.includes(4) && Cookies.get("pvtghg") === "0000") ?
                   <small style={{fontStyle:"italic",color:"lightgrey",padding:"0px",margin:"0px"}}>{onlineclients.includes("admin") ? "Admin Online" : "last seen"}</small> 
                   : null}
                  </div>
                  </div>
              </div>
              <br/>
          
              <div style={{height:'50vh',padding:"10px",marginBottom:"20px",overflow:"scroll"}}>
                {messages.map((message, i)=>
                     <div className='mr-3 ml-3 mb-2 mt-3' key={message.time}>
                     {i === 0 || getSentTime(message.time) !== getSentTime(messages[i > 0 ? i-1 : 0].time) ? 
         <div style={{width:"100%",clear:"both"}}>
         <center>
           <small>
             <button style={{padding:"2px",border:"none",backgroundColor:"white",marginTop:`${i === 0 ? "0px" : "25px"}`,textTransform:"uppercase",fontWeight:"bold"}}>
               <small style={{color:"grey"}}>{getSentTime(message.time)}</small>
               </button>
             </small>
         </center>
         </div>
         : null}
          <div className='mt-2' style={{backgroundColor: `${message.sender == userdetails.userId || userdetails.priviledge === "admin" ? "pink" : "white"}`,float:"right",maxWidth:"70%",padding:"5px 10px",borderRadius:"5px",clear:"both",border:"1px solid #FF6347" }}>
                         <small style={{fontSize:"14px"}} >{message.message} </small>
                         <small className='mt-1' style={{float:"right",clear:"both",marginLeft:"5px",fontSize:'11px'}}>
                          {formatermain(message.time)} <span className='fa fa-clock-o'></span>
                         </small>
                         </div> 
                      <br/>
                    </div>
                    )}
                    <br/><br/><br/><br/>
              </div>
       
              <div style={{position:'sticky',backgroundColor:"white",marginTop:"10px",padding:"10px",marginBottom:"10px",borderRadius:"10px", bottom:"0px",width:"100%"}}>
              <div className="row" style={{position:"absolute",left:"15px",backgroundColor:"white",borderRadius:"10px",bottom:"0px",width:"95%"}}>
                  <div className="col-10">
                    <form onSubmit={sendmessage}>
                      <input type="text" value={message} onChange={change} placeholder='Type in messages/complaint' style={{borderRadius:"10px",boxShadow:"none",outline:"none"}} className="form-control form-control-md" name="message" />
                      </form>
                  </div>
                  <div className="col-1">
                      <button onClick={sendmessage} className={`${message.length > 0 ? "btn btn-success": "btn btn-warning"}`}>
                        <span className='fa fa-paper-plane'></span>
                      </button>
                  </div>
              </div>
              </div>
              </div>
        </div>
         );
 * 
 *  {recievedmessages.map(message => 
                    <p key={message}>{message}</p>
                    )}


                        <div style={{zIndex:"2000",width:"100%"}}>
            <div  style={{zIndex:"300000",backgroundColor:"white"}}>
            <div className="row" style={{backgroundColor:"indianred",position:"fixed",padding:"3px 10px",margin:"0",width:"100%"}}>
                  <div className="col-1" style={{padding:"0",margin:"0"}}>
                  <img style={{width:"110%",borderRadius:"50%",margin:"0",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
                  </div>
                  <div className="col-10" style={{justifyContent:"center",position:"relative",alignContent:"center",alignItems:"center"}}>
                      <p style={{padding:"0px",position:"absolute",top:"30%",fontWeight:"bolder",color:"white"}}>Admin</p>
                  </div>
              </div>
              <br/>
          
              <div className='mt-2' style={{height:"40vh",padding:"10px",marginBottom:"20px",overflow:"scroll"}}>
                {messages.map((message, i)=>
                     <div className='mr-3 ml-3 mb-2 mt-3' key={message.time}>
                     {i === 0 || getSentTime(message.time) !== getSentTime(messages[i > 0 ? i-1 : 0].time) ? 
         <div style={{width:"100%",clear:"both"}}>
         <center>
           <small>
             <button style={{padding:"2px",border:"none",backgroundColor:"white",marginTop:`${i === 0 ? "0px" : "25px"}`,textTransform:"uppercase",fontWeight:"bold"}}>
               <small style={{color:"grey"}}>{getSentTime(message.time)}</small>
               </button>
             </small>
         </center>
         </div>
         : null}
          <div className='mt-2' style={{backgroundColor: "pink",float:"right",maxWidth:"70%",padding:"5px 10px",borderRadius:"5px",clear:"both",border:"1px solid #FF6347" }}>
                         <small style={{fontSize:"13px"}} >{message.message} { message.status} </small>
                         <small className='mt-1' style={{float:"right",clear:"both",marginLeft:"5px",fontSize:'10px'}}>
                            {getSentTime(message.time)} 
                         </small>
                         </div> 
                      <br/>
                    </div>
                    )}
                    <br/><br/><br/><br/>
              </div>
       
              <div style={{position:'fixed',backgroundColor:"white",marginTop:"10px",padding:"10px",marginBottom:"10px",borderRadius:"10px", bottom:"0px",width:"100%"}}>
              <div className="row" style={{position:"absolute",left:"15px",backgroundColor:"white",borderRadius:"10px",bottom:"0px",width:"95%"}}>
                  <div className="col-10">
                      <input type="text" value={message} onChange={change} placeholder='Type in messages/complaint' style={{borderRadius:"10px",boxShadow:"none",outline:"none"}} className="form-control form-control-md" name="message" />
                  </div>
                  <div className="col-1">
                      <button onClick={sendmessage} className={`${message.length > 0 ? "btn btn-success": "btn btn-warning"}`}>
                        <span className='fa fa-paper-plane'></span>
                      </button>
                  </div>
              </div>
              </div>
              </div>
        </div>
 */
export default Chatus;