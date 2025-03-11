

const UserCard = ({feed}) => {

    const {username,gender,age,photoURL,about} = feed;

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={photoURL} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{username}</h2>
        { age && gender && <p>{age + ", " + gender}</p> }
        <p>{about}</p>
        <div className="w-full flex items-center mt-4 justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
