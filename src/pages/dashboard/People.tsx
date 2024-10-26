import {
  useGetAllUsersQuery,
  useFollowMutation,
  useGetUnfollowUsersMutation,
  useGetUserQuery,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png";
import PeopleAvatar from "../../assets/images/People.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const SkeletonCard = () => (
  <div className="user-card skeleton-card flex flex-col items-center mb-4 py-[40px] border border-[#1F1F22] rounded-[20px] w-[303px]">
    <div className="skeleton-avatar w-[54px] h-[54px] bg-gray-600 rounded-full"></div>
    <div className="skeleton-name w-[120px] h-[24px] bg-gray-600 mt-[24px] rounded"></div>
    <div className="skeleton-email w-[150px] h-[18px] bg-gray-600 mt-[8px] rounded"></div>
    <div className="skeleton-button w-[80px] h-[30px] bg-gray-600 mt-[20px] rounded"></div>
  </div>
);

const People: React.FC = () => {
  const { data = [], isLoading } = useGetAllUsersQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useGetUnfollowUsersMutation();
  const sessionUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = sessionUser?.username || "";
  const followUserData = useGetUserQuery(username);

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [visibleUsers, setVisibleUsers] = useState(10); 

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

  const handleSeeMore = () => {
    setVisibleUsers((prev) => prev + 10); 
  };

  const handleSeeLess = () => {
    setVisibleUsers(10); 
  };

  return (
    <div className="h-[100vh] overflow-y-auto w-[80%] bg-[#000000] px-[60px] pt-[80px] relative">
      <div className="flex items-center gap-[10px] mb-[40px]">
        <img src={PeopleAvatar} alt="People" width={36} height={36} />
        <h3 className="font-bold text-[24px] leading-[33.6px] text-white">
          All Users
        </h3>
      </div>

      <div className="flex flex-wrap gap-5">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          data.slice(0, visibleUsers).map((user: any, ind: number) => (
            <div
              key={ind}
              className="user-card flex flex-col items-center mb-4 py-[40px] border border-[#1F1F22] rounded-[20px] w-[303px]"
            >
              <Link to={`/profile/${user.username}`}>
                <img
                  src={user?.photo || Avatar}
                  alt="Avatar"
                  className="w-[54px] h-[54px] rounded-full cursor-pointer"
                />
              </Link>
              <div className="text-center mt-[24px] mb-[20px]">
                <Link to={`/profile/${user.username}`}>
                  <p className="text-white font-bold text-[24px] leading-[33.6px] pb-[8px] cursor-pointer">
                    {user.username}
                  </p>
                </Link>
                <p className="text-[#7878A3] font-medium text-[18px] leading-[25px]">
                  {user.email}
                </p>
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
          ))
        )}
      </div>

      <div className="absolute right-52 pb-[40px]">
        {visibleUsers < data.length && (
          <button
            className="text-white mt-4 mr-[5px] bg-[green] px-4 py-2 rounded-lg"
            onClick={handleSeeMore}
          >
            See More
          </button>
        )}
        {visibleUsers > 10 && (
          <button
            className="text-white mt-2 bg-[red] px-4 py-2 rounded-lg"
            onClick={handleSeeLess}
          >
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default People;
