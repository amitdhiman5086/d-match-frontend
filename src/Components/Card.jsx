import axios from "axios";
import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { BASE_URL } from "../Utils/constant";

// eslint-disable-next-line react/prop-types
const Card = ({ feed }) => {
  const request = {
    ignore: "ignore",
    interested: "interested",
  };

  const characters = feed;
  const [lastDirection, setLastDirection] = useState();
  const [userId, setUserId] = useState("");

  const swiped = (direction, nameToDelete, userId) => {
    // console.log("removing: " + nameToDelete);
    setLastDirection(direction);
    setUserId(userId);
    // console.log(userId);
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  const ignoreProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${request.ignore}/${userId}`,
        {},
        { withCredentials: true }
      );
      // console.log(res);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };
  const interestedProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${request.interested}/${userId}`,
        {},
        { withCredentials: true }
      );
      // console.log(res);
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };
  useEffect(() => {
    if (lastDirection == "left" && userId) {
      ignoreProfile();
    }
    else if(lastDirection == "right" && userId){
      interestedProfile()
    }
  }, [userId , lastDirection]);

  return (
    <div className="flex  z-50 justify-center items-center overflow-hidden w-full ">
      <div>

        <div className="relative w-[90vw] max-w-[260px] h-[300px]">
          {characters.map((character, index) => (
            <TinderCard
              className="absolute"
              key={character?.firstName + index}
              onSwipe={(dir) =>
                swiped(dir, character?.firstName, character?._id.toString())
              }
              onCardLeftScreen={() => outOfFrame(character?.firstName)}
              preventSwipe={["up", "down"]}
            >
              <div
                style={{ backgroundImage: `url(${character?.photoURL})` }}
                className="relative bg-white w-[80vw] max-w-[260px] h-[300px] rounded-[20px] bg-cover bg-center shadow-lg"
              >
                <div className="text-black absolute -bottom-[5px] rounded-b-[20px]  rounded-t-md   bg-white w-full p-2 font-semibold">
                  <p>{character.firstName + " " + character.lastName}</p>
                  {character.age && character.gender && (
                    <div className="text-sm font-normal">
                      {"Age : " +
                        character?.age +
                        " Gender : " +
                        character?.gender}
                    </div>
                  )}
                </div>
              </div>
            </TinderCard>
          ))}
        </div>
        {lastDirection ? (
          <h2 className="w-full flex justify-center text-white animate-[popup_800ms] mt-4">
            You swiped {lastDirection}
          </h2>
        ) : (
          <h2 className="w-full flex justify-center text-white mt-4" />
        )}
      </div>
    </div>
  );
};

export default Card;
