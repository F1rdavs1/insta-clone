import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserQuery,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import { useState } from "react";
import { Link } from "react-router-dom"; 

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const followUserData = useGetUserQuery(username);

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const handleFollow = async (username: string): Promise<void> => {
    setLoading((prev) => ({ ...prev, [username]: true }));
    await follow(username);
    setLoading((prev) => ({ ...prev, [username]: false }));
  };

  const handleUnfollow = async (username: string): Promise<void> => {
    setLoading((prev) => ({ ...prev, [username]: true }));
    await unfollow(username);
    setLoading((prev) => ({ ...prev, [username]: false }));
  };

  return (
    <>
      <h3 className="font-bold text-[24px] leading-[33.6px] text-white mb-4">
        Top Creators
      </h3>
      <div className="grid grid-cols-2 users-wrapper">
        {data.length > 0
          ? data.slice(0, 8).map((user: any, ind: number) => (
              <div
                key={ind}
                className="user-card flex flex-col text-center items-center mb-4 py-[24px] px-[4px] border border-[#1F1F22] rounded-[20px] w-[150px]"
              >
                <Link to={`/profile/${user.username}`}>
                  <img
                    src={user?.photo || Avatar}
                    alt="Avatar"
                    className="w-[54px] h-[54px] rounded-full mr-4 text-white cursor-pointer"
                  />
                </Link>
                <div>
                  <Link to={`/profile/${user.username}`}>
                    <p className="text-white font-semibold cursor-pointer">
                      {user.username}
                    </p>
                  </Link>
                  {followUserData.data?.following?.some(
                    (item: any) => item.username === user.username
                  ) ? (
                    <button
                      className="text-white mt-[12px] bg-red-500 px-[18px] py-[6px] rounded-[8px] flex items-center"
                      onClick={() => handleUnfollow(user.username)}
                      disabled={loading[user.username]}
                    >
                      {loading[user.username] ? "Unfollowing..." : "Unfollow"}
                    </button>
                  ) : (
                    <button
                      className="text-white mt-[12px] bg-[rgba(135,126,255,1)] px-[18px] py-[6px] rounded-[8px] follow-button flex items-center"
                      onClick={() => handleFollow(user.username)}
                      disabled={loading[user.username]}
                    >
                      {loading[user.username] ? "Following..." : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            ))
          : ""}
      </div>
    </>
  );
};

export default TopCreators;
