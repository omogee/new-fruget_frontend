import React, { useState, useEffect, useContext } from 'react';
import socket from './socketconn';
import { userContext } from './usercontext';
import {useNavigate} from "react-router-dom"

function Faq() {
    const context = useContext(userContext)
    const [spd, setspd] = context["spd"]
    const [mobiledevice, setmobiledevice] = context["mobiledevice"]

      const navigate = useNavigate()
     const query = new URLSearchParams(window.location.search)

     const closemodal =()=>{
        setspd("")
        query.delete("spd")
        navigate(window.location.pathname +"?"+ query.toString())
     }
     if(mobiledevice){
        return(
           <div>
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

export default Faq;