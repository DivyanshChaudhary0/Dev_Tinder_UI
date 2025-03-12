import axios from "axios";
import { useLocation} from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/FeedSlice";
import { useState } from "react";

const UserCard = ({user}) => {
    
    const {_id,username,gender,age,photoURL,about} = user;
    const { pathname}  = useLocation();
    const dispatch = useDispatch();
    const [error,setError] = useState("")

    function handleRequest(status,userId){
      axios.post(BASE_URL + `/request/send/${status}/${userId}`,{},{withCredentials:true})
      .then((res)=>{
        dispatch(removeUserFromFeed(userId))
      })
      .catch((err)=>{
        setError(err.response.data)
      })
    }

  return (
    <>
    <div className="card bg-base-100 md:w-96 md:h-[480px] h-[380px] shadow-sm">
      <figure className="w-full md:h-[90%] h-1/2">
        <img className="w-full h-full object-cover" src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        { age && gender && <p>{age + ", " + gender}</p> }
        <p>{about}</p>
        { pathname === "/" && <div className="w-full flex items-center mt-4 justify-between">
          <button onClick={()=> handleRequest("ignored",_id)} className="btn btn-primary">Ignore</button>
          <button onClick={()=> handleRequest("interested",_id)} className="btn btn-secondary">Interested</button>
        </div>}
      </div>
    </div>
      {error &&  <p className="text-red-500 my-20 text-center"> {error} </p> }
      </>
  );
};

export default UserCard;
