
import UserCard from '../Components/UserCard'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';
import { addUser } from '../utils/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

const Edit_Profile = ({user}) => {
    
    const [username,setUsername] = useState(user?.username);
    const [age,setAge] = useState(user?.age);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user?.about);
    const [photoURL,setPhotoURL] = useState(user?.photoURL);
    const [error,setError] = useState("")
    const dispatch = useDispatch();
  
    // add toastify
    const notify = () => toast("profile updated successfully...!"); 
  
    function saveChanges(){
      axios.put(BASE_URL + "/profile/edit",{username,age,gender,about,photoURL},{withCredentials:true})
      .then((res)=>{
        dispatch(addUser(res.data.user))
        notify();
      })
      .catch((err)=>{
        setError(err.response.data.error)
      })
    }
  
    return (
      
      <div className='w-full  flex flex-col lg:flex-row justify-center items-center my-10 gap-10 px-4'>
        <div className='w-80 md:w-[350px] px-4 py-6 bg-gray-800 rounded-md text-white'>
  
          <div className="input-group w-full flex flex-col gap-1 mb-4">
            <label htmlFor="username">Username</label>
            <input value={username} onChange={(e)=> setUsername(e.target.value)} id='username' className='px-4 py-2 rounded' type="text" placeholder='Enter username' />
          </div>
          <div className="input-group w-full flex flex-col gap-1 mb-4">
            <label htmlFor="age">Age</label>
            <input value={age} onChange={(e)=> setAge(e.target.value)} id='age' className='px-4 py-2 rounded' type="text" placeholder='Enter age' />
          </div>
          <div className="input-group w-full flex flex-col gap-1 mb-4">
            <label htmlFor="gender">Gender</label>
            <select id='gender' onChange={(e)=> setGender(e.target.value)}  className='px-4 py-2 rounded bg-gray-800 text-white'>
                <option value="male"> male </option>
                <option value="female"> female </option>
                <option value="other"> other </option>
            </select>
          </div>
          <div className="input-group w-full flex flex-col gap-1 mb-4">
            <label htmlFor="about">About</label>
            <textarea id='about' value={about} onChange={(e)=> setAbout(e.target.value)} className='px-4 py-2 rounded' placeholder='Enter about yourself...'>{about}</textarea>
          </div>
          <div className="input-group w-full flex flex-col gap-1 mb-4">
            <label htmlFor="photoURL">Profile Image</label>
            <input value={photoURL} onChange={(e)=> setPhotoURL(e.target.value)} id='photoURL' className='px-4 py-2 rounded' type="text" placeholder='Enter photoURL' />
          </div>

          { 
            error && <p className='text-red-500 my-2'>{error}</p>
          }

          <button onClick={saveChanges} className='bg-blue-500 px-4 py-2 rounded cursor-pointer'>Save changes</button>
  
        </div>
        <div className='flex items-center justify-center px-4'>
          <UserCard user={{username,age,about,gender,photoURL}} />
        </div>
        <ToastContainer
          autoClose={1000}
          hideProgressBar={false}
        />
      </div>
    )
}

export default Edit_Profile