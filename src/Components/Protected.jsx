
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import {BASE_URL} from "../utils/Constants"
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/UserSlice";

const Protected = ({children}) => {

    const user = useSelector((state)=> state.user)
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user) return;
        axios.get(BASE_URL + "/profile",{withCredentials:true})
        .then((res)=>{
            dispatch(addUser(res.data.user))
        })
        .catch((err)=>{
            navigate("/login")
        })
    },[])

    return children;

}

export default Protected;
