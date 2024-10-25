import { EditWhiteIcon } from "../../../assets/images";
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/user-slice";
import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../../assets/images/user.png";

const EditProfile: React.FC = () => {
  const { data: userProfile } = useGetUserProfileQuery(true);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const navigate = useNavigate();

  const updateUserProfile = async (formData: FormData) => {
    const userProfileData = {
      full_name: formData.get("full_name")?.toString(),
      username: formData.get("username")?.toString(),
      email: formData.get("email")?.toString(),
      bio: formData.get("bio")?.toString(),
    };

    try {
      await updateProfile(userProfileData).unwrap();
      return true; 
    } catch (error) {
      console.error("Error updating profile:", error);
      return false; 
    }
  };

  const onSubmitProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const isUpdated = await updateUserProfile(formData);
    if (isUpdated) {
      navigate(`/`);
    } else {
      alert("Profile update failed. Please try again.");
    }
  };

  return (
    <div className="w-[80%] bg-black text-white overflow-y-auto h-[100vh] px-[60px] py-[20px]">
      {userProfile && (
        <div>
          <div className="flex items-center gap-[10px] mb-[20px]">
            <div className="scale-150">
              <EditWhiteIcon />
            </div>
            <h2 className="font-bold text-[36px] leading-[50px]">
              Edit Profile
            </h2>
          </div>
          <form
            autoComplete="off"
            onSubmit={onSubmitProfileUpdate}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-[14px]">
              <img
                className="w-[100px] h-[100px] object-cover rounded-[50%] "
                src={userProfile.photo || Avatar}
                alt="Profile"
              />
              <span className="font-semibold text-[18px] leading-[25px] text-[#0095F6]">
                Change profile photo
              </span>
            </div>

            <label className="flex flex-col gap-1 w-full">
              <span className="text-lg font-medium">Name</span>
              <input
                type="text"
                name="full_name"
                defaultValue={userProfile.fullName}
                required
                className="w-full bg-[#101012] rounded-[10px] outline-none py-4 px-5 font-semibold bg-dark-300 text-white"
              />
            </label>

            <label className="flex flex-col gap-1 w-full">
              <span className="text-lg font-medium">Username</span>
              <div className="flex items-center bg-dark-300">
                <input
                  type="text"
                  name="username"
                  defaultValue={userProfile.username}
                  required
                  className="w-full bg-[#101012] rounded-[10px] outline-none py-4 px-5 font-semibold text-white"
                />
              </div>
            </label>

            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Email</span>
              <input
                type="email"
                name="email"
                defaultValue={userProfile.email}
                required
                className="w-full bg-[#101012] rounded-[10px] outline-none py-4 px-5 font-semibold bg-dark-300 text-white"
              />
            </label>

            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Bio</span>
              <textarea
                name="bio"
                defaultValue={userProfile.bio}
                rows={3}
                className="w-full bg-[#101012] rounded-[10px] outline-none py-1.5 px-5 font-semibold bg-dark-300 text-white resize-none"
              ></textarea>
            </label>

            <button
              type="submit"
              className="ml-auto py-3 mt-5 rounded-lg px-5 bg-[#877EFF] font-semibold"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
