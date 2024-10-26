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
import Loader from "../../components/Loading/Loading";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const storedUserData = window.localStorage.getItem("userData");
  const sessionUserData = storedUserData ? JSON.parse(storedUserData) : null;
  const sessionUserName = sessionUserData?.username || null;

  const [likePost, { isLoading: isLikingPost }] = useLikePostMutation();
  const {
    data: feedPosts,
    refetch: refetchFeed,
    isLoading: isFeedLoading,
  } = useGetPostsQuery(true);
  const { data: followingUsersData } = useGetFollowUsersQuery(sessionUserName);
  const [likedPostsState, setLikedPostsState] = useState<
    Record<number, boolean>
  >({});

  useEffect(() => {
    const storedLikes = localStorage.getItem("likedPosts");
    if (storedLikes) {
      setLikedPostsState(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPostsState));
  }, [likedPostsState]);

  const handleProfileNavigation = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handleLikeToggle = async (postId: number) => {
    try {
      await likePost(postId).unwrap();
      setLikedPostsState((prevLikes) => {
        const wasLiked = prevLikes[postId] || false;
        return {
          ...prevLikes,
          [postId]: !wasLiked,
        };
      });
      refetchFeed();
    } catch (error) {
      console.error("Like action failed:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-[80%] mx-auto">
      <div className="flex-1 bg-[#000000] overflow-y-auto h-[100vh] pt-[60px] relative">
        {isFeedLoading && <Loader width="100%" height="100%" />}{" "}
        <div className="flex items-center gap-[17px] w-[90vh] overflow-x-auto mx-auto stories">
          {followingUsersData?.following?.map(
            (follower: Follower, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center w-[80px] h-[72px] pl-[5px] cursor-pointer"
                onClick={() => handleProfileNavigation(follower.username)}
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
          {feedPosts?.posts?.map((post: Post) => {
            const isPostLiked = likedPostsState[post._id];

            return (
              <div
                key={post._id}
                className="bg-[#09090A] w-full max-w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform p-[36px] border border-[#1F1F22]"
              >
                <div>
                  <div className="space-y-[20px] mb-[30px]">
                    <div className="flex items-center">
                      <img
                        className="w-[50px] h-[50px] cursor-pointer rounded-[50%]"
                        src={post?.owner?.photo || Avatar}
                        alt="Profile Image"
                        onClick={() =>
                          handleProfileNavigation(post.owner.username)
                        }
                      />
                      <div className="ml-4">
                        <h3
                          className="text-white font-semibold text-[18px] leading-[25px] cursor-pointer"
                          onClick={() =>
                            handleProfileNavigation(post.owner.username)
                          }
                        >
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

                  {post?.content?.map((item: PostContent, index: number) => {
                    switch (item.type) {
                      case "IMAGE":
                        return (
                          <img
                            key={index}
                            src={item.url}
                            alt="Post Image"
                            className="w-full rounded-[30px] h-[auto] object-cover"
                          />
                        );
                      case "VIDEO":
                        return (
                          <video
                            key={index}
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
                        onClick={() => handleLikeToggle(post._id)}
                      >
                        {isLikingPost ? (
                          <div>Load..</div>
                        ) : isPostLiked ? (
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
                    <div className="relative flex items-center bg-dark-300 w-full rounded-lg overflow-hidden py-[11px] px-4">
                      <input
                        name="comment"
                        type="text"
                        placeholder="Write your comment..."
                        className="w-full outline-none pl-[16px] rounded-[8px] py-[11px] bg-[#101012] placeholder:text-[#5C5C7B] text-white"
                      />
                      <div className="absolute right-4">
                        <img
                          src={TelegramIcon}
                          alt="Send"
                          className="cursor-pointer"
                          width={20}
                          height={20}
                        />
                      </div>
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
