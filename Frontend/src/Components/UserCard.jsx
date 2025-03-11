import { useLocation} from "react-router-dom";

const UserCard = ({feed}) => {

    const {username,gender,age,photoURL,about} = feed;
    const { pathname}  = useLocation();

  return (
    <div className="card bg-base-100 md:w-96 md:h-[480px] h-[380px] shadow-sm">
      <figure className="w-full md:h-[90%] h-1/2">
        <img className="w-full h-full object-cover" src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        { age && gender && <p>{age + ", " + gender}</p> }
        <p>{about}</p>
        { pathname === "/" && <div className="w-full flex items-center mt-4 justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>}
      </div>
    </div>
  );
};

export default UserCard;
