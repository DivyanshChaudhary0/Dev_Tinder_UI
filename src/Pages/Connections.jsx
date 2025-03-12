
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import { Link } from 'react-router-dom';

const Connections = () => {

    const [connections,setConnections] = useState([]);
    const [error,setError] = useState("");

    useEffect(function(){
        axios.get(BASE_URL + "/user/connections",{withCredentials:true})
        .then((res)=>{
            setConnections(res.data.data)
        })
        .catch((err)=>{
            setError(err.response.data.message)
        })
    },[])

    if(connections.length <= 0) return <h1 className='text-center my-20 text-xl'>No connections found...!</h1>

  return (
    <div className='px-4'>
        {
            connections && connections.map((connection)=> (
                <div key={connection._id} className='lg:w-1/2 md:w-2/3 px-4 py-4 flex items-start gap-4 justify-between rounded-md bg-gray-800 text-white md:mx-auto my-6 md:my-10'>
                    <div className='md:w-[80%] flex flex-col lg:flex-row gap-2 md:gap-4 '>
                        <div>
                            <img className=' w-14 h-14 md:w-20 md:h-20 object-cover rounded-full' src={connection.photoURL} alt="" />
                        </div>
                        <div>
                            <h2 className='text-sm md:text-xl font-semibold'>{connection.username}</h2>
                            <p className='text-xs md:text-base'>{connection.about}</p>
                        </div>
                    </div>
                    <div className='px-1 py-4 md:px-2 md:w-[20%]'>
                        <Link to={`/chats/${connection._id}`}  className='text-[16px] md:text-base px-4 md:px-4 py-2 font-semibold md:py-2 bg-blue-500 rounded-md'>Chat</Link>
                    </div>
                </div>
            ))
        }
        {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Connections