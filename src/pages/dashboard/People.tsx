import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserQuery,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import PeopeAvatar from "../../assets/images/People.svg";
import { useState } from "react";

const People = () => {
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
    <div className="h-[100vh] overflow-y-auto w-[80%] bg-[#000000] px-[60px] pt-[80px]">
      <div className="flex items-center gap-[10px] mb-[40px]">
        <img src={PeopeAvatar} alt="People" width={36} height={36} />
        <h3 className="font-bold text-[24px] leading-[33.6px] text-white">
          All Users
        </h3>
      </div>
      <div className="flex flex-wrap gap-5 ">
        {data.map((user: any, ind: number) => (
          <div
            key={ind}
            className="user-card flex flex-col items-center mb-4 py-[40px] border border-[#1F1F22] rounded-[20px] w-[303px]"
          >
            <img
              src={user?.photo || Avatar}
              alt="Avatar"
              className="w-[54px] h-[54px] rounded-full"
            />
            <div className="text-center mt-[24px] mb-[20px]">
              <p className="text-white font-bold text-[24px] leading-[33.6px]  pb-[8px]">{user.username}</p>
              <p className="text-[#7878A3] font-medium text-[18px] leading-[25px] ">{user.email}</p>
            </div>
            {followUserData.data?.following?.some(
              (item: any) => item.username === user.username
            ) ? (
              <button
                className="text-white bg-red-500 mt-[10px] px-[18px] py-[6px] rounded-[8px] flex items-center"
                onClick={() => handleUnfollow(user.username)}
                disabled={loading[user.username]}
              >
                {loading[user.username] ? "Unfollowing..." : "Unfollow"}
              </button>
            ) : (
              <button
                className="text-white bg-[rgba(135,126,255,1)] mt-[10px] px-[18px] py-[6px] rounded-[8px] follow-button flex items-center"
                onClick={() => handleFollow(user.username)}
                disabled={loading[user.username]}
              >
                {loading[user.username] ? "Following..." : "Follow"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
