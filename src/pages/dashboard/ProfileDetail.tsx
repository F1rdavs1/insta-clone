import { NavLink, useParams } from "react-router-dom";
import {
  useGetUserQuery,
  useFollowMutation,
  useGetUnfollowUsersMutation,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import { useState } from "react";
import OfficialIcon from "../../assets/images/official.svg";
import Galery from "../../assets/images/Gallery.svg";
import Reels from "../../assets/images/reels-icon.svg";
import Taged from "../../assets/images/Tag.svg";
import SortIcon from "../../assets/images/Sort.svg";
import Stories from "../../components/Stories/Stories";

const ProfileDetail: React.FC = () => {
  const { username } = useParams();
  const { data: user, isLoading } = useGetUserQuery(username);
  const sessionUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const sessionUsername = sessionUser?.username || "";

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
  const [unfollow] = useGetUnfollowUsersMutation();

  const isFollowing = user?.followers?.some(
    (follower: any) => follower.username === sessionUsername
  );

  return (
    <div
      className={`profile-detail ${
        isLoading ? "bg-white" : "bg-[#000000]"
      } w-[80%] px-[60px]`}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="h-[100vh] overflow-y-auto">
          <div className="flex pt-[80px] gap-[32px] ">
            <div>
              <img
                src={Avatar}
                alt="Avatar"
                className="w-[150px] h-[150px] rounded-[50%] bg-[#b9b3d7]"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col ">
              <div className="flex items-center gap-[180px]">
                <h1 className="font-semibold text-[36px] leading-[50.4px] text-white flex items-center gap-[10px]">
                  {user.fullName}
                  <img
                    src={OfficialIcon}
                    alt="Official"
                    width={20}
                    height={20}
                  />
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
              <p className="text-[#7878A3] font-normal text-[18px] leading-[25.2px] pb-[22px] pt-[6.5px]">
                @{user.username}
              </p>
              <div className="flex items-center gap-[40px] pb-[30px]">
                <div className="flex items-center gap-[8px]">
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.posts?.length || 0}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Posts
                  </h3>
                </div>
                <div className="flex items-center gap-[8px]">
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.followers.length}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Followers
                  </h3>
                </div>
                <div className="flex items-center gap-[8px]">
                  <p className="text-[#7878A3] font-medium text-[20px] leading-[28px]">
                    {user.following.length}
                  </p>
                  <h3 className="text-[#EFEFEF] font-medium text-[18px] leading-[25.2px]">
                    Following
                  </h3>
                </div>
              </div>
              <div className="w-[240px] font-normal text-[16px] leading-[22.4px] text-[#EFEFEF]">
                For Developers, By Developers 💻 Web Development & Coding 🎥
                YouTube - JavaScript Mastery ✉️ Business - Email or DM.
              </div>
              <Stories />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <NavLink
                to={`/profile/${user.username}/posts`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ rounded-l-[10px]"
              >
                <img src={Galery} alt="Gallery" />
                <span>Posts</span>
              </NavLink>
              <NavLink
                to={`/profile/${user.username}/reels`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ "
              >
                <img src={Reels} alt="Reels" />
                <span>Reels</span>
              </NavLink>
              <NavLink
                to={`/profile/${user.username}/tagged`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ rounded-r-[10px]"
              >
                <img src={Taged} alt="Tagged" />
                <span>Tagged</span>
              </NavLink>
            </div>
            <div className="flex items-center gap-[10px]">
              <span className="font-medium text-[16px] leading-[22.4px] text-white">
                All
              </span>
              <button>
                <img src={SortIcon} alt="Sort" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDetail;
