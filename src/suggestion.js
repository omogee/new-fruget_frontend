import React, { useState, useContext, useEffect } from 'react';
import { userContext } from './usercontext';
import {Link} from "react-router-dom"


function Suggestion() {
    const context = useContext(userContext)
    const [products, setproducts] = context["product"]
    const [productdetails, setproductdetails] = context["productdetail"]
    const [searchcat, setsearchcat] = context["searchcat"]
    const [searchsubcat, setsearchsubcat] = context["searchsubcat"]
    const [searchinput, setsearchinput] = context["search"]
  const [categories, setCategories] = context["categories"]
  const [subcat, setsubcat] = context["subcat"]
  const [topbrands, settopbrands] = context["topbrands"]

  const query = new URLSearchParams(window.location.search)

  const opencat=(data)=>{
    if(data.catdet === "details"){
      window.location.href=`/shop/details/${data.catval}?pid=${data.catId}`
    }else{
    window.location.href=`/shop?${data.catdet}=${data.catval}`
    }
   }

    return ( 
        <div>
        {(searchinput.length > 0 || query.get("search")) && products.length > 0 ?
        <div className='row mt-2' style={{padding:"50px",marginTop:"20px",height:"100%",overflow:"hidden"}}>
              <div className='col-12 col-md-6'>
                <center>
                <small style={{color:"grey", fontWeight:"bold"}}>Top Products</small>
                <br/>
                </center>
          {products.slice(0,6).map(product=>
              <div onClick={()=>opencat({catdet:"details",catval:product.details,catId:product.productId})} className='row' style={{padding:"3px"}}>
            <div className='col-3 col-md-2'>
            <img className="img-responsive" style={{width:"100%",padding:"0px",height:"40px",borderRadius:"50%"}} src={`https://res.cloudinary.com/fruget-com/image/upload/${product.generalcategory}/${product.category}/${product.mainimg || 'emptyimg.jpg'}`} ></img>
            </div>
            <div className='col-9 col-md-10'>
             <small className='linker'>{product.details && product.details.length > 40 ? product.details.slice(0,40)+ "..." : product.details +"-"+ product.model +"-"+ product.color}</small>
           </div>
           </div>
            )}     
            <Link to={`/shop?search=${searchinput}`}>
            <small className='mt-2' style={{color:"indianred", fontStyle:"italic", fontWeight:"bolder"}}>{products.length > 6 ? "see more ..." : null}</small>   
            </Link>
           </div>
           <div className='col-12 col-md-3'>
                <small className='mb-2' style={{color:"grey", fontWeight:"bold"}}>Top Brands</small>
                <br/>
          {productdetails.brand && productdetails.brand.slice(0,6).map(brand=>
              <div onClick={()=>opencat({catdet:"brand",catval:brand.brand})} className='row' style={{padding:"3px"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{brand.brand}</small>
           </div>
            )}     
            <small className='mt-2' style={{color:"indianred", fontStyle:"italic", fontWeight:"bolder"}}>{productdetails.brand && productdetails.brand.length > 6 ? "see more ..." : null}</small>   
           </div>
           <div className='col-12 col-md-3'>
               <div>
               <small style={{color:"grey",fontStyle:"italics", fontWeight:"bold"}}>Keywords ..</small>
               <br/>
               <br/>
          {searchsubcat.slice(0,8).map(cat=>
              <div onClick={()=>opencat({catdet:"cat",catval:cat.subcat})} className='row' style={{padding:"3px"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{cat.subcat}</small>
           </div>
            )}     
               </div>
               <div>
                <br/><br/>
               <small style={{color:"grey", fontWeight:"bold"}}>Top Category</small>
          {searchcat.map(cat=>
              <div onClick={()=>opencat({catdet:"cat",catval:cat.category})} className='row' style={{padding:"3px"}}>
                <small className='linker' style={{textTransform:"capitalize"}}>{cat.category}</small>
           </div>
            )}     
               </div>
          
           </div>
        </div> :
          <div className='row'>
          <div className='col-12 col-md-4' style={{padding:"50px"}}>
           <small style={{fontWeight:"bold",color:'grey'}}>Top Category</small>
           {categories && categories.map(cat=>
            <div key={cat.categories} onClick={()=>opencat({catdet:"cat",catval:cat.category})} style={{padding:"0",margin:"0",color:"grey"}}>
              <small className='linker' style={{textTransform:"capitalize"}}>{cat.category}</small>
            </div>
            )}
           </div>
           <div className='col-12 col-md-4' style={{padding:"50px"}}>
           <small style={{fontWeight:"bold",color:'grey'}}>Sub Category</small>
           {subcat.map(subcats=>
            <div key={subcats.subcat1} onClick={()=>opencat({catdet:"cat",catval:subcats.subcat1})} style={{padding:"0",margin:"0",color:"grey"}}>
              <small className='linker' style={{textTransform:"capitalize"}}>{subcats.subcat1} <span style={{fontWeight:"bold"}}>{subcats.category}</span></small>
            </div>
            )}
           </div>
           <div className='col-12 col-md-4' style={{padding:"50px"}}>
           <small style={{fontWeight:"bold",color:'grey'}}>Top Brands</small>
           {topbrands.map(brands=>
            <div  key={brands.brand} onClick={()=>opencat({catdet:"brand",catval:brands.brand})} style={{padding:"0",margin:"0",color:"grey"}}>
              <small className='linker' style={{textTransform:"capitalize"}}>{brands.brand}</small>
            </div>
            )}
           </div>
          </div>
}
</div>
     );
}

export default Suggestion;