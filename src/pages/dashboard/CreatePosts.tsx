import { FormEvent, useState } from "react";
import { useCreatePostMutation, useUploadFileMutation } from "../../redux/api/create-api";
import { useNavigate } from "react-router-dom";
import { imageFileTypes } from "../../types";
import CreatePostt from "../../assets/images/CreatePost.svg";
import ImgVideo from "../../assets/images/image-video.png";

function CreatePost() {
  const navigate = useNavigate();
  const [uploadFiles] = useUploadFileMutation();
  const [createPost] = useCreatePostMutation();
  const [imagesOrVideos, setImagesOrVideos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagesOrVideos(Array.from(e.target.files || []));
  };

  const handleMediaPreview = (media: File, index: number) => {
    const mediaUrl = URL.createObjectURL(media);
    return media.type.includes("video") ? (
      <video src={mediaUrl} controls className="w-full h-auto max-w-[300px] object-contain" />
    ) : (
      <img className="w-full h-auto max-w-[300px] object-contain" src={mediaUrl} alt={`media-${index}`} />
    );
  };

  const handleUploadAndCreatePost = async () => {
    setLoading(true); // Start loading
    try {
      const formData = new FormData();
      imagesOrVideos.forEach((img) => formData.append("files", img, img.name));

      const res = await uploadFiles(formData).unwrap();
      const urls = res.files.flat().map((item: { url: string }) => item.url);

      const content = urls.map((url: string) => {
        const type = imageFileTypes.some((t: string) => url.includes(t)) ? "IMAGE" : "VIDEO";
        return { url, type };
      });

      await createPost({ content, location, content_alt: altText, caption }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error uploading files or creating post:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (imagesOrVideos.length > 0) handleUploadAndCreatePost();
  };

  return (
    <section className="w-full h-screen overflow-y-auto py-8 px-4 sm:px-8 md:px-16 lg:px-32 bg-black text-white">
      <div className="flex items-center gap-4 mb-10">
        <img src={CreatePostt} alt="Create Post" width={32} height={32} />
        <h3 className="font-bold text-[32px] leading-[50px] ">Create a Post</h3>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span className="font-medium text-[18px] leading-[25px]">Caption</span>
          <textarea
            required
            rows={4}
            className="bg-[#101012] resize-none p-4 outline-none rounded-[10px]"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </label>
        <label className="flex flex-col gap-2 relative">
          <span className="font-medium text-[18px] leading-[25px] ">Add Photos/Videos</span>
          {imagesOrVideos.length > 0 ? (
            <div className="bg-[#101012] w-full flex-wrap flex gap-3 p-5 md:p-10">
              {imagesOrVideos.map((media, index) => (
                <div className="relative" key={index}>
                  {handleMediaPreview(media, index)}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#101012] rounded-[10px] py-12 relative">
              <div className="flex flex-col items-center justify-center">
                <img src={ImgVideo} alt="Img Video" />
                <h1 className="text-lg font-semibold mt-3 mb-2">Drag photos and videos here</h1>
                <p className="font-normal text-[12px] text-[#5C5C7B]">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="font-semibold text-[12px] px-[20px] py-[10px] rounded-lg bg-[#1F1F22]">Select from computer</span>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
            </div>
          )}
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-[#101012] rounded-[10px] flex items-center p-2 justify-between">
            <input
              required
              className="outline-none bg-transparent w-full p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-medium text-[18px] leading-[25px]">Photo/Video Alt Text</span>
          <input
            required
            className="bg-[#101012] rounded-[10px] p-4 outline-none"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>
        <button 
          type="submit" 
          className={`font-semibold py-[12px] px-[20px] rounded-lg ml-auto ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#877EFF]'}`} 
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Share post'}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
