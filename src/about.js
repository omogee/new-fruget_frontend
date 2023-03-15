import React, { useState, useEffect, useContext } from 'react';
import socket from './socketconn';
import { userContext } from './usercontext';
import {useNavigate} from "react-router-dom"

function About() {
    const context = useContext(userContext)
    const [spd, setspd] = context["spd"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]

      const navigate = useNavigate()
     const query = new URLSearchParams(window.location.search)

     const closemodal =()=>{
        setspd("")
        query.delete("spd")
        navigate(window.location.pathname +"?"+ query.toString())
     }
 if(!mobiledevice){
   return(
    <div className='container-fluid'>
    <div className="row" style={{backgroundColor:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px",padding:"3px 10px",margin:"0",width:"100%"}}>
    <div className="col-2" style={{padding:"0",margin:"0"}}>
    <img style={{width:"110%",borderRadius:"50%",margin:"0",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
    </div>
    <div className="col-10" style={{justifyContent:"center",position:"relative",alignContent:"center",alignItems:"center"}}>
        <p style={{padding:"0px",position:"absolute",top:"10%",fontWeight:"bolder",textAlign:'center',width:"100%",color:"grey"}}>About "e.o.eze merchandize, ltd"<br/>
        <small>No, 56 muritala mohammed way</small><br/>
        <small>oyingbo, ebutte-metta</small> <br/>
        <small>Lagos state.</small></p>
    </div>
    </div>
    <br/><br/>
    <br/><br/><br/>
    <div style={{padding:"20px", color:'grey'}}>
      <p> Who are we ?</p>
      <small style={{color:"black"}}>e.o.eze has been a major distributor of electronics since 1987 till date and dominates a major electronic wholesale - retail flow within lagos and its proxies.
       we started as an SME of just a small shop to running its operations in 3 large scale outlets .<br/>
      </small>
      <br/>
      <p> Who we do ?</p>
      <small style={{color:"black"}}>e.o.eze has been a major distributor of fans and electricals such as wires, clips, poles etc.
       today we are a proud conglomerate of several wholesale and retail outlets and deal heavily small to large scale household needs such as generators, refrigerators, dispensers, a/c, fans, televisions, kitchen electrical aids(such as blender, friers, mixers, etc), home theatres,extensions etc..<br/>
       kindly visit out product page to see more of what we sell and distribute<br/>
      </small>

</div>
</div>
   )
 }else{
    return ( 
        <div style={{position:"fixed",top:"5%",left:"0%",zIndex:"2000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
        <span className='fa fa-times-circle-o fa-2x' onClick={closemodal} style={{cursor:'pointer',fontWeight:"lighter",position:"absolute",top:"15%",left:"70%",padding:"10px",color:"white"}}></span>
        <div className='shopcartdeldiv' style={{position:"fixed",height:"70%",overflow:"scroll",borderRadius:"10px",top:"20%",left:"30%",width:"40%",zIndex:"300000",backgroundColor:"white"}}>
        <div className="row" style={{backgroundColor:"white",borderTopRightRadius:"10px",borderTopLeftRadius:"10px",position:"fixed",padding:"3px 10px",margin:"0",width:"40%"}}>
              <div className="col-2" style={{padding:"0",margin:"0"}}>
              <img style={{width:"110%",borderRadius:"50%",margin:"0",border:"2px solid lightgrey"}} src={`https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png`} />
              </div>
              <div className="col-10" style={{justifyContent:"center",position:"relative",alignContent:"center",alignItems:"center"}}>
                  <p style={{padding:"0px",position:"absolute",top:"10%",fontWeight:"bolder",textAlign:'center',width:"100%",color:"grey"}}>About "e.o.eze merchandize, ltd"<br/>
                  <small>No, 56 muritala mohammed way</small><br/>
                  <small>oyingbo, ebutte-metta</small> <br/>
                  <small>Lagos state.</small></p>
              </div>
              </div>
              <br/><br/>
              <br/><br/><br/>
              <div style={{padding:"20px", color:'grey'}}>
                <p> Who are we ?</p>
                <small style={{color:"black"}}>e.o.eze has been a major distributor of electronics since 1987 till date and dominates a major electronic wholesale - retail flow within lagos and its proxies.
                 we started as an SME of just a small shop to running its operations in 3 large scale outlets .<br/>
                </small>
                <br/>
                <p> Who we do ?</p>
                <small style={{color:"black"}}>e.o.eze has been a major distributor of fans and electricals such as wires, clips, poles etc.
                 today we are a proud conglomerate of several wholesale and retail outlets and deal heavily small to large scale household needs such as generators, refrigerators, dispensers, a/c, fans, televisions, kitchen electrical aids(such as blender, friers, mixers, etc), home theatres,extensions etc..<br/>
                 kindly visit out product page to see more of what we sell and distribute<br/>
                </small>
        
          </div>
       
          </div>
    </div>
     );
    }
}

export default About;