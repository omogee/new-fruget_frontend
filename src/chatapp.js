import React, { useState, useEffect, useContext } from 'react';
import Chatus from './chat';
import Connection from './connection';
import { userContext } from './usercontext';

function ChatApp() {
   const context = useContext(userContext)
   const [onlineclients, setonlineclients] = context["onlineclients"]
   const [currentPage, setcurrentPage] = context["currentpage"]

   useEffect(()=>{
      setcurrentPage("chatapp")
   })
    return ( 
        <div >
        <div className='container-fluid' style={{overflowX:"scroll",position:"fixed",zIndex:'78993736',backgroundColor:"black",height:"100vh"}}>
           <div className='row chatapp'>
            <div className='d-none d-lg-block col-lg-1'></div>
             <div className='d-none d-md-block col-md-5 col-lg-4 chatapp_connection'>
             <Connection onlineclients={onlineclients}/>
             </div>
             <div className='d-none d-md-block col-md-1'>
               <span className='fa fa-arrow-alt-circle-right'></span>
             </div>
             <div className='col-12 col-md-6 col-lg-5 chatapp_chat'>
                <Chatus />
             </div>
           </div>
           </div>
        </div>
     );
}

export default ChatApp;