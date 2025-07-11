import { useAuth0 } from "@auth0/auth0-react";
import profile from '/profile.svg'
import close from '/close.png'
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAuthenticated) return <div>You must be logged in to view this page.</div>;

  return (
    <div>
    <img src={close} alt="close" className="h-5 fixed sm:top-25 top-20 left-3" onClick={()=>navigate('/')}/>
    <div className="h-screen flex justify-center items-center">
      <div className="items-center gap-2 flex flex-col">
        <img
          src={profile}
          alt={user?.name}
          className="md:h-80 md:w-80 h-60 w-60 rounded-full"
        />
        <span className="md:text-xl text-lg font-medium">{user?.name}</span>
      </div>
    </div>
    </div>
  );
};

export default Profile;
