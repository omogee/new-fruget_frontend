import React, { useState, useEffect, useContext } from 'react';
import socket from './socketconn';
import { userContext } from './usercontext';
import {useNavigate} from "react-router-dom"
import {states} from "./state";
import axios from "axios"
import Geocode from "react-geocode"

function RegisterDispatchers() {
    const context = useContext(userContext)
    const [spd, setspd] = context["spd"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]
    const [termsagreed, settermsagreed] = useState(false)
    const [counter, setcounter] = useState(30)
    const [showcounter, setshowcounter] = useState(false)
    const [showresendbtn, setshowresendbtn] = useState(false)
    const [showtermsagreedbtn, setshowtermsagreedbtn] = useState(false)
    const [inputs, setinputs] = useState({})
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [files, setfiles] = useState([])
    const [fileuploads, setfileuploads] = useState([])
    const [uploadmessage, setuploadmessage] = useState("")
    const [singlefile, setsinglefile] = useState([])
    const [loading, setloading] = context["loading"]
    const [alertmessage, setalertmessage] = context["alertmessage"]
    const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
    const [requeststatus, setrequeststatus] = context["requeststatus"]
    const [targetmodal, settargetmodal] = context["targetmodal"]
    const [userdetails, setuserdetails] =context["userdetail"]
    const [storetoadd, setstoretoadd] = useState(false)
  
    Geocode.setApiKey("AIzaSyCqXwfK_tAkjq1Uib4BkfDpeAhylCEkfMY");
    Geocode.setLanguage("en")
    Geocode.setRegion("ng");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

      const navigate = useNavigate()
     const query = new URLSearchParams(window.location.search)
    useEffect(()=>{
        setcurrentPage("join dispatch")
        setTimeout(()=>{
            setshowtermsagreedbtn(true)
        },[5000])
    },[])

     const closemodal =()=>{
        setspd("")
        query.delete("spd")
        navigate(window.location.pathname +"?"+ query.toString())
     }
     const termschanged =()=>{
        settermsagreed(prev => !prev)
     }
     const change=(e)=>{
     setinputs(prev => ({...prev, [e.target.name]: e.target.value}))
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
   
    const submit=()=>{
      alert("submitting")
      const formdata = new FormData()    
      console.log("files", files)
      files.map(file=>{
        formdata.append("files",file)
      })
      formdata.append("inputs", JSON.stringify(inputs))
      formdata.append("userdetails", JSON.stringify(userdetails))
      alert(inputs.store_address)
      axios.post(`https://new-frugetbackend-productions.up.railway.app/client/register_dispatch`, formdata)
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
      // Geocode.fromAddress(inputs.store_address).then(
      //   (response) => {
      //     const { lat, lng } = response.results[0].geometry.location;
      //     alert(lat)
          
      //     formdata.append("lat", lat)
      //     formdata.append("lng", lng)
      //     alert(lng)
      //     axios.post(`https://new-frugetbackend-productions.up.railway.app/client/register_dispatch`, formdata)
      //     .then (res =>{
      //         if(res.data.status==="success"){
      //             setalertmessage(`Dear ${userdetails.email}, a confirmation has been sent to your email box`)
      //             setrequeststatus(res.data.status)
      //             setmodaldisplay("block")
      //             setloading(false)
      //             settargetmodal("register")
      //             setshowcounter(true)
      //             const setit =   setInterval(()=>{
      //              if(counter === 27){
      //                  setshowresendbtn(true)
      //              }
      //             setcounter(prev => prev - 1)
      //               },[1000])
      //               setit()
      //               clearInterval(setit)
      //         }else{
      //             setalertmessage(`Dear ${userdetails.email}, an error occured, please try again after few minutes`)
      //             setrequeststatus(res.data.status)
      //             setmodaldisplay("block")
      //             setloading(false)
      //             settargetmodal("register")
                  
      //         }
      //     })
      //     .catch(err => console.warn(err))
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
   }
     if(mobiledevice){
        return(
    <div className='container' style={{width:"100%",justifyContent:"center",alignItems:'center'}}>
<div className="col-12 mt-3" >
                        <div style={{padding:"10px",color:"lightgrey",marginTop:"10px"}}>
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
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>contact(+234)</small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='official contact' name="store_contact" ></input>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>company </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='Enter Name of Brand/Company' name="store_name" ></input>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>Office Address</small><br/>
                    <textarea className='form-control' onChange={change} type="text" col={7} row={5} placeholder='Enter Business Address' name="store_address" ></textarea>
        </div>
        <div className="col-12 col-md-8 mt-3 ">
                    <small style={{fontWeight:"bold",textTransform:"uppercase"}}>about business </small><br/>
                    <input className='form-control' onChange={change} type="text" placeholder='A small description of your store' name="store_about" ></input>
        </div>
        <div className="col-12 col-md-8"> 
                    <div style={{padding:"10px"}}>
                 <label for="state"> <small style={{fontWeight:"bold",textTransform:"uppercase"}}>select state (office location)</small> </label>
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
                 state.state.name === inputs.state ? 
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
        <div className="col-12 col-md-8 mt-3 " >
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
    return ( 
        <div style={{position:"fixed",top:"5%",left:"0%",zIndex:"2000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
        <span className='fa fa-times-circle-o fa-2x' onClick={closemodal} style={{cursor:'pointer',fontWeight:"lighter",position:"absolute",top:"15%",left:"70%",padding:"10px",color:"white"}}></span>
        <div className='shopcartdeldiv' style={{position:"fixed",height:"70%",overflow:'scroll',padding:"20px",borderRadius:"10px",top:"20%",left:"30%",width:"40%",zIndex:"300000",backgroundColor:"white"}}>
    <p style={{textAlign:'center',fontWeight:'lighter'}}>Frequently Asked Questions <span className='fa fa-question-circle fa-2x text-muted'></span></p>
    <ol>
     <li>
       <div>
        <small className='text-muted'>Can i make payments directly through my master or visa card <span className='fa fa-visa-card'></span> ?</small><br/>
        <small><b>Yes</b> , payments can be made directly through our very secured network</small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'>Does <b>e.o.eze</b> have any access to my card details through the payment process ?</small><br/>
        <small><b>No</b> , we do not have access to your card details or account as this process completely through a secured TCL by a third party gateway system</small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'>Can i cancel an order i havent placed yet ?</small><br/>
        <small><b>Yes</b> , you can simply open the shoppingcart page to delete any item you wish to remove but note that :</small><br/>
        <small style={{color:"indianred",fontWeight:'bolder'}}>An order placed cannot be deleted kindly crosscheck before placing</small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'>Does goods purchased here have a warranty period?</small><br/>
        <small><b>Yes</b> , all goods purchased have a warranty unless stated otherwise, you can view the warranty period from the product page but please note:</small><br/>
         <small style={{color:"indianred",fontWeight:'bolder'}}>
            <span>Goods with usage defect annuls the warranty policy</span>  e.g
            <ul>
                <li>burnt coil</li>
                <li>compressed chasis or body</li>
                <li>broken screen</li>
                <li>broken body parts</li>
                <li>e.t.c</li>
            </ul>
            <span>to avoid controversies please do well to check the goods before confirming an order</span>
         </small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'> Can i be refunded (cash back) ?</small><br/>
        <small><b>Yes</b> , our cash-back policy does not exceed a week of purchase and it also depends on 2 factors :</small>
        <small style={{color:"indianred",fontWeight:'bolder'}}>
            <ol>
                <li>if product has a factory fault</li>
                <li>if product seal hasnt been broken</li>
            </ol>
         </small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'> How long does it take to get a product delivered ?</small><br/>
        <small><b>2 days(48 hours)</b> please note that this is out standard but it could vary often but you can track your order through the dispatch personnel at your convenience</small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'> I made a little relocation, how do i change my location ?</small><br/>
        <small> Kindly visit your profile and click the "edit profile" on the top right corner to edit your address temporarily</small>
      </div>
     </li>
     <br/>
     <li>
       <div>
        <small className='text-muted'> Do you have a customer-care center ?</small><br/>
        <small><b>Not yet</b>, but please we are fully working on this as this has been of much concern to us</small>
      </div>
     </li>
    </ol>
  

    </div>
    </div>
     );
    }
}

export default RegisterDispatchers;