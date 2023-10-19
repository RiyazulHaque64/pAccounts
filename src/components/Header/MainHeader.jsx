import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import userAvatar from "../../assets/user-avatar.png";

const MainHeader = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full h-20 shadow rounded-lg">
      <div className="w-11/12 h-20 mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-xl">
            <span className="text-violet-600 font-bold">Good Morning,</span>{" "}
            {user?.displayName}
          </h2>
        </div>
        <div>
          {user?.photoURL ? (
            <img
              className="w-12 h-12 rounded-full"
              src={user?.photoURL}
              alt="Profile Picture"
            />
          ) : (
            <img
              className="w-12 h-12 rounded-full"
              src={userAvatar}
              alt="Profile Picture"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
