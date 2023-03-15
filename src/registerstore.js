import React, { useState, useEffect, useContext } from 'react';
import socket from './socketconn';
import {states} from "./state";
import { userContext } from './usercontext';
import {useNavigate} from "react-router-dom"
import axios from 'axios';
import Geocode from "react-geocode"

function RegisterStore() {
    const context = useContext(userContext)
    const [spd, setspd] = context["spd"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]
    const [termsagreed, settermsagreed] = useState(false)
    const [counter, setcounter] = useState(30)
    const [showcounter, setshowcounter] = useState(false)
    const [showresendbtn, setshowresendbtn] = useState(false)
    const [showtermsagreedbtn, setshowtermsagreedbtn] = useState(false)
    const [inputs, setinputs] = useState({})
    const [files, setfiles] = useState([])
    const [fileuploads, setfileuploads] = useState([])
    const [uploadmessage, setuploadmessage] = useState("")
    const [loading, setloading] = context["loading"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [userdetails, setuserdetails] =context["userdetail"]
    const [singlefile, setsinglefile] = useState([])
    const [currentPage, setcurrentPage] = context["currentpage"]
  
    Geocode.setApiKey("AIzaSyCqXwfK_tAkjq1Uib4BkfDpeAhylCEkfMY");
    Geocode.setLanguage("en")
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

      const navigate = useNavigate()
     const query = new URLSearchParams(window.location.search)
    useEffect(()=>{
        setcurrentPage("join store")
        setTimeout(()=>{
            setshowtermsagreedbtn(true)
        },[5000])
    },[])
    useEffect(()=>{
        if( document.querySelector(".scroller")){
            document.querySelector(".scroller").scrollIntoView()
        }      
    },[termsagreed])
     const closemodal =()=>{
        setspd("")
        query.delete("spd")
        navigate(window.location.pathname +"?"+ query.toString())
     }
     const termschanged =()=>{
        settermsagreed(prev => !prev)
     }
     const popImage=(data)=>{
      return fileuploads.splice(data.index,1)[0]
     }
    const  changefile=(e)=>{
        let files =e.target.files
        console.log(files)
           if(fileuploads.length === 5){
            setuploadmessage("!images cannot exceed 5")
        } else if(files[0].type === "image/jpeg" || files[0].type === "image/png"){
  setfiles( prev => ([...prev,files[0]])) 
    const reader = new FileReader()
    reader.onload= (e)=>{
   setfileuploads(prev => ([...prev, e.target.result]))
    }
    reader.readAsDataURL(e.target.files[0])
    setsinglefile(files)
      }
        else{
       setuploadmessage("!file format is not supported")
        }
    }
     const change=(e)=>{
     setinputs(prev => ({...prev, [e.target.name]: e.target.value}))
     }
     const submit=()=>{
        const formdata = new FormData()
        console.log("files", files)
        files.map(file=>{
          formdata.append("files",file)
        })
         formdata.append("userdetails", JSON.stringify(userdetails))
        Geocode.fromAddress(inputs.businessaddress).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            formdata.append("inputs", JSON.stringify(inputs))
            formdata.append("lat", lat)
            formdata.append("lng", lng)
            alert(`${lat} ${lng}`)
            /*
        axios.post(`http://localhost:5000/client/register_store`, formdata)
        .then (res =>{
            if(res.data.status==="success"){
                setalertmessage(`Dear ${userdetails.email}, a confirmation has been sent to your email box`)
                setrequeststatus(res.data.status)
                setmodaldisplay("block")
                setloading(false)
                settargetmodal("register")
                setshowcounter(true)
                const setit =   setInterval(()=>{
                 if(counter === 27){
                     setshowresendbtn(true)
                 }
                setcounter(prev => prev - 1)
                  },[1000])
                  setit()
                  clearInterval(setit)
            }else{
                setalertmessage(`Dear ${userdetails.email}, an error occured, please try again after few minutes`)
                setrequeststatus(res.data.status)
                setmodaldisplay("block")
                setloading(false)
                settargetmodal("register")
                
            }
        })
        .catch(err => console.warn(err))
        */
     })
    }
  
     if(mobiledevice){
        return(
    <div className='container' style={{width:"100%",justifyContent:"center",alignItems:'center'}}>
<div className="col-12 mt-3">
                        <div style={{padding:"10px",color:"lightgrey"}}>
                         <label >Image Upload <b>{5-fileuploads.length}</b>/5</label><br/>
                         <label for="imagefile"><span className='fa fa-camera fa-2x'></span></label><br/>
                 <input type="file" id="imagefile" style={{display:"none"}} multiple className="form-control" onChange={changefile}  name="files"/>
                         </div>
                        </div>
                        <div className="col-12 col-md-8" style={{padding:"10px"}}>
                            <p className="text-danger animated bounce" style={{textTransform:"capitalize"}}>{uploadmessage}</p>
                        <div className="row" >
                       {fileuploads.length > 0 ? fileuploads.map((file,i)=>
                       <div key={file.lastmodified} className="col-3 col-md-3">
                      <span className="fa fa-times text-danger" onClick={()=>popImage({file:file,index:i})} style={{fontSize:"15px",fontWeight:"bolder"}}></span>
                       <img style={{width:"100%",height:"100px"}} src={file ? file : null} alt=""/>
                       </div>
                       ) : <p style={{fontWeight:"bold",color:"indianred",textTransform:"uppercase"}}>No image selected</p>}
                       <div className='col-12 col-md-8' style={{padding:"10px"}}>
                       <small style={{color:"lightgrey"}}><span style={{color:"indianred"}}>*</span> Make sure images are clear enough and in jpeg or png format</small><br/>
                       <small style={{color:"lightgrey"}}><span style={{color:"indianred"}}>*</span> Make sure images contains atleast a clear discription of your store or collections</small><br/>
                       <small style={{color:"lightgrey"}}><span style={{color:"indianred"}}>*</span> Make sure image contains enough detail of your store and is convincing enough</small><br/>
                       <small style={{color:"lightgrey"}}><span style={{color:"indianred"}}>*</span> Make sure image contains a full detailed picture of you and your store or collections together </small><br/>
                       <small style={{color:"lightgrey"}}><span style={{color:"indianred"}}>*</span> This images would be displayed each time a client opens your products (make it convincing enough)</small><br/>
                       </div>
                         </div>
                        </div>
                        <div className='col-12 col-md-8'>
            <input type="checkbox" checked={termsagreed} onChange={termschanged} name="termsagreed" /> My Company/Brand Is Already Registered<br/>
            </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>email</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='example@email.com' name="store_email" ></input>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>contact</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='+234 contact' name="store_contact" ></input>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>company </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter Name of Brand/Company' name="store_name" ></input>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>Business Adress</small><br/>
                    <textarea className='form-control' onChange={change} type="text" col={7} row={5} placeholder='Enter Business Address' name="store_address" ></textarea>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>about business </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='A small description of your store' name="store_about" ></input>
        </div>
        <div className="col-12 col-md-8"> 
                    <div style={{padding:"10px"}}>
                 <label for="state"> <small style={{fontWeight:"bold",textTransform:"uppercase"}}>select state (store location)</small> </label>
                <select name="store_state" required className="form-control" id="state" onChange={change} value={inputs.state}>
                  <option value="">Select state of business</option>  
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                    </div>                                   
                    </div>
                    <div className="col-12 col-md-8">
                    <div style={{padding:"10px"}}>
                 <label for="lga"> <small style={{fontWeight:"bold",textTransform:"uppercase"}}>select LGA</small></label>
                 <select name="store_lga" required className="form-control" id="lga" value={inputs.lga} onChange={change}>
                   <option value="">Select lga of business</option>
                 {states.map(state =>  
                 state.state.name === inputs.store_state ? 
                 state.state.locals.map(mainstate =>
                 <option value={`${mainstate.name}`}>{mainstate.name}</option>
                  )              
                  : null                                
                  )}
                 </select>
                    </div>                                   
                    </div>
      
        <div className="col-12 col-md-8 mt-3 ">
                  <center>
                  <button onClick={submit} className='btn btn-primary' style={{width:"100%"}}>Register me</button>
                  </center>
        </div>
        <div className="col-12 col-md-8 mt-3 mb-3 " style={{marginBottom:"30px"}} >
                  <center>
                    <small >An Email has been sent you</small><br/>
                    <small>Kindly visit email to complete this process</small>
                    <p style={{display:`${showcounter ? "block" : "none"}`}}><span className='fa fa-clock-o' style={{color:"lightgrey"}}></span> {counter}</p>
                  <button className='btn btn-primary' style={{width:"100%",display:`${showresendbtn ? "block" : "none"}`}}>Resend mail</button>
                  </center>
        </div>
        </div>
        )
      
     }else{
      return(
        <div className='container'>
         <center>
          <p style={{textAlign:'center',width:"60%",fontWeight:'lighter'}}>Kindly Go Through our Terms and Conditions to Join Our wholesale and retail  Outlets <span className='fa fa-store-alt' style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"5px",borderRadius:'50%',fontSize:'20px'}}>!!</span></p>
          </center>
      <ol>
       <li>
    <div className='row'>
    <div className='col-12 mt-2 mb-2'>
      <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>Authentication Policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-4 col-md-3'>
         <img src={`${require(`./bikeman.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
  </p>
   </div>
  </li>
  <br/>
  <li>
  <div className='row' style={{position:'relative'}}>
    
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>constantly update stock <span className='fa fa-lock fa-2x' style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}></span></small><br/></div>
     <div className='col-4 col-md-3'>
         <img src={`${require(`./bikeclientsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
  </li>
  <br/>
  <li>
    <div className='row'>
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>Return-back Policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-4 col-md-3'>
         <img src={`${require(`./bikeidentify.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
  </li>
  <br/>
  <li>
    <div className='row'>
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>swift delivery policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-5 col-md-3'>
         <img src={`${require(`./bikespeed.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
  </li>
  <br/>
  <li>
    <div className='row'>
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>complete gear policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-5 col-md-3'>
         <img src={`${require(`./bikecomplete.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
   </li>
   <br/>
   <li>
   <div className='row'>
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>price REBATE POLICY <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-5 col-md-3'>
         <img src={`${require(`./bikeitemsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",padding:"20px",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
  </li>
  <br/>
  <li>
  <div className='row'>
    <div className='col-12 mt-2 mb-2'> <small className='text-muted' style={{textTransform:"uppercase",fontSize:'15px'}}>customer identity policy <span style={{border:"2px solid pink",backgroundColor:"indianred",fontWeight:"bold",color:"white",padding:"1px 5px",borderRadius:'50%',fontSize:'20px'}}>!</span></small><br/></div>
     <div className='col-5 col-md-3'>
         <img src={`${require(`./bikeclientsafety.jpg`)}`} style={{borderRadius:"50%",height:"130px",boxShadow:"2px 3px 3px 2px lightgrey",padding:"20px",width:"100%"}} />
     </div>
     <p style={{padding:"20px"}}>
         For safety reasons we must personally confirm you for the safety of the goods, funds or our customers identification and safety...
     </p>
   </div>
  </li>
 </ol>
   {showtermsagreedbtn ? 
   
     <div style={{position:"fixed",top:"20%",left:"0%",zIndex:"2000",backgroundColor:"rgba(0,0,0,0.7)",width:"100%",height:"95%"}}>
<div style={{position:"fixed",color:"white",width:"100%",height:"90%",overflow:"scroll",left:"0%"}}>
<div className='container' style={{width:"100%",justifyContent:"center",alignItems:'center'}}>
<div className='row'>

<div className='col-12' style={{marginTop:"20px"}}>
    <input type="checkbox" checked={termsagreed} onChange={termschanged} name="termsagreed" /> I AGREE<br/>
     <span className='ml-2'>By clicking "I AGREE"</span>
    <ul>
        <li>
            <small>I fully Agree with all the policies above and if i am ever guilty of any, i should be procecuted accordingly</small>
             </li>
    </ul>
</div>
</div>

<div className='scroller'></div>
  {!termsagreed ? 
<div className='container'>
<div className="col-12 mt-3">
                     <div style={{padding:"10px",color:"lightgrey"}}>
                      <label >Image Upload <b style={{color:"orange"}}>{5-fileuploads.length}</b>/5</label><br/>
                      <label for="imagefile" style={{border:"2px solid orange",padding:"10px",borderRadius:"50%"}}><span className='fa fa-camera fa-2x'></span></label><br/>
              <input type="file" id="imagefile" style={{display:"none"}} multiple className="form-control" onChange={changefile}  name="files"/>
                      </div>
                     </div>
                     <div className="col-12" style={{padding:"2px 10px"}}>
                         <p className="text-danger animated bounce" style={{textTransform:"capitalize"}}>{uploadmessage}</p>
                     <div className="row" >
                    {fileuploads.length > 0 ? fileuploads.map((file,i)=>
                    <div key={file.lastmodified} className="col-4 col-md-3">
                   <span className="fa fa-times text-danger" onClick={()=>popImage({file:file,index:i})} style={{fontSize:"15px",fontWeight:"bolder"}}></span>
                    <img style={{width:"100%",height:"100px"}} src={file ? file : null} alt=""/>
                    </div>
                    ) : <p className="text-danger">No image selected</p>}
                    <div className='col-12' style={{padding:"10px",fontWeight:"bold"}}>
                    <small style={{color:"white"}}><span>*</span> Make sure images are clear enough and in jpeg or png format</small><br/>
                    <small style={{color:"white"}}><span>*</span> Make sure images contains atleast a clear discription of your store or collections</small><br/>
                    <small style={{color:"white"}}><span>*</span> Make sure image contains enough detail of your store and is convincing enough</small><br/>
                    <small style={{color:"white"}}><span>*</span> Make sure image contains a full detailed picture of you and your store or collections together </small><br/>
                    <small style={{color:"white"}}><span>*</span> This images would be displayed each time a client opens your products (make it convincing enough)</small><br/>
                    </div>
                      </div>
                     </div>
                     <div className='col-12'>
         <input type="checkbox" checked={termsagreed} onChange={termschanged} name="termsagreed" /> My Company/Brand Is Already Registered<br/>
         </div>
         <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>First name</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter First Name' name="firstname" ></input>
        </div>
       
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>last name</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter Last Name' name="lastname" ></input>
        </div>
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>company </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter Name of Brand/Company' name="businessname" ></input>
        </div>
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>Business Adress</small><br/>
                    <textarea className='form-control' onChange={change} type="text" col={7} row={5} placeholder='Enter Business Address' name="businessaddress" ></textarea>
        </div>
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>about business </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='A small description of your store' name="aboutbusiness" ></input>
        </div>
        <div className="col-12 mt-3"> 
                    <div style={{padding:"10px"}}>
                 <label for="state">Select State of Residence </label>
                <select name="state" required className="form-control" id="state" onChange={change} value={inputs.state}>
                  <option value="">Select state of business</option>  
                 {states.map(state =>                 
                  <option value={`${state.state.name}`}>{state.state.name}</option>
                  )}
                </select>
                    </div>                                   
                    </div>
                    <div className="col-12 mt-3">
                    <div style={{padding:"10px"}}>
                 <label for="lga">Select lga of business </label>
                 <select name="lga" required className="form-control" id="lga" value={inputs.lga} onChange={change}>
                   <option value="">Select lga of business</option>
                 {states.map(state =>  
                 state.state.name === inputs.state ? 
                 state.state.locals.map(mainstate =>
                 <option value={`${mainstate.name}`}>{mainstate.name}</option>
                  )              
                  : null                                
                  )}
                 </select>
                    </div>                                   
                    </div>
       
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>registered email</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter Last Name' name="email" ></input>
        </div>
        <div className="col-12 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>password</small><br/>
                    <input className='form-control' onChange={change} type="password" placeholder='Enter Last Name' name="password" ></input>
        </div>
       
    
     <div className="col-12 mt-3 col-md-8">
               <center>
               <button onClick={submit} className='btn btn-primary' style={{width:"100%"}}>Register me</button>
               </center>
     </div>
     <div className="col-12 mt-3 col-md-8" >
               <center>
                 <small >An Email has been sent you</small><br/>
                 <small>Kindly visit email to complete this process</small>
                 <p style={{display:`${showcounter ? "block" : "none"}`}}><span className='fa fa-clock-o' style={{color:"lightgrey"}}></span> {counter}</p>
               <button className='btn btn-primary' style={{width:"100%",display:`${showresendbtn ? "block" : "none"}`}}>Resend mail</button>
               </center>
     </div>
    
</div>
  : null}
     </div>
     </div>
     </div>
   
 
 : null}
 
        </div>
     )
    }
}

export default RegisterStore;