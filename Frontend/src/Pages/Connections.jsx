
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'

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
                <div key={connection._id} className='md:w-1/2 px-4 py-2 rounded-md bg-gray-800 text-white md:mx-auto my-6 md:my-10'>
                    <div className='flex gap-4 items-center'>
                        <div>
                            <img className=' w-14 h-14 md:w-20 md:h-20 object-cover rounded-full' src={connection.photoURL} alt="" />
                        </div>
                        <div>
                            <h2 className='text-sm md:text-xl font-semibold'>{connection.username}</h2>
                            <p className='text-xs md:text-base'>{connection.about}</p>
                        </div>
                    </div>
                </div>
            ))
        }
        {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Connections