import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './usercontext';

function Testrandom(props) {
    const context = useContext(userContext)
    const [products, setProducts] = context["product"]
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [productdetails, setproductdetails] = context["productdetail"]
    const [preselectedbrands, setpreselectedbrands] = useState([])
    const [preselectedcolors, setpreselectedcolors] = useState([])
    const [preselectedstores, setpreselectedstores] = useState([])
    const [selectedbrands, setselectedbrands] = useState([])
    const [selectedcolors, setselectedcolors] = useState([])
    const [selectedstores, setselectedstores] = useState([])
    const [numprod, setnumprod] = context["numprod"]
    const [category, setcategory] = context["category"]
    const [topbrands, settopbrands] = context["topbrands"]
    const [categories, setCategories] = context["categories"]
    const [page, setpage] = context["page"]

    const query = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    useEffect(()=>{
      if(!props.storeproducts){
   setcurrentPage("products")
      }else{
        setcurrentPage("storeproducts")
      }
    })
    useEffect(()=>{
      if(query.get("brand") === ""){
        query.delete("brand")
        navigate(window.location.pathname +"?"+ query.toString())
      }
      if(query.get("color") === ""){
        query.delete("color")
        navigate(window.location.pathname +"?"+ query.toString())
      }
    })
    useEffect(()=>{
     setselectedbrands(query.get("brand") ? query.get("brand").split(",") : [])
     setselectedcolors(query.get("color") ? query.get("color").split(",") : [])
     setselectedstores(query.get("store") ? query.get("store").split(",") : [])
    },[])
    useEffect(()=>{
      if(props.lg && preselectedbrands.length > 0){
        query.set("brand",preselectedbrands)
        setcategory(prev => ({...prev, "brand": preselectedbrands}))
        navigate(window.location.pathname+"?"+query.toString())
      }
    },[preselectedbrands])
    useEffect(()=>{
      if(props.lg && preselectedcolors.length>0){
        query.set("color",preselectedcolors)
        navigate(window.location.pathname+"?"+query.toString())
      }
    },[preselectedcolors])
    useEffect(()=>{
      if(props.lg && preselectedstores.length > 0){
        query.set("store",preselectedstores)
        navigate(window.location.pathname+"?"+query.toString())
      }
    },[preselectedstores])
    const checkboxchange =(e)=>{
    if(e.target.name === "brand"){
      if(selectedbrands.includes(e.target.value)){
      setselectedbrands(selectedbrands.filter(item => item !== e.target.value))
      }
      else if(preselectedbrands.includes(e.target.value)){
        setpreselectedbrands(preselectedbrands.filter(item => item !== e.target.value))
      }else{
        setpreselectedbrands(prev => ([e.target.value, ...prev]))
      }
      
    }else if(e.target.name === "color"){
      if(selectedcolors.includes(e.target.value)){
        setselectedcolors(selectedcolors.filter(item => item !== e.target.value))
        }
        else  if(preselectedcolors.includes(e.target.value)){
            setpreselectedcolors(preselectedcolors.filter(item => item !== e.target.value))
        }else{
    setpreselectedcolors(prev => ([e.target.value, ...prev]))
        }      
    }
    else if(e.target.name === "store_name"){
        if(preselectedstores.includes(e.target.value)){
            setpreselectedstores(preselectedstores.filter(item => item !== e.target.value))
        }else{
    setpreselectedstores(prev => ([e.target.value, ...prev]))
        }      
    }
  }
    const submitfilter =(filterby)=>{
        let filterto = filterby === "brand" ? preselectedbrands : filterby === "color" ? preselectedcolors : preselectedstores
      query.set(filterby, filterto )
     let mainfilterby =`${filterby}`
      setcategory(prev => ({...prev, mainfilterby: filterto}))
      navigate(window.location.pathname +"?"+ query.toString())
    }
    const removefilter=(data)=>{
      if(data.filterby === "brand"){
        setpreselectedbrands(preselectedbrands.filter(item => item !== data.data))
      }else if(data.filterby === "color"){
        setpreselectedcolors(preselectedcolors.filter(item => item !== data.data))
      }else if(data.filterby === "store"){
        setpreselectedstores(preselectedstores.filter(item => item !== data.data))
      }
    } 
    const opencat =(cat)=>{
      if(query.get("cat")){
        query.delete("cat")
        query.set("page", 1)
        setpage(1)
        setcategory(prev =>({...prev, category:""}))
        navigate(window.location.pathname + "?" + query.toString())
      }else{
    query.set("cat", cat)
    query.set("page", 1)
    setpage(1)
    setcategory(prev =>({...prev, category:cat}))
    navigate(window.location.pathname + "?" + query.toString())
      }
    }
    const openproducts=()=>{
      navigate(`/shop` + "?" + query.toString())
    }
    const brandsearch=(e)=>{
  setproductdetails(prev =>({...prev,brand:productdetails.brand.filter(brands => brands.indexOf(e.target.value) > -1)}))
    }
    const colorsearch=(e)=>{
      setproductdetails(prev =>({...prev,colors:productdetails.colors.filter(color => color.indexOf(e.target.value) > -1)}))
        }
    return (
<div className='container-fluid' style={{marginBottom:"50px",backgroundColor:"white",padding:"0"}}>
{props.lg ? null :
<div className='row' style={{position:"fixed",padding:"20px",backgroundColor:'white',right:"0",bottom:"0%",width:"100%"}}>
  <div className='col-12 col-md-6'>
  <center>
  <small style={{padding:"5px",color:"white",backgroundColor:"indianred",borderRadius:"30px"}}>
    {numprod*20}+
     <span style={{color:"white"}}>items</span></small>
  </center>
  </div>
  <div className='col-6'>
    <button onClick={openproducts} className='btn btn-primary' style={{padding:"1px 3px",float:"right"}}>
      <small>Open products</small>
      </button>
    <br/><br/>
  </div>
</div>
}

<div className='mb-2' style={{boxShadow:'2px 3px 3px 3px lightgrey',backgroundColor:'white',width:"100%",marginBottom:"30px",overflow:"hidden",height:"40vh"}}>
<div style={{backgroundColor:"orange",width:"100%",color:"white",padding:"1px",fontWeight:'bold',fontSize:'14px',margin:"0"}}><div className='container-fluid'>
  <div className='row'>
  <div className='col-12'>
  <p> Top Category   <small>({categories && categories.length}+)</small></p>
</div>
</div>
</div>
</div>
<div style={{overflow:"scroll",width:'100%',height:"30vh"}}>
{categories && categories.map(cat=>
   <div key={cat.category} style={{borderBottom:"1px solid lightgrey",justifyContent:"space-evenly",display:'flex',flexWrap:"nowrap",padding:"0",margin:"0"}}>
   <div style={{width:"8%"}}>
  {query.get("cat") === cat.category ?
    <span className='fa fa-check-circle' style={{color:"orange"}}></span>
  : null}
   </div>
  <div className='mt-1'  style={{width:"87%"}}>
 <small onClick={()=>opencat(cat.category)}  style={{fontSize:'12px',cursor:"pointer",marginLeft:"3px",textTransform:"uppercase"}}>{cat.category}</small><br/>
  </div>
</div>
  )}
  </div>
  </div>
  <br/><br/>
{productdetails.allstores && productdetails.allstores.length > 0 ?
<div className='mb-2' style={{boxShadow:'2px 3px 3px 3px lightgrey',backgroundColor:'white',width:"100%",marginBottom:"30px",overflow:"hidden",height:"40vh"}}>
<div style={{backgroundColor:"orange",width:"100%",color:"white",padding:"1px",fontWeight:'bold',fontSize:'14px',margin:"0"}}><div className='container-fluid'>
{props.lg ? null :
<div className='row'>
                {preselectedstores.map(prestores =>
                    <div key={prestores} className="col-2" style={{border:"1px solid lightgrey",backgroundColor:"white",borderRadius:"20px",color:"orange"}}>
                        <center>{prestores.length > 14 ? prestores.slice(0,14) + "..." : prestores}</center>
                        <span className='fa fa-times' onClick={()=>removefilter({filterby:"store",data:prestores})} style={{position:"absolute",right:"5px",color:'indianred',top:"5px"}}></span>
                        </div>
                    )}
                    </div>
}
                    <div className='row'>
  <div className='col-11'>
  <p> Top Dealers   <small>({productdetails.allstores && productdetails.allstores.length}+)</small></p>
</div>
{props.lg? null :
<div className='col-1'>
<button className='btn' style={{border:"1px solid lightgrey",backgroundColor:"white",padding:"2px 5px",marginBottom:"3px",color:"grey"}} onClick={()=>submitfilter("store")}>filter</button>
  </div>
}
</div>
</div>
</div>
<div style={{overflow:"scroll",width:'100%',height:"30vh"}}>
  {productdetails.allstores && productdetails.allstores.map(stores=>
    <div key={stores.store_name} style={{borderBottom:"1px solid lightgrey",justifyContent:"space-evenly",display:'flex',flexWrap:"nowrap",padding:"0",margin:"0"}}>
       <div style={{width:"8%"}}>
       <input onChange={checkboxchange} name="store_name" value={stores.store_name} checked={preselectedstores.includes(stores.store_name) ? true : false} type="checkbox" style={{margin:"10px"}}/>
       </div>
      <div  style={{width:"90%",padding:"5px",lineHeight:"2.2vh"}}>
      <small style={{fontSize:'12px',marginLeft:"3px",textTransform:"uppercase"}}>{stores.store_name}</small><br/>
               <small>
                  <div className="outer">     
                 <div className="inner" style={{width:`${stores.average*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({stores.storeratingcount || 0}) </small>
               </small>
      </div>
      
    </div>
    )}
    </div>
    </div>
    : null}
<br/>
 <div className='mb-2' style={{boxShadow:'2px 3px 3px 3px lightgrey',backgroundColor:'white',width:"100%",padding:"0",margin:"0",marginBottom:"30px",overflow:"hidden",height:"40vh"}}>
<div style={{backgroundColor:"orange",color:"white",width:"100%",padding:"1px",fontWeight:'bold',fontSize:'12px',margin:"0"}}>
  <div className='container-fluid'>
{props.lg ? null :
            <div className='row'>
                {preselectedbrands.map(prebrands =>
                    <div key={prebrands} className="col-4 mb-1" style={{border:"1px solid lightgrey",backgroundColor:"white",borderRadius:"20px",color:"orange"}}>
                        <center>{prebrands.length > 8 ? prebrands.slice(0,8) + "..." : prebrands}</center>
                        <span className='fa fa-times' onClick={()=>removefilter({filterby:"brand",data:prebrands})} style={{position:"absolute",right:"5px",color:'indianred',top:"5px"}}></span>
                        </div>
                    )}
                    </div>
}
                    <div className='row'>
  <div className='col-11'>
  <p style={{margin:"0"}}> Popular Brands   <small>({productdetails.brand && productdetails.brand.length > 1 ? productdetails.brand.length : topbrands.length}+)</small></p>
  <input type="text" onChange={brandsearch} className="form-control form-control-sm" placeholder="search brand..." />
</div>
{props.lg ? null :
<div className='col-1'>
<button className='btn' style={{border:"1px solid lightgrey",backgroundColor:"white",padding:"2px 5px",marginBottom:"3px",color:"grey"}} onClick={()=>submitfilter("brand")}>filter</button>
  </div>
}
</div>
</div>
</div>
<div style={{overflow:"scroll",width:"100%",height:"30vh"}}>
  {productdetails.brand && productdetails.brand.length > 5 ? productdetails.brand.map(brands=>
    <div key={brands.brand} style={{borderBottom:"1px solid lightgrey",width:"95%",justifyContent:"space-evenly",display:'flex',flexWrap:"nowrap",padding:"0",margin:"0"}}>
       <div style={{width:"8%"}}>
       <input onChange={checkboxchange} name="brand" value={brands.brand} checked={preselectedbrands.includes(brands.brand) || selectedbrands.includes(brands.brand) ? true : false} type="checkbox" />
       </div>
      <div style={{width:"77%"}}>
      <small style={{fontSize:'11px',marginLeft:"3px", textTransform:"uppercase"}}>{brands.brand}</small>
      </div>
        <div style={{width:"13%"}}>
        <small style={{fontSize:"11px"}}>{brands.brandy}</small>
        </div>
    </div>
    ) :    topbrands && topbrands.length > 0 ? topbrands.map(brands=>
      <div key={brands.brand} style={{borderBottom:"1px solid lightgrey",width:"95%",justifyContent:"space-evenly",display:'flex',flexWrap:"nowrap",padding:"0",margin:"0"}}>
         <div style={{width:"8%"}}>
         <input onChange={checkboxchange} name="brand" value={brands.brand} checked={preselectedbrands.includes(brands.brand) || selectedbrands.includes(brands.brand) ? true : false} type="checkbox" />
         </div>
        <div style={{width:"77%"}}>
        <small style={{fontSize:'11px',marginLeft:"3px", textTransform:"uppercase"}}>{brands.brand}</small>
        </div>
          <div style={{width:"13%"}}>
          <small style={{fontSize:"11px"}}>{brands.brandy}</small>
          </div>
      </div>
      ) : null}
    </div>
    </div>
<br/>
    <div className='mb-2' style={{boxShadow:'2px 3px 3px 3px lightgrey',marginBottom:"50px",width:"100%",backgroundColor:'white',overflow:"hidden",height:"40vh"}}>
<div style={{backgroundColor:"orange",color:"white",width:"100%",padding:"1px",fontWeight:'bold',fontSize:'14px',margin:"0"}}>
<div className='container-fluid'>
{props.lg ? null :
            <div className='row'>
                {preselectedcolors.map(precolors =>
                    <div key={precolors} className="col-1" style={{border:"1px solid lightgrey",backgroundColor:"white",borderRadius:"20px",color:"orange"}}>
                        <center>{precolors.length > 8 ? precolors.slice(0,8) + "..." : precolors}</center>
                        <span className='fa fa-times' onClick={()=>removefilter({filterby:"color",data:precolors})} style={{position:"absolute",right:"5px",color:'indianred',top:"5px"}}></span>
                        </div>
                    )}
                    </div>
}
                    <div className='row'>
  <div className='col-11'>
  <p style={{margin:"0"}}> Filter By Colors   <small>({productdetails.colors && productdetails.colors.length}+)</small></p>
  <input type="text" onChange={colorsearch} className="form-control form-control-sm" placeholder="search colors..." />
</div>
{props.lg ? null : 
<div className='col-1'>
<button className='btn' style={{border:"1px solid lightgrey",backgroundColor:"white",padding:"2px 5px",marginBottom:"3px",color:"grey"}} onClick={()=>submitfilter("color")}>filter</button>
  </div>
}
</div>
</div>
</div>
<div style={{overflow:"scroll",width:"100%",height:"30vh"}}>
  {productdetails.colors && productdetails.colors.map(color=>
    <div key={color.color} style={{borderBottom:"1px solid lightgrey",justifyContent:"space-evenly",display:'flex',flexWrap:"nowrap",padding:"0",margin:"0"}}>
       <div style={{width:"8%"}}>
       <input type="checkbox" onChange={checkboxchange} name="color" value={color.color} checked={preselectedcolors.includes(color.color) || selectedcolors.includes(color.color) ? true : false} />
       </div>
      <div style={{width:"77%"}}>
      <small style={{fontSize:'11px',marginLeft:"3px", textTransform:"uppercase"}}>{color.color}</small>
      </div>
        <div style={{width:"13%"}}>
        <small >{color.colory}</small>
        </div>
    </div>
    )}
    </div>
    </div>
<br/><br/><br/>
</div>
     );
}

export default Testrandom;