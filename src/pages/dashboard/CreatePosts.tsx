import CreatePostIcon from "../../assets/images/CreatePost.svg";
import ImageVideo from "../../assets/images/image-video.png";
const CreatePosts = () => {
  return (
    <div className="w-[80%] flex">
      <div className="w-[70%] bg-[black] overflow-y-auto h-[100vh] py-[80px] px-[60px] text-white created-post">
        <div className="flex items-center gap-[20px] mb-[50px] text-white">
          <img
            src={CreatePostIcon}
            alt="CreatePostIcon"
            className="scale-150"
          />
          <p className="text-4xl font-bold">Create a Post</p>
        </div>
        <form className="flex flex-col gap-9">
          <label className="flex flex-col gap-3">
            <h3 className="font-medium text-lg">Caption</h3>
            <textarea
              required
              rows={4}
              className="bg-[#101012] resize-none p-4 outline-none rounded-[10px]"
            ></textarea>
          </label>
          <label className="flex flex-col gap-3  ">
            <h3 className="font-medium text-lg">Add Photos/Videos</h3>
            <div className="py-[48px] relative bg-[#101012] rounded-[10px] cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <img src={ImageVideo} alt="ImageVideo" />
                <h1 className="text-lg font-semibold mt-3 mb-2">
                  Drag photos and videos here
                </h1>
                <p className="text-xs text-light-400">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-[10px] px-[20px] rounded-lg bg-[#1F1F22]">
                    Select from computer
                  </span>
                  <input
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
            </div>
          </label>

          <label className="flex flex-col gap-3">
            <span className="font-medium text-lg">Add Location</span>
            <div className="flex items-center p-2 justify-between bg-[#101012] rounded-[10px]">
              <input
                name="location"
                required
                className="outline-none bg-transparent w-full p-2"
              />
            </div>
          </label>

          <label className="flex flex-col gap-3 ">
            <span className="font-medium text-lg">Photo/Video Alt Text</span>
            <input
              name="content_alt"
              required
              className="p-4 outline-none bg-[#101012] rounded-[10px]"
            />
          </label>
          <button
            type="submit"
            className="font-semibold py-3 px-[20px] bg-[#877EFF] w-fit ml-auto rounded-lg"
          >
            Share Post
          </button>
        </form>
      </div>
      <div className="w-[30%] bg-[black] overflow-y-auto h-[100vh]"></div>
    </div>
  );
};

export default CreatePosts;
