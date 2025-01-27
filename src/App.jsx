import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function AppLayout() {
  return (
    <div className="max-w-5xl mx-auto">
      <Navbar />

      <div className="min-h-[70vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default App;
