import { useNavigate } from "react-router-dom";
import TopCreators from "../../components/topCreators/TopCreators";
import { useGetPostsQuery } from "../../redux/api/create-api";
import { format } from "date-fns";
import Avatar from "../../assets/images/user.png";
import { useGetFollowUsersQuery } from "../../redux/api/user-slice";
import SortIcon from "../../assets/images/Sort.svg";
import { Follower, Post, PostContent } from "../../types";

const Home = () => {
  const navigate = useNavigate();

  const currentusername: string | null =
    window.localStorage.getItem("userData") !== null
      ? JSON.parse(window.localStorage.getItem("userData") as string).username
      : null;

  const { data: feed } = useGetPostsQuery(true);
  const { data: userData } = useGetFollowUsersQuery(currentusername);

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[80%] mx-auto">
      <div className="flex-1 bg-[#000000] overflow-y-auto h-[100vh] pt-[60px]">
        <div className="flex items-center gap-[17px] w-[90vh] overflow-x-auto mx-auto stories">
          {userData?.following?.map((follower: Follower, ind: number) => (
            <div
              key={ind}
              className="flex flex-col items-center w-[80px] h-[72px] pl-[5px] cursor-pointer"
              onClick={() => handleProfileClick(follower.username)}
            >
              <img
                className="w-[45px] h-[45px] border-[3px] border-[#3728FF] rounded-[50%] "
                src={Avatar}
                alt="User"
              />
              <h3 className="text-white text-sm font-semibold pt-1 text-center">
                {follower.username.length > 11
                  ? `${follower.username.substring(
                      0,
                      5
                    )}...${follower.username.substring(
                      follower.username.length - 5
                    )}`
                  : follower.username}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-[53px] md:px-[70px] text-white py-[42px]">
          <h2 className="font-bold text-[30px] leading-[42px] ">Home Feed</h2>
          <div className="flex items-center gap-[10px]">
            <span className="font-medium text-[16px] leading-[22.4px]">
              All
            </span>
            <button>
              <img src={SortIcon} alt="Sort" width={20} height={20}/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 px-[20px] md:px-[40px]">
          {feed?.posts?.map((post: Post, index: number) => (
            <div
              key={index}
              className="bg-[#09090A] w-full max-w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform p-[36px] border border-[#1F1F22]"
            >
              <div className="space-y-[20px] mb-[30px]">
                <div className="flex items-center">
                  <img
                    className="w-[50px] h-[50px] rounded-full"
                    src={post?.owner?.photo ? post.owner.photo : Avatar}
                    alt="Profile Image"
                    width={50}
                    height={50}
                  />
                  <div className="ml-4">
                    <h3 className="text-white font-semibold text-[18px] leading-[25px] ">
                      {post.owner.username}
                    </h3>
                    <strong className="font-bold text-[14px] leading-[19.6px] text-[#7878A3]">
                      {format(new Date(post.createdAt), "d MMMM 'at' hh:mm a")}
                    </strong>
                  </div>
                </div>

                <h3 className="font-semibold text-[16px] leading-[22.4px] text-white">
                  {post.content_alt}
                </h3>
              </div>

              {post?.content?.map((item: PostContent, i: number) => {
                switch (item.type) {
                  case "IMAGE":
                    return (
                      <img
                        key={i}
                        src={item.url}
                        alt="Post Image"
                        className="w-full rounded-[30px] h-[auto] object-cover"
                      />
                    );
                  case "VIDEO":
                    return (
                      <video
                        key={i}
                        className="w-full rounded-[30px] h-[auto]"
                        controls
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    );
                  default:
                    return null;
                }
              })}

              {/* <div className="p-4">
                <h2 className="text-white text-lg font-bold">{post.caption}</h2>
                {post.location && (
                  <p className="text-gray-400">Location: {post.location}</p>
                )}
              </div> */}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[30%] overflow-y-auto h-[100vh] bg-[#09090A] border-l px-[20px] md:px-[24px]">
        <TopCreators />
      </div>
    </div>
  );
};

export default Home;
