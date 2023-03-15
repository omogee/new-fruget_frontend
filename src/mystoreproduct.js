import React, { useState,useCallback, useEffect, useContext, useRef } from 'react';
import {useLocation, useNavigate,Link} from "react-router-dom"
import axios from "axios";
import {formater, formatermain, getSentTime} from "./formatTime"
import "./main.css"
import Details from './details';
import Cookies from "js-cookie"
import {userContext} from "./usercontext"
import Testrandom from './testrandom';

function MyStoreProduct(props) {
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
    const [searchinput, setsearchinput] = context["search"]
    const [view,setview] = context["view"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]
    const [sorter, setsorter]= context["sorter"]
    const [storesearchinput, setstoresearchinput] = context["storesearchinput"]
    
    const [dropdown, setdropdown] = useState({width:"0%",class:"fa fa-chevron-up" })
    const [loaded, setloaded] = context["loaded"]
    const [selectedstoreId, setselectedstoreId]= useState("")
    const [shoppingcart, setshoppingcart] = context["shoppingcart"]
    const [topbrands, settopbrands] = context["topbrands"]
    const [filterclass, setfilterclass] = useState("fa-filter")
    const [quantity, setquantity]= useState({})
    const [price, setprice] = useState({})
    const [deleteproduct, setdeleteproduct] = useState(false)

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
            setcurrentPage("storeproducts")
            //store=${escape(props.store)}
        //   axios.get(`http://localhost:5000/item/fetch_my_storeproducts?storeId=${selectedstoreId || query.get("storeId") || "null"}&page=${page}&tkt=${Cookies.get("tktplc")}`)
        //   .then(res => {
        //     setTimeout(()=> setloading(false), 700)
        //       setstoreproducts(res.data.products)
        //       if(res.data.numprod[0] && res.data.numprod[0].numprod > 0){
        //       setnumprod(res.data.numprod[0].numprod/20)
        //       }
        //     setproductdetails(prev=>({...prev, "brand":res.data.brands,"colors":res.data.colors}))
        //     setloaded(true)
        //   })
        // .catch(err => console.log(err))
     })
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

const editdetails =(data)=>{
  navigate(`/profile/my_profile/product_edit/${data.productId}/${data.storeId}`)
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
    setsearchinput("")
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
const changequantity=(data,e)=>{
  setquantity(prev =>({...prev,[`${data}`]:e.target.value }))   
}
const changeprice =(data, e)=>{
    setprice({[`${data}`]:e.target.value})
}
const editchanges =(data)=>{
  
    const newquantity = quantity[`${data.productId}`] || data.stock
    const newprice = price[`${data.productId}`] || data.sellingprice
    console.log(newquantity, newprice, data.stock, data.sellingprice)
    if((newquantity !== data.stock && newquantity.length > 0) || (newprice !== data.sellingprice && newprice !== 0)){
        setloading(true)
        axios.get(`http://localhost:5000/client/update_store_quantity_and_price?quantity=${newquantity}&price=${parseInt(newprice)}&tkt=${Cookies.get("tktplc")}&productId=${data.productId}&storeId=${query.get("store")}`)
    .then(res =>{
        if(res.data.status === "success"){
            setalertmessage(res.data.message)
            setrequeststatus(res.data.status)
            settargetmodal("product")
            setmodaldisplay("block")
            setloading(false)
        }else{
            setalertmessage(res.data.message)
            setrequeststatus(res.data.status)
            settargetmodal("product")
            setmodaldisplay("block")
            setloading(false)
        }
    })
}else{
    alert("no quantity or price")
}
}
const storesearchchange=(e)=>{
  setstoresearchinput(e.target.value)
}
return ( 
        <div className='container'>
             <div style={{position:"fixed", display:`${deleteproduct ? "block" : "none"}`,zIndex:"90000",backgroundColor:"rgba(0,0,0,0.7)",top:"5%",left:"0%",width:"100%",height:"95%"}}>
          <div className='shopcartdeldiv' style={{position:"fixed",fontWeight:"bold",backgroundColor:"white",boxShadow:"2px 2px 3px 2px lightgrey",padding:"10px",zIndex:"900000"}}>
            <div>
                <small style={{color:"indianred", fontWeight:"bolder"}}>[Action Required]: Please note that as part of our safety policies 
                you are required to enter your email/name and password to proceed with this action</small><br/>
                <small>delete item : <b>000{deleteproduct.productId}</b></small>
                <br/><br/>
            <input type="text" className='form-control' placeholder='Enter email/full name'/>
            <br/><br/>
            <input type="text" className='form-control' placeholder='Enter password'/>
            </div>
            <br/><br/>
            <div className='row'>
                <div className='col-5'>
                    <button onClick={()=> setdeleteproduct(false)} style={{padding:"5px 10px"}} className='btn btn-primary'>cancel</button>
                </div>
                <div className='col-7'>
                    <button style={{float:"right",padding:"5px 20px"}} className='btn btn-danger'>proceed to delete</button>
                </div>
            </div>
         </div>
          </div>
          <div className="row mt-2" style={{position:"sticky", top:"30px", backgroundColor:"white",zIndex:"356"}}>
            <div className="col-6 col-md-7"> 
             <input type="text" onChange={storesearchchange} style={{boxShadow:"none"}} className='form-control' placeholder={`Search Items from ${storeproducts[0] && storeproducts[0].product_store}`} />
                        </div>
                        <div className="col-6 col-md-5">
                        <small>
                        {storeproducts && storeproducts.length > 0 ? 
                      <small style={{float:"right"}}>
                      <b>{storeproducts && storeproducts.length} </b> of  
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
                    </div >
            {storeproducts.length > 0 ? 
            <div className='container-fluid'>
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
                   <img style={{height:"100px"}}  className="mainImg img-responsive dataimages"  src={`https://cdn5.vectorstock.com/i/1000x1000/23/44/shopping-cart-icon-vector-402344.jpg`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div> 
       <div className="row" style={{width:"100%"}}>
         </div>
       <div className="" title='click here to edit entire product' style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>editdetails(product)}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 50 ? product.details.slice(0,50)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
               </div>             
            <div className='container-fluid'>
            <div className='row'>
                <div className='col-6'>
                <small style={{fontSize:"12px"}}>stock left</small>
                </div>
                <div className='col-6'> 
                <input type="number" onChange={(e)=>changequantity(product.productId,e)} style={{padding:"0",width:'100%'}}  value={quantity[`${product.productId}`] || quantity[`${product.productId}`]=== "" ? quantity[`${product.productId}`] : product.stock}></input>
                </div>
                </div>
                <div className='row mt-1'>
                <div className='col-4'>
                <small style={{fontSize:"12px"}}>price</small>
                </div>
                <div className='col-8'> 
                <input type="number" onChange={(e)=>changeprice(product.productId,e)} style={{padding:"0",width:'100%'}}   value={price[`${product.productId}`] || price[`${product.productId}`]=== "" ? price[`${product.productId}`] : product.sellingprice}></input>
                </div>
                <br/>
                <div className='col-12 mt-2'>
                <button  type="button"  onClick={()=>setdeleteproduct(product)} className="btn btn-danger deleteproductbtn" >
                <small>
                <span className='fa fa-trash'></span> delete 000{product.productId}
                </small>
                </button>
                </div>
                </div>
            </div>
                 </div>       
               <center>     
                <button  type="button" onClick={()=>editchanges(product)} className={"btn addtocartbtn smaddtocartbtn" } >
                <small>
               <span className='fa fa-pencil-square-o'></span> Edit 000{product.productId}
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
                   <img className="mainImg img-responsive dataimages" src={`https://cdn5.vectorstock.com/i/1000x1000/23/44/shopping-cart-icon-vector-402344.jpg`} data-src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
                   </center>
                 </div>
                 <div className='col-7'> 
      
       <div className="" style={{lineHeight:"16px"}}> 
        <div  className="details" onClick={()=>editdetails(product)}>  
            <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{product.details && product.details.length > 60 ? product.details.slice(0,60)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>  
               </div>              
                <div>    
                 <small style={{fontStyle:"italic",fontSize:"11px"}}>{formatermain(product.timeadded)} </small></div> 
                 <div className='container-fluid'>
            <div className='row'>
                <div className='col-6' style={{padding:"0px", margin:"0px"}}>
                <small style={{fontSize:"11px"}}>stock left</small>
                </div>
                <div className='col-6'> 
                <input type="text" style={{padding:"0",width:'100%'}}  value={product.stock}></input>
                </div>
                </div>
                <div className='row mt-1'>
                <div className='col-6'>
                <small style={{fontSize:"12px"}}>price</small>
                </div>
                <div className='col-6'> 
                <input type="text mt-2" style={{padding:"0",width:'100%'}}  value={product.sellingprice}></input>
                </div>
                </div>
            </div>    
                 </div>       
                 <center  >     
               <button  type="button"  className={product.stock > 0 ? "btn addtocartbtn smaddtocartbtn" : "btn disabledaddtocartbtn"} >
                <small>
                 Edit 000{product.productId}
                </small>
                </button>
               </center>
               </div>    
               </div>      
         </div> 
                )}
           </div>
          <div className='row' style={{marginBottom:"30px",right:"0px",backgroundColor:"white",zIndex:"5464",width:"100%",position:"sticky",bottom:"50px",marginTop:"30px"}}>
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
            <div className="filterdiv bg-dark" style={{height:"5%",zIndex:"565356",display:`${mobiledevice ? "block" : "none"}`}}>
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
             : loaded && (searchinput.length > 0 || query.get("search")) && storeproducts.length === 0 ?
              <div className='row'>
                <div className='col-12' style={{padding:"50px"}}>
                    <center>
                        <span className='fa fa-search-minus' style={{color:"lightgrey", fontSize:"150px"}}></span>
                        <p style={{color:"indianred"}}>Oops! couldnt find any item that matches <b>"{searchinput || query.get("search")}"</b> </p>
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
export default MyStoreProduct;