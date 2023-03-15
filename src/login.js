import React, { useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom"
import "./main.css"
import Cookies from "js-cookie"
import axios from 'axios';
import { userContext } from './usercontext';

const CryptoJS = require("crypto-js")

function Login() {
  const context = useContext(userContext)
  const [currentPage, setcurrentPage] = context["currentpage"]
    const [passwordType, setpasswordType] = useState("fa-eye")
    const [passtype, setpassType] = useState("password")
    const [loading, setloading] = useState(false)
    const [modaldisplay, setmodaldisplay] = useState("none")
    const [alertmessage, setalertmessage] = useState("")
    const [inputs, setinputs] = useState({})
  
 

     useEffect(()=>{
     setcurrentPage("login")
     },[])
    const changeType=()=>{
      if(passwordType === "fa-eye"){
        setpasswordType("fa-eye-slash")
        setpassType("text")
      }else{
        setpasswordType("fa-eye")
        setpassType("password")
      }
    }
    const change=(e)=>{
      setinputs(prev=>({...prev, [e.target.name]:e.target.value}))
    }
   
    const login =()=>{
      if(inputs.email && inputs.password){
      setloading(true)
      const print =[
        navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
        ,navigator.deviceMemory,navigator.connection]
        print.unshift(window.screen.width)
        print.push(window.screen.height)

        const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
        const realprint = mainprint.substring(1, mainprint.length-1)
        console.log("realprint", realprint)
      axios.get(`https://new-frugetbackend-productions.up.railway.app/client/login?email=${inputs.email}&password=${inputs.password}&print=${realprint}`)
      .then(res =>{
        if(res.data.status === "success"){
          const tkt =res.data.tkt
          const indexermain = parseInt(tkt.split("bkop")[1])  
          if(indexermain &&  !isNaN(indexermain)){
          Cookies.set("tktplc", res.data.tkt, { expires: 0.3555 })
          var cipheridmain = CryptoJS.AES.encrypt(JSON.stringify(res.data.customerId), 'my-secret-key@123').toString();

          Cookies.set("cvyx", `${cipheridmain}`, { expires: 0.3555 })
          if(res.data.priviledge === "admin"){
            Cookies.set("pvtghg", "0000", { expires: 0.3555 })
          }else if(res.data.priviledge === "client"){
            Cookies.set("pvtghg", `1111`,  { expires: 0.3555 })
          }
          setTimeout(()=>{
            setloading(false)
          },700)
          setTimeout(()=>{
           if(window.location.pathname === "/login"){
            window.location.href="/shop"
           }else{
            window.location.href= window.location.href
           }
          },1000)
        }else{
          alert("An Error Occured, Please Try again")
        }
        }else if(res.data.status === "failed"){
         setloading(false)
         setmodaldisplay("block")
         setalertmessage(res.data.message)

        }else{
          setloading(false)
          alert("an error occured")
        }
      })
    }
  }
    return ( 
      <div>
          <div style={{position:"fixed",display:`${modaldisplay}`,top:"0",left:"0%",zIndex:"2000",backgroundColor:"rgba(242,242,242,0.5)",width:"100%",height:"100%"}}>
          <div style={{position:"fixed",left:"35%",padding:"30px",zIndex:"300000",width:"30%",backgroundColor:"white",border:"1px solid lightgrey", top:"30%"}}>
             <center style={{padding:"20px"}}>
              <span className='fa fa-times fa-2x' style={{position:"absolute",right:"20px",top:"10px",color:"grey"}}></span>
              <p style={{color:"indianred",fontWeight:"bold"}}><span className='fa fa-ban'></span> Request Failed</p>
              <p>{alertmessage}</p>
             </center>
             <div className='row'>
                <div className='col-6'>
                    <button className='btn btn-danger' onClick={()=> setmodaldisplay("none")}>cancel</button>
                </div>
                <div className='col-6'>
                    <button className='btn btn-primary' style={{float:'right'}} >Done</button>
                </div>
               </div>
            </div>
       
            </div>
            <div style={{backgroundImage:`url(https://img.freepik.com/free-photo/cheerful-woman-with-dark-wavy-hairstyle-black-striped-outfit-hat-laughing-looking-into-camera-pink-background_197531-29197.jpg?w=360)`,backgroundRepeat:"no-repeat",backgroundPosition:"center", position:"fixed",right:"0",height:"100%",width:"50%"}}>
            </div>
            {loading ? 
              <div style={{position:"fixed",top:"0",left:"0%",zIndex:"200000",backgroundColor:"rgba(242,242,242,0.3)",width:"100%",height:"100%"}}>
                   <div style={{position:"fixed",left:"40%", top:"30%"}}>
                   <center>
                      <img  src={`https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif`} />
                  </center>
                   </div>
              </div>
              : null}
          <div style={{width:"100%",height:"100%",position:"fixed",zIndex:"20",backgroundColor:"rgba(1,1,1,0.7)",left:"0px"}}>
       <div className='d-none d-lg-block'>
       <small style={{fontSize:"50px",padding:"50px"}}>
                    <span style={{color:"white"}}>Brand<span style={{color:"indianred",fontWeight:"bold"}}>Icon</span></span>
                </small>
       </div>
          <div className="logindiv">
                <div>
                <small className='d-lg-none' style={{fontSize:"30px"}}>
                    <span style={{color:"white"}}>Brand<span style={{color:"indianred",fontWeight:"bold"}}>Icon</span></span>
                </small>
                    <p style={{color:"lightgrey",fontWeight:'bold',fontSize:"25px"}}>SIGN IN <span style={{float:"right"}} className='fa fa-pencil '></span></p>
                </div>
              <div >
                <p className='zeropadding zeromargin'> Username : </p>
                <input  type="text" placeholder="Username Or Email" onChange={change} name="email" style={{backgroundColor:"rgb(38, 38, 38)",width:"100%",color:"lightgrey"}} className='logininput' />
                <br/>
                <p className='zeropadding zeromargin'> Password : </p>
                <div className='input-group' style={{backgroundColor:"rgb(38, 38, 38)",border:"none",color:"lightgrey"}}>
                <div className='input-group-prepend'>
                    <p className='input-group-text' onClick={changeType} style={{backgroundColor:"rgb(38, 38, 38)",border:"none",color:"lightgrey",fontSize:"20px"}}>
                        <span className={`fa ${passwordType}`}></span>
                    </p>
                </div>
                <input  type={`${passtype}`} onChange={change} name="password" placeholder="Enter Your Password" style={{backgroundColor:"rgb(38, 38, 38)",border:"none",width:"80%",color:"lightgrey"}}  />
               
                </div>
                <br/>
                <button className='btn loginbtn' onClick={login}>
                    LOGIN
                </button>
                <small>
                  <div style={{display:"flex",color:"lightgrey"}}>
                   <div style={{width:"50%"}}>
                    <small style={{fontSize:"15px"}}>Need Help?</small>
                   </div>
                   <div style={{width:"50%"}}>
                    <small style={{fontSize:"15px",float:"right"}}><input type="checkbox" style={{backgroundColor:"red"}} /> Remember me</small>
                   </div>
                  </div>
                </small>
                <center style={{fontSize:"20px"}}>
                    <br/><br/><br/>
                    <small style={{color:"lightgrey"}}>Don't Have An Account?</small> 
                    <small><Link to="/register"> SIGN UP</Link></small>
                </center>
              </div>
            </div>
          </div>
      </div>
        
     );
}

export default Login;