import { NavLink, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../redux/api/user-slice";
import Avatar from "../../../assets/images/user.png";
import EditIcon from "../../../assets/images/edit-icon.svg";
import Stories from "../../../components/Stories/Stories";
import GalleryIcon from "../../../assets/images/Gallery.svg";
import ReelsIcon from "../../../assets/images/reels-icon.svg";
import TaggedIcon from "../../../assets/images/Tag.svg";
import SortIcon from "../../../assets/images/Sort.svg";
import { useGetAllUserPostsQuery } from "../../../redux/api/create-api";
import "../../../App.css";

const MyProfile: React.FC = () => {
  const { username } = useParams();

  const { data: user, isLoading } = useGetUserQuery(username);

  const sessionUser = JSON.parse(
    window.localStorage.getItem("userData") as string
  );
  const sessionUserName = sessionUser?.username || null;

  const { data: userPosts } = useGetAllUserPostsQuery(sessionUserName);

  return (
    <div
      className={`profile-detail ${
        isLoading ? "bg-white" : "bg-[#000000]"
      } w-[80%] px-[60px]`}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-y-auto h-[100vh] profile-scroll">
          <div className="flex pt-[80px] gap-[32px]">
            <div>
              <img
                src={user.photo || Avatar}
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
                <NavLink
                  to={`/my-profile/${user.username}/edit`}
                  className="flex items-center gap-[7px] py-[10px] bg-[#101012] rounded-[8px] px-[20px]"
                >
                  <img src={EditIcon} alt="Edit" />
                  <span className="text-white">Edit Profile</span>
                </NavLink>
              </div>
              <p className="text-[#7878A3] font-normal text-[18px] leading-[25.2px] mb-[18px]">
                @{user.username}
              </p>
              <div className="flex items-center gap-[40px] mb-[20px]">
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
              <div className="text-white">
                <h3>No bio...</h3>
              </div>
              <Stories />
            </div>
          </div>
          <div className="flex justify-between mb-[50px]">
            <div className="flex items-center">
              <NavLink
                to={`/my-profile/${user.username}`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ rounded-l-[10px]"
              >
                <img src={GalleryIcon} alt="Gallery" />
                <span>Posts</span>
              </NavLink>
              <NavLink
                to={`#`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ"
              >
                <img src={ReelsIcon} alt="Reels" />
                <span>Reels</span>
              </NavLink>
              <NavLink
                to={`#`}
                className="bg-[#09090A] text-white flex items-center gap-[10px] px-[50px] py-[13px] activ rounded-r-[10px]"
              >
                <img src={TaggedIcon} alt="Tagged" />
                <span>Tagged</span>
              </NavLink>
            </div>
            <div className="flex items-center gap-[10px] hover:scale-105 duration-150 cursor-pointer">
              <span className="font-medium text-[16px] leading-[22.4px] text-white">
                All
              </span>
              <button>
                <img src={SortIcon} alt="Sort" width={20} height={20} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[20px]">
            {userPosts?.map((post: any, index: number) => (
              <div key={index} className="shadow-lg">
                {post?.content[0]?.type === "IMAGE" ? (
                  <img
                    src={post?.content[0]?.url}
                    alt={post?.content_alt || "Post image"}
                    className="w-[330px] h-[315px] object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <video controls src={post?.content[0]?.url}></video>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
