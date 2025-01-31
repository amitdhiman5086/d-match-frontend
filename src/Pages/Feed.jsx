import axios from "axios";
import { BASE_URL } from "../Utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/feedSlice";
import Card from "../Components/Card";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchFeeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      if (res.data.feedConnection) {
        dispatch(addFeed(res.data.feedConnection));
        // console.log(res.data.feedConnection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeeed();
  }, []);

  return !(feed && feed.length) ? (
    <div className="w-full my-10">
      {" "}
      <div className="skeleton mx-auto w-[90vw] max-w-[260px] h-[300px] text-center  flex justify-center font-bold items-center">
        There is Nothing to Catch Up !!
      </div>
    </div>
  ) : (
    <div className="overflow-hidden relative  flex justify-between items-center my-10 ">
    <div className="z-0 absolute left-0 top-0 bottom-0 flex items-center px-4 group">
      <div className="bg-red-50 hover:bg-red-100 transition-colors flex items-center gap-2 px-4 py-2 rounded-full  border border-red-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
        <span className="text-red-600 font-medium">Ignore</span>
      </div>
    </div>
  
    <Card feed={feed} />
  
    <div className="z-0 absolute right-0 top-0 bottom-0 flex items-center px-4 group">
      <div className="bg-green-50 hover:bg-green-100 transition-colors flex items-center gap-2 px-4 py-2 rounded-full  border border-green-200">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-green-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
        <span className="text-green-600 font-medium">Interested</span>
      </div>
    </div>
  </div>
  );
};

export default Feed;
