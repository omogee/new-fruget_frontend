import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';

function EditStore() {
    const [storedetail, setstoredetail] = useState({})

    const params = useParams();

    useEffect(()=>{
       axios.get(`http://localhost:5000/item/fetch_store?storeId=${params.storeId}&tkt=${Cookies.get("tktplc")}`)
       .then(res=>{
        if(res.data.status === "success"){
            setstoredetail(res.data.storedetail[0])
        }else{
            alert(res.data.message)
        }
       })
       .catch(err => console.warn(err))
    },[])
    const change =()=>{

    }
    return ( 
        <div className="container" style={{paddingRight:"30px",marginBottom:"50px"}}>
               <div className='row' style={{position:'sticky',backgroundColor:'white',zIndex:"6775", top:"0px",padding:'10px'}}>
                <div className='col-12'>
                    <p style={{color:"grey",fontWeight:"bold"}}><Link to={`/profile/my_profile`}><span className='fa fa-chevron-circle-left'></span> profile</Link> <span className='ml-2' style={{color:'orange'}}><span className='fa fa-pencil-square-o'></span>{storedetail.store_name}</span></p>
                </div>
            </div>
       <div className='row'>
       <div className='col-12 col-md-8' style={{padding:'20px'}}>
       <div className='col-12'><p style={{margin:"0"}}>Business Name:</p></div>
            <input type="text" value={storedetail.store_name} onChange={change} readOnly className='form-control' />
          </div>
          <div className='col-12 col-md-8' style={{padding:'20px'}}>
          <div className='col-12'><p style={{margin:"0"}}>Email:</p></div>
            <input type="text" value={storedetail.store_email} onChange={change} className='form-control' />
          </div>
          <div className='col-12 col-md-8' style={{padding:'20px'}}>
          <div className='col-12'><p style={{margin:"0"}}>Contact:</p></div>
            <input type="text" value={storedetail.store_contact} onChange={change} className='form-control' />
          </div>
          <div className='col-12 col-md-8' style={{padding:'20px'}}>
          <div className='col-12'><p style={{margin:"0"}}>State/ Region:</p></div>
            <input type="text" value={storedetail.store_state} onChange={change}  className='form-control' />
          </div>
          <div className='col-12 col-md-8' style={{padding:'20px'}}>
          <div className='col-12'><p style={{margin:"0"}}>Lga:</p></div>
            <input type="text" value={storedetail.store_lga} onChange={change}  className='form-control' />
          </div>
          <div className='col-12 col-md-8' style={{padding:'20px'}}>
          <div className='col-12'><p style={{margin:"0"}}>Detailed Address:</p></div>
            <input type="text" value={storedetail.store_address} onChange={change} className='form-control' />
          </div>
          <div className='col-12' style={{padding:"20px"}}>
          <div className='col-12'><p style={{margin:"0"}}>About {storedetail.store_name}:</p></div>
            <input type="text" value={storedetail.store_about} onChange={change} className='form-control' />
          </div>
          <br/><br/>
          <div className='col-12 col-6 mt-3 mb-3'>
            <button className='btn' style={{backgroundColor:"orange",color:'white'}}>
               <span className='fa fa-pencil-square-o'></span> edit {storedetail.store_name}
            </button>
          </div>
          <br/><br/><br/>
       </div>
        </div>
     );
}

export default EditStore;