import React, { useContext, useEffect, useState } from 'react';
import {category} from "./state"
import axios from 'axios';
import { userContext } from './usercontext';
import {useParams } from "react-router-dom"


const EditProduct =()=>{
    const [inputs, setinputs] = useState({})
    const [files, setfiles] = useState([])
    const [images, setimages] = useState([])
    const [uploadmessage, setuploadmessage] = useState("")
    const [allDetails, setallDetails] = useState([])
    const [responseMessage, setresponseMessage] = useState("")
    const [displaymatchingdetails, setdisplaymatchingdetails] = useState("none")
    const context = useContext(userContext)
    const [productdetails, setproductdetails] = useState({})
    const [searchinput, setsearchinput] = context["search"]
    const [products, setproducts] = context["product"]
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [loading, setloading] = context["loading"]
    const [confirmupdate, setconfirmupdate] = useState(true)
 
    const params = useParams()
    useEffect(()=>{
        setloading(true)
        axios.get(`http://localhost:5000/item/fetch_productdetails?productId=${params.productId}&storeId=${params.storeId}`)
        .then(res =>{
            if(res.data.status === "success"){
            setproductdetails(res.data.product[0])
            setloading(false)
            }else{
                alert("an error occured")
                setloading(false)
            }
        })
        .catch(err => console.warn(err))
    },[])
    useEffect(()=>{
        setcurrentPage("productupload")
  if(inputs.details && inputs.details.length > 0){
    setsearchinput(inputs.details)
  }
  allDetails.map(checker =>{
    if(checker.details === inputs.details){
       setdisplaymatchingdetails("block")
    }
}) 
if(inputs.initialprice !== null  && inputs.price !== null){
 const discount = 100 - ((parseInt(inputs.price)/parseInt(inputs.initialprice))*100)+"%"
 setinputs(prev =>( {...prev, "discount":discount}))
}
    },[inputs.details])
   
   const changefile=(e)=>{
        let addedfiles = e.target.files
           if(addedfiles.length === 10){
            setuploadmessage("file length exceeds 10")
        } else if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
            setuploadmessage("")
  setfiles(prev => ([...prev, addedfiles[0]]))
  let result;
  const reader = new FileReader()
  let imgfile = e.target.files[0]
  reader.onload = (e) => {

    setimages(prev => ([...prev,{img:e.target.result, imgfile}]))
  }
  reader.readAsDataURL(e.target.files[0])

      }
        else{
            setuploadmessage("file format is not supported")
        }
    }
    useEffect(()=>{
        console.log("images",images)
    },[images])
    const change=(e)=>{
        setinputs(prev => ({...prev,[e.target.name]:e.target.value}))      
    }
   const fillform=(data)=>{   
     console.log("auto file done")
     setsearchinput("")
     setinputs({generalcategory:data.generalcategory,category:data.category,details:data.details,
subcat1:data.subcat1,subcat2:data.subcat2,subcat3:data.subcat3 || null,brand:data.brand,
entrytext:data.entrytext,feature1:(JSON.parse(data.features)).split(",")[0],
feature2:(JSON.parse(data.features)).split(",")[1],feature3:(JSON.parse(data.features)).split(",")[2],
feature4:(JSON.parse(data.features)).split(",")[3],feature5:(JSON.parse(data.features)).split(",")[4],
price:data.sellingprice,model:data.model,power:data.power,weight:data.weight,aboutbrand:data.maintenance,
color:data.color,currentsize:data.size,size:data.sizesavail,files:Object.values(JSON.parse(data.img1))})
    }
   const popImage=(file)=>{
   const newState=  files.filter(statefiles =>{ 
         return statefiles.name!== file
   })
   setfiles(newState)
    }
   const popImagebyfile=(file)=>{
        const newState=  files.filter(statefiles =>{ 
              return statefiles !== file
        })
       setfiles(newState)
         }
const submit =(e)=>{
    e.preventDefault();
 //   let encryptedId=localStorage.getItem("vdhgaujhahjjsbhsjjbxhsfgwwhsywh726781819bahuhvgaygavvxgvxvvcvgsvsvid")
  // let id =encryptedId.split("%")[3]
 //  id = parseInt(id)
const features =`${this.state.feature1},${this.state.feature2}.${this.state.feature3},${this.state.feature4},${this.state.feature5}`
if(this.state.files.length === 0){
    this.setState({displayMessage:"block",Message:"No Image was selected"})
    window.scrollTo(0,  0)
  } else if(this.state.category.length === 0){
    this.setState({displayMessage:"block",categorycolor:"red",Message:" `category` is a required field"})
    window.scrollTo(0,  0)
  } else if(this.state.generalcategory.length === 0){
    this.setState({displayMessage:"block",generalcategorycolor:"red",Message:"`general category` is a required field"})
    window.scrollTo(0,  0)
    } else if(this.state.subcat1.length === 0){
    this.setState({displayMessage:"block",subcat1color:"red",Message:" `Sub-Category` is a required field"})
    window.scrollTo(0,  0)
  }else if(this.state.details.length === 0){
    this.setState({displayMessage:"block",detailscolor:"red",Message:" `Details` is a required field"})
    window.scrollTo(0,  0)
  }
  else if(this.state.price.length === 0){
     this.setState({displayMessage:"block",pricecolor:"red",Message: `" Price is a required field"`})
     window.scrollTo(0,  0)
 }else{
    this.setState({displayMessage:"none",pricecolor:"grey",Message: ``})
     const colours = this.state.color;
     const currentColor= this.state.color.split(",")[0].toString()
  
const formdata = new FormData();
  this.state.files.map(file=>{
    formdata.append("files",file)
  })
  formdata.append("generalcategory",this.state.category)
  formdata.append("category",this.state.generalcategory)
  formdata.append("subcat1",this.state.subcat1)
  formdata.append("subcat2",this.state.subcat2)
  formdata.append("subcat3",this.state.subcat3)
  formdata.append("brand",this.state.brand)
  formdata.append("entrytext",this.state.entrytext)
  formdata.append("details",this.state.details)
  formdata.append("currentColor",currentColor)
  formdata.append("colors",colours)
  formdata.append("size",this.state.size)
  formdata.append("currentsize",this.state.currentsize)
  formdata.append("features",features)
  formdata.append("price",this.state.price)
  formdata.append("initialprice",this.state.initialprice)
  formdata.append("discount",this.state.discount)
  formdata.append("model",this.state.model)
  formdata.append("weight",this.state.weight)
  formdata.append("power",this.state.power)
  formdata.append("aboutbrand",this.state.aboutbrand)
 // formdata.append("id",id)
  
  const config ={
      headers:{
          'content-type':'multipart/form-data'
      }
  }
  
  axios.post(`http://localhost:5000/products/seller/productupload`, formdata, config)
    .then(res => {
        if(res.data.failure){
           // this.setState({Message:res.data.message,displayMessage:"block"})
        }else{
            // this.setState({Message:res.data.message,displayMessage:"block",category:"",generalcategory:"",subcat1:"",subcat2:"",subcat3:"",brand:"", entrytext:"",
            // details:"",feature1:"", feature2:"",feature3:"", feature4:"",feature5:"",price:"",model:"",power:"",weight:"",aboutbrand:"",
            //     color:"",currentsize:"",size:"",files:[]})
        }
           window.scrollTo(0, 0)
    })
    .catch(err => console.log(err))
  // console.log("formdata",formdata.get("files"),formdata.get("name"))
} 
}
 
    return (  
            <div className="container">
                 <div style={{position:"fixed",top:"5%",display:`${confirmupdate ? "block" : "none"}`,left:"0%",zIndex:"9900000",backgroundColor:"rgba(0,0,0,0.6)",width:"100%",height:"95%"}}>
                 <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"10px",zIndex:"900000"}}>
            <div>
                <small style={{color:"indianred", fontWeight:"bolder"}}>[Action Required]: Please note that as part of our safety policies 
                you are required to enter your email/name and password to proceed with this action</small><br/>
                <small>update item : <b>000{productdetails.productId}</b></small>
                <br/><br/>
            <input type="text" className='form-control' placeholder='Enter email/full name'/>
            <br/><br/>
            <input type="text" className='form-control' placeholder='Enter password'/>
            </div>
            <br/><br/>
            <div className='row'>
                <div className='col-5'>
                    <button onClick={()=> setconfirmupdate(false)} style={{padding:"5px 10px"}} className='btn btn-primary'>cancel</button>
                </div>
                <div className='col-7'>
                    <button style={{float:"right",padding:"5px 20px"}} className='btn btn-danger'>proceed to delete</button>
                </div>
            </div>
         </div>
          </div>
                <div className="contain" style={{marginBottom:"50px"}}>
              <div className='row' style={{position:"sticky",zIndex:"34",backgroundColor:"white", top:"0px",padding:'10px'}}>
                <div className='col-10'>
                 <p> <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}><span className='fa fa-pencil-square-o'></span> Edit</span> Product On Fruget</p>   
                </div>
            <div className='col-2'>
            <small className="mr-5" style={{float:"right",fontSize:"20px"}}>30/30</small>
            </div>
              </div>
               
                    {responseMessage && responseMessage.length > 0 ?
                     <div className="row">
                <div className="col-12 alert alert-danger">
                 <small>{responseMessage}</small>
                 </div>
                   </div>
                  : null}
              
                 <form action="" method="get" onSubmit={submit}>
                     <div className="row">
                        <div className="col-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="generalcategory">General Category</label> 
<select type="text" style={{border:`1px solid ${inputs.generalcategorycolor}`}} id="generalcategory" name="generalcategory" onChange={change} className="form-control" value={productdetails.generalcategory}  placeholder="Enter Category e.g home Appliance,clothing, accessories etc">
   <option value="">select general category</option>
    {Object.keys(category).map(cat =>
            <option value={`${cat}`}>{cat}</option>
        )}
</select>
                        </div>
                        </div>
                        {(inputs.generalcategory && inputs.generalcategory.length > 0) || productdetails.generalcategory ?
                        <div className="col-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="category">Category</label>
   <select style={{backgroundColor:"white",border:`1px solid ${inputs.categorycolor}`}} type="text" onChange={change} id="category" name="category" className="form-control" value={productdetails.category} >
   <option value="">select category</option>     
                         {category[`${inputs.generalcategory || productdetails.generalcategory}`] && category[`${inputs.generalcategory || productdetails.generalcategory}`].map(subcat=>
                        <option value={`${subcat.name}`}>{subcat.name}</option>
                          )}
   </select>
                         </div>
                        </div> 
                    :null}
                    
                        <div className="col-6">
                        {uploadmessage.length > 0 ?
                 <div className="alert alert-danger">
                 <small>{uploadmessage}</small>
                 </div>
                 : null}
                        <div style={{padding:"10px"}}>
                         <label >Image Upload <b>{5-files.length}</b>/5</label>
                 <input type="file" multiple className="form-control" onChange={changefile}  name="files"/>
                         <small className="text-danger">Make sure image is clear enough and in jpeg or png format</small>
                         </div>
                        </div>
                        <div className="col-12">
                        <div className="row"  style={{paddingRight:"20px"}}>
                       {images.length > 0 ? images.map((file)=>
                       <div key={file.lastmodified} className="col-3 col-md-3">
                      <span className="fa fa-times text-danger" onClick={()=>this.popImage(file.imgfile)} style={{fontSize:"15px",fontWeight:"bolder"}}></span>
                       <img className='animated bounce' style={{width:"100%",height:"130px",borderRadius:"5px",border:'1px solid lightgrey',padding:'2px'}} src={file.img} alt=""/>
                       </div>
                       ) : productdetails.img1 ? Object.values( productdetails.category && JSON.parse(productdetails.img1)).map(itemimages=>
                        <div className="col-3">
                            <img style={{padding:'15px'}} className="mainImg img-responsive dataimages" src={`https://res.cloudinary.com/fruget-com/image/upload/${productdetails.generalcategory}/${productdetails.category}/${itemimages || 'emptyimg.jpg'}`} ></img>
                        </div>
                        )
                       :<p className="text-danger">No image selected</p>}
                         </div>
                        </div>
                        {(inputs.category && inputs.category.length > 0) || productdetails.category ?
                        <div className="col-6">
                        <div style={{padding:"10px"}}> 
                            <label htmlFor="subcat1">Select sub-category</label>
                            <select className="form-control" onChange={change} value={`${inputs.subcat1 || productdetails.subcat1}`} name="subcat1" id="subcat1">
                           {category[`${inputs.generalcategory || productdetails.generalcategory}`] && category[`${inputs.generalcategory || productdetails.generalcategory}`].map(cat=>
                             cat.name === inputs.category || cat.name === productdetails.category ?
                               cat.subcat1.map(cat1=>
                                <option value={`${cat1}`}>{cat1}</option>
                                ) : null
                            )}
                            </select>
                        </div>
                        </div>
                        : null}
                         {(inputs.category && inputs.category.length > 0) || productdetails.category ?
                        <div className="col-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat2" >Select sub-category2</label>
                            <select className="form-control" id="subcat2" name="subcat2" onChange={change} value={`${inputs.subcat2 || productdetails.subcat2 }`}>
                            {category[`${inputs.generalcategory ||  productdetails.generalcategory }`] && category[`${inputs.generalcategory ||  productdetails.generalcategory}`].map(cat=>
                             cat.name === inputs.category || cat.name ===  productdetails.category ?
                               cat.subcat2.map(cat2=>
                                <option value={`${cat2}`}>{cat2}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                         {(inputs.category && inputs.category.length >  0 ) ||  productdetails.category?
                        <div className="col-6">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat3" >Select sub-category3</label>
                            <select className="form-control" name="subcat3" id="subcat3" onChange={change} value={`${inputs.subcat3 || productdetails.subcat3}`}>
                            {category[`${inputs.generalcategory ||  productdetails.generalcategory}`] && category[`${inputs.generalcategory ||  productdetails.generalcategory}`].map(cat=>
                             (cat.name === inputs.category) || cat.name === productdetails.category && cat.subcat3?
                               cat.subcat3.map(cat3=>
                                <option value={`${cat3}`}>{cat3}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                        <div className="col-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="brand">brand</label>
         <input type="text" id="brand"  name="brand" onChange={change} className="form-control" value={inputs.brand || productdetails.brand} placeholder="Note : No spacing inbetween E.g lg, hisense, tummyhilfiger"/>
                        </div>
                        </div>
                        <div className="col-6">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="entrytext">Entry Text</label>
<input type="text" id="entrytext"  name="entrytext" onChange={change} className="form-control" value={inputs.entrytext || productdetails.brand} placeholder="convince your seller in less than 100 words.."/>
<small className="text-muted" style={{fontSize:"10px"}}>get off the wether with quality and affordable jackets from tummyhilfiger</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="details">details</label>
    <input type="text"  id="details" name="details" style={{border:`1px solid ${inputs.detailscolor}`}} onChange={change} className="form-control" value={inputs.details || productdetails.details} placeholder="e.g bianco standing fan, lg copper double door refrigerator...etc(50)"/>
                        </div>                     
               
                        </div>
                        <div className="col-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="colors">colours available <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="colors" name="color" onChange={change} style={{fontSize:"14px"}} className="form-control" value={inputs.color || productdetails.color} placeholder="Enter all the colours available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g red , blue, black e.t.c( ensure to begin with the color of this exact product)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="currentsize">size <span style={{color:"red", fontSize:"20px"}}>*</span></label>
 <input type="text" id="currentsize" name="currentsize" style={{fontSize:"14px"}} onChange={change} className="form-control" value={inputs.currentsize } placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches (ensure the unit of measurement is specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="size">other size available </label>
 <input type="text" id="size" name="size" style={{fontSize:"14px"}} onChange={change} className="form-control" value={inputs.size || productdetails.size} placeholder="Enter all the sizes available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches, 20 inches etc (ensure the units of measurement are specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="operatingsystem">operating systems available<span style={{color:"red", fontSize:"20px"}}>{inputs.generalcategory === "computer & accessories" ? "*" : null}</span></label>
 <input type="text" id="operatingsystem" name="operatingsystem" style={{fontSize:"14px"}} onChange={change} className="form-control" value={inputs.operatingsystem} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="megapixel">mega pixel<span style={{color:"red", fontSize:"20px"}}>{inputs.category === "phones" ? "*" : null}</span></label>
 <input type="text" id="megapixel" name="megapixel" style={{fontSize:"14px"}} onChange={change} className="form-control" value={inputs.megapixel} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature1">Feature 1 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature1" name="feature1" className="form-control" onChange={change} value={inputs.feature1} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature2">Feature 2 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature2" name="feature2" className="form-control" onChange={change} value={inputs.feature2} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature3">Feature 3 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature3" name="feature3" className="form-control" onChange={change} value={inputs.feature3} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature4">Feature 4</label>
                         <input type="text" id="feature4" name="feature4" className="form-control" onChange={change} value={inputs.feature4} />
                        </div>
                        </div>
                        <div className="col-12 col-md-4">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature5">Feature 5</label>
                         <input type="text" id="feature5"  name="feature5" className="form-control" onChange={change} value={inputs.feature5} />
                        </div>
                        </div>
                        <div className="col-12 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="price">Selling Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="price" name="price" className="form-control" onChange={change} value={inputs.price || productdetails.sellingprice}/>
    <small className="text-danger">Kindly enter the best release price as prices on fruget are not negotiable</small>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="initialprice">initial Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="initialprice" name="initialprice" className="form-control" onChange={change} value={inputs.initialprice || productdetails.initialprice}/>
                               <small className="text-danger">if there is a discount from {inputs.price || "selling price"} so customers can see it </small>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="discount">discount</label>
            <input type="text" id="discount" readOnly name="discount" className="form-control" Onchange={change} value={inputs.discount || "0%"} />
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="model">model</label>
   <input type="text" id="model" name="model" className="form-control" onChange={change} value={inputs.model || productdetails.model} placeholder="Enter the model number for easier identification"/>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="power">power</label>
 <input type="text" id="power" name="power" className="form-control" onChange={change} value={inputs.power || productdetails.power} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        </div>
                        </div>

                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="weight">weight</label>
 <input type="text" id="weight" name="weight" className="form-control" onChange={change} value={inputs.weight || productdetails.weight} placeholder="Enter weight in Kg"/>
                        </div>
                        </div>
                        <div className="col-6">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="aboutbrand">About Brand </label>
         <textarea  id="aboutbrand" className="form-control" onChange={change} name="aboutbrand" value={inputs.aboutbrand || productdetails.aboutbrand} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        <small className="text-muted" style={{size:"10px"}}>You can save this to be used while uploading other products of same brand</small>
                        </div>
                        </div>
                        <div className='col-12 col-6'>
                        <div style={{padding:"10px"}}>
                  <button style={{width:"100%"}} onClick={()=>setconfirmupdate(true)} type="submit" className="btn btn-success">
                    Submit Changes <span className='fa fa-chevron-circle-right' style={{float:'right'}}></span>
                    </button>
                     </div>
                        </div>
                     </div>
                     
                 </form>
                </div>
            </div>
         )
}

/**
 *  }else{
        return ( 
            <div style={{position:`${this.props.modalsidenavbarwidth === "90%" ? "fixed" : "static"}`}}>
                <div className="container">
               
                <div className="row">
                    <div className="col-12">
                    <p> <span style={{color:"#004d99",textShadow: "0.5px 0.5px #ff0000"}}>Upload</span> Product On Fruget</p><small className="mr-5" style={{float:"right",fontSize:"20px"}}>30/30</small>
                    </div>
                <div className="col-12 alert alert-danger" style={{display:`${inputs.displayMessage}`, backgroundColor:`${inputs.displayColor}`}}>
                 <small>{this.state.Message}</small>
                 </div>
                </div>
                 <form action="" method="get" onSubmit={this.submit}>
                     <div className="row">
                        <div className="col-12">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="category">Category</label> 
<select type="text" style={{border:`1px solid ${this.state.categorycolor}`}} id="category" name="category" onChange={change} className="form-control" value={this.state.category}  placeholder="Enter Category e.g home Appliance,clothing, accessories etc">
   <option value="">select general category</option>
    {Object.keys(category).map(cat =>
            <option value={`${cat}`}>{cat}</option>
        )}
</select>
                        </div>
                        </div>
                        {this.state.category.length > 0 ?
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="gencategory">Generalcategory</label>
   <select style={{backgroundColor:"white",border:`1px solid ${this.state.generalcategorycolor}`}} type="text" onChange={change} id="gencategory" name="generalcategory" className="form-control" value={this.state.generalcategory} >
   <option value="">select category</option>     
                         {category[`${this.state.category}`].map(subcat=>
                        <option value={`${subcat.name}`}>{subcat.name}</option>
                          )}
   </select>
                         </div>
                        </div> 
                    :null}
                    
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                         <label >Image Upload <b>{10-this.state.files.length}</b>/10</label>
                 <input type="file" multiple className="form-control" onChange={this.changefile}  name="files"/>
                         <small className="text-danger">Make sure image is clear enough and in jpeg or png format</small>
                         </div>
                        </div>
                        <div className="col-12">
                            <p className="text-danger animated bounce" style={{textTransform:"capitalize"}}>{this.state.uploadmessage}</p>
                        <div className="row" >
                       {this.state.files.length > 0 ? this.state.files.map((file)=>
                       <div key={file.lastmodified} className="col-3 col-md-2">
                      <span className="fa fa-times text-danger" onClick={file.name ?()=>this.popImage(file.name) : ()=>this.popImagebyfile(file)} style={{fontSize:"15px",fontWeight:"bolder"}}></span>
                       <img style={{width:"100%"}} src={file.name ? require(`./images/${file.name}`) : `https://res.cloudinary.com/fruget-com/image/upload/${this.state.category}/${this.state.generalcategory}/${file}`} alt=""/>
                       </div>
                       ) : <p className="text-danger">No image selected</p>}
                         </div>
                        </div>
                        {this.state.generalcategory.length > 0 ?
                        <div className="col-12">
                        <div style={{padding:"10px"}}> 
                            <label htmlFor="subcat1">Select sub-category</label>
                            <select className="form-control" onChange={change} value={`${this.state.subcat1}`} name="subcat1" id="subcat1">
                           {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat1.map(cat1=>
                                <option value={`${cat1}`}>{cat1}</option>
                                ) : null
                            )}
                            </select>
                        </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length > 0 ?
                        <div className="col-12">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat2" >Select sub-category2</label>
                            <select className="form-control" id="subcat2" name="subcat2" onChange={change} value={`${this.state.subcat2}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory ?
                               cat.subcat2.map(cat2=>
                                <option value={`${cat2}`}>{cat2}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                         {this.state.generalcategory.length >  0 ?
                        <div className="col-12">
                            <div style={{padding:"10px"}}>
                            <label htmlFor="subcat3" >Select sub-category3</label>
                            <select className="form-control" name="subcat3" id="subcat3" onChange={change} value={`${this.state.subcat3}`}>
                            {category[`${this.state.category}`].map(cat=>
                             cat.name === this.state.generalcategory && cat.subcat3?
                               cat.subcat3.map(cat3=>
                                <option value={`${cat3}`}>{cat3}</option>
                                ) : null
                            )}
                            </select>
                            </div>
                        </div>
                        : null}
                        <div className="col-12">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="brand">brand</label>
         <input type="text" id="brand"  name="brand" onChange={change} className="form-control" value={this.state.brand} placeholder="Note : No spacing inbetween E.g lg, hisense, tummyhilfiger"/>
                        </div>
                        </div>
                        <div className="col-12">
                             <div style={{padding:"10px"}}>
                            <label htmlFor="entrytext">Entry Text</label>
<input type="text" id="entrytext"  name="entrytext" onChange={change} className="form-control" value={this.state.entrytext} placeholder="convince your seller in less than 100 words.."/>
<small className="text-muted" style={{fontSize:"10px"}}>get off the wether with quality and affordable jackets from tummyhilfiger</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="details">details</label>
    <input type="text"  id="details" name="details" style={{border:`1px solid ${this.state.detailscolor}`}} onChange={change} className="form-control" value={this.state.details} placeholder="e.g bianco standing fan, lg copper double door refrigerator...etc(50)"/>
                        </div>
                        <small style={{display:`${this.state.displayifdetailsmatch}`}} className="text-danger">This product already exist on fruget community...<span className="btn btn-danger btn-sm" onClick={this.fillform}>Click Here</span> to update all columns then submit ro register as a seller of this product</small>                        
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="colors">colours available <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="colors" name="color" onChange={change} style={{fontSize:"14px"}} className="form-control" value={this.state.color} placeholder="Enter all the colours available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g red , blue, black e.t.c( ensure to begin with the color of this exact product)</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="currentsize">size <span style={{color:"red", fontSize:"20px"}}>*</span></label>
 <input type="text" id="currentsize" name="currentsize" style={{fontSize:"14px"}} onChange={change} className="form-control" value={this.state.currentsize} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches (ensure the unit of measurement is specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="size">other size available </label>
 <input type="text" id="size" name="size" style={{fontSize:"14px"}} onChange={change} className="form-control" value={this.state.size} placeholder="Enter all the sizes available in your store seperated by commas ( , )"/>
                         <small style={{fontSize:"11px"}} className="text-danger">E.g 16 inches, 20 inches etc (ensure the units of measurement are specified e.g inches,litres,kilogram,watts etc)</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="operatingsystem">operating systems available<span style={{color:"red", fontSize:"20px"}}>{this.state.generalcategory === "computer & accessories" ? "*" : null}</span></label>
 <input type="text" id="operatingsystem" name="operatingsystem" style={{fontSize:"14px"}} onChange={change} className="form-control" value={this.state.operatingsystem} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="megapixel">mega pixel<span style={{color:"red", fontSize:"20px"}}>{this.state.category === "phones" ? "*" : null}</span></label>
 <input type="text" id="megapixel" name="megapixel" style={{fontSize:"14px"}} onChange={change} className="form-control" value={this.state.megapixel} placeholder="Enter size of the this product"/>
                         <small style={{fontSize:"11px"}} className="text-danger"> (ensure the unit of measurement is specified)</small>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature1">Feature 1 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature1" name="feature1" className="form-control" onChange={change} value={this.state.feature1} />
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature2">Feature 2 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature2" name="feature2" className="form-control" onChange={change} value={this.state.feature2} />
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature3">Feature 3 <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="feature3" name="feature3" className="form-control" onChange={change} value={this.state.feature3} />
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature4">Feature 4</label>
                         <input type="text" id="feature4" name="feature4" className="form-control" onChange={change} value={this.state.feature4} />
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="feature5">Feature 5</label>
                         <input type="text" id="feature5"  name="feature5" className="form-control" onChange={change} value={this.state.feature5} />
                        </div>
                        </div>
                        <div className="col-12 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="price">Selling Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="price" name="price" className="form-control" onChange={change} value={this.state.price}/>
    <small className="text-danger">Kindly enter the best release price as prices on fruget are not negotiable</small>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="initialprice">initial Price <span style={{color:"red", fontSize:"20px"}}>*</span></label>
                         <input type="text" id="initialprice" name="initialprice" className="form-control" onChange={change} value={this.state.initialprice}/>
                               <small className="text-danger">if there is a discount from {this.state.price || "selling price"} so customers can see it </small>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="discount">discount</label>
            <input type="text" id="discount" readOnly name="discount" className="form-control" Onchange={change} value={this.state.discount || "0%"} />
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="model">model</label>
   <input type="text" id="model" name="model" className="form-control" onChange={change} value={this.state.model} placeholder="Enter the model number for easier identification"/>
                        </div>
                        </div>
                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="power">power</label>
 <input type="text" id="power" name="power" className="form-control" onChange={change} value={this.state.power} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        </div>
                        </div>

                        <div className="col-6 col-md-3">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="weight">weight</label>
 <input type="text" id="weight" name="weight" className="form-control" onChange={change} value={this.state.weight} placeholder="Enter weight in Kg"/>
                        </div>
                        </div>
                        <div className="col-12">
                        <div style={{padding:"10px"}}>
                            <label htmlFor="aboutbrand">About Brand </label>
         <textarea  id="aboutbrand" className="form-control" onChange={change} name="aboutbrand" value={this.state.aboutbrand} placeholder="Enter the wattage e.g 20w, 30w, 50w etc"/>
                        <small className="text-muted" style={{size:"10px"}}>You can save this to be used while uploading other products of same brand</small>
                        </div>
                        </div>
                     </div>
                     <div style={{padding:"10px"}}>
                  <button type="submit" className="btn btn-success">Upload</button>
                     </div>
                 </form>
                </div>
            </div>
         );
       }
 */
export default EditProduct;