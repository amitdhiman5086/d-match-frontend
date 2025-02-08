import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./Pages/SignUp";
import axios from "axios";
import { BASE_URL } from "./Utils/constant";
import { addUser } from "./redux/userSlice";
import { useEffect } from "react";

import NotFound from "./Pages/NotFound";
import Chat from "./Pages/Chat";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Profile from "./Pages/Profile";
import Feed from "./Pages/Feed";
import Request from "./Pages/Request";
import AppLayout from "./Pages/AppLayout";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/requests" element={<Request />} />

            <Route path="/chat/:toUserId" element={<Chat />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
