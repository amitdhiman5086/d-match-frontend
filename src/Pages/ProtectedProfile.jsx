import { useEffect } from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const ProtectedProfile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if user is not authenticated
    }
  }, [user, navigate]);

  
  return <Profile />;
};

export default ProtectedProfile;