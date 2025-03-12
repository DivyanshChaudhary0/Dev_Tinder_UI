
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

  if(!feed) return;

  if(feed.length <= 0) return <h1 className='my-20 text-center text-xl'>No more users found...</h1>

  return (
    <div className='w-full flex items-center justify-center my-10'>
      { feed && <UserCard user={feed[0]} /> }
    </div>
  )
}

export default Feed
