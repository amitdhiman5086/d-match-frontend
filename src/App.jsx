import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { Provider, useDispatch, useSelector } from "react-redux";
import appStore from "./redux/appStore";
import SignUp from "./Pages/SignUp";
import ProtectedProfile from "./Pages/ProtectedProfile";
import Navbar from "./Components/Navbar";
import axios from "axios";
import { BASE_URL } from "./Utils/constant";
import { addUser } from "./redux/userSlice";
import { useEffect } from "react";
import ProtectedFeed from "./Pages/ProtectedFeed";
import ProtectedRequest from "./Pages/ProtectedRequest";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/profile" element={<ProtectedProfile />} />
            <Route path="/feed" element={<ProtectedFeed />} />
            <Route path="/requests" element={<ProtectedRequest />} />
        
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(res);

      dispatch(addUser(res.data.data));
    } catch (error) {
      navigate("/login");
      console.log("Error : " + error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <Navbar />

      <div className="min-h-[70vh] mx-auto w-full  items-center place-content-start md:min-h-[50vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
