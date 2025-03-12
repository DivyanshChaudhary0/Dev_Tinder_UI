
import React, { useEffect } from 'react'
import UserCard from '../Components/UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/FeedSlice'

const Feed = () => {

  const feed = useSelector((state)=> state.feed)
  const dispatch = useDispatch();

  useEffect(function(){
    axios.get(BASE_URL + "/feed",{withCredentials:true})
    .then((res)=>{
      dispatch(addFeed(res.data.users))
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div className='w-full flex items-center justify-center my-10'>
      { feed && <UserCard feed={feed[0]} /> }
    </div>
  )
}

export default Feed
