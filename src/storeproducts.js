import React, { useState,useCallback, useEffect, useContext, useRef } from 'react';
import {useLocation, useNavigate,Link} from "react-router-dom"
import axios from "axios";
import {formater, formatermain, getSentTime} from "./formatTime"
import "./main.css"
import Details from './details';
import Cookies from "js-cookie"
import {userContext} from "./usercontext"
import Testrandom from './testrandom';

function StoreProduct(props) {
    const [redirectError, setRedirectError] = useState(false)
    const [redirectLogin, setRedirectLogin] = useState(false)
 // const [products, setproducts] = useState([])
  
 //   const [page, setPage] = useState(1)
    const [hovergrid, setHovergrid] = useState("unhoveredapp")
    const [hoverlist, setHoverlist] = useState("")
    const [displaydetail, setdisplaydetail] = useState(false)
    const [productDetails, setProductDetails] =useState(null)
    const [allproductDetails, setAllProductDetails] = useState([])
    const context = useContext(userContext)
    const [navwidth,setnavwidth] = context["sidenav"]
    const [storeproducts, setstoreproducts] = context["storeproducts"]
    const [page, setpage] = context["page"]
    const [userdetail, setuserdetails] = context["userdetail"]
  const [loading, setloading] = context["loading"]
  const [modaldisplay, setmodaldisplay] = context["modaldisplay"]
  const [alertmessage, setalertmessage] = context["alertmessage"]
  const [requeststatus, setrequeststatus] = context["requeststatus"]
  const [targetmodal, settargetmodal] = context["targetmodal"]
  const [redirect, setredirect] = context["redirect"]
  const [currentPage, setcurrentPage] = context["currentpage"]
  const [numprod, setnumprod] = context["numprod"]
  const [pagenumbers, setpagenumbers] = useState([])
    const [storesearchinput, setstoresearchinput] = context["storesearchinput"]
    const [view,setview] = context["view"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]
    const [sorter, setsorter]= context["sorter"]
    const [category,setcategory] = context["category"]
    const [dropdown, setdropdown] = useState({width:"0%",class:"fa fa-chevron-up" })
    const [loaded, setloaded] = context["loaded"]
    const [shoppingcart, setshoppingcart] = context["shoppingcart"]
    const [topbrands, settopbrands] = context["topbrands"]
    const [filterclass, setfilterclass] = useState("fa-filter")
    

    const loader = useRef()
    const gettingtargetedItems = useRef(false)
    const navigate = useNavigate()

    const query = new URLSearchParams(window.location.search);
     const target = query.get("target")
     const { search } = useLocation();
 
     useEffect(()=>{
        let numprodmain = Math.ceil(numprod)
       var PageNumbers = [];
       for (var i=1; i <= numprodmain ; i++){
          PageNumbers.push(i)
       }
        setpagenumbers(PageNumbers)
       },[numprod])
  
     useEffect(()=>{
        if(query.get("target")){
            gettingtargetedItems.current = true
         
        }else if(!query.get("target")){
            gettingtargetedItems.current = false
        }
     },[search,props])
     useEffect(()=>{
        const elements = document.querySelectorAll(".dataimages")
        let options ={
            root: null,
            rootMargin:"0px",
            threshold:0.1
        }
        const callback =(entries)=>{
            entries.forEach(entry =>{
                if(entry.isIntersecting){
                    entry.target.src= entry.target.dataset.src
            
                }
            })
        }
        elements.forEach(element =>{
            const observer = new IntersectionObserver(callback, options)
            observer.observe(element)
        })
        })
 
  
    const hoverapp =()=>{
        setHovergrid("hoveredapp")
        setHoverlist("hoveredapp")
    }

const opendetails=(properties)=>{ 
    if(Cookies.get("tktplc")){
 setloading(true)
 axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
 .then(res =>{ 
    setdisplaydetail(true)
    console.log(res.data.details[0])
    setProductDetails(res.data.details[0])
    setAllProductDetails(res.data.details) 
    setTimeout(()=>{
        setloading(false)
    },2000)
})
 .catch(err => console.log(err))
 // history=`/shop/details/${details}`
}else{

   setredirect(true)
}
navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
}
const addtocart=(properties)=>{
    setloading(true)
    const print =[
        navigator.userAgent,navigator.productSub,,navigator.appVersion,navigator.hardwareConcurrency,
        ,navigator.deviceMemory,navigator.connection]
        print.unshift(window.screen.width)
        print.push(window.screen.height)

        const mainprint =JSON.stringify(print).replace(/[&\/\\#,;+()$~%.'":*?<>{}]/g, '')
        const realprint = mainprint.substring(1, mainprint.length-1)
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/addtocart?productId=${properties.productId}&tkt=${Cookies.get("tktplc")}&nayv=${realprint}`)
   .then(res =>{
    if(res.data.status === "success"){    
        setuserdetails(res.data.userdetails[0])
        setshoppingcart(res.data.shoppingcart)
        setalertmessage(res.data.message)
        setrequeststatus(res.data.status)
        setmodaldisplay("block")
        setloading(false)
        settargetmodal("cart")
        if(currentPage === "products" && storesearchinput.length === 0 && !query.get("search")){
     //       setstoreproducts([])
            setloading(true)
            axios.get(`https://new-frugetbackend-productions.up.railway.app/item?page=${page}&tkt=${Cookies.get("tktplc") || null}&brand=${category.brand || query.get("brand")}&sorter=${sorter}&category=${category.category || query.get("cat")}`)
            .then(res => {
              setTimeout(()=> setloading(false), 700)
                setstoreproducts(res.data.products)
                if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
                setnumprod(res.data.numprod[0].numprod/20)
                }
        //      setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors}))
              
            })
            .catch(err => console.warn(err))
          }
    }else if(res.data.status === "failed"){
      setalertmessage(res.data.message)
      setrequeststatus(res.data.status)
      setmodaldisplay("block")
      setloading(false)
      settargetmodal("cart")
    }
    else{
      setredirect(true)
    }
   })
   .catch(err => console.log(err))
}
if(displaydetail && productDetails){
    return(
        <div>
            <Details productDetails ={productDetails} allproductDetails={allproductDetails}/>
        </div>
    )
}
const changepage=(page)=>{
    setpage(page)
    setstoreproducts([])
 query.set("page",page)
 navigate(window.location.pathname + "?" + query.toString())
}
const sort =(val)=>{
    setdropdown({width:"0%",class:"fa fa-chevron-up"})
    setsorter(val)
    setpage(1)
    query.set("page",1)
    query.set("sby", val)
    navigate(window.location.pathname+"?"+query.toString())
   
}
const displayfilterdropdown =()=>{
    if(dropdown.width && dropdown.width === "0%"){
        setdropdown({width:"100%",class:"fa fa-chevron-down"})
        }else{
          setdropdown({width:"0%",class:"fa fa-chevron-up"})
        }
}
const changeview =(data)=>{
 setview(data)
 query.set("view", data)
 navigate(window.location.pathname+"?"+query.toString())
}
const gotoshop=()=>{
    setstoresearchinput("")
    if(query.get("search")){
        query.delete("search")
    }
    navigate(`/shop`)
}
const openfilter =()=>{
  setpage(1)
  query.delete("page")
  navigate(`/testrandom` +"?"+query.toString())
}
const storesearchchange=(e)=>{
 
  setstoresearchinput(e.target.value)
}
return ( 
        <div className='container'>
          <div style={{position:"absolute",zIndex:"999999999",overflow:"hidden",zIndex:"999999999999999",right:"1%",width:"30%",height:"100vh"}}>
         <div style={{overflow:'scroll',transform:`${filterclass === "fa-filter" ? "translate(100%, 100%)" : "translate(0,0)"}`,transition:"all 1.2s linear",height:"100%",width:"100%"}}>
          <Testrandom lg={true} storeproducts={true} topbrands={topbrands}/>
          </div>
          </div>
            {storeproducts.length > 0 ? 
            <div>
              <div className="row mt-2" style={{padding:"0px 10px",backgroundColor:'white',zIndex:"234", position:"sticky", top:"0px"}}>
              <div className="col-10 col-md-10"> 
             <input type="text" onChange={storesearchchange} style={{boxShadow:"none"}} className='form-control' placeholder={`Search Items from ${storeproducts[0] && storeproducts[0].product_store}`} />
                        </div>
                        <div className='col-2'>
                        <div onClick={()=> setfilterclass(filterclass === "fa-filter" ? "fa-times" : "fa-filter")} style={{padding:"0px",zIndex:"9990090",width:"100%"}}>
            <span style={{border:"1px solid grey",padding:"8px",cursor:"pointer",borderRadius:"50%"}}  className={`fa ${filterclass} text-muted`}></span>
          </div>
                        </div>
            <div className="col-6 col-md-6 col-lg-7 mt-2"> 
          
              <small>
                <Link to={`/shop`} >Home <span className="fa fa-chevron-right ml-2 mr-2"></span>
                </Link> 
                { props.store ? 
                 <span className='ml-1'>{props.store}</span>
              :
              <Link to={`/fan`} style={{color:"rgb(0, 119, 179)", marginLeft:"3px",textTransform:"capitalize"}}>
              {storesearchinput.length > 0 ? storesearchinput : props.store ? props.store :category.category ? category.category :
              query.get("cat")? query.get("cat") :
              query.get("brand")? query.get("brand") :
               category.brand ? category.brand : "Electronics"}
              </Link>}
                 </small>
          <p style={{ textTransform:"capitalize",fontWeight:"bolder",padding:"0px"}}>
          {storesearchinput.length > 0 ? storesearchinput :
           props.store ? props.store :
           null}
            </p>
                        </div>
                        <div className="col-6 col-md-6 col-lg-5">
                        <small>
                        {storeproducts.length > 0 ? 
                      <small style={{float:"right"}}>
                      <b>{storeproducts.length} </b> of  
                      <span >
                       {" " +numprod*20} storeproducts
                      </span>
                      </small>
                      : null}
                    </small>
                    <br/>
                        <center>
                      <div style={{display:"flex",width:"100%",flexWrap:"nowrap"}}>
                        <div style={{marginTop:"8px"}}>
                          <small style={{display:`${mobiledevice ? "block" : "none"}`}}>
                          Sort By :  <b style={{color:"orange", cursor:"pointer"}} onClick={displayfilterdropdown}> {sorter || "popularity"} 
                          <span style={{color:"orange"}} className={`${dropdown.class} ml-2`}></span></b>
                          </small>
                        </div>
                        <div>
                     </div>       
                        <div style={{padding:"10px",float:"right"}}>
                        <i className="fa fa-th" style={{color:`${view === "grid"  ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>changeview("grid")}></i>
                        </div>
                        <div style={{padding:"10px"}}>
                        <i className="fa fa-list" style={{color:`${view === "list" ? "rgb(0, 119, 179)" : "black"}`}} onClick={()=>changeview("list")}></i>
                        </div>
                      </div>
                      </center>                  
                    </div>
                    </div>
           <div className='row' >
            <div className='col-6 col-md-3'>
                <small><b>{storeproducts.length}</b> Products Found</small>
            </div>
            <div className='col-9'>
            <div className="row" style={{position:"relative"}}>
              {!mobiledevice ?   
                 <div style={{transition:"width 2s",width:`${dropdown.width}`,overflow:"hidden",backgroundColor:"white",position:"absolute",top:"0px",right:"17%",zIndex:"3"}}>
                  <div  style={{padding:"10px",border:"0.8px solid lightgrey"}}>
                 <p className="linker" onClick={() => sort("low-high")}><small>Price : Lowest - Highest</small></p>
                   <p  className="linker" onClick={() => sort("high-low")}><small>Price : Highest - Lowest</small></p>
                   <p  className="linker" onClick={() => sort("popularity")}><small>Popularity</small></p>
                   <p  className="linker" onClick={() => sort("warranty")}><small>Warranty</small></p>
                   <p  className="linker" onClick={() => sort("most-searched")}><small>Most Searched</small></p>
                   <p  className="linker" onClick={() => sort("most-viewed")}><small>Most Viewed</small></p></div>             
                  </div>  
                  : null}         
                 </div>
            </div>
            {view === "grid" && storeproducts.map(product=>
                  <div className={props.store ? "col-6 col-md-4 col-lg-3 mb-1" : "col-6 col-md-3 col-lg-2 mb-1"} style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%"}}  key={product.productId} >        
                  <div style={{padding:"5px"}} onMouseOver={hoverapp} className={`${hovergrid} unhoveredapp`}>
                 <div>
                   <center style={{position:"relative"}}>
                   <span  style={{position:"absolute",fontSize:"30px",top:"10px",left:"10px", color:"orange"}}></span>
                   {product.stock === 0 ?
                   <div style={{position:"absolute",height:"100%", width:"100%",backgroundColor:"rgba(245,245,245,0.6)"}}>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"3px",top:"50%"}}><span className='fa fa-ban'></span> Out Of Stock</b>
                   </div>
                : null}
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",position:"absolute",right:"5px",top:"5px"}}>{product.discount ? `-${product.discount}%` : null}</b>
                   <small style={{position:"absolute",fontSize:"15px",bottom:"5px",right:"5px",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
                   <img className="mainImg img-responsive dataimages"  src={`https://cdn5.vectorstock.com/i/1000x1000/23/44/shopping-cart-icon-vector-402344.jpg`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div> 
       <div className="row" style={{width:"100%"}}>
         </div>
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>opendetails({details:product.details,productId:product.pid})}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 30 ? product.details.slice(0,30)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
               </div>          
               {product.discount ?
              <div>
               <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {product.mainprice}</small>
               
                </div> 
                : 
                <br/>
                }
                <div>
               {product.numofrating && product.numofrating > 0 
               ?  
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${product.rating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
               </div>
               : null}  
                 <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formatermain(product.timeadded)}</small></div> 
                 <div>
                  <b className="badge" style={{fontSize:"12px",fontWeight:"lighter",color:"grey",backgroundColor:"rgba(245,245,245,0.5)"}}>{product.product_store && product.product_store.length > 20 ? product.product_store.slice(0,20) + "..." : product.product_store}</b><br/>
                 <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"12px"}}><span className="fa fa-map-marker mr-1" style={{color:"indianred",fontSize:'14px'}}></span><b>{product.lga}</b>, {product.state}</small>  
                 </div>       
                 </div>       
               <center  >     
               <button  type="button" onClick={()=>addtocart({productId:product.pid, details:product.details})}  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
               {product.stock > 0 ? "ADD TO CART " : "Out Of Stock"}<b>{product.quantity ? 
                <span style={{color:"lightgrey"}}><span className='fa fa-shopping-cart'></span> ({product.quantity})</span>: null}</b>
                </small>
                </button>
               </center>
               </div>    
               </div>      
         </div> 
                )}
            {view === "list" && storeproducts.map(product=>
                  <div className="col-12 col-md-6 col-lg-6" style={{marginBottom:"0px",width:"100%",padding:"1px",display:"inline-block",height:"100%"}}  key={product.productId} >        
                  
                  <div style={{padding:"5px"}} onMouseOver={hoverapp} className={`${hoverlist}  row`}>
                 <div className='col-5'>
                   <center style={{position:"relative"}}>
                   {product.stock === 0 ?
                   <div style={{position:"absolute",height:"100%", width:"100%",backgroundColor:"rgba(245,245,245,0.6)"}}>
                   <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"3px",top:"50%"}}><span className='fa fa-ban'></span> Out Of Stock</b>
                   </div>
                : null}
                   <span  style={{position:"absolute",fontSize:"30px",top:"10px",left:"10px", color:"orange"}}></span>
                 <b className="badge" style={{fontSize:"12px",fontWeight:"bolder",color:"rgba(0, 119, 179)",backgroundColor:"rgba(0, 119, 179,0.1)",position:"absolute",right:"5px",top:"5px"}}>{product.discount ? `-${product.discount}%` : null}</b>
                   <small style={{position:"absolute",fontSize:"15px",bottom:"5px",right:"5px",color:`${product.viewrating > 0 ? "orange" : "grey"}`}}><span className="fa fa-eye" ></span> {product.viewrating}</small>
                   <img className="mainImg img-responsive dataimages"  src={`https://cdn5.vectorstock.com/i/1000x1000/23/44/shopping-cart-icon-vector-402344.jpg`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div className='col-6'> 
      
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>opendetails({details:product.details,productId:product.pid})}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 60 ? product.details.slice(0,60)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
               </div>          
               {product.discount ?
              <div>
               <small style={{fontWeight:"bold",fontSize:"14px"}}>{product.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {product.mainprice}</small>
               
                </div> 
                : 
                <br/>
                }
                <div>
               {product.numofrating && product.numofrating > 0 
               ?  
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${product.rating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({product.numofrating}) </small>
               </div>
               : <br/>} 
                 <small style={{fontStyle:"italic",float:"right",fontSize:"11px"}}>{formatermain(product.timeadded)} </small></div> 
                 <br/>
                 <div>
                  <b className="badge" style={{fontSize:"12px",fontWeight:"lighter",color:"grey",backgroundColor:"rgba(245,245,245,0.5)"}}>{product.product_store && product.product_store.length > 20 ? product.product_store.slice(0,20) + "..." : product.product_store}</b><br/>
                 <small className="text-muted" style={{letterSpacing:"-1px",textTransform:"capitalize",fontSize:"12px"}}><span className="fa fa-map-marker mr-1" style={{color:"indianred",fontSize:'14px'}}></span><b>{product.lga}</b>, {product.state}</small>
                 </div>       
                 </div>       
               <center  >     
               <button  type="button" onClick={()=>addtocart({productId:product.pid, details:product.details})}  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
               {product.stock > 0 ? "ADD TO CART " : "Out Of Stock"}<b>{product.quantity ? 
                <span style={{color:"lightgrey"}}><span className='fa fa-shopping-cart'></span> ({product.quantity})</span>: null}</b>
                </small>
                </button>
               </center>
               </div>    
               </div>      
         </div> 
                )}
           </div>
          <div style={{marginBottom:"50px",right:"0px",backgroundColor:"white",zIndex:"5464",width:"100%",position:"sticky",bottom:"50px",marginTop:"30px"}}>
          <center>
          {pagenumbers.length > 1 ? pagenumbers.map(pages=>
            <span className='fa fa-badge' onClick={()=>changepage(pages)} style={pages == `${page}` ? {border:"3px solid orange",borderRadius:"50%",padding:"3px 7px",fontWeight:"bold",margin:"5px",color:"grey", cursor:"pointer"} : {border:"2px solid grey",cursor:"pointer",borderRadius:"50%",padding:"2px 5px",fontWeight:"bold",margin:"5px",color:"black"}}>
                <small style={{fontWeight:"bold"}}>{pages}</small>
            </span>
            ) : null}
          </center>
            </div>
           
          
 {mobiledevice ?
           <div style={{width:`${dropdown.width}`,transition:"width 2s",overflow:"hidden",backgroundColor:"white",position:"fixed",bottom:"5%",left:"0%",zIndex:"3"}}>
            <div style={{padding:"15px",border:"0.8px solid lightgrey"}}>
           <p className="linker" onClick={() =>sort("low-high")}><small>Price : Lowest - Highest</small></p>
             <p  className="linker" onClick={() =>sort("high-low")}><small>Price : Highest - Lowest</small></p>
             <p  className="linker" onClick={() =>sort("popularity")}><small>Popularity</small></p>
             <p  className="linker" onClick={() =>sort("warranty")}><small>Warranty</small></p>
             <p  className="linker" onClick={() =>sort("most-searched")}><small>Most Searched</small></p>
             <p  className="linker" onClick={() =>sort("most-viewed")}><small>Most Viewed</small></p></div>             
            </div>
            : null}
            <div className="filterdiv bg-dark" style={{height:"5%",zIndex:"63737",display:`${mobiledevice ? "block" : "none"}`}}>
               <div className="row">
                 <div className="col-8" onClick={displayfilterdropdown}>
                 <center>
                       <small> sby:
                       <b style={{ cursor:"pointer"}} > "{query.get("sby") ? query.get("sby") : "popularity"}"
                        </b>  <span className={`ml-2`}></span>
                       </small>
               </center>               
                 </div>              
                 <div className="col-2 fiterdiv-col"  style={{borderLeft:"1px solid lightgrey",borderRight:"1px solid lightgrey",padding:"4px"}}>
                   <center>
            <i style={{border:"1px solid orange",padding:"5px",borderRadius:"50%"}} onClick={()=>changeview(view === "grid" ? "list" : "grid")} className={`${view && view === "list"  ? "fa fa-list" : "fa fa-th"}`} ></i>
                   </center>
                 </div>
                 <div className="col-2" style={{padding:"5px"}}>  
                      <center>
                   <span onClick={openfilter} style={{border:"1px solid orange",color:"white",padding:"5px",borderRadius:"50%",fontSize:"17px"}} className='fa fa-filter'></span>
                  </center>
                 </div>
               </div>
             </div>
             </div>
             : loaded && (storesearchinput.length > 0 || query.get("search")) && storeproducts.length === 0 ?
              <div className='row'>
                <div className='col-12' style={{padding:"50px"}}>
                    <center>
                        <span className='fa fa-search-minus' style={{color:"lightgrey", fontSize:"150px"}}></span>
                        <p style={{color:"indianred"}}>Oops! couldnt find any item that matches <b>"{storesearchinput || query.get("search")}"</b> </p>
                        <small> <span onClick={gotoshop} style={{cursor:"pointer",color:"grey"}}>Click Here</span> to return to shopping page</small>
                    </center>
                </div>
                </div>
                : loaded && storeproducts.length === 0 ? 
                <div className='row'>
                <div className='col-12' style={{padding:"50px"}}>
                    <center>
                        <span className='fa fa-search-minus' style={{color:"grey", fontSize:"150px"}}></span>
                        <p>Oops! couldnt find any item under this Category </p>
                        <small> <span onClick={gotoshop} style={{cursor:"pointer",color:"grey"}}>Click Here</span> to return to shopping page</small>
                    </center>
                </div>
                </div> : null}
        </div>
     );
}
// <small className="badge badge-danger"  style={{display:Object.keys(this.state.parsedUrl).length > 0 ? "inline-block": "none"}}>{Object.keys(this.state.parsedUrl).length}</small>
export default StoreProduct;