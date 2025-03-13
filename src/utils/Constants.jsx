
import {io} from "socket.io-client"

// export const BASE_URL = "http://localhost:3000"

export const BASE_URL = "http://3.108.59.122/api"

const socketConnection = () => {
    return io(BASE_URL);
}

export default socketConnection;