import { FormEvent, useState } from "react";
import {
  useCreatePostMutation,
  useUploadFileMutation,
} from "../../redux/api/create-api";
import { useNavigate } from "react-router-dom";
import { imageFileTypes } from "../../types";
import CreatePostt from "../../assets/images/CreatePost.svg";
import ImgVideo from "../../assets/images/image-video.png";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [uploadFiles] = useUploadFileMutation();
  const [createPost] = useCreatePostMutation();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [postCaption, setPostCaption] = useState<string>("");
  const [postLocation, setPostLocation] = useState<string>("");
  const [mediaAltText, setMediaAltText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onMediaFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMediaFiles(Array.from(e.target.files || []));
  };

  const renderMediaPreview = (media: File, index: number) => {
    const mediaUrl = URL.createObjectURL(media);
    return media.type.includes("video") ? (
      <video
        src={mediaUrl}
        controls
        className="w-full h-auto max-w-[300px] object-contain"
      />
    ) : (
      <img
        className="w-full h-auto max-w-[300px] object-contain"
        src={mediaUrl}
        alt={`media-${index}`}
      />
    );
  };

  const uploadMediaAndCreatePost = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      mediaFiles.forEach((img) => formData.append("files", img, img.name));

      const res = await uploadFiles(formData).unwrap();
      const urls = res.files.flat().map((item: { url: string }) => item.url);

      const content = urls.map((url: string) => {
        const type = imageFileTypes.some((t: string) => url.includes(t))
          ? "IMAGE"
          : "VIDEO";
        return { url, type };
      });

      await createPost({
        content,
        location: postLocation,
        content_alt: mediaAltText,
        caption: postCaption,
      }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Error uploading files", error);
    } finally {
      setIsUploading(false);
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mediaFiles.length > 0) uploadMediaAndCreatePost();
  };

  return (
    <div className="w-[80%] h-screen overflow-y-auto py-4 sm:px-8 md:px-16 lg:px-32 bg-black text-white">
      <div className="flex items-center gap-[10px] mb-[30px]">
        <img src={CreatePostt} alt="Create Post" width={32} height={32} />
        <h3 className="font-bold text-[36px] leading-[50px]">Create a Post</h3>
      </div>
      <form onSubmit={onFormSubmit} className="flex flex-col gap-[20px]">
        <label className="flex flex-col gap-[6px]">
          <strong className="font-medium text-[18px] leading-[25px]">Caption</strong>
          <textarea
            required
            rows={4}
            className="bg-[#101012] resize-none p-[12px] outline-none rounded-[10px]"
            value={postCaption}
            onChange={(e) => setPostCaption(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-[8px] relative">
          <strong className="font-medium text-[18px] leading-[25px] ">Add Photos/Videos</strong>
          {mediaFiles.length > 0 ? (
            <div className="bg-[#101012] w-full flex-wrap flex gap-3 p-5 md:p-10">
              {mediaFiles.map((media, index) => (
                <div className="relative" key={index}>
                  {renderMediaPreview(media, index)}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#101012] rounded-[10px] py-12 relative">
              <div className="flex flex-col items-center justify-center">
                <img src={ImgVideo} alt="Media" width={96} height={77} />
                <h3 className="font-semibold text-[18px] mt-[12px] mb-[8px]">
                  Drag photos and videos here
                </h3>
                <p className="font-normal text-[12px] text-[#5C5C7B]">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
                <label htmlFor="select" className="mt-4 cursor-pointer">
                  <strong className="font-semibold text-[12px] px-[20px] py-[10px] rounded-lg bg-[#1F1F22]">
                    Select from computer
                  </strong>
                  <input
                    className="rounded-[10px]"
                    onChange={onMediaFilesChange}
                    type="file"
                    id="select"
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
          <strong className="font-medium text-lg">Add Location</strong>
          <div className="bg-[#101012] rounded-[10px] flex items-center p-2 justify-between">
            <input
              required
              className="outline-none bg-[#101012] w-full p-2"
              value={postLocation}
              onChange={(e) => setPostLocation(e.target.value)}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <strong className="font-medium text-[18px] leading-[25px]">Photo/Video Alt Text</strong>
          <input
            required
            className="bg-[#101012] rounded-[10px] p-4 outline-none"
            value={mediaAltText}
            onChange={(e) => setMediaAltText(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className={`font-semibold py-[12px] px-[20px] rounded-lg ml-auto ${
            isUploading ? "bg-gray-600 cursor-not-allowed" : "bg-[#877EFF]"
          }`}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Share post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
