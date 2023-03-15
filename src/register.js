import React, { useState, useEffect ,useRef, useContext} from 'react';
import "./main.css"
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import { userContext } from './usercontext';
import Geocode from "react-geocode"

Geocode.setApiKey("AIzaSyCqXwfK_tAkjq1Uib4BkfDpeAhylCEkfMY");
    Geocode.setLanguage("en")
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    
function Register() {
    const [inputs, setinputs] = useState({})
    const [otherinput, setotherinput] = useState("")
    const [file, setfile] = useState({})
    const [stepOne, setstepOne] = useState(true)
    const [stepTwo, setstepTwo] = useState(false)
    const [stepThree, setstepThree] = useState(false)
    const [divtwoheight, setdivtwoheight] = useState(100)
    const [divoneheight, setdivoneheight] = useState(100)
    const [emailerr, setEmailerror] = useState(false)
    const [msgerr, setmsgerr] = useState("")
    const [passworderr, setPassworderror] = useState(false)
    const [displayemailsent, setdisplayemailsent] = useState(false)
    const context = useContext(userContext)
    const [loading, setloading] = context["loading"]
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [newsupdatesubscription, setnewsupdatesubscription] = useState(false)
    const [termsandconditions, settermsandconditions] = useState(false)
    const [timer, settimer] = useState(30)
    const [showtimer, setshowtimer] = useState(false)
    const [showresendbtn, setshowresendbtn] = useState(false)

    const query = new URLSearchParams(window.location.search)

    const stepOnediv=useRef(false)
    const stepTwodiv = useRef(false)
    const stepThreediv = useRef(false)
    const navigate= useNavigate()

     useEffect(()=>{      
        if(showtimer){
            const timerfunct= setInterval(()=>{
                settimer(prev => prev-1)
            },1000)
         setTimeout(()=>{
            clearInterval(timerfunct)
            setshowtimer(false)
            settimer(30)
            setshowresendbtn(true)
        }, 30000)
       }     
     },[showtimer])
     useEffect(()=>{
        if(query.get("stepone")){
      const formscroll = document.querySelector(".formscroll")
       formscroll.scrollLeft += formscroll.clientWidth
        }
     },[])
   useEffect(()=>{
    setcurrentPage("register")
    if(Cookies.get("cvyx")){
       // setdisplayemailsent(true)
    }else if (Cookies.get("cvyxx")){
      //  Cookies.remove("cvyxx")
        setdisplayemailsent(false)
        setstepTwo(true)
        setstepOne(false)
        setstepThree(false)
    }
    else if (Cookies.get("cvyxxx")){
        setdisplayemailsent(false)
        setstepTwo(false)
        setstepOne(false)
        setstepThree(true)
    }
   },[stepOne, stepTwo, stepThree])
   useEffect(()=>{
    if(query.get("email") && query.get("step")){
        setloading(true)
        axios.get(`http://localhost:5000/client/confirm_email/stepTwo?email=${query.get("email")}&step=${query.get("step")}`)
        .then(res => {
            if(res.data.status === "success"){
                Cookies.remove("cvyx")
             if(!Cookies.get("cvyxxx")){
                console.log("setting Cookie")
                Cookies.set("cvyxx", true, { expires: 0.5555 })
            }
                setstepTwo(false)
                setstepOne(true)
                setstepThree(false)
                setloading(false)
            }else{
                Cookies.remove("cvyx")
                Cookies.remove("cvyxx")
                window.location.href="/register"
            }
        })
    }
   },[])
   const checkchange=(e)=>{
    if(e.target.name === "newsupdatesubscription"){
    setnewsupdatesubscription(!newsupdatesubscription)
    }
    if(e.target.name === "termsandconditions"){
        settermsandconditions(!termsandconditions)
        }
   }
     const change=(e)=>{
        if(e.target.name === "email"){
            setEmailerror(false)
           }
           if(e.target.name === "password"){
             setPassworderror(false)
           }
           
           setmsgerr("")
            setinputs(prev=>({...prev,[e.target.name]:e.target.value}))
     }
  const filechange=(e)=>{
    let file = e.target.files
    setfile(e.target.files[0])
    setinputs(prev => ({...prev, profileimage:e.target.files[0]}))
     let fileReader = new FileReader()
     fileReader.onload = (e) => {
       let imgprev = document.querySelector(".imgpreview")
       imgprev.src = fileReader.result
     }
     fileReader.readAsDataURL(file[0])
  }
  /*const save =()=>{
    setemail(inputs.email)
    setshowtimer(true)
  //  const formscroll = document.querySelector(".formscroll")
   // formscroll.scrollLeft += formscroll.clientWidth
  }
*/
 const save =()=>{
    if(stepOne){
        if(!inputs.email || !inputs.email.includes("@") || !inputs.email.includes(".com")){
            setEmailerror(true)
        }
       else if(!inputs.password || inputs.password.length < 8){
            setPassworderror(true)
        }
       else{
        setloading(true)
        setEmailerror(false)
        setPassworderror(false)
       setloading(true)
       axios.get(`http://localhost:5000/client/confirm_email?email=${inputs.email}&password=${inputs.password}&newsupdatesubscription=${newsupdatesubscription}`)
       .then(res =>{
        console.log("res.data", res.data)
        if(res.data.status === "success"){
        //  setdisplayemailsent(true)
        setotherinput(inputs)
         setshowtimer(true)
         setinputs({})
          Cookies.set("cvyx", true, { expires: 0.3555 })
          setdisplayemailsent(true)
          setloading(false)
        }else{
            setloading(false)
           setmsgerr(res.data.message)
          }
       })
       .catch(err => console.warn(err))
       }
    }else if(stepTwo && inputs.name && inputs.contact){      
       setloading(true)
        axios.get(`http://localhost:5000/client/second_form/stepTwo?step=${query.get("step")}&name=${inputs.name}&contact=${inputs.contact}&gender=${inputs.gender}`)
        .then(res =>{
            if(res.data.status === "success"){
                Cookies.remove("cvyx")
                Cookies.remove("cvyxx")
                Cookies.set("cvyxxx", true, { expires: 0.5555 })
                stepTwodiv.current.style.transform="translate(-50%,0%)"
                stepTwodiv.current.style.opacity= "0"
                
                stepThreediv.current.style.width="100%"
                stepThreediv.current.style.height="100%"
                stepThreediv.current.style.transform= "translate(0%,0%)"
                stepThreediv.current.style.opacity="1"
                stepThreediv.current.style.margin= "-180px 0px 0px 0px"
                setloading(false)
            }else{
                setmsgerr(res.data.message)
                setloading(false)
            }
        })
    }
    else if(stepThree){
    
        Geocode.fromAddress(inputs.address).then(
            (response) => {
     const { lat, lng } = response.results[0].geometry.location;    
     const formdata = new FormData()
     formdata.append("address", inputs.address)
     formdata.append("lat",lat )
     formdata.append("lng", lng)
     formdata.append("files", file)
    formdata.append("step", query.get("step"))
    formdata.append("email", query.get("email"))

  axios.post(`http://localhost:5000/client/third_form/stepThree`, formdata)
  .then( res => {
   if(res.data.status === "success"){
    Cookies.remove("cvyx")
    Cookies.remove("cvyxx")
    Cookies.remove("cvyxxx")
   alert("Account Created Successfully")
   navigate(`/`)

   }else{
    setmsgerr(res.data.message)
    setloading(false)
   }
    })
  .catch(err => console.warn(err))
},
(error) => {
  console.error(error);
}
);
    }
 }
 const resend=()=>{
    setloading(true)
    axios.get(`http://localhost:5000/resend_mail?email=${inputs.email}&password=${inputs.password}`)
    .then(res => {
        if(res.data.status === "success"){
            setshowtimer(true)
            setdisplayemailsent(true)
             Cookies.set("cvyx", true, { expires: 0.3555 })
             setloading(false)
        }else{
            alert("an error occured")
        }
    })
    .catch(err => console.warn(err))
 }

  /*  stepOnediv.current.style.transform="translate(-50%,0%)"
        stepOnediv.current.style.opacity= "0"
        
        stepTwodiv.current.style.width="100%"
        stepTwodiv.current.style.height="100%"
        stepTwodiv.current.style.transform= "translate(0%,0%)"
        stepTwodiv.current.style.opacity="1"
        stepTwodiv.current.style.margin= "-180px 0px 0px 0px"
  */
 const validateInput=()=>{
    if(inputs.email && inputs.password){
        if(!inputs.email.includes("a") || !inputs.email.includes(".com")){
            setEmailerror(true)
        }
       else if(inputs.password.length < 8){
            setPassworderror(true)
        }
    }
 }
 const Emailsent =()=>{
    if(displayemailsent){
  return(
 <div style={{position:"fixed",zIndex:"500000000",top:"0px",left:"0px",backgroundColor:"rgb(242,242,242,0.4)",width:"100%",height:'100%'}}>
  <div style={{position:"absolute",zIndex:"9999999900000",boxShadow:"1px 1px 4px 4px lightgrey",backgroundColor:"white",padding:"20px",left:"35%",top:"20%",width:"30%"}}>
    <span className='fa fa-times' onClick={()=>setdisplayemailsent(false)} style={{position:'absolute',right:"10px"}}></span>
    <center>
        <span className='fa fa-send' style={{fontSize:"20px",marginTop:"30px",color:"indianred"}}></span>
        <span className='fa fa-envelope'  style={{fontSize:"50px",color:"orange",marginTop:"10px"}}></span>
        <p>Hi, <b>{otherinput.email ? otherinput.email : "user"},</b></p>
        <p style={{color:"grey"}}>A confirmation mail has been sent to you inbox, kindly check your inbox or spam folder to confirm your email and complete your registration </p>
        {showtimer ?
                   <div>
                    <small>Hello {otherinput.email ? otherinput.email : "user"}, an email has been sent to you</small>
           <p><span className='fa fa-clock-o'></span>{timer}   <button className={timer > 0 ? 'btn disabled' :"btn btn-primary"} style={{padding:"2px 3px"}}><small>resend mail</small></button></p>
                   </div>
                : null}
                <button onClick={resend} className={"btn btn-primary"} style={{padding:"2px 3px",display:`${showresendbtn ? "block" : "none"}`}}><small>resend mail</small></button>
    </center>
  </div>
 </div>
  )
    }
 }

  return (
       <div style={{backgroundColor:"white"}}>
        <Emailsent />
          
          <div style={{width:"100%"}} className="lgpadding">
            <div style={{backgroundColor:"white",boxShadow:"2px 2px 3px 4px lightgrey",padding:"10px",position:"relative"}}>
            <div style={{position:"absolute",zIndex:"1000000",top:"30%"}}>
            <div className='row'>
                <div className='d-none d-md-block col-md-6'>
                <small style={{fontSize:"45px"}}>
                    <span>Bran<span style={{color:"red",fontWeight:"bold"}}>dIcon</span></span>
                </small>
                </div>
            </div>
         </div>
         <div className='row' style={{padding:"0",margin:"0"}}>
                <div className='col-12 d-md-none' style={{padding:"0",margin:"0"}}>
                <small style={{fontSize:"30px"}}>
                    <span>Bran<span style={{color:"red",fontWeight:"bold"}}>dIcon</span></span>
                </small>
                </div>
               
            </div>
              <div style={{position:"relative"}}>
              <center>
              <span style={{fontSize:"40px",display:"none",backgroundColor:"pink",borderRadius:"50%",border:"2px solid indianred",padding:"10px",color:"indianred"}} className='fa fa-user-plus'></span>
                 </center>             
              </div>
               <center className='lgpadding'>
               <div className='col-12'>
                    <center>
                        <p style={{fontStyle:"italic",color:"indianred"}}>{msgerr}</p>
                    </center>
                </div>
                <div style={{width:"100%",overflow:'hidden'}}>
                <div className='row formscroll' style={{display:"flex",scrollBehavior:"smooth",marginBottom:"-30px",width:"100%",flexWrap:"nowrap",overflow:"hidden"}}>
                <div className="col-12" ref={stepOnediv} style={{width:"100%",padding:"20px",height:"100%"}}>      
        <div className='col-12 col-md-6'>
    <input type="text" value={inputs.email ? inputs.email : ""} onBlur={validateInput} name="email" style={{boxShadow:"none",border:`${emailerr ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder="Email"></input>
    <small style={{color:"red", fontStyle:"italic",display:`${emailerr ? "block" : "none"}`}}>Enter a valid email</small>
    </div>
   
    <br/><br/>
    <div className='col-12 col-md-6'>
    <input type="password" name="password" onBlur={validateInput} style={{boxShadow:"none",border:`${passworderr ? "1px solid indianred" : ""}`}} onChange={change} className="form-control" placeholder='Enter 8-digit password'></input>
    <small style={{color:"red", fontStyle:"italic",display:`${passworderr ? "block" : "none"}`}}>Password must be atleast 8 characters</small>  
  </div>
  <div className='col-12 col-6 mt-1'>
    <input type="checkbox" onChange={checkchange} checked={newsupdatesubscription} name="newsupdatesubscription" /> <small style={{fontWeight:"lighter"}}>Subscribe to our news letter</small>
  </div>
  <div className='col-12 col-6 mt-1'>
    <input type="checkbox" onChange={checkchange} checked={termsandconditions} name="termsandconditions" /> <small style={{fontWeight:"lighter"}}>Accept Our terms and conditions</small>
  </div>
    <br/>
    <p style={{color:"indianred",fontWeight:"bold"}}>Step 1 of 3</p>
</div>
<div ref={stepTwodiv} className="col-12" style={{padding:"0",width:"100%",padding:"20px",transitionProperty:"transform, opacity",transitionDuration:"2s",transitionTimingFunction:"linear",height:"100%"}}>
        <div className='col-12 col-md-6'>
            <input type="text" style={{boxShadow:"none"}} name="name" onChange={change} className="form-control" placeholder="Full Name"></input>
            </div>
            <br/>
            <div className='col-12 col-md-6'>
              <div className='input-group'>
                  <div className='input-group-prepend'>
                      <span className='input-group-text' style={{backgroundColor:'white',borderRight:"none"}}>+234</span>
                  </div>
                  <input type="text" style={{boxShadow:"none",borderLeft:"none"}} name="contact" onChange={change} className="form-control" placeholder="Phone no"></input>
              </div>
            </div>
            <br/>
          <div  className='col-12 col-md-6' style={{display:"flex"}}>
          <div style={{width:"50%"}}>
            <select  style={{boxShadow:"none"}} name="gender" onChange={change} className="form-control" >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
            </div>
          </div>
<br/>
        
            <p style={{color:"indianred",fontWeight:"bold"}}>Step 2 of 3</p>
        </div>
        <div ref={stepThreediv} className="col-12"  style={{transitionProperty:"transform, opacity",opacity:"1",transitionDuration:"2s",transitionTimingFunction:"linear",width:"100%",overflow:"hidden",height:"100%"}}>
        <div className="col-10 col-md-3">
         <center>
          <label for="imguploader">      
                <span style={{padding:"5px",border:"1px solid indianred",borderRadius:'50%'}} className='fa fa-upload'></span>
                <small>upload picture</small>
             </label>
            </center>
            </div>
            <br/>

            <input id="imguploader" onChange={filechange} type="file" style={{width:'100%',display:"none"}}></input>
        
            <div className='col-12 col-md-6'>
            <input type="text" onBlur={validateInput} name="address" style={{boxShadow:"none"}} onChange={change} className="form-control" placeholder='Enter Permanent Address'></input>
            </div>
            <br/>
            <p style={{color:"indianred",fontWeight:"bold"}}>Step 3 of 3</p>
        </div>
        </div>
        </div>
           <div>
                <center>
                    <h3 style={{color:"grey"}}>Confirm Your Email</h3>
                    <p style={{padding:"20px"}}>Fruget is personalized for you.<br/> Create a password and proceed to confirm your email address.</p>
                   {showtimer ?
                   <div>
                    <small>Hello {otherinput.email ? otherinput.email : "user"}, an email has been sent to you</small>
           <p><span className='fa fa-clock-o'></span>{timer}   <button className={timer > 0 ? 'btn disabled' :"btn btn-primary"} style={{padding:"2px 3px"}}><small>resend mail</small></button></p>
                   </div>
                : null}
                <button onClick={resend} className={"btn btn-primary"} style={{padding:"2px 3px",display:`${showresendbtn ? "block" : "none"}`}}><small>resend mail</small></button>
                   <div style={{padding:"10px",width:"60%"}}>
                   <small style={{ textTransform:"capitalize",fontWeight:"lighter",color:"grey"}}>* by clicking continue kindly open your mail address to confirm your email and proceed to register</small>
                   </div>
                </center>
                </div>
                <div style={{display:`${stepTwo || stepThree ? "block" : "none"}`}}>
                  <center>
                      <h3>Finish setting up your account</h3>
                      <p style={{padding:"20px"}}>Congratulations....<br/> Your email has been confirmed successfully.</p>
                  </center>
                  </div>
                <div className='col-12 col-md-6'>
               <button onClick={termsandconditions ? save : null} className={`${!termsandconditions ? `btn disabled` : 'btn loginbtn'}`} style={!termsandconditions ? {width:"80%",backgroundColor:"grey"} :{width:"80%"}}>
                    SAVE / CONTINUE <span>{!termsandconditions ?   <span className="fa fa-ban"></span> : null}</span>
                </button>
               </div>
               <br/>
                    <small>ALREADY Have An Account?</small><br/>
                    <small><Link to="/login">LOGIN</Link></small>
                </center>
               </div>
           </div>
       </div>
      );
 }

export default Register;
