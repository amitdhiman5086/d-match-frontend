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
        console.log(res.data.feedConnection)

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!feed) {
      fetchFeeed();
    }
    

  }, []);

  return (!feed) ?null : <div className="overflow-hidden">
    <Card feed={feed}/>
  </div>;
};

export default Feed;
