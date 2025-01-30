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
        console.log(res.data.feedConnection);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!(feed && feed.length)) {
      fetchFeeed();
    }
  }, []);

  return !(feed && feed.length) ? (
    <div className="w-full">
      {" "}
      <div className="skeleton mx-auto w-[90vw] max-w-[260px] h-[300px] text-center  flex justify-center font-bold items-center">
        There is Nothing to Catch Up !!
      </div>
    </div>
  ) : (
    <div className="overflow-hidden">
      <Card feed={feed} />
    </div>
  );
};

export default Feed;
