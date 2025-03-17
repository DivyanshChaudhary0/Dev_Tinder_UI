
import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [age,setAge] = useState("");
    const [gender,setGender] = useState("male");
    const [about,setAbout] = useState("");
    const [error,setError] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        console.log(username,email,password,age,gender,about);
        axios.post(BASE_URL + "/register",{username,email,password,age,gender,about},{withCredentials:true})
        .then((res)=>{
            console.log(res);
            dispatch(addUser(res.data.user))
            navigate("/profile")
        })
        .catch((err)=>{
            console.log(err);
            setError(err.response.data.message || err.response.data.errors[0].msg)
        })
    }


  return (
    <main className='w-full h-full '>
        <section className='w-full h-full flex flex-col items-center justify-center'>
            <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Register User</h2>
            <form className='md:w-md px-6 py-2 flex flex-col gap-4' onSubmit={handleSubmit} >
                <div className="input-group w-full">
                    <label htmlFor="username">Username</label>
                    <input 
                        id='username' 
                        type="text" 
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        placeholder='Enter username'
                        className='w-full px-4 py-2 rounded outline-0' 
                        required
                    />
                </div>
                <div className="input-group w-full">
                    <label htmlFor="email">Email</label>
                    <input 
                        id='email' 
                        type="text" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Enter email'
                        className='w-full px-4 py-2 rounded outline-0' 
                        required
                    />
                </div>
                <div className="input-group w-full">
                    <label htmlFor="password">Password</label>
                    <input 
                        id='password' 
                        type="text" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder='Enter password'
                        className='w-full px-4 py-2 rounded outline-0' 
                        required
                    />
                </div>
                <div className="input-group w-full">
                    <label htmlFor="age">Age</label>
                    <input 
                        id='age' 
                        type="text" 
                        value={age}
                        onChange={(e)=> setAge(e.target.value)}
                        placeholder='Enter age'
                        className='w-full px-4 py-2 rounded outline-0' 
                        required
                    />
                </div>
                <Link to="/login" className='font-semibold'>Already have an account? <span className='text-blue-600'>Login</span></Link>
                {error && <p className='text-red-500 font-semibold'>{error}</p>}
                <button className='bg-blue-500 font-semibold hover:bg-blue-600 cursor-pointer py-2 rounded-3xl text-white'>Submit</button>
            </form>
        </section>
    </main>
  )
}

export default Register