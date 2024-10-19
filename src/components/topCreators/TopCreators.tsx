import {
  useGetAllUsersQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserQuery,
} from "../../redux/api/user-slice";
import Avatar from "../../assets/images/user.png"

const TopCreators = () => {
  const { data = [] } = useGetAllUsersQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const followUserData = useGetUserQuery(username);

  const handleFollow = (username: string): void => {
    follow(username);
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username);
  };

  return (
    <>
      <h3 className="font-bold text-[24px] leading-[33.6px] text-white mb-4">
        Top Creators
      </h3>
      <div className="grid grid-cols-2 justify-between users-wrapper">
        {data.length > 0
          ? data.map((user: any, ind: number) => (
              <div
                key={ind}
                className="user-card flex flex-col text-center items-center mb-4 py-[24px] px-[4px] border border-[#1F1F22] rounded-[20px] w-[150px]"
              >
                <img
                  src={user?.photo || Avatar}
                  alt="Avatar"
                  className="w-[54px] h-[54px] rounded-full mr-4 text-white"
                />
                <div>
                  <p className="text-white font-semibold">{user.username}</p>
                  {followUserData.data?.following?.some(
                    (item: any) => item.username === user.username
                  ) ? (
                    <button
                      className="text-white mt-[12px] bg-red-500 px-[18px] py-[6px] rounded-[8px]"
                      onClick={() => handleUnfollow(user.username)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="text-white mt-[12px] bg-[rgba(135,126,255,1)] px-[18px] py-[6px] rounded-[8px] follow-button"
                      onClick={() => handleFollow(user.username)}
                    >
                      Follow
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
