
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";



function AppLayout() {
  
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


export default AppLayout