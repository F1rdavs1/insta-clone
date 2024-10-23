import TopCreators from "../../components/topCreators/TopCreators";
import { useGetPostsQuery } from "../../redux/api/create-api";
import { format } from "date-fns";
import Avatar from "../../assets/images/user.png";

const Home = () => {
  const { data: feed } = useGetPostsQuery(true);

  return (
    <div className="w-[80%] flex justify-between">
      <div className="w-[70%] bg-[#000000] overflow-y-auto h-[100vh]">
        <div className="grid grid-cols-1 gap-10 py-[40px] px-[40px]">
          {feed?.posts?.map((post: any, index: number) => (
            <div
              key={index}
              className="bg-[#09090A] w-[700px] mx-auto rounded-xl overflow-hidden shadow-lg transition-transform px-[29px] py-[36px] border border-[#1F1F22]"
            >
              <div className="space-y-[20px] mb-[30px]">
                <div className="flex items-center">
                  <img
                    className="text-white w-[50px] h-[50px] rounded-[50%]"
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

                <h3 className="font-semibold text-[16px] leading-[22.4px]  text-white">
                  {post.content_alt}
                </h3>
              </div>

              {post?.content?.map((item: any, i: number) => {
                switch (item.type) {
                  case "IMAGE":
                    return (
                      <img
                        key={i}
                        src={item.url}
                        alt="Post Image"
                        className="w-full rounded-[30px] h-[520px] object-cover"
                      />
                    );
                  case "VIDEO":
                    return (
                      <video
                        key={i}
                        className="w-full rounded-[30px] h-[520px]"
                        controls
                      >
                        <source src={item.url} type="video/mp4" />
                      </video>
                    );
                  default:
                    return null;
                }
              })}

              <div className="p-4">
                <h2 className="text-white text-lg font-bold">{post.caption}</h2>
                {post.location && (
                  <p className="text-gray-400">Location: {post.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[30%] overflow-y-auto h-[100vh] bg-[#09090A] border-l px-[24px]">
        <TopCreators />
      </div>
    </div>
  );
};

export default Home;
