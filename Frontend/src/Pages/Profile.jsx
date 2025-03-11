
import { useSelector } from 'react-redux';
import Edit_Profile from '../Components/Edit_Profile';

const Profile = () => {

  const user = useSelector((state)=> state.user)

  return(
    <>
      {
      user && <Edit_Profile  user={user} />
      }
    </>
  )
  
}

export default Profile
