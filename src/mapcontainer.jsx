import React, { Component } from 'react';
import GoogleMapReact from "google-map-react"

class mapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lat:"",
            lng:""
         }
         
    }
    
    componentDidMount=()=>{
        if(navigator.geolocation){
         
            navigator.geolocation.getCurrentPosition(position=>{
                this.setState({lat:position.coords.latitude,lng:position.coords.longitude})
            },showError)
        }
        function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
              console.log("User denied the request for Geolocation.")
                break;
              case error.POSITION_UNAVAILABLE:
              console.log("Location information is unavailable.")
                break;
              case error.TIMEOUT:
              console.log("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
              console.log("An unknown error occurred.")
                break;
            }
          }
    }
    render() { 
        console.log("lat",this.state.lat)
        return ( 
            <div style={{height:"500px",width:"800px"}}>
     <GoogleMapReact 
     bootstrapURLKeys={{key:"AIzaSyCcK91pYj645VtbOVXYMAbtbVJotq8wn0E"}}
     defaultCenter={{
         lat:this.props.lat,
         lng:this.props.lng
     }}
     defaultZoom={4}
     >  
     <Marker lat={this.state.lat} lng={this.state.lng}/>
     <Location lat={this.props.lat} lng={this.props.lng}/>
     
     </GoogleMapReact>
     </div>
         ); 
    }
}   
const coord={
    lat:6.5244905,
    lng:3.3792885
}

const Marker =mycoord=>{
    return(
        <span style={{color:"green",fontSize:"20px"}} className="fa fa-user"></span>
    )
}
const Location =coord=>{
    return(
        <span style={{color:"brown",fontSize:"20px"}} className="fa fa-map-marker"></span>
    )
}
export default mapContainer;