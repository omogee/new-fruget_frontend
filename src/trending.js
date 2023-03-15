import React, { useState, useEffect,useContext } from 'react';
import { userContext } from './usercontext';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

export const Trending = function Trending(props) {
    const context = useContext(userContext)
    const [trends, setTrends] = useState([])
    const [topsearched, settopsearched] = useState([])
    const [awoof, setawoof] = useState([])
    const [loading,setloading] = context["loading"]
    const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
    const [displayscroll, setdisplayscroll] = useState(false)
    const [selectedimage, setselectedimage] = context["selectedimage"]

    useEffect(()=>{
   setInterval(() => {
    const trendingcarousel = document.querySelector(".trendingcarousel")
    const trendingitem = document.querySelector(".trendingitem")  
    trendingcarousel.scrollLeft += (trendingitem.clientWidth)*6;
   }, 20000);
    },[])
    useEffect(()=>{
        setloading(true)
         axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
         .then(res => {
           setTrends(res.data.trends)
           settopsearched(res.data.topsearched)
      //     settopsearched(res.data.topsearched)
       //    settopbrands(res.data.topbrands)
           setTimeout(()=> setloading(false), 500)
         })
         .catch(err => console.warn(err))
         
        },[])
        const moveleft=()=>{    
          const trendingcarousel = document.querySelector(".trendingcarousel")
          const trendingitem = document.querySelector(".trendingitem")  
              const bottom = trendingcarousel.scrollWidth - trendingcarousel.scrollLeft === trendingcarousel.clientWidth;
              if(bottom){
               setscrollclass("fa-chevron-circle-right")
              }else{
              trendingcarousel.scrollLeft += (trendingitem.clientWidth)*3;
              }
        }
        const moveright=()=>{      
          const trendingcarousel = document.querySelector(".trendingcarousel")
          const trendingitem = document.querySelector(".trendingitem")  
              trendingcarousel.scrollLeft -= (trendingitem.clientWidth)*3;           
         }
    return ( 
        <div className='container-fluid'>
     <div className='row' onMouseOver={()=> setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
     <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`}  style={{height:"100%",overflow:"hidden",position:"relative"}}>
     <small style={{fontWeight:"bold",color:`${props.color ? "white" :"grey"}`,textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>viewers' choice</small><br/>
          <div className='row trendingcarousel' style={{display:"flex",borderRadius:'10px',height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 0.2 linear",scrollBehavior:"smooth"}}>
          {trends.map((trend,i)=>      
            <div className='col-4 col-md-3 col-lg-2 trendingitem' style={{width:"100%",marginBottom:"20px",padding:`${displayscroll ? "5px 5px" : "5px 5px"}`,height:"100%",transition:"all 0.2s linear",scrollBehavior:"smooth"}} key={trend.productId}>
               <div style={{borderRadius:"10px"}}>
                <img onClick={()=>setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`)} style={{width:"100%",height:"150px",borderTopRightRadius:"10px", borderTopLeftRadius:"10px"}}
                 src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`}
                 data-src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`} />
             <div style={{lineHeight:"2.3vh",borderBottomRightRadius:"10px",borderBottomLeftRadius:"10px",marginBottom:"5px",backgroundColor:"white",padding:"5px"}}>
              <small className='linker' style={{fontSize:"11px",overflow:"hidden", textOverflow:"ellipsis",display:"block",whiteSpace:"nowrap",fontWeight:`${props.color ? "bold" :""}`,color: "black" }}>{trend.details }</small><br/>
              {trend.discount ?
              <div style={{color:`${props.color ? props.color : "black"}`}}>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{trend.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {trend.mainprice}</small>               
                </div> 
                : 
               <div style={{color:`${props.color ? props.color : "black"}`}}>
                 <small style={{fontWeight:"bold",fontSize:"13px"}}>{trend.mainprice}</small> 
               </div>
                }
                  <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${3.2*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({3.2}) </small>
               </div>
                <small>{trend.searchrating} times in 5 days</small>
              </div>    
              </div>      
            </div> 
            )}
          </div>
          </div>
          <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
          </div>
          </div>
        </div>
     );
}
export const Topstores = function Trending(props) {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [awoof, setawoof] = useState([])
  const [loading,setloading] = context["loading"]
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [stores, setstores] = context["allstores"]
  const [selectedimage, setselectedimage] = context["selectedimage"]

  useEffect(()=>{
 setInterval(() => {
  const trendingcarousel = document.querySelector(".trendingcarousel")
  const trendingitem = document.querySelector(".trendingitem")  
  trendingcarousel.scrollLeft += (trendingitem.clientWidth)*6;
 }, 20000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         settopsearched(res.data.topsearched)
    //     settopsearched(res.data.topsearched)
     //    settopbrands(res.data.topbrands)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const trendingcarousel = document.querySelector(".trendingcarousel")
        const trendingitem = document.querySelector(".trendingitem")  
            const bottom = trendingcarousel.scrollWidth - trendingcarousel.scrollLeft === trendingcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            trendingcarousel.scrollLeft += (trendingitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const trendingcarousel = document.querySelector(".trendingcarousel")
        const trendingitem = document.querySelector(".trendingitem")  
            trendingcarousel.scrollLeft -= (trendingitem.clientWidth)*3;           
       }
  return ( 
      <div className='container-fluid'>
   <div className='row' onMouseOver={()=> setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
<div className={`${displayscroll ? "col-12 col-md-12" :'col-12'}`}  style={{height:"100%",overflow:"hidden",position:"relative"}}>
   <small style={{fontWeight:"bold",color:`${props.color ? "white" :"grey"}`,textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>Top stores</small>
   <small style={{float:'right'}}>see more...</small><br/>
        <div className='row trendingcarousel' style={{display:"flex",borderRadius:'10px',height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 0.2 linear",scrollBehavior:"smooth"}}>
        {stores.map((store,i)=>      
          <div className='col-4 col-md-3 col-lg-2 trendingitem' style={{width:"100%",marginBottom:"20px",padding:"0.5px",height:"100%",transition:"all 0.2s linear",scrollBehavior:"smooth"}} key={store.storeId}>
             <div className='hoveredapp unhoveredapp' style={{backgroundColor:"rgba(242,242,242,0.8)",padding:"0.2px",position:"relative",height:"230px",borderRadius:"10px"}}>
             <div style={{padding:"10px"}}>
              <img onClick={()=> setselectedimage(require(`./female.png`))} style={{width:"100%",borderRadius:"50%",padding:"0px 10px",height:"100px"}}
             src={ require(`./female.png`)} />
             {/* `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${store.images ? Object.values(JSON.parse(store.images))[0] : null}` || */}
           </div>
           <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <center>
            <small className='linker' style={{fontSize:"11px", overflow:"hidden", textOverflow:"ellipsis", display:"block", whiteSpace:"nowrap",fontWeight:"bold",color: "black" }}>{store.store_name}</small>
            <small style={{fontSize:"10px"}}>{store.store_about && store.store_about.slice(0, 45) + "..."}</small><br/>
                 <small>
                 <div className="outer">     
                 <div className="inner" style={{width:`${4*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>(3.5) </small>
                 </small><br/>
                 <small style={{color:"grey",fontSize:'11px',fontWeight:"bold"}}>157 verified sales</small><br/>
              <small style={{fontSize:'11px'}}>300+ uploads</small>
              <button className="btn btn-primary addtocartbtn" style={{width:"90%",position:"absolute", left:"5%", bottom:"2px", padding:"0px",fontWeight:"bolder"}}><small>send message</small></button>
            
              </center></div>    
            </div>      
          </div> 
          )}
           {stores.map((store,i)=>      
          <div className='col-4 col-md-3 col-lg-2 trendingitem' style={{width:"100%",marginBottom:"20px",padding:"0.5px",height:"100%",transition:"all 0.2s linear",scrollBehavior:"smooth"}} key={store.storeId}>
             <div className='hoveredapp unhoveredapp' style={{backgroundColor:"rgba(242,242,242,0.8)",padding:"0.2px",position:"relative",height:"230px",borderRadius:"10px"}}>
             <div style={{padding:"10px"}}>
              <img onClick={()=> setselectedimage(require(`./female.png`))} style={{width:"100%",borderRadius:"50%",padding:"0px 10px",height:"100px"}}
             src={ require(`./female.png`)} />
             {/* `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${store.images ? Object.values(JSON.parse(store.images))[0] : null}` || */}
           </div>
           <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <center>
            <small className='linker' style={{fontSize:"11px", overflow:"hidden", textOverflow:"ellipsis", display:"block", whiteSpace:"nowrap",fontWeight:"bold",color: "black" }}>{store.store_name}</small>
                 <small>
                 <div className="outer">     
                 <div className="inner" style={{width:`${4*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>(3.5) </small>
                 </small><br/>
                 <small style={{color:"grey",fontSize:'11px',fontWeight:"bold"}}>157 verified sales</small><br/>
              <small style={{fontSize:'11px'}}>300+ uploads</small>
              <button className="btn btn-primary addtocartbtn" style={{width:"90%",position:"absolute", left:"5%", bottom:"2px", padding:"0px",fontWeight:"bolder"}}><small>send message</small></button>
            
              </center></div>    
            </div>      
          </div> 
          )}
        </div>
        </div>
     
        </div>
      </div>
   );
}
export const Topdispatch = function Trending(props) {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [awoof, setawoof] = useState([])
  const [loading,setloading] = context["loading"]
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [stores, setstores] = context["allstores"]

  useEffect(()=>{
 setInterval(() => {
  const trendingcarousel = document.querySelector(".trendingcarousel")
  const trendingitem = document.querySelector(".trendingitem")  
  trendingcarousel.scrollLeft += (trendingitem.clientWidth)*6;
 }, 20000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         settopsearched(res.data.topsearched)
    //     settopsearched(res.data.topsearched)
     //    settopbrands(res.data.topbrands)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const trendingcarousel = document.querySelector(".trendingcarousel")
        const trendingitem = document.querySelector(".trendingitem")  
            const bottom = trendingcarousel.scrollWidth - trendingcarousel.scrollLeft === trendingcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            trendingcarousel.scrollLeft += (trendingitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const trendingcarousel = document.querySelector(".trendingcarousel")
        const trendingitem = document.querySelector(".trendingitem")  
            trendingcarousel.scrollLeft -= (trendingitem.clientWidth)*3;           
       }
  return ( 
      <div className='container-fluid'>
   <div className='row' onMouseOver={()=> setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
   <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`}  style={{height:"100%",overflow:"hidden",position:"relative"}}>
   <small style={{fontWeight:"bold",color:`${props.color ? "white" :"grey"}`,textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>Top dispatch</small>
   <small style={{float:'right'}}>see more...</small><br/>
        <div className='row trendingcarousel' style={{display:"flex",borderRadius:'10px',height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 0.2 linear",scrollBehavior:"smooth"}}>
        {stores.map((store,i)=>      
          <div className='col-4 col-md-3 col-lg-2 trendingitem' style={{width:"100%",marginBottom:"20px",padding:`${displayscroll ? "5px 10px" : "5px 20px"}`,height:"100%",transition:"all 0.2s linear",scrollBehavior:"smooth"}} key={store.storeId}>
             <div style={{boxShadow:"1px 2px 3px 2px lightgrey",backgroundColor:"black", position:"relative",height:"230px",borderRadius:"10px"}}>
             <div style={{padding:"10px"}}>
              <img className='' style={{width:"100%",borderRadius:"50%",border:'2px solid lightgrey',height:"100px"}}
             src={ require(`./female.png`)} />
             {/* `https://res.cloudinary.com/fruget-com/image/upload/v1659648594/chatapp/profilepicture/${store.images ? Object.values(JSON.parse(store.images))[0] : null}` || */}
           </div>
           <div style={{lineHeight:"2.3vh",color:"white",marginBottom:"5px",padding:"5px"}}>
            <center>
            <small className='linker' style={{fontSize:"11px",fontWeight:"bold" }}>{store.store_name.length > 16 ? store.store_name.slice(0, 16)+"..." : store.store_name}</small>
                 <small>
                 <div className="outer">     
                 <div className="inner" style={{width:`${4*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>(3.5) </small>
                 </small><br/>
                 <small style={{color:"lightgrey",fontSize:'11px',fontWeight:"bold"}}>157 verified sales</small><br/>
              <small style={{fontSize:'11px'}}>300+ uploads</small>
              <button className="btn" style={{width:"90%",color:'white',backgroundColor:"orange",position:"absolute", left:"5%", bottom:"2px", padding:"0px",fontWeight:"bolder"}}><small style={{fontWeight:'bold'}}>send message</small></button>
            
              </center></div>    
            </div>      
          </div> 
          )}
        </div>
        </div>
        <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const Topsearched = function Topsearched() {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [loading,setloading] = context["loading"]
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [selectedimage, setselectedimage] = context["selectedimage"]

  useEffect(()=>{
 setInterval(() => {
  const searchcarousel = document.querySelector(".searchcarousel")
  const searchitem = document.querySelector(".searchitem")  
  searchcarousel.scrollLeft += (searchitem.clientWidth)*4;
 }, 15000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         settopsearched(res.data.topsearched)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const searchcarousel = document.querySelector(".searchcarousel")
        const searchitem = document.querySelector(".searchitem")  
            const bottom = searchcarousel.scrollWidth - searchcarousel.scrollLeft === searchcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            searchcarousel.scrollLeft += (searchitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const searchcarousel = document.querySelector(".searchcarousel")
        const searchitem = document.querySelector(".searchitem")  
            searchcarousel.scrollLeft -= (searchitem.clientWidth)*3;
          
       }
  return ( 
      <div className='container-fluid'>
        <div className='row' onMouseLeave={()=>setdisplayscroll(false)} onMouseOver={()=> setdisplayscroll(true)}>
<div className={`${displayscroll ? "col-12 col-md-12" :'col-12'}`}  style={{height:"100%",padding:"0px 0px 20px 0px",overflow:"hidden",position:"relative"}}>
<div style={{ position:"absolute",zIndex:"67484", top:"20%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",zIndex:"536363",transition:"all 0.2s linear",scrollBehavior:"smooth"}}></span>
</div>
<div style={{position:"absolute",zIndex:"67484",right:"5%", top:"20%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
     <small style={{fontWeight:"bold",color:"grey",textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>trending...</small><br/>
          <div className='row searchcarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-20px",flexWrap:"nowrap",transition:"all 0.2s linear",scrollBehavior:"smooth"}}>
        {topsearched.map((topsearches,i)=>      
          <div className='col-4 col-md-3 col-lg-2 searchitem' style={{width:"100%",height:"100%",transition:"all 0.2s linear",scrollBehavior:"smooth"}} key={topsearches.productId}>
            <div style={{borderRadius:"10px"}}>
              <img onClick={()=>setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`)} style={{width:"100%",height:"120px",borderRadius:"10px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`} />
           <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <small style={{fontSize:"11px"}}>{topsearches.details && topsearches.details.length > 30 ? topsearches.details.slice(0,30)+ "..." : topsearches.details +"-"+ topsearches.model +"-"+ topsearches.color}</small><br/>
            {topsearches.discount ?
            <div>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{topsearches.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {topsearches.mainprice}</small>               
              </div> 
              : 
             <div>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{topsearches.mainprice}</small> 
             </div>
              }
            </div>   
            </div>       
          </div> 
          )}
        </div>
        </div>
      
        </div>
      </div>
   );
}
export const Topdiscounted = function Topdiscounted() {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [loading,setloading] = context["loading"]
  const [awoof, setawoof] = useState([])
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [z, setz] = useState(0)
  const [selectedimage, setselectedimage] = context["selectedimage"]

  useEffect(()=>{
 setInterval(() => {
  const awoofcarousel = document.querySelector(".awoofcarousel")
  const awoofitem = document.querySelector(".awoofitem")  
  awoofcarousel.scrollLeft += (awoofitem.clientWidth)*4;
 }, 25000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         setawoof(res.data.topdiscounted)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const awoofcarousel = document.querySelector(".awoofcarousel")
        const awoofitem = document.querySelector(".awoofitem")  
            const bottom = awoofcarousel.scrollWidth - awoofcarousel.scrollLeft === awoofcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            awoofcarousel.scrollLeft += (awoofitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const awoofcarousel = document.querySelector(".awoofcarousel")
        const awoofitem = document.querySelector(".awoofitem")  
            awoofcarousel.scrollLeft -= (awoofitem.clientWidth)*3;    
       }
  
  return ( 
      <div className='container-fluid'>
        <div className='row' onMouseLeave={()=> setdisplayscroll(false)} onMouseOver={()=> setdisplayscroll(true)}>
<div style={{position:"absolute"}}>
<div style={{position:'sticky',display:`${displayscroll ? "block" : "none"}`,zIndex:"99999900",marginTop:"150%", left:"10%"}}>
<span className={`fa ${scrollclass} fa-3x `} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",backgroundColor:"rgba(245,245,245,0.9)",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className='col-12' style={{height:"100%",borderRadius:"20px",padding:"0px 0px 0px 0px",backgroundColor:"brown",overflow:"hidden",position:"relative"}}>
   <center>  <small style={{fontWeight:"bold",color:"white",textTransform:"uppercase",padding:"0px",fontSize:"15px"}}>awoof 4 u</small>
   <small style={{float:"right", color:'white'}}>see more...</small></center>
          <div className='row awoofcarousel' style={{display:"flex",padding:"0px 0px 20px 0px",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 1.5s linear",scrollBehavior:"smooth"}}>
        {awoof.map((awoofs,i)=>      
          <div className='col-4 col-md-3 col-lg-2 awoofitem' style={{padding:"2px"}} key={awoofs.productId}>
                      <div className='hoveredapp unhoveredapp' style={{width:"100%",height:"230px",padding:"0px",backgroundColor:"white",borderRadius:"10px"}}>
                      {awoofs.discount ?
                   <b className="badge" style={{position:"absolute",borderRadius:"60%",padding:"5px",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",borderTopRightRadius:"0px",padding:"5px",top:"0px",fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"indianred",position:"absolute",left:"5px"}}>-{awoofs.discount}%</b>
                : null}
              <img onClick={()=> setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${awoofs.generalcategory}/${awoofs.category}/${awoofs.mainimg}`)} style={{width:"100%",borderRadius:"10px",height:"150px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${awoofs.generalcategory}/${awoofs.category}/${awoofs.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${awoofs.generalcategory}/${awoofs.category}/${awoofs.mainimg}`} />
           <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <small style={{fontSize:"11px",textOverflow:"ellipsis", whiteSpace:"nowrap",display:"block", overflow:"hidden"}}>{awoofs.details}</small><br/>
            {awoofs.discount ?
            <div>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{awoofs.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {awoofs.mainprice}</small>               
              </div> 
              : 
             <div>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{awoofs.mainprice}</small> 
             </div>
              }
               <div style={{margin:"0",padding:"0px"}}>
                  <div className="outer">     
                 <div className="inner" style={{width:`${2.5*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({1.5}) </small>
               </div>
            </div>  
             </div>     
          </div> 
          )}
        </div>
        </div>
        <div style={{position:"absolute",right:"10%"}}>
        <div style={{position:'sticky',display:`${displayscroll ? "block" : "none"}`,zIndex:"99999900",marginTop:"150%", right:"4%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const Toprated = function Toprated() {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [loading,setloading] = context["loading"]
  const [awoof, setawoof] = useState([])
  const [toprated, settoprated] = useState([])
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [z, setz] = useState(0)
  const [displayscroll, setdisplayscroll] = useState(false)
  const [selectedimage, setselectedimage] = context["selectedimage"]


  useEffect(()=>{
 setInterval(() => {
  const ratedcarousel = document.querySelector(".ratedcarousel")
  const rateditem = document.querySelector(".rateditem")  
  ratedcarousel.scrollLeft += (rateditem.clientWidth)*4;
 }, 30000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         settoprated(res.data.toprated)
    //     settopsearched(res.data.topsearched)
     //    settopbrands(res.data.topbrands)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const ratedcarousel = document.querySelector(".ratedcarousel")
        const rateditem = document.querySelector(".rateditem")  
            const bottom = ratedcarousel.scrollWidth - ratedcarousel.scrollLeft === ratedcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            ratedcarousel.scrollLeft += (rateditem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const ratedcarousel = document.querySelector(".ratedcarousel")
        const rateditem = document.querySelector(".rateditem")  
            ratedcarousel.scrollLeft -= (rateditem.clientWidth)*3;        
       }
  return ( 
      <div className='container-fluid'>
        <div className='row'  onMouseLeave={()=> setdisplayscroll(false)} onMouseOver={()=> setdisplayscroll(true)} >
<div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`} style={{height:"100%",padding:"5px",borderRadius:"20px",backgroundColor:"rgba(245,245,245,0.7)",overflow:"hidden",position:"relative"}}>
     <small style={{fontWeight:"bold",color:"grey",textTransform:"uppercase",padding:"0px 5px",fontSize:"15px"}}>top rated</small><br/>
          <div className='row ratedcarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 4s linear",scrollBehavior:"smooth"}}>
        {toprated.map((topsearches,i)=>      
          <div className='col-4 col-md-3 col-lg-2 rateditem' style={{width:"100%",padding:"5px 10px",height:"100%",transition:"all 4s linear",scrollBehavior:"smooth"}} key={topsearches.productId}>
                <div style={{zIndex:"7838389",borderRadius:"10px"}}>
              
              <img onClick={()=>setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`)} style={{width:"100%",padding:"3px",border:"1px solid lightgrey",borderRadius:"10px",height:"150px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${topsearches.generalcategory}/${topsearches.category}/${topsearches.mainimg}`} />
           <div style={{lineHeight:"2.3vh",marginBottom:"5px", color:"black",padding:"5px"}}>
            <small style={{fontSize:"11px"}}>{topsearches.details && topsearches.details.length > 20 ? topsearches.details.slice(0,20)+ "..." : topsearches.details +"-"+ topsearches.model +"-"+ topsearches.color}</small>
      
            {topsearches.discount ?
            <div>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{topsearches.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {topsearches.mainprice}</small>               
              </div> 
              : 
             <div>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{topsearches.mainprice}</small> 
             </div>
              }
             
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${topsearches.rating*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({topsearches.numofrating}) </small>
               </div>
            
            </div>          
                </div>
          </div> 
          )}
        </div>
        </div>
        <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
        <div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const Topbrands = function Topbrands() {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [loading,setloading] = context["loading"]
  const [awoof, setawoof] = useState([])
  const [topbrands, settopbrands] = useState([])
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")

  useEffect(()=>{
 setInterval(() => {
  const carousel = document.querySelector(".carousel")
  const item = document.querySelector(".item")  
  carousel.scrollLeft += (item.clientWidth)*4;
 }, 20000);
  },[])
  useEffect(()=>{
      setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
       .then(res => {
         setTrends(res.data.trends)
         settopbrands(res.data.topbrands)
    //     settopsearched(res.data.topsearched)
     //    settopbrands(res.data.topbrands)
         setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))
       
      },[])
      const moveleft=()=>{    
        const carousel = document.querySelector(".carousel")
        const item = document.querySelector(".item")  
            const bottom = carousel.scrollWidth - carousel.scrollLeft === carousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            carousel.scrollLeft += (item.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const carousel = document.querySelector(".carousel")
        const item = document.querySelector(".item")  
            carousel.scrollLeft -= (item.clientWidth)*3;
          
       }
  return ( 
      <div className='container-fluid'>
        <div className='row'>
<div className='d-none'>
<div style={{position:'sticky',zIndex:"99999900",top:"10%", left:"3%"}}>
<span className={`fa ${scrollclass} fa-3x `} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className='col-12' style={{height:"100%",overflow:"hidden",position:"relative"}}>
     <small style={{fontWeight:"bold",color:"brown",textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>Popular brands</small><br/>
          <div className='row carousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 4s linear",scrollBehavior:"smooth"}}>
        {topbrands.map((topbrand,i)=>      
          <div className='col-2 searchitem' style={{width:"100%",padding:"10px",height:"100%",transition:"all 4s linear",scrollBehavior:"smooth"}} key={topbrand.brand}>
                    {topbrand.mainrating ?
                   <b className="badge" style={{position:"absolute",borderRadius:"60%",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",borderTopRightRadius:"0px",padding:"5px",top:"0px",fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"green",position:"absolute",left:"0px"}}>{topbrand.mainrating}%</b>
                : null}
              <img className='' style={{width:"100%",height:"70px"}}
              src={`https://1000logos.net/wp-content/uploads/2020/04/Logo-Binatone.jpg`}/>
           <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
           <small style={{textTransform:"uppercase",color:"brown",fontWeight:"lighter"}}>{topbrand.brand}</small><br/>
           <small style={{textTransform:"capitalize",color:"grey",fontWeight:"lighter"}}><b>{topbrand.searchrating}</b> searched</small>
            </div>          
          </div> 
          )}
        </div>
        </div>
        <div className='d-none'>
        <div style={{position:'sticky',zIndex:"99999900",top:"10%", right:"4%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const Recently_visited= function Recently_visited(){
const context = useContext(userContext)
const [visitedproducts, setvisitedproducts] = context["visitedproducts"]
const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
const [displayscroll, setdisplayscroll] = useState(false)
const [displayrecently, setdisplayrecently] = context["displayrecently"]
/*
useEffect(()=>{
  const visitedcarousel = document.querySelector(".visitedcarousel")
  visitedcarousel.addEventListener("scroll", ()=>{
setdisplayscroll(true)
  })
})
*/
useEffect(()=>{
setInterval(() => {
  const visitedcarousel = document.querySelector(".visitedcarousel")
  const visiteditem = document.querySelector(".visiteditem")  
  visitedcarousel.scrollLeft += (visiteditem.clientWidth)*4;
 }, 20000);
  },[])
const moveleft=()=>{    
  const visitedcarousel = document.querySelector(".visitedcarousel")
  const visiteditem = document.querySelector(".visiteditem")  
      const bottom = visitedcarousel.scrollWidth - visitedcarousel.scrollLeft === visitedcarousel.clientWidth;
      if(bottom){
       setscrollclass("fa-chevron-circle-right")
      }else{
      visitedcarousel.scrollLeft += (visiteditem.clientWidth)*3;
      }
}
const moveright=()=>{      
  const visitedcarousel = document.querySelector(".visitedcarousel")
  const visiteditem = document.querySelector(".visiteditem")  
      visitedcarousel.scrollLeft -= (visiteditem.clientWidth)*3;
    
 }
 /*
 const removescroll=()=>{
  setTimeout(()=>{
    setdisplayscroll(false)
   },20000)
  }
   */
 
  return(
    <div className='container-fluid' style={{display:`${displayrecently ? "block" : "none"}`}}>
    <div className='row' style={{position:"relative"}} onMouseOver={()=>setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
<div style={{position:"absolute",left:"3%",top:"40%",display:`${displayscroll ? "block" : "none"}`}}>
<div style={{position:'sticky',zIndex:"99999900",top:"40%", left:"3%"}}>
<span className={`fa ${scrollclass} fa-3x `} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className='col-12' style={{height:"100%",overflow:"hidden",position:"relative"}}>
 <small style={{fontWeight:"bold",color:"gray",padding:"5px",fontSize:"14px"}}>viewed recently</small>
 <small onClick={()=> setdisplayrecently(false)} style={{fontWeight:"lighter",color:"gray",padding:"0px",position:"absolute",right:"5%"}}><span className='fa fa-times fa-2x' style={{fontWeight:"lighter"}}></span></small><br/>
      <div className='row visitedcarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 4s linear",scrollBehavior:"smooth"}}>
    {visitedproducts.map((visitprod,i)=>      
      <div className={`${visitedproducts.length > 15 ? 'col-4 col-md-2 col-lg-1 visiteditem' : 'col-4 col-md-3 col-lg-2 visiteditem'}`} style={{width:"100%",padding:`${visitedproducts.length > 15 ? '0px 3px' : '0px 25px'}`,height:"100%",transition:"all 4s linear",scrollBehavior:"smooth"}} key={visitprod.productId}>
                    {visitprod.mainrating ?
               <b className="badge" style={{position:"absolute",borderRadius:"60%",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",borderTopRightRadius:"0px",padding:"5px",top:"0px",fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"green",position:"absolute",left:"0px"}}>{visitprod.mainrating}%</b>
            : null}
          <img className='' style={{width:"100%",height:"50px"}}
           src={`https://res.cloudinary.com/fruget-com/image/upload/${visitprod.generalcategory}/${visitprod.category}/${visitprod.mainimg}`}
           data-src={`https://res.cloudinary.com/fruget-com/image/upload/${visitprod.generalcategory}/${visitprod.category}/${visitprod.mainimg}`} />
       <div style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
        <small style={{fontSize:"10px", whiteSpace:"nowrap", textOverflow:"ellipsis",overflow:"hidden",display:"block"}}>{visitprod.details}</small><br/>
        {visitprod.discount ?
        <div style={{padding:"0",margin:"0"}}>
         <small style={{fontWeight:"bold",fontSize:"13px"}}>{visitprod.mainprice}</small> 
          <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {visitprod.mainprice}</small>               
          </div> 
          : 
         <div>
           <small style={{fontWeight:"bold",fontSize:"13px"}}>{visitprod.mainprice}</small> 
         </div>
          }
        </div>          
      </div> 
      )}
    </div>
    </div>
    <div style={{position:"absolute", right:"3%",top:"40%",display:`${displayscroll ? "block" : "none"}`}}>
    <div style={{position:'sticky',zIndex:"99999900",top:"10%", right:"4%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
    </div>
    </div>
  </div>
  )
}
export const SimiliarBrands = function SimiliarBrands(props) {
  const context = useContext(userContext)
  const [trends, setTrends] = useState([])
  const [topsearched, settopsearched] = useState([])
  const [loading,setloading] = context["loading"]
  const [awoof, setawoof] = useState([])
  const [topsimiliarbrands, settopsimiliarbrands] = useState([])
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [z, setz] = useState(0)
  const [displayscroll, setdisplayscroll] = useState(false)
  const [selectedimage, setselectedimage]= context["selectedimage"]
  const [productDetails, setProductDetails] = context["productDetails"]
  const [allproductDetails, setAllProductDetails] = context["allproductDetails"]
  const [productdetailshistory, setproductdetailshistory] =context["productdetailshistory"]
const [productcomments, setproductcomments]= context["productcomments"]
 

  const navigate=useNavigate()

  useEffect(()=>{
 setInterval(() => {
  const similiarbrandscarousel = document.querySelector(".similiarbrandscarousel")
  const similiarbrandsitem = document.querySelector(".similiarbrandsitem")  
  similiarbrandscarousel.scrollLeft += (similiarbrandsitem.clientWidth)*4;
 }, 30000);
  },[])
  useEffect(()=>{
     // setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_similiar?brand=${props.brand}&category=${props.category}&subcat1=${props.subcat1}&subcat2=${props.subcat2}`)
       .then(res => {
         setTrends(res.data.trends)
         settopsimiliarbrands(res.data.topsimiliarbrands)
      //   setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))       
      },[props])
      const moveleft=()=>{    
        const similiarbrandscarousel = document.querySelector(".similiarbrandscarousel")
        const similiarbrandsitem = document.querySelector(".similiarbrandsitem")  
            const bottom = similiarbrandscarousel.scrollWidth - similiarbrandscarousel.scrollLeft === similiarbrandscarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            similiarbrandscarousel.scrollLeft += (similiarbrandsitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const similiarbrandscarousel = document.querySelector(".similiarbrandscarousel")
        const similiarbrandsitem = document.querySelector(".similiarbrandsitem")  
            similiarbrandscarousel.scrollLeft -= (similiarbrandsitem.clientWidth)*3;        
       }
       const opendetails=(properties)=>{
        if(Cookies.get("tktplc")){
     setloading(true)
     axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
     .then(res =>{ 
       setProductDetails(res.data.details[0])
       setAllProductDetails(res.data.details)
       setproductcomments(res.data.comments)
       setproductdetailshistory(res.data.producthistory) 
        navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
       setTimeout(()=>{
           setloading(false)
       },1500)
    })
     .catch(err => console.log(err))
     // history=`/shop/details/${details}`
    }else{
        alert("not loggedin")
    }
     
    }
  return ( 
      <div className='container-fluid'>
        <div className='row'  onMouseLeave={()=> setdisplayscroll(false)} onMouseOver={()=> setdisplayscroll(true)}>
<div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`} style={{height:"100%",overflow:"hidden",position:"relative"}}>
     <small style={{fontWeight:"bold",color:"green",textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>similiarbrands</small><br/>
          <div className='row similiarbrandscarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",transition:"all 1.5 linear",scrollBehavior:"smooth"}}>
        {topsimiliarbrands.map((similiarbrand,i)=>      
          <div className='col-4 col-md-3 col-lg-2 similiarbrandsitem' style={{width:"100%",padding:`${displayscroll ? "0px 3px 20px 3px" : "0px 3px 20px 3px"}`,height:"100%",transition:"all 1.5 linear",scrollBehavior:"smooth"}} key={similiarbrand.productId}>
                 <div style={{border:'0.01px solid lightgrey',borderRadius:'10px',padding:"0px"}} className="noheighthoveredapp">
                        {similiarbrand.mainrating ?
                   <b className="badge" style={{position:"absolute",borderRadius:"60%",borderTopLeftRadius:"0px",borderBottomLeftRadius:"0px",borderTopRightRadius:"0px",padding:"5px",top:"10px",fontSize:"12px",fontWeight:"bolder",color:"white",backgroundColor:"green",position:"absolute",left:"10px"}}>{similiarbrand.mainrating}%</b>
                : null}
              <img onClick={()=>setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${similiarbrand.generalcategory}/${similiarbrand.category}/${similiarbrand.mainimg}`)} style={{width:"100%",height:"100px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarbrand.generalcategory}/${similiarbrand.category}/${similiarbrand.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarbrand.generalcategory}/${similiarbrand.category}/${similiarbrand.mainimg}`} />
           <div onClick={()=>opendetails({details:similiarbrand.details, productId:similiarbrand.productId})} style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <small style={{fontSize:"11px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",display:"block"}}>{similiarbrand.details }</small>
            <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${similiarbrand.rating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({similiarbrand.product_averagerating || 0}) </small>
               </div>
            {similiarbrand.discount ?
            <div>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{similiarbrand.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {similiarbrand.mainprice}</small>               
              </div> 
              : 
             <div>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{similiarbrand.mainprice}</small> 
             </div>
              }
            </div>  
            </div>        
          </div> 
          )}
        </div>
        </div>
        <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
        <div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const SimiliarCategory = function SimiliarCategory(props) {
  const context = useContext(userContext)
  const [similiarcat, setsimiliarcat] = useState([])
  const [loading,setloading] = context["loading"]
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [selectedimage, setselectedimage] = context["selectedimage"]
  const [productDetails, setProductDetails] = context["productDetails"]
  const [allproductDetails, setAllProductDetails] = context["allproductDetails"]
  const [productdetailshistory, setproductdetailshistory] =context["productdetailshistory"]
const [productcomments, setproductcomments]= context["productcomments"]


  const navigate=useNavigate()

  useEffect(()=>{
 setInterval(() => {
  const similiarcatcarousel = document.querySelector(".similiarcatcarousel")
  const similiarcatitem = document.querySelector(".similiarcatitem")  
  similiarcatcarousel.scrollLeft += (similiarcatitem.clientWidth)*6;
 }, 20000);
  },[])
  useEffect(()=>{
     // setloading(true)
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_similiar?brand=${props.brand}&category=${props.category}&subcat1=${props.subcat1}&subcat2=${props.subcat2}`)
       .then(res => {
         setsimiliarcat(res.data.similiarcat)
      //   setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))     
      },[props])
      const moveleft=()=>{    
        const similiarcatcarousel = document.querySelector(".similiarcatcarousel")
        const similiarcatitem = document.querySelector(".similiarcatitem")  
            const bottom = similiarcatcarousel.scrollWidth - similiarcatcarousel.scrollLeft === similiarcatcarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            similiarcatcarousel.scrollLeft += (similiarcatitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const similiarcatcarousel = document.querySelector(".similiarcatcarousel")
        const similiarcatitem = document.querySelector(".similiarcatitem")  
            similiarcatcarousel.scrollLeft -= (similiarcatitem.clientWidth)*3;           
       }
       const opendetails=(properties)=>{
        if(Cookies.get("tktplc")){
     setloading(true)
     axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
     .then(res =>{   
       setProductDetails(res.data.details[0])
       setAllProductDetails(res.data.details) 
       setproductcomments(res.data.comments)
       setproductdetailshistory(res.data.producthistory)
        navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
       setTimeout(()=>{
           setloading(false)
       },1500)
    })
     .catch(err => console.log(err))
     // history=`/shop/details/${details}`
    }else{
        alert("not loggedin")
    }
     
    }
  return ( 
      <div className='container-fluid'>
   <div className='row' onMouseOver={()=> setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
   <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`}  style={{height:"100%",overflow:"hidden",position:"relative"}}>
   <small style={{fontWeight:"bold",color:"orange",textTransform:"uppercase",padding:"5px",fontSize:"15px"}}>viewers also opened:</small><br/>
        <div className='row similiarcatcarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",scrollBehavior:"smooth"}}>
        {similiarcat.map((similiarcategory,i)=>      
          <div className='col-2 similiarcatitem ' style={{width:"100%",padding:`${displayscroll ? "20px 3px" : "10px"}`,height:"100%",scrollBehavior:"smooth"}} key={similiarcategory.productId}>
           <div style={{borderRadius:'10px',padding:"0px"}} className="noheighthoveredapp">
              <img onClick={()=> setselectedimage(`https://res.cloudinary.com/fruget-com/image/upload/${similiarcategory.generalcategory}/${similiarcategory.category}/${similiarcategory.mainimg}`)} style={{width:"100%",borderRadius:"10px",height:"120px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarcategory.generalcategory}/${similiarcategory.category}/${similiarcategory.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${similiarcategory.generalcategory}/${similiarcategory.category}/${similiarcategory.mainimg}`} />
           <div onClick={()=>opendetails({details:similiarcategory.details,productId:similiarcategory.productId})} style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <Link to={`/shop/details/${similiarcategory.details}?pid=${similiarcategory.productId}`} style={{textDecoration:"none"}}>
           <small className='linker' style={{fontSize:"11px",overflow:"hidden", textOverflow:"ellipsis", display:'block', whiteSpace:"nowrap",color:`${props.color ? props.color : "black"}`}}>{similiarcategory.details}</small>
           </Link>
            <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${similiarcategory.rating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({similiarcategory.product_averagerating || 0}) </small>
               </div>
            {similiarcategory.discount ?
            <div style={{color:`${props.color ? props.color : "black"}`}}>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{similiarcategory.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {similiarcategory.mainprice}</small>               
              </div> 
              : 
             <div style={{color:`${props.color ? props.color : "black"}`}}>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{similiarcategory.mainprice}</small> 
             </div>
              }
            </div>   
            </div>       
          </div> 
          )}
        </div>
        </div>
        <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
export const SellerProducts = function SellerProducts(props) {
  const context = useContext(userContext)
  const [samesellerproducts, setsamesellerproducts] = useState([])
  const [loading,setloading] = context["loading"]
  const [scrollclass, setscrollclass] = useState("fa-chevron-circle-left")
  const [displayscroll, setdisplayscroll] = useState(false)
  const [productDetails, setProductDetails] = context["productDetails"]
  const [allproductDetails, setAllProductDetails] = context["allproductDetails"]
  const [productdetailshistory, setproductdetailshistory] =context["productdetailshistory"]
const [productcomments, setproductcomments]= context["productcomments"]
  

  const navigate=useNavigate()

  useEffect(()=>{
 setInterval(() => {
  const samesellerproductscarousel = document.querySelector(".samesellerproductscarousel")
  const samesellerproductsitem = document.querySelector(".samesellerproductsitem")  
  samesellerproductscarousel.scrollLeft += (samesellerproductsitem.clientWidth)*6;
 }, 25000);
  },[])
  useEffect(()=>{
       axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_samesellerproducts?store=${escape(props.store)}`)
       .then(res => {
         setsamesellerproducts(res.data.samesellerproducts)
     //    setTimeout(()=> setloading(false), 500)
       })
       .catch(err => console.warn(err))     
      },[props.store])

      const moveleft=()=>{    
        const samesellerproductscarousel = document.querySelector(".samesellerproductscarousel")
        const samesellerproductsitem = document.querySelector(".samesellerproductsitem")  
            const bottom = samesellerproductscarousel.scrollWidth - samesellerproductscarousel.scrollLeft === samesellerproductscarousel.clientWidth;
            if(bottom){
             setscrollclass("fa-chevron-circle-right")
            }else{
            samesellerproductscarousel.scrollLeft += (samesellerproductsitem.clientWidth)*3;
            }
      }
      const moveright=()=>{      
        const samesellerproductscarousel = document.querySelector(".samesellerproductscarousel")
        const samesellerproductsitem = document.querySelector(".samesellerproductsitem")  
            samesellerproductscarousel.scrollLeft -= (samesellerproductsitem.clientWidth)*3;           
       }
       const opendetails=(properties)=>{
        if(Cookies.get("tktplc")){
     setloading(true)
     axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_details?tkt=${Cookies.get("tktplc")}&details=${properties.details}&productId=${properties.productId}`)
     .then(res =>{ 
     //  setdisplaydetail(true)
       setProductDetails(res.data.details[0])
       setAllProductDetails(res.data.details) 
       setproductcomments(res.data.comments)
       setproductdetailshistory(res.data.producthistory)
       navigate(`/shop/details/${properties.details}?pid=${properties.productId}`)
       setTimeout(()=>{
           setloading(false)
       },1500)
    })
     .catch(err => console.log(err))
     // history=`/shop/details/${details}`
    }else{
        alert("not loggedin")
    }
     
    }
  return ( 
      <div className='container-fluid'>
   <div className='row' onMouseOver={()=> setdisplayscroll(true)} onMouseLeave={()=>setdisplayscroll(false)}>
   <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span className={`fa ${scrollclass} fa-3x`} onClick={scrollclass === "fa-chevron-circle-left" ? moveleft : moveright} style={{color:"lightgrey",transition:"all 2s linear",scrollBehavior:"smooth"}}></span>
</div>
</div>
<div className={`${displayscroll ? "col-12 col-md-10" :'col-12'}`}  style={{height:"100%",overflow:"hidden",position:"relative"}}>
   <small style={{fontWeight:"bold",color:"grey",textTransform:"uppercase",padding:"5px",fontSize:"13px"}}><span style={{textTransform:"lowercase"}}>order from</span> {props.store} <span style={{textTransform:"lowercase"}}> and get more discounts</span></small>
   <small style={{fontStyle:"italic",float:'right'}}>see more ..</small><br/>
        <div className='row samesellerproductscarousel' style={{display:"flex",height:"100%",overflow:"scroll",marginBottom:"-13px",flexWrap:"nowrap",scrollBehavior:"smooth"}}>
        {samesellerproducts.map((sameseller,i)=>      
          <div className='col-4 col-md-3 col-lg-2 samesellerproductsitem' style={{width:"100%",padding:`${displayscroll ? "20px 3px" : "10px 5px"}`,height:"100%",scrollBehavior:"smooth"}} key={sameseller.productId}>
               <div style={{borderRadius:'10px',padding:"0px"}} className="noheighthoveredapp">
              <img className='' style={{width:"100%",borderRadius:"10px",height:"120px"}}
               src={`https://res.cloudinary.com/fruget-com/image/upload/${sameseller.generalcategory}/${sameseller.category}/${sameseller.mainimg}`}
               data-src={`https://res.cloudinary.com/fruget-com/image/upload/${sameseller.generalcategory}/${sameseller.category}/${sameseller.mainimg}`} />
           <div onClick={()=>opendetails({details:sameseller.details,productId:sameseller.productId})} style={{lineHeight:"2.3vh",marginBottom:"5px",padding:"5px"}}>
            <small className='linker' style={{fontSize:"11px",color:`${props.color ? props.color : "black"}`,textOverflow:"ellipsis",display:"block",overflow:"hidden",whiteSpace:"nowrap"}}>{sameseller.details}</small>
            <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${sameseller.rating*20 || 0}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({sameseller.product_averagerating || 0}) </small>
               </div>
            {sameseller.discount ?
            <div style={{color:`${props.color ? props.color : "black"}`}}>
             <small style={{fontWeight:"bold",fontSize:"13px"}}>{sameseller.mainprice}</small> 
              <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {sameseller.mainprice}</small>               
              </div> 
              : 
             <div style={{color:`${props.color ? props.color : "black"}`}}>
               <small style={{fontWeight:"bold",fontSize:"13px"}}>{sameseller.mainprice}</small> 
             </div>
              }
            </div>    
            </div>      
          </div> 
          )}
        </div>
        </div>
        <div className={`${displayscroll ? 'd-none d-md-block col-1' : "d-none"}`}>
<div style={{marginTop:"100%"}}>
<span  className='fa fa-chevron-circle-right fa-3x' onClick={moveright} style={{color:"lightgrey", transition:"all 2s linear"}}></span>
</div>
        </div>
        </div>
      </div>
   );
}
//padding:`${i != z ? "50px" : null}`
// i != z || i+1 !== z || i-1 !== z ? 
export default Trending;