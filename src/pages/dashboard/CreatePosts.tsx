import CreatePostIcon from "../../assets/images/CreatePost.svg";
import ImageVideo from "../../assets/images/image-video.png";
import { useState, useRef } from "react";
import {
  useCreatePostMutation,
  useUploadFileMutation,
} from "../../redux/api/create-api";
import { useNavigate } from "react-router-dom";

const CreatePosts = () => {
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFiles] = useUploadFileMutation();
  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleUpload();
    clearForm();
    navigate("/");
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const uploadResponse = await uploadFiles(formData).unwrap();
      const fileUrls = uploadResponse.files.map(
        (fileArr: any[]) => fileArr[0].url
      );

      await createPost({
        content: fileUrls,
        content_alt: altText,
        caption,
        location,
      }).unwrap();
    }
  };

  const clearForm = () => {
    setCaption("");
    setLocation("");
    setAltText("");
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isFormValid =
    caption.trim() && location.trim() && altText.trim() && files.length > 0;

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
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex flex-col gap-9"
        >
          <label className="flex flex-col gap-3">
            <h3 className="font-medium text-lg">Caption</h3>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              rows={4}
              className="bg-[#101012] resize-none p-4 outline-none rounded-[10px]"
            ></textarea>
          </label>

          <label className="flex flex-col gap-3  ">
            <h3 className="font-medium text-lg">Add Photos/Videos</h3>
            <div className="py-[48px] relative bg-[#101012] rounded-[10px] cursor-pointer">
              {files.length > 0 ? (
                <div className="flex gap-3 flex-col">
                  <div className="flex gap-3 items-center justify-center">
                    {files.map((file) => (
                      <img
                        className="w-[100px] h-[100px] object-cover"
                        key={file.name}
                        src={URL.createObjectURL(file)}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 flex flex-col gap-3">
                  <img
                    src={ImageVideo}
                    alt="Image"
                    width={96}
                    height={77}
                    className="mx-auto"
                  />
                  <p>Drag photos and videos here</p>
                  <p className="text-sm">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                  <button
                    type="button"
                    onClick={handleSelectImage}
                    className="bg-[#1F1F22] w-[166px] mx-auto text-white px-4 py-2 rounded-md "
                  >
                    Select Image
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                multiple
              />
            </div>
          </label>

          <label className="flex flex-col gap-3">
            <span className="font-medium text-lg">Add Location</span>
            <div className="flex items-center p-2 justify-between bg-[#101012] rounded-[10px]">
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                name="location"
                required
                className="outline-none bg-transparent w-full p-2"
              />
            </div>
          </label>

          <label className="flex flex-col gap-3 ">
            <span className="font-medium text-lg">Photo/Video Alt Text</span>
            <input
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              name="content_alt"
              required
              className="p-4 outline-none bg-[#101012] rounded-[10px]"
            />
          </label>

          <button
            type="submit"
            disabled={!isFormValid}
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
