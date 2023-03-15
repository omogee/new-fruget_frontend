import React, { useState, useEffect, useContext } from 'react';
import { userContext } from './usercontext';
import { useNavigate } from 'react-router-dom';

function Modal() {
    const context = useContext(userContext)
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
     const [mobiledevice, setmobiledevice] = context["mobiledevice"]
     const [modalopacity, setmodalopacity] = useState(0)
     const [counter, setcounter] = useState(5)
     const [loading, setloading] = context["loading"]

     const navigate = useNavigate()
     useEffect(()=>{
    if(modaldisplay === "block" && mobiledevice){
       setmodalopacity(1)
    }
     },[modaldisplay])

     useEffect(()=>{
    if(mobiledevice){
      if(modalopacity === 1){
        setTimeout(()=>{
          setmodalopacity(0)
          setTimeout(()=>setmodaldisplay("none"), 2000)
        }, 5000)
      }
      else{
        setTimeout(()=>setalertmessage(""), 2000)
      }
    }
     },[modalopacity])
     const openlink =(data)=>{
      if(data.length > 0){
        setloading(true)
        setmodaldisplay("none")
        navigate(data)
      }
     }
     if(mobiledevice){
    return (   
   <div onClick={()=>openlink(targetmodal === "cart" ? "/profile/cart" : targetmodal === "save" ? "/profile/saved_items": targetmodal === "rate" ? "" : targetmodal==="message" ? "chat?pdx=x" : "" )} className='shopcartdeldiv' style={{position:"fixed",cursor:"pointer",transition:"all 1.2s linear",opacity:`${modalopacity}`,display:`${modaldisplay}`,left:"5%",width:"90%",top:"20%",padding:"10px",zIndex:"300000",backgroundColor:`${requeststatus === "success" ? "green" : "indianred"}`,color:"white",border:"1px solid lightgrey"}}>
             <center style={{padding:"2px"}}>
              {requeststatus === "failed" 
              ? 
              <small style={{color:"white",fontWeight:"bold"}}><span className='fa fa-ban'></span></small>
            : requeststatus === "success"
            ? <small style={{color:"white",fontWeight:"bold"}}> <span className='fa fa-check ml-1'></span></small>
        : <small>no response</small>}
              <small> {alertmessage}  
              <span className='fa fa-times ml-1' onClick={()=> setmodaldisplay("none")} style={{fontWeight:"lighter",float:"right",fontSize:'20px',color:"lightgrey"}}></span></small>
             </center>
             <div className='row' style={{display:"none"}}>
                <div className='col-4'>
                    <button className='btn btn-danger' onClick={()=> setmodaldisplay("none")}>Done</button>
                </div>
                <div className='col-8'>
                  {targetmodal === "cart" ?
                   <a href={`/profile/cart`}  style={{float:'right'}}>
                     <button className='btn btn-primary'  >Proceed to <span className='fa fa-shopping-cart'></span></button>
                   </a>
                : targetmodal === "save" ?
                <a href={`/profile/saved_items`}  style={{float:'right'}}>
                <button className='btn btn-primary' style={{float:'right'}} >saved items <span className='fa fa-heart'></span></button>
                </a>
            : targetmodal === "rate" ?
            <button className='btn btn-primary' style={{float:'right'}} >shop</button>
        :   <button className='btn btn-primary' style={{float:'right'}} >Done</button>}
                </div>
               </div>
            </div>

     );
    }else{
        return (   
            <div>               
          <div style={{position:"fixed",display:`${modaldisplay}`,top:"5%",left:"0%",zIndex:"2000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
              <div className='shopcartdeldiv' style={{position:"fixed",top:"30%",padding:"10px",zIndex:"300000",backgroundColor:"white",border:"1px solid lightgrey"}}>
                 <center style={{padding:"20px"}}>
                  <span className='fa fa-times fa-2x' onClick={()=> setmodaldisplay("none")} style={{position:"absolute",right:"20px",top:"10px",color:"grey"}}></span>
    
                  {requeststatus === "failed" 
                  ? 
                  <p style={{color:"indianred",fontWeight:"bold"}}><span className='fa fa-ban'></span> Request Failed</p>
                : requeststatus === "success"
                ? <p style={{color:"green",fontWeight:"bold"}}>Request Successful <span className='fa fa-check ml-1'></span></p>
            : <small>Request</small>}
                  <p>{alertmessage}</p>
                 </center>
                 <div className='row'>
                    <div className='col-4'>
                        <button className='btn btn-danger' onClick={()=> setmodaldisplay("none")}>Done</button>
                    </div>
                    <div className='col-8'>
                      {targetmodal === "cart" ?
                       <a href={`/cart`}  style={{float:'right'}}>
                         <button className='btn btn-primary'  >Proceed to <span className='fa fa-shopping-cart'></span></button>
                       </a>
                    : targetmodal === "save" ?
                    <a href={`/saved_items`}  style={{float:'right'}}>
                    <button className='btn btn-primary' style={{float:'right'}} >saved items <span className='fa fa-heart'></span></button>
                    </a>
                : targetmodal === "rate" ?
                <button className='btn btn-primary' style={{float:'right'}} >shop</button>
            :   <button className='btn btn-primary' style={{float:'right'}} >Done</button>}
                    </div>
                   </div>
                </div>
           
                </div>
            </div>
         ); 
    }
}

export default Modal;