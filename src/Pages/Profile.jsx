import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser, removeUser } from "../redux/userSlice";
import { BASE_URL } from "../Utils/constant";
import TinderCard from "react-tinder-card";

const Profile = () => {
  const profileData = useSelector((store) => store.user);

  const INITIAL_PROFILE_DATA = {
    firstName: profileData?.firstName || "",
    lastName: profileData?.lastName || "",
    age: profileData?.age || "",
    skills: profileData?.skills || "",
    gender: profileData?.gender || "",
    photoURL: profileData?.photoURL || "",
    about: profileData?.about || "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [profileForm, setProfileForm] = useState(INITIAL_PROFILE_DATA);
  const dispatch = useDispatch();

  const handleProfileUpdate = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      const response = await axios.post(
        BASE_URL + "/profile/edit",
        profileForm,
        {
          withCredentials: true,
        }
      );

      if (response.data.data) {
        dispatch(removeUser());
        dispatch(addUser(response.data.data));
      }
      setIsLoading(false);
    } catch (err) {
      setTimeout(() => setError(""), 5000);
      setIsLoading(false);
      setError(err.message);
      console.error("Error updating profile: ", err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const { name, value } = e.target;
    const skillsArray = value.split(",").map((skill) => skill.trim());
    setProfileForm((prev) => ({ ...prev, [name]: skillsArray }));
  };

  return (
    <div className="flex w-full mx-auto bg-base-200 justify-center items-center">
      <div className="w-2/3">
        <div className="flex items-center">
          <div className="card mx-auto w-full max-w-5xl">
            <div className="justify-center items-center bg-base-200 rounded-xl">
              <div className="py-24 max-w-xl mx-auto px-10">
                <h2 className="text-2xl font-semibold mb-3 text-center">
                  Update Profile
                </h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-3 flex flex-col justify-center items-center gap-3">
                    <input
                      type="text"
                      name="firstName"
                      value={profileForm.firstName}
                      className="input w-full input-bordered"
                      placeholder="First Name"
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={profileForm.lastName}
                      className="input w-full input-bordered"
                      placeholder="Last Name"
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="age"
                      value={profileForm.age}
                      className="input w-full input-bordered"
                      placeholder="Age"
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="skills"
                      value={profileForm.skills}
                      className="input w-full input-bordered"
                      placeholder="Skills (comma separated)"
                      onChange={handleSkillsChange}
                    />
                    <select
                      name="gender"
                      value={profileForm.gender}
                      className="select select-ghost w-full border-0"
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="url"
                      name="photoURL"
                      value={profileForm.photoURL}
                      className="input w-full input-bordered"
                      placeholder="Photo URL"
                      onChange={handleInputChange}
                    />
                    <input
                      name="about"
                      value={profileForm.about}
                      className="input w-full input-bordered"
                      placeholder="About Yourself"
                      onChange={handleInputChange}
                    />
                  </div>

                  {error && <p className="my-3 text-red-600">{error}</p>}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn mt-2 w-full btn-primary${
                      isLoading ? " loading" : ""
                    }`}
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/3">
        <TinderCard>
          <div
            style={{ backgroundImage: `url(${profileForm.photoURL})` }}
            className="relative bg-white w-[80vw] max-w-[260px] h-[300px] rounded-[20px] bg-cover bg-center shadow-lg"
          >
            <div className="text-black absolute -bottom-[5px] rounded-b-[20px] bg-white w-full p-2 font-semibold">
              <p>{profileForm.firstName + " " + profileForm.lastName}</p>
              {profileForm.age && profileForm.gender && (
                <div className="text-sm font-normal">
                  Age: {profileForm.age}, Gender: {profileForm.gender}
                </div>
              )}
            </div>
          </div>
        </TinderCard>
      </div>
    </div>
  );
};

export default Profile;
