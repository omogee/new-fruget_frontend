import React, { useState, useEffect,useRef, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import socket from "./socketconn"
import {useNavigate, useParams} from "react-router-dom"
import Cookies from "js-cookie"
import axios from "axios"
import {formater, formatermain} from "./formatTime"
import "./main.css"
import { userContext } from './usercontext';

//const CryptoJS = require("crypto-js") 

function Connection(props) {
    const [conn,setconn] = useState([])
    const [allmessages,setAllmessages]=useState({})
    const [ownerid, setownerid] = useState({})
    const [groupdetails, setgroupdetails] = useState({})
    const [groupresponse, setgroupresponse] = useState({})
    const [displaynewgroupmodal, setdisplaynewgroupmodal] = useState("none")
    const [allmessagecount,setAllmessagecount]= useState({})
    const [lastchatuser, setlastchatuser] = useState("")
    const context = useContext(userContext)
    const [currentPage, setcurrentPage]= context["currentpage"]
    const [mobiledevice , setmobiledevice] = context["mobiledevice"]
    const [typingclients, settypingclients] = context["typingclients"]
    const [onlineclients, setonlineclients]=context["onlineclients"]
    const [redirect, setredirect] = context["redirect"]

  
    const [groups, setgroups] = useState([])
      let navigate = useNavigate()
      const hiddenref = useRef(null)
      const isFirstRender = useRef(true)
      const querystring = new URLSearchParams(window.location.search)

         useEffect(()=>{
          setcurrentPage("chatapp")
          socket.emit("fetchlastchatuser", ownerid)
          socket.on("lastchatuser", lastchatuser=>{
            setlastchatuser(lastchatuser)
          })
          window.addEventListener("resize", ()=>{
            if(window.innerWidth > 900){
           if(lastchatuser && lastchatuser.length > 0 && !querystring.get("pdx")){
            navigate(`/chat?pdx=${lastchatuser}`)
           }
            }
          })
         })
        useEffect(()=>{
          /*
          if(Cookies.get("cvyx")) {
            var bytes = CryptoJS.AES.decrypt(Cookies.get("cvyx"), 'my-secret-key@123');
          const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          console.log("decryptedData",decryptedData)
         */
        if(Cookies.get("tktplc")){
          const tkt = Cookies.get("tktplc")
          const indexermain = parseInt(tkt.split("bkop")[1])
          setownerid(indexermain)
          setgroupdetails({ownerid:parseInt(1)})
          axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?tkt=${Cookies.get("tktplc")}`)
          .then(res => {
            setconn(res.data.connections)
          })
          .catch(err => console.warn(err))
       //   }
        
    socket.on("recieving message", data =>{
      axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?tkt=${Cookies.get("tktplc")}`)
      .then(res => {
        setconn(res.data.connections)
      })
      .catch(err => console.warn(err))
    })
    socket.on("message status sent", data =>{
      axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?tkt=${Cookies.get("tktplc")}`)
      .then(res => {
        setconn(res.data.connections)
      })
      .catch(err => console.warn(err))
    })
    socket.on("message status delivered", data =>{
      axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?tkt=${Cookies.get("tktplc")}`)
      .then(res => {
        setconn(res.data.connections)
      })
      .catch(err => console.warn(err))
    })
  }else{
    setredirect(true)
  }
},[querystring.get("pdx")])
useEffect(()=>{
  //  socket.on("sending message", data =>{ 
  // axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?id=${ownerid}`)
  // .then(res => {
  //   setconn(res.data.connections)
  // })
  // .catch(err => console.warn(err))
  //   })
  //   socket.on("recieving message", data =>{ 
  //     axios.get(`https://new-frugetbackend-productions.up.railway.app/fetch-connections?id=${ownerid}`)
  //     .then(res => {
  //       setconn(res.data.connections) 
  //     })ß
  //     .catch(err => console.warn(err))
  //       })
})

//overcomer
//we are good people with a very focus move to trust and believe in God
const Messages =()=>{
//  <small style={{color:"lightgrey",fontWeight:"bold"}}>{allmessages[`${connect.connid}`] && parseInt(allmessages[`${connect.connid}`].sender) === ownerid  ? "ME :" : connect.sender === ownerid ? "ME :" : null}</small>
    return ( 
          <div className='container-fluid connections_body' style={{backgroundColor:'white',height:"72vh"}}>           
            <div style={{overflow:"scroll",position:"absolute",marginLeft:"-10px",zIndex:"978768743",height:"100%",width:"100%"}}>
                      {conn.map(connect =>               
                        <div className='row'  key={connect.customerId} style={{padding:"0px 15px 0px 10px",backgroundColor:"white",borderBottom:"0.4px solid lightgrey"}}>
                            <div className='col-3' onClick={()=> openprofile(`client/profile/${connect.customerId}`)} style={{padding:"5px",zIndex:'999738',cursor:"pointer"}}>
                                <div style={{borderRadius:"50%",width:"100",overflow:"hidden",padding:"0",margin:"0",boxShadow:"1px 0px 1px 1px lightgrey"}}>
                                <img style={{width:"100%",height:"70px",padding:"1px"}} src={connect.image ? `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${connect.image}` :connect.gender === "male" ? `https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png` : require(`./female.png`)} />
                                {onlineclients && onlineclients.includes(connect.customerId) || props.onlineclients && props.onlineclients.includes(connect.customerId) ? 
                             <span className='badge ml-2'  style={{fontWeight:"bold",position:"absolute",bottom:"3%",borderRadius:'50%',border:"4px solid white",right:"20%",zIndex:"7896",padding:"0px 1px",color:"blue",backgroundColor:"blue",fontSize:"10px"}}>**</span>
                            : null}
                            </div>
                            </div>
                            <div className='col-8' onClick={()=> openchat(`chat?pdx=${connect.customerId}`)} style={{position:"relative",cursor:"pointer"}}>
                                <div style={{position:"absolute",top:"20%",lineHeight:"1",width:"100%"}}>
                             <small style={{fontSize:"17px",padding:"0",margin:"0",color:"black"}}>{connect.name} 
                             
                              </small>
                                <small className='mt-1' style={{float:"right",clear:"both",color:"black",marginLeft:"5px"}}>{connect.message ? formatermain(connect.time) : null}</small>                    
                                 <small className='ml-1'>{props.online && props.online.includes(connect.userid) ? <span style={{color:"#1E90FF"}} className="fa fa-circle"></span> : ""}</small><br/>
                                <small className='text-muted' style={{fontSize:"12px",padding:"0",margin:"0"}}>@{connect.username}</small> <br/>
                               <div style={{display:"flex",flexWrap:"nowrap",padding:"5px 2px"}}>
                                 <div style={{width:"90%"}}>
                                 {typingclients.includes(connect.customerId) ?
                                 <i style={{color:"green"}}>typing ...</i>
                                 :
                                <div>
                                   <small style={{color:"grey"}}>                         
                                 { parseInt(connect.sender) === parseInt(ownerid) && connect.status === "sent" ? 
                   <small style={{fontFamily:"FontAwesome"}}> &#xf00c;</small>
                  : parseInt(connect.sender) === parseInt(ownerid) && connect.status === "delivered" ? 
                  <small style={{fontFamily:"FontAwesome"}} > &#xf00c;&#xf00c;</small>
                 : parseInt(connect.sender) === parseInt(ownerid) && connect.status === "seen" ?
                 <small style={{fontFamily:"FontAwesome",color:"#1E90FF"}}> &#xf00c;&#xf00c;</small> 
                : null}
                                 </small>
                                   <small style={{fontSize:"13px",color:"black"}}> {connect.message && connect.message.length > 28 ? connect.message.slice(0,28) + "...": connect.message}</small>
                                </div>
                                 }
                                   </div>
                                   <div style={{width:"10%"}}>

                               <small style={{float:"right"}}> 
                               {connect.noofunread?
                              <span style={{border:"2px solid green",borderRadius:'50%'}}>
                              <span style={{fontWeight:"bold",padding:"0px 3px",color:"white",backgroundColor:"green",borderRadius:"20px"}}>{connect.noofunread}</span>
                              </span>
                              : null}
                               </small>
                                 </div>
                                 </div>
                               <small style={{display:"none"}}>{typingclients.includes(connect.id) ? <i style={{color:"green"}} >typing ...</i> : ""}</small>
                                </div>
                            </div>
                        </div>
                    
                        )}
                        </div>
             </div>
     );
  }
const openprofile=(data)=>{
 setcurrentPage("profile")
 navigate(`/${data}`)
}
const openchat=(data)=>{
  navigate(`/${data}`)
 }
  if(redirect){
    <Navigate to="/login"></Navigate>
  }
  else if(mobiledevice){
  return(
    <div className='connections mb-3' style={{overflow:"hidden"}}>
         <div className='connections_top'>
        <div style={{display:"flex",justifyContent:"space-evenly"}}>
        <div style={{width:"60%",color:"white",position:"relative",textAlign:"center"}}>
          <p className='mt-2 ml-2' style={{fontSize:'20px',float:"left"}}>Send Messages</p>
          </div>
          <div style={{width:"20%",color:"white",position:"relative",textAlign:"center"}}>
         <span className='fa fa-comments-o fa-2x' style={{marginTop:"5px"}}></span>
         <small style={{fontWeight:"bolder",color:'lightgrey'}}>{conn.length}</small>
          </div>
          <div style={{width:"20%",lineHeight:'2vh',color:"white",position:"relative",textAlign:"center"}}>
         <span className='fa fa-envelope ' style={{marginTop:"10px",color:"pink",fontSize:'20px'}}></span>
         <small style={{fontWeight:"bolder",color:'lightgrey'}}>{conn.length}</small><br/>
         <small style={{fontSize:'10px'}}>unread</small>
          </div>
        </div>
           </div>
    <Messages />
    <br/><br/><br/>
    </div>
  )
}else{
  return(
    <div style={{padding:"0",margin:"0"}}>
   
         <div style={{position:"fixed",padding:"10px",top:"0px",width:"100%",backgroundColor:"indianred",left:"0%",zIndex:"20"}}>
        <div style={{display:"flex"}}>
       
          <div style={{width:"60%",position:"relative",textAlign:"center"}}>
          <p style={{float:"left"}}>Send Messages</p>
          </div>
        </div>
           </div>
           <div>
          
<div style={{overflow:"scroll",marginTop:"40px"}}>
    <Messages />
    <br/><br/>
    </div>
    <br/><br/><br/>
    </div>
    </div>
  )
}
}

export default (Connection);
/**
 *  <Link to={`/chat/${connect.userid}`} >
                        <div className='row'  key={connect.id} style={{padding:"5px",borderBottom:"0.4px solid lightgrey"}}>
                            <div className='col-3' style={{padding:"5px"}}>
                                <img style={{borderRadius:"50%",width:"100%",border:"2px solid lightgrey",padding:"5px"}} src={connect.gender === "male" ? `https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png` : require(`./female.png`)} />
                            </div>
                            <div className='col-9' style={{position:"relative"}}>
                                <div style={{position:"absolute",top:"20%",lineHeight:"1",width:"100%"}}>
                                <small style={{fontSize:"17px",padding:"0",margin:"0",color:"black"}}>{connect.name}</small> 
                                <small className='mt-1' style={{float:"right",clear:"both",color:"black",marginLeft:"5px"}}>{allmessages[connect.connid] ? formatermain(allmessages[connect.connid].time) : connect.message ? formatermain(connect.time) : null}</small> 
                             
                                 <small className='ml-1'>{props.online.includes(connect.userid) ? <span style={{color:"#1E90FF"}} className="fa fa-circle"></span> : ""}</small><br/>
                                <small className='text-muted' style={{fontSize:"12px",padding:"0",margin:"0"}}>@{connect.username}</small> <br/>
                               <div style={{display:"flex",flexWrap:"nowrap",padding:"5px 2px"}}>
                                 <div style={{width:"90%"}}>
                                   <small style={{color:"grey"}}>
                                   
                                   {allmessages[connect.connid] && parseInt(allmessages[connect.connid].sender) === ownerid && allmessages[connect.connid].status === "sent" ? 
                     <small style={{fontFamily:"FontAwesome"}}> &#xf00c;</small>
                    : allmessages[connect.connid] && parseInt(allmessages[connect.connid].sender) === ownerid && allmessages[connect.connid].status === "delivered" ? 
                    <small style={{fontFamily:"FontAwesome"}} > &#xf00c;&#xf00c;</small>
                   : allmessages[connect.connid] && parseInt(allmessages[connect.connid].sender) === ownerid && allmessages[connect.connid].status === "seen" ?
                   <small style={{fontFamily:"FontAwesome",color:"#1E90FF"}}> &#xf00c;&#xf00c;</small>
                   : allmessages[connect.connid]  ?
                   null
                :  parseInt(connect.sender) === ownerid && connect.status === "sent" ? 
                     <small style={{fontFamily:"FontAwesome"}}> &#xf00c;</small>
                    : parseInt(connect.sender) === ownerid && connect.status === "delivered" ? 
                    <small style={{fontFamily:"FontAwesome"}} > &#xf00c;&#xf00c;</small>
                   : parseInt(connect.sender) === ownerid && connect.status === "seen" ?
                   <small style={{fontFamily:"FontAwesome",color:"#1E90FF"}}> &#xf00c;&#xf00c;</small> 
                  : null}
                                   </small>
                                 
                                   <small style={{fontSize:"13px",color:"black"}}> {allmessages[connect.connid] && allmessages[connect.connid].message.length > 30 ? allmessages[connect.connid].message.slice(0,30) + "..." 
                                   : allmessages[connect.connid] && allmessages[connect.connid].message.length <= 30 ?  allmessages[connect.connid].message : connect.message}</small>
                                  
                                   </div>
                                   <div style={{width:"10%"}}>

                               <small style={{float:"right"}}> 
                               {allmessagecount[connect.connid] ?
                               <div style={{color:"green",fontSize:"30px"}}>*</div>
                               : null}</small>
                                 </div>
                                 </div>
                               <small style={{display:"none"}}>{typingclients.includes(connect.id) ? <i style={{color:"green"}} >typing ...</i> : ""}</small>
                                </div>
                            </div>
                        </div>
                        </Link>
 */