import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import "./main.css"
import {Topbrands, Topdiscounted, Toprated,Recently_visited, Topsearched, Trending, Topstores, Topdispatch} from './trending';
import { userContext } from './usercontext';

function Home() {
  const context = useContext(userContext)
  const [currentPage, setcurrentPage] = context["currentpage"]
  const [mobiledevice, setmobiledevice] = context["mobiledevice"]
 const [trends, setTrends] = useState([])
 const [topbrands, settopbrands] = context["topbrands"]
 const [topsearched, settopsearched] = useState([])
 const [loading, setloading] = useState(false)
 const [Oneimageindex, setOneimageindex] = useState(0)
 const [Oneimages, setOneimages] = useState([
  {image:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLx_DuGt8m_Zuvk5mnDaF4EI-AkASs4i6PYJUQaI5XSrNQvKb76BWBHjnFKV3fXo0Tq14&usqp=CAU`},
 { image:`https://media.istockphoto.com/id/1174598609/photo/set-of-contemporary-house-appliances-isolated-on-white.jpg?s=612x612&w=0&k=20&c=bBMILbCpLkhIxbL7sAAXaFOaFaSXFCt80ccHgl7iiWM=`},
 {image:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3VvQsUje0razLbPhALpdPHK1hrRsBLKUuaQydEUnO9ZX7FLhZ4-L5UsvEFJXgXQTTzvc&usqp=CAU`},
 {image:`https://media.istockphoto.com/id/489937474/photo/home-appliances.jpg?s=612x612&w=0&k=20&c=x9MfsuwtJlNhq8uLWOpisy16b9JHfeqqxmeyP4nXoHw=`}
])
// useEffect(()=>{
//   setcurrentPage("home")
//   const diver = document.querySelector(".oneimage")
//  setInterval(()=>{
//   diver.style.opacity = 0
//  setTimeout(()=>{
//   setOneimageindex(prev => prev === 3 ? 0 : prev + 1)
//  },2000)
//  setTimeout(()=>{
//  diver.style.opacity = 1
//  },2000)
//  },5000)
// },[])
 useEffect(()=>{
 setloading(true)
  axios.get(`https://new-frugetbackend-productions.up.railway.app/item/fetch_trends`)
  .then(res => {
    setTrends(res.data.trends)
    settopsearched(res.data.topsearched)
    settopbrands(res.data.topbrands)
    setTimeout(()=> setloading(false), 500)
  })
  .catch(err => console.warn(err))
  
 },[])
 
    return ( 
       <div className='container'  style={{marginBottom:"30px",marginTop:"30px"}}>
            {/* < Recently_visited/> */}
        <div>
          <div className={mobiledevice ? 'container-fluid' : "container"}>
            <div style={{width:'100%',display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div style={{height:"250px",width:"18%",borderRadius:"10px", border:"0.2px solid lightgrey"}}>
  <div style={{padding:"15px",color:"grey"}}>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>fan</small><br/>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>refrigerators</small><br/>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>washing machine</small><br/>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>cookers</small><br/>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>microwave</small><br/>
      <small style={{fontWeight:"bold",cursor:"pointer"}}>power adapters</small><br/>
  </div>
</div>
         <div className='hoveredapp' style={{height:"250px",padding:"0px",border:'1px solid lightgrey', width:"60%",overflow:"hidden",position:"relative"}}>
          <div style={{position:"absolute", width:'100%', height:'255px',zIndex:"7474",overflow:"hidden",display:"none", backgroundColor:'rgba(0,54,108,0.3)'}}></div>
       <div className='row' style={{display:"flex",flexWrap:"nowrap",width:'100%',position:"absolute", bottom:"-16px",overflowX:"scroll",overflowY:'hidden'}}>
         {Oneimages.map(imgurl=>
          <div className='col-10' key={imgurl} style={{width:"100%"}}>
            <center>
          <img className='oneimage' style={{width:"100%",opacity:"1", padding:"5px",transition:`opacity 2s linear`,height:"250px"}} src={imgurl ? imgurl.image : null} />
         <div style={{padding:'5px',backgroundColor:"rgba(0,25,25,0.3)",height:"100%",width:"100%",bottom:"0px"}}>      
         <h1 style={{color:"white",position:"absolute",textShadow:"2px 1px grey",bottom:"20px",zIndex:"30",left:"10%",fontSize:"25px",fontWeight:"bold",width:"80%",zIndex:"664"}}>
            Get Quality , Affordability and Door-to-Door Transactions with 100% Trust
          </h1>
          </div>
         </center>
          </div>
          )}
         </div>
         </div>
         <div className='hoveredapp' style={{height:"250px",border:"0.2px solid lightgrey",padding:"0px",position:"relative",overflow:"hidden",margin:"0",width:"18%",borderRadius:"10px"}}>
         <div className='row' style={{display:"flex",flexWrap:"nowrap",padding:"0px",margin:"0",width:'100%',left:"0px",top:"0px", bottom:"-16px",position:"absolute",zIndex:"66474",overflowX:"scroll",overflowY:'hidden'}}>
 
  <div className='col-12' style={{backgroundColor:"orange",textTransform:"capitalize",fontWeight:"bold",color:"white"}}>
      <small style={{fontWeight:"bold"}}> <span className='fa fa-arrow-down'></span> stores</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> dispatch</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> awoof</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> trending</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> viewers choice</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> most rated</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> pocket friendly</small><br/>
      <small style={{fontWeight:"bold"}}><span className='fa fa-arrow-down'></span> efficient</small><br/>
  </div>
 
         {Oneimages.map(imgurl=>
          <div className='col-12' key={imgurl} style={{width:"100%"}}>
            <center>
          <img className='oneimage' style={{width:"100%",opacity:"1", padding:"5px",transition:`opacity 2s linear`,height:"250px"}} src={imgurl ? imgurl.image : null} />
         <div style={{padding:'5px',backgroundColor:"rgba(0,25,25,0.3)",height:"100%",width:"100%",bottom:"0px"}}>      
         <h1 style={{color:"white",position:"absolute",textShadow:"2px 1px grey",bottom:"20px",zIndex:"30",left:"10%",fontSize:"15px",fontWeight:"bold",width:"80%",zIndex:"664"}}>
            Get Quality , Affordability and Door-to-Door Transactions with 100% Trust
          </h1>
          </div>
         </center>
          </div>
          )}
         </div>
</div>
         </div>
         </div>
         <br/>
         <br/>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
           <Topstores />
         <div>

         </div>
         </div>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",backgroundColor:"gray",display:"none",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <p style={{padding:"5px",textAlign:"center",color:'white',fontWeight:"bold"}}>
                 TRENDS (<i>TOP 20</i>)
                <small style={{float:"right",fontWeight:'bold',color:"lightgray"}}>see more...</small>
              </p>
            </div>
         <Toprated />
         </div>
         </div>
         <br/><br/>
         <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",width: "100%"}}>
         {trends.map(trend=>
          	<div className='mb-3' style={{height: "100px",padding:"10px",width: "20%"}}>
            <div className='hoveredapp unhoveredapp' style={{backgroundColor:"white",height:"104px",border:'1px solid lightgrey',padding:"0px",cursor:"pointer",borderRadius:"10px"}}>
            <center >
              <div  style={{width: "100%",backgroundColor:"lightgrey",height: "80px"}}>
                  <div style={{display: "flex",height:"50%"}}>
                    <div style={{width:"100%",height:"100%"}}>
                   <center>
                   <img style={{width:"100%",height:"80px"}}
                 src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`}
                 data-src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`} />
                   </center>
                    </div>
                  </div>
                  </div>
                  <small style={{fontStyle: "italic",color: "grey"}}>
                    {trend.category} ({trend.counter})
                  </small>
            </center>
            </div>
            <br/>
          </div>
          )}
         </div>
         <br/><br/>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
         <div style={{borderRadius:"30px",width:"100%"}}>
           <Topbrands />
         </div>
         <div>

         </div>
         </div>
         <br/>
       
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",display:"none",backgroundColor:"indianred",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <small style={{padding:"5px",textAlign:"center",color:'white',fontWeight:"lighter",textTransform:"uppercase"}}>
                Viewers' choice (<i>TOP 20</i>)
                <span style={{float:"right",fontWeight:'bold',color:"lightgrey"}}>see more...</span>
              </small>
            </div>
         {<Trending />}
         </div>
         </div>
          <br/><br/>
          <div style={{padding:"0px",backgroundColor:'black',borderRadius:"20px",margin:"0px"}}>
            <div className='container'>
         <div style={{width:"100%",borderRadius:"10px",overflow:"hidden",border:"2px solid black"}}>
             <Trending color="white" bgcolor="orange"/>
            </div>
         </div>
         </div>
         <br/><br/>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
           <Topdispatch />
         </div>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",backgroundColor:"gray",display:"none",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <p style={{padding:"5px",textAlign:"center",color:'white',fontWeight:"bold"}}>
                 TRENDS (<i>TOP 20</i>)
                <small style={{float:"right",fontWeight:'bold',color:"lightgray"}}>see more...</small>
              </p>
            </div>
         <Topsearched />
         </div>
         </div>
         <br/>
         <br/>
         <div  className={mobiledevice ? 'container-fluid' : "container"}>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",backgroundColor:"gray",display:"none",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <p style={{padding:"5px",textAlign:"center",color:'white',fontWeight:"bold"}}>
                 TRENDS (<i>TOP 20</i>)
                <small style={{float:"right",fontWeight:'bold',color:"lightgray"}}>see more...</small>
              </p>
            </div>
         <Topdiscounted />
         </div>
         </div>
         <br/><br/>
         <div className='container'>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",boxShadow:"0.3px 1px 0.5px 1px lightgrey",backgroundColor:"orange",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <p style={{padding:"5px 10px",margin:"0px",textAlign:"center",color:'white',textTransform:"capitalize",fontWeight:"bold"}}>
                <small style={{fontWeight:"bolder"}}>ACCESSORIES</small>
                <small style={{float:"right",fontWeight:'lighter',color:"white"}}>see more...</small>
              </p>
            </div>
            <div className='row'>
            <div className='col-12' style={{position:"relative",height:"220px",overflow:"hidden"}}>
              <div className='row' style={{display:"flex",position:'absolute', bottom:"-10px",top:"0px",marginBottom:"-13px",width:"100%",overflowY:"hidden",flexWrap:"nowrap",overflowX:"scroll"}}>
              {trends.map(trend=>
             <div key={trend.productId} className="col-4 col-md-3 col-lg-2" style={{padding:"2px 2px 10px 3px",margin:"0"}}>
              <div className='hoveredapp unhoveredapp' style={{padding:"5px",height:"215px",borderRadius:"10px",marginBottom:"10px"}}>
              <div style={{height:"150px"}}>
                <img style={{width:"100%",height:"100%"}}
                 src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`}
                 data-src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`} />
              </div>
              <div>
              <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{trend.details.length > 20 ? trend.details.slice(0,20)+ "..." : trend.details +"-"+ trend.model +"-"+ trend.color}</small> 
              <small>
           
               <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${3.2*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({3.2}) </small>
               </div>
               
                </small> 
              <br/>
              {trend.discount ?
              <div>
               <small style={{fontWeight:"bold",fontSize:"14px"}}>{trend.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {trend.mainprice}</small>
               
                </div> 
                : 
              <div>
                  <small style={{fontWeight:"bold",fontSize:"14px"}}>{trend.mainprice || trend.mainprice !== "₦0" ? trend.mainprice : null}</small> 
                <br/>
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
<br/><br/>
         <div style={{borderRadius:"30px",width:"100%"}}>
            <div style={{width:"100%",boxShadow:"0.3px 1px 0.5px 1px lightgrey",backgroundColor:"orange",borderRadius:"30px",overflow:"hidden",borderBottom:"1px solid lightgrey"}}>
              <p style={{padding:"5px 10px",margin:"0px",textAlign:"center",color:'white',textTransform:"capitalize",fontWeight:"bold"}}>
                <small style={{fontWeight:"bolder"}}>Refrigerators</small>
                <small style={{float:"right",fontWeight:'lighter',color:"white"}}>see more...</small>
              </p>
            </div>
            <div className='row'>
            <div className='col-12' style={{position:"relative",height:"220px",overflow:"hidden"}}>
              <div className='row' style={{display:"flex",position:'absolute',top:"0px", bottom:"-10px",marginBottom:"-13px",width:"100%",flexWrap:"nowrap",overflowY:"hidden",overflowX:"scroll"}}>
              {trends.map(trend=>
             <div key={trend.productId} className="col-4 col-md-3 col-lg-2" style={{padding:"2px 2px 10px 3px",margin:"0"}}>
                          <div className='hoveredapp unhoveredapp' style={{padding:"5px",height:"215px",borderRadius:"10px",marginBottom:"10px"}}>
              <div style={{height:"150px"}}>
                <img style={{width:"100%",height:"100%"}}
                 src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`}
                 data-src={`https://res.cloudinary.com/fruget-com/image/upload/${trend.generalcategory}/${trend.category}/${trend.mainimg}`} />
              </div>
              <div>
              <small className="detailtext"  style={{fontSize:"12px",cursor:"pointer",textTransform:"capitalize"}}>{trend.details.length > 20 ? trend.details.slice(0,20)+ "..." : trend.details +"-"+ trend.model +"-"+ trend.color}</small> 
              <small>
              <div>
                  <div className="outer">     
                 <div className="inner" style={{width:`${5*20}%`}}>    
                 </div> 
                 </div>  <small style={{fontSize:"12px"}}>({3.5}) </small>
               </div>
                </small> 
              <br/>
              {trend.discount ?
              <div>
               <small style={{fontWeight:"bold",fontSize:"14px"}}>{trend.mainprice}</small> 
                <small class="text-muted" style={{float:"right",textDecoration:"line-through",fontSize:"12px",whiteSpace:"pre"}}> {trend.mainprice}</small>
               
                </div> 
                : 
              <div>
                  <small style={{fontWeight:"bold",fontSize:"14px"}}>{trend.mainprice || "₦50,000"}</small> 
                <br/>
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
         </div>
       </div>
       </div>
     );
}

export default Home;