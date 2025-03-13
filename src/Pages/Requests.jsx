
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/RequestSlice';

const Requests = () => {

    const [error,setError] = useState("");
    const requests = useSelector((state)=> state.request)
    const dispatch = useDispatch();

    useEffect(function(){
        axios.get(BASE_URL + "/user/requests/receive",{withCredentials:true})
        .then((res)=> {
            dispatch(addRequests(res.data.requests))
        })
        .catch((err)=>{
            setError(err.response.data)
        })
    },[])

    function handleRequest(status,_id){
        axios.post(BASE_URL + `/request/review/${status}/${_id}`,{},{withCredentials:true})
        .then((res)=>{
            dispatch(removeRequests(_id))
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    if(!requests) return;

    if(error) return <div className='my-20 flex items-center justify-center text-red-500 font-semibold text-xl'>
        <p>ERROR: {error}</p>
    </div>

    if(requests.length <= 0){
        return <p className='text-center my-20 text-xl'>No request found...!</p>
    }

  return (
    <div className='px-4'>
        {
            requests && requests.map((request)=> {
                const {username,about,photoURL} = request.fromUserId;
                return (
                <div key={request._id} className='md:w-2/3 lg:w-1/2 flex items-center justify-between px-4 py-2 rounded-md bg-gray-800 text-white md:mx-auto my-6 md:my-10'>
                    <div className='w-[70%] md:flex gap-4 items-center'>
                        <div>
                            <img className=' w-14 h-14 md:w-20 md:h-20 object-cover rounded-full' src={photoURL} alt="" />
                        </div>
                        <div>
                            <h2 className='text-sm md:text-xl font-semibold'>{username}</h2>
                            <p className='text-xs md:text-base'>{about}</p>
                        </div>
                    </div>
                    <div className='w-[30%] flex flex-wrap gap-2'>
                        <button  onClick={()=> handleRequest("rejected",request._id)} className="btn btn-primary mx-2 text-xs py-0 px-4">Reject</button>
                        <button onClick={()=> handleRequest("accepted",request._id)} className="btn btn-secondary mx-2 text-xs py-0 px-4">Accept</button>
                    </div>
                </div>
            )})
        }
        {error && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Requests