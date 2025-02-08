import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../redux/userSlice";
import { BASE_URL } from "../Utils/constant";
function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: "",
  };

  const [loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setErrorMessage("");
      setLoading(true);

      if (loginObj.email.trim() === "") {
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setLoading(false);
        return setErrorMessage("Email Id is required! (use any value)");
      }

      if (loginObj.password.trim() === "") {
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
        setLoading(false);

        return setErrorMessage("Password is required! (use any value)");
      }

      const result = await axios.post(BASE_URL + "/login", loginObj, {
        withCredentials: true,
      });

      dispatch(addUser(result.data.data));
      setLoading(false);

      navigate("/profile");
    } catch (error) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setLoading(false);

      setErrorMessage("Invalid Email or Password");

      console.log("Error : " + error.message);
    }
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginObj((values) => ({ ...values, [name]: value }));
  };
  // console.log(loginObj);

  useEffect(() => {
    if (user) {
      navigate("/profile");
      return;
    }
  }, [user, navigate]);

  return (
    <div className=" bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  ">
        <div className="  justify-center items-center bg-base-200 rounded-xl">
          <div className="py-24  max-w-xl   mx-auto px-10">
            <h2 className="text-2xl font-semibold mb-3 text-center">Login</h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-3   flex flex-col justify-center  items-center gap-3">
                <label className="input w-full input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    name="email"
                    value={loginObj.emailId}
                    className="grow"
                    placeholder="Email"
                    onChange={handleOnChange}
                  />
                </label>

                <label className="input w-full input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    name="password"
                    placeholder="Password"
                    type={!isVisible ? "password" : "text"}
                    className="grow"
                    value={loginObj.password}
                    onChange={handleOnChange}
                  />
                  {loginObj.password && (
                    <button
                      className="btn rounded-full btn-sm cursor-pointer"
                      onClick={() => setVisible((isVisible) => !isVisible)}
                    >
                      {isVisible ? "Hide" : "Show"}
                    </button>
                  )}
                </label>
              </div>

              {errorMessage && (
                <p className="my-3 text-red-600">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={"btn mt-2 w-full btn-primary"}
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don&apos;t have an account yet?{" "}
                <Link to="/signUp">
                  <span className=" text-blue-500 inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Sign Up
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
