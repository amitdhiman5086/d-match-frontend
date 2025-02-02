import axios from "axios";
import { BASE_URL } from "../Utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, addRequests } from "../redux/requestSlice";
import { FaUserFriends } from "react-icons/fa";

const Request = () => {
  const requestSlice = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [isReload, setIsReload] = useState(false);
  const [isConnection, setIsConnection] = useState(false);
  // console.log(requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/request/received",

        {
          withCredentials: true,
        }
      );
      //   console.log(res);

      if (res.data) {
        dispatch(addRequests(res.data.connectionRequest));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConnection = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",

        {
          withCredentials: true,
        }
      );
      // console.log(res.data.data);

      if (res.data) {
        dispatch(addConnection(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isConnection) {
      fetchRequest();
    } else {
      fetchConnection();
    }
  }, [isReload, isConnection]);

  const request = requestSlice.requests;
  const connection = requestSlice.connections;
  // console.log(connection);

  return (
    <div className="flex flex-col w-full    ">
      <div>
        <div className="navbar justify-between md:px-6 bg-base-200 text-neutral-content">
          <p className=" font-bold ">Your Friend Rquests </p>
          <div className="space-x-3">
            <button
              onClick={() => setIsConnection((isConnection) => !isConnection)}
              className="btn btn-info text-sm"
            >
              {isConnection ? "Request" : "Connections"}
            </button>
            <button
              onClick={() => setIsReload((isReload) => !isReload)}
              className="btn btn-success text-sm"
            >
              Reload
            </button>
          </div>{" "}
        </div>
      </div>
      {isConnection ? (
        <div>
          {connection.length == 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="card bg-base-100  p-6 text-center ">
                <div className="flex flex-col items-center">
                  <FaUserFriends className="text-6xl text-gray-400 mb-4 animate-bounce" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    No Connection
                  </h2>
                  <p className="text-gray-500 mt-2">
                    You&apos;re all caught up! Check back later.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {connection.map((req) => (
                <div className="my-4" key={req._id}>
                  <div className="card card-side bg-base-100 max-w-3xl mx-auto shadow-xl">
                    <figure>
                      <img
                        src={req?.photoURL}
                        alt="User"
                        className="w-30 h-28 rounded-r-xl "
                      />
                    </figure>
                    <div className="card-body px-2  flex flex-row justify-between items-center   ">
                      <div className="space-y-1">
                        <h2 className="card-title line-clamp-1 mb-2">
                          {req?.firstName + " " + req?.lastName}
                        </h2>
                        <p className="font-semibold">
                          {"Age :" + req?.age + "   Gender : " + req?.gender}
                        </p>
                        <p className="line-clamp-1 font-extralight">
                          {req?.about}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {" "}
          {request.length == 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="card bg-base-100  p-6 text-center ">
                <div className="flex flex-col items-center">
                  <FaUserFriends className="text-6xl text-gray-400 mb-4 animate-bounce" />
                  <h2 className="text-xl font-semibold text-gray-700">
                    No Friend Requests Left
                  </h2>
                  <p className="text-gray-500 mt-2">
                    You&apos;re all caught up! Check back later.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {request.map((req) => (
                <div className="my-4" key={req._id}>
                  <SingleRequest req={req} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Request;

const SingleRequest = (req) => {
  const [isShow, setIsShow] = useState(true);
  const user = Object(req).req.fromUserId;
  const [isToast, setIsToste] = useState("");
  const requestId = Object(req).req._id;

  const requestStatus = {
    accept: "accept",
    reject: "reject",
  };

  const handleRequest = async (status) => {
    await axios.patch(
      BASE_URL + `/request/review/${status}/${requestId}`,
      {},
      {
        withCredentials: true,
      }
    );
    setIsShow(false);
    setTimeout(() => {
      setIsToste("");
    }, 3000);
    setIsToste(status);
  };

  return (
    <div className="card card-side bg-base-100 max-w-3xl mx-auto shadow-xl">
      <figure>
        <img
          src={user?.photoURL}
          alt="User"
          className="w-30 h-28 rounded-r-xl "
        />
      </figure>
      <div className="card-body px-2  flex flex-row justify-between items-center   ">
        <div className="space-y-1">
          <h2 className="card-title mb-2 line-clamp-1 ">
            {user?.firstName + " " + user?.lastName}
          </h2>
          <p className="font-semibold">
            {"Age :" + user?.age + "   Gender : " + user?.gender}
          </p>
          <p className="line-clamp-1 font-extralight">{user?.about}</p>
        </div>
        {isShow && (
          <div className=" m-0 p-0 flex gap-1 md:gap-4 ">
            <button
              onClick={() => handleRequest(requestStatus.reject)}
              className="btn btn-outline rounded-full"
            >
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
            </button>
            <button
              onClick={() => handleRequest(requestStatus.accept)}
              className="btn btn-outline rounded-full"
            >
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
            </button>
          </div>
        )}

        {isToast && (
          <div className="toast w-full max-w-2xs text-center mx-auto top-5 toast-top toast-center">
            <div className="alert text-center  w-full alert-success">
              <p className="text-center w-full">
                Friend Request {isToast.toLocaleUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
