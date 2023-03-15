import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect, useContext } from 'react';
import { formater, getSentTime } from './formatTime';
import { userContext } from './usercontext';


function History(props) {
    const context = useContext(userContext)
    const [currentPage, setcurrentPage] = context["currentpage"]
    const [redirect, setredirect] = context["redirect"]
    const [history, sethistory] = useState([])

 useEffect(()=>{
    setcurrentPage("history")
    if(Cookies.get("tktplc")){
    axios.get(`https://new-frugetbackend-productions.up.railway.app/client/fetch_history?tkt=${Cookies.get("tktplc")}`)
    .then(res =>{
        if(res.data.status === "success"){
         sethistory(res.data.history)
        }
    })
    .catch(err => console.warn(err))
}else{
    setredirect(true)
}
 },[])

    return ( 
        <div>
            {props.lg ?
            <div style={{color:"indianred",padding:"0",margin:"0",backgroundColor:"white",zIndex:"3",position:`${props.lg ? "sticky" : ""}`,top:"-20px"}}>
             <p style={{padding:"5px"}}>History</p>
            </div> :
            <h3 style={{color:"grey"}}>History </h3>
            }
            <div>
                {history.length > 0 ? history.map((hist,i) =>
                    <div key={hist.historyId} className="row" style={{padding:"5px",borderTop:"1px solid lightgrey"}}>
                       {i === 0 || getSentTime(hist.historytime) !== getSentTime(history[1 >0 ? i-1 : i].historytime) ?
                        <div className='col-12'>
                            <center>
                                <small style={{color:`${getSentTime(hist.historytime) === "Today" ? "black":"grey"}`,padding:"1px 2px",fontSize:"11px",wordSpacing:"0.6px",border:"1px solid grey",fontWeight:"lighter"}}>{getSentTime(hist.historytime)}</small>
                            </center>
                        </div>
                        : null}
                        <div className={`${props.lg ? "d-none" : 'col-2 col-md-1'}`} >
                        <span className='fa fa-shopping-cart' style={{fontSize:"20px",borderRadius:"50%",border:'1px solid lightgrey',padding:"10px"}}></span>
                        </div>
                        <div className={`${props.lg ? "col-12" :'col-8 col-md-7 col-lg-5'}`}>
                            <small style={{margin:"0px",color:` ${hist.subject.indexOf("added") > -1 ? "orange" : 
                            hist.subject.indexOf( "removed") > -1 ? "indianred" :
                             hist.subject.indexOf( "deleted") > -1 ? "indianred":
                             hist.subject.indexOf( "cleared") > -1 ? "green" : "orange" }`,fontWeight:"bold",textTransform:'capitalize'}}>{hist.subject}</small><br/>
                            <small className='text-muted'>{hist.message}</small><br/>
                            <small className='d-md-none'  style={{fontSize:"11px"}}><span className='fa fa-clock-o text-muted mr-1'></span>{formater(hist.historytime)}</small>
                        </div>
                        <div className={`${props.lg ? "col-12" :'d-none d-md-block col-md-2'}`}>
                            <small><span className='fa fa-clock-o text-muted mr-1'></span>{formater(hist.historytime)}</small>
                        </div>
                    </div>
                    ) : 
                    <div className='row'>
                        <div className='col-12' style={{padding:"50px"}}>
                          <center>
                          <span className='fa fa-history ml-2' style={{fontSize:"150px", color:"lightgrey"}}></span>
                          <p style={{color:"lightgrey"}}>reload page to view history </p>
                          </center>
                          </div>
                    </div>}
            </div>
        </div>
     );
}

export default History;