import {
  useGetAllUsersQuery,
  useFollowMutation,
  useGetUnfollowUsersMutation,
  useGetUserQuery,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const TopCreators: React.FC = () => {
  const { data: users = [] } = useGetAllUsersQuery(true);
  const [followUser] = useFollowMutation();
  const [unfollowUser] = useGetUnfollowUsersMutation();
  const sessionUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const sessionUserName = sessionUser?.username || "";
  const followUserData = useGetUserQuery(sessionUserName);

  const [loadingStatus, setLoadingStatus] = useState<{
    [key: string]: boolean;
  }>({});

  const handleFollow = async (username: string): Promise<void> => {
    setLoadingStatus((prev) => ({ ...prev, [username]: true }));
    await followUser(username);
    setLoadingStatus((prev) => ({ ...prev, [username]: false }));
  };

  const handleUnfollow = async (username: string): Promise<void> => {
    setLoadingStatus((prev) => ({ ...prev, [username]: true }));
    await unfollowUser(username);
    setLoadingStatus((prev) => ({ ...prev, [username]: false }));
  };

  const formatUsername = (username: string): string => {
    return username.length > 7
      ? `${username.slice(0, 3)}...${username.slice(-4)}`
      : username;
  };

  return (
    <>
      <h3 className="font-bold text-[24px] leading-[33.6px] text-white mb-4">
        Top Creators
      </h3>
      <div className="grid grid-cols-2 users-wrapper">
        {users.length > 0 ? (
          users.slice(0, 8).map((user: any) => (
            <div
              key={user.username}
              className="topcreator-wrapper flex flex-col text-center items-center mb-4 py-[24px] px-[4px] border border-[#1F1F22] rounded-[20px] w-[150px]"
            >
              <Link to={`/profile/${user.username}`}>
                <img
                  src={user?.photo || Avatar}
                  alt="User Avatar"
                  className="topcreator-img w-[54px] h-[54px] rounded-full mr-4 text-white cursor-pointer"
                />
              </Link>
              <div>
                <Link to={`/profile/${user.username}`}>
                  <p className="topcreator-username text-white font-semibold text-center cursor-pointer">
                    {formatUsername(user.username)}
                  </p>
                </Link>
                {followUserData.data?.following?.some(
                  (follower: any) => follower.username === user.username
                ) ? (
                  <button
                    className="topcreator-btn text-white mt-[12px] bg-[red] px-[18px] py-[6px] rounded-[8px] flex items-center"
                    onClick={() => handleUnfollow(user.username)}
                    disabled={loadingStatus[user.username]}
                  >
                    {loadingStatus[user.username]
                      ? "Unfollowing..."
                      : "Unfollow"}
                  </button>
                ) : (
                  <button
                    className="topcreator-btn text-white mt-[12px] bg-[rgba(135,126,255,1)] px-[18px] py-[6px] rounded-[8px] follow-button flex items-center"
                    onClick={() => handleFollow(user.username)}
                    disabled={loadingStatus[user.username]}
                  >
                    {loadingStatus[user.username] ? "Following..." : "Follow"}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No users found.</p>
        )}
      </div>
    </>
  );
};

export default TopCreators;
