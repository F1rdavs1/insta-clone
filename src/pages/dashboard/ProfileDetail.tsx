import { useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import { useState } from "react";

const ProfileDetail = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useGetUserQuery(username);
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const currentUsername = currentUser?.username || "";

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

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const isFollowing = user?.followers?.some(
    (follower: any) => follower.username === currentUsername
  );

  return (
    <div
      className={`profile-detail ${
        isLoading ? "bg-white" : "bg-[#000000]"
      } w-[80%] pl-[60px]`}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex pt-[80px] gap-[32px]">
            <div>
              <img
                src={Avatar}
                alt="Avatar"
                className="w-[150px] h-[150px] rounded-[50%] bg-[#b9b3d7]"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center gap-[180px]">
                <h1 className="font-semibold text-[36px] leading-[50.4px] text-white">
                  {user.fullName}
                </h1>
                <div className="flex items-center gap-[7px]  bg-[#101012] rounded-[8px]">
                  {isFollowing ? (
                    <button
                    onClick={() => handleUnfollow(user.username)}
                      className="text-white bg-red-500 px-[18px] py-[6px] rounded-[8px]"
                      disabled={loading[user.username]}
                    >
                      {loading[user.username] ? "Unfollowing..." : "Unfollow"}
                    </button>
                  ) : (
                    <button
                    onClick={() => handleFollow(user.username)}
                      className="text-white bg-[#877EFF] px-[18px] py-[6px] rounded-[8px]"
                      disabled={loading[user.username]}
                    >
                      {loading[user.username] ? "Following..." : "Follow"}
                    </button>
                  )}
                </div>
              </div>
              <p className="text-[#7878A3] font-normal text-[18px] leading-[25.2px]">
                Email: {user.email}
              </p>
              <div className="flex items-center gap-[40px]">
                <div>
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.posts?.length || 0}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Posts
                  </h3>
                </div>
                <div>
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.followers.length}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Followers
                  </h3>
                </div>
                <div>
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.following.length}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Following
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetail;
