import Cookies from "js-cookie"
import io from "socket.io-client"

//const CryptoJS = require("crypto-js")

const socket = io.connect("http://localhost:5000")

 /*if(Cookies.get("cvyx")){
    var bytes = CryptoJS.AES.decrypt(Cookies.get("cvyx"), 'my-secret-key@123');
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  socket.emit("addUser", parseInt(decryptedData))
}
*/

socket.connect()

socket.on("connect", ()=>{
 
})
socket.on("disconnect", ()=>{
//alert("disconnected")
})

export default socket