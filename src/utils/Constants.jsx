
import {io} from "socket.io-client"

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "http://3.108.59.122/api"


const socketConnection = () => {
    if(location.hostname === "localhost"){
        return io("http://localhost:3000");
    }
    else{
        return io("/", {path: "/api/socket.io"})
    }
}

export default socketConnection;