
import React, { useState } from 'react'
import UserCard from '../Components/UserCard'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { addUser } from '../utils/UserSlice';

const Profile = () => {

  const user = useSelector((state)=> state.user)
  const [username,setUsername] = useState(user?.username);
  const [age,setAge] = useState(user?.age);
  const [gender,setGender] = useState(user?.gender);
  const [about,setAbout] = useState(user?.about);
  const [photoURL,setPhotoURL] = useState(user?.photoURL);
  const dispatch = useDispatch();

  function saveChanges(){
    axios.patch(BASE_URL + "/profile/edit",{username,age,gender,about,photoURL},{withCredentials:true})
    .then((res)=>{
      dispatch(addUser(res.data.user))
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className='w-full min-h-full flex flex-col lg:flex-row justify-center my-10 items-center gap-10 px-4'>
      <div className='px-4 py-6 bg-gray-800 rounded-md text-white'>

        <div className="input-group w-80 md:w-[350px] flex flex-col gap-1 mb-4">
          <label htmlFor="username">Username</label>
          <input value={username} onChange={(e)=> setUsername(e.target.value)} id='username' className='px-4 py-2 rounded' type="text" placeholder='Enter username' />
        </div>
        <div className="input-group w-80 md:w-[350px] flex flex-col gap-1 mb-4">
          <label htmlFor="age">Age</label>
          <input value={age} onChange={(e)=> setAge(e.target.value)} id='age' className='px-4 py-2 rounded' type="text" placeholder='Enter age' />
        </div>
        <div className="input-group w-80 md:w-[350px] flex flex-col gap-1 mb-4">
          <label htmlFor="gender">Gender</label>
          <input value={gender} onChange={(e)=> setGender(e.target.value)} id='gender' className='px-4 py-2 rounded' type="text" placeholder='Enter gender' />
        </div>
        <div className="input-group w-80 md:w-[350px] flex flex-col gap-1 mb-4">
          <label htmlFor="gender">About</label>
          <input value={about} onChange={(e)=> setAbout(e.target.value)} id='gender' className='px-4 py-2 rounded' type="text" placeholder='Enter gender' />
        </div>
        <div className="input-group w-80 md:w-[350px] flex flex-col gap-1 mb-4">
          <label htmlFor="photoURL">Profile Image</label>
          <input value={photoURL} onChange={(e)=> setPhotoURL(e.target.value)} id='photoURL' className='px-4 py-2 rounded' type="text" placeholder='Enter photoURL' />
        </div>

        <button onClick={saveChanges} className='bg-blue-500 px-4 py-2 rounded cursor-pointer'>Save changes</button>

      </div>
      <div className='flex items-center justify-center px-4'>
        <UserCard feed={{username,age,about,gender,photoURL}} />
      </div>
    </div>
  )
}

export default Profile
