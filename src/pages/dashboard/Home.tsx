import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopCreators from "../../components/topCreators/TopCreators";
import { useGetPostsQuery } from "../../redux/api/create-api";
import { format } from "date-fns";
import Avatar from "../../assets/images/user.png";
import {
  useGetFollowUsersQuery,
  useLikePostMutation,
} from "../../redux/api/user-slice";
import SortIcon from "../../assets/images/Sort.svg";
import { LikeIcon, LikedIcon } from "../../assets/images";
import CommentIcon from "../../assets/images/Comment-icon.svg";
import ForwardIcon from "../../assets/images/Forward.svg";
import BookmarkIcon from "../../assets/images/Bookmark.svg";
import TelegramIcon from "../../assets/images/Telegram-icon.svg";
import { Follower, Post, PostContent } from "../../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const storedUserData = window.localStorage.getItem("userData");
  const currentUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const currentusername = currentUserData?.username || null;

  const [likePost, { isLoading }] = useLikePostMutation();
  const { data: feed, refetch } = useGetPostsQuery(true);
  const { data: followUsersData } = useGetFollowUsersQuery(currentusername);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedPosts");
    if (storedLikes) {
      setLikedPosts(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const handleProfileClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const toggleLike = async (postId: number) => {
    try {
      await likePost(postId).unwrap();

      setLikedPosts((prev) => {
        const isLiked = prev[postId] || false;
        return {
          ...prev,
          [postId]: !isLiked,
        };
      });

      refetch();
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[80%] mx-auto">
      <div className="flex-1 bg-[#000000] overflow-y-auto h-[100vh] pt-[60px]">
        <div className="flex items-center gap-[17px] w-[90vh] overflow-x-auto mx-auto stories">
          {followUsersData?.following?.map(
            (follower: Follower, ind: number) => (
              <div
                key={ind}
                className="flex flex-col items-center w-[80px] h-[72px] pl-[5px] cursor-pointer"
                onClick={() => handleProfileClick(follower.username)}
              >
                <img
                  className="w-[45px] h-[45px] border-[3px] border-[#3728FF] rounded-[50%]"
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
            )
          )}
        </div>

        <div className="flex items-center justify-between px-[53px] md:px-[70px] text-white py-[42px]">
          <h2 className="font-bold text-[30px] leading-[42px]">Home Feed</h2>
          <div className="flex items-center gap-[10px]">
            <span className="font-medium text-[16px] leading-[22.4px]">
              All
            </span>
            <button>
              <img src={SortIcon} alt="Sort" width={20} height={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 px-[20px] md:px-[40px]">
          {feed?.posts?.map((post: Post) => {
            const isLiked = likedPosts[post._id];

            return (
              <div
                key={post._id}
                className="bg-[#09090A] w-full max-w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform p-[36px] border border-[#1F1F22]"
              >
                <div>
                  <div className="space-y-[20px] mb-[30px]">
                    <div className="flex items-center">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={post?.owner?.photo || Avatar}
                        alt="Profile Image"
                        width={50}
                        height={50}
                      />
                      <div className="ml-4">
                        <h3 className="text-white font-semibold text-[18px] leading-[25px] ">
                          {post.owner.username}
                        </h3>
                        <strong className="font-bold text-[14px] leading-[19.6px] text-[#7878A3]">
                          {format(
                            new Date(post.createdAt),
                            "d MMMM 'at' hh:mm a"
                          )}
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

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-[30px]">
                      <ul
                        className="text-white flex items-center gap-[6px] cursor-pointer"
                        onClick={() => toggleLike(post._id)}
                      >
                        {isLoading ? (
                          <div className="loader">Load..</div>
                        ) : isLiked ? (
                          <LikedIcon />
                        ) : (
                          <LikeIcon />
                        )}
                        <span className="like-count">
                          {post.likes?.length || 0}
                        </span>
                      </ul>

                      <ul className="text-white flex items-center gap-[6px]">
                        <img
                          className="w-[20px] h-[20px]"
                          src={CommentIcon}
                          alt="Comment"
                          width={20}
                          height={20}
                        />
                        <span>{post.comments?.length || 0}</span>
                      </ul>
                      <ul className="text-white flex items-center gap-[6px]">
                        <img
                          className="w-[20px] h-[20px]"
                          src={ForwardIcon}
                          alt="Forward"
                          width={20}
                          height={20}
                        />
                        <span>{post.shares_count || 0}</span>
                      </ul>
                    </div>
                    <img
                      className="w-[20px] h-[20px]"
                      src={BookmarkIcon}
                      alt="Bookmark"
                      width={20}
                      height={20}
                    />
                  </div>

                  <form
                    autoComplete="off"
                    className="flex items-center mt-[40px] gap-[11px]"
                  >
                    <img
                      className="size-[40px] rounded-full object-cover"
                      src={post?.owner?.photo || Avatar}
                    />
                    <div className="relative bg-dark-300 w-full rounded-lg overflow-hidden py-[11px] px-4">
                      <input
                        name="comment"
                        type="text"
                        placeholder="Write your comment..."
                        className="w-full outline-none pl-[16px] rounded-[8px] py-[11px] placeholder:text-[#5C5C7B] bg-[#101012] text-white"
                      />
                      <button className="absolute right-8 top-6" type="submit">
                        <img
                          className="size-[20px]"
                          src={TelegramIcon}
                          alt="Telegram"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full lg:w-[30%] overflow-y-auto h-[100vh] bg-[#09090A] border-l px-[20px] md:px-[24px]">
        <TopCreators />
      </div>
    </div>
  );
};

export default Home;
