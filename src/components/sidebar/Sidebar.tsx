import { NavLink, useNavigate } from "react-router-dom";
import SnapGramIcon from "../../assets/images/snapgramIcon.svg";
import { useGetUserQuery } from "../../redux/api/user-slice";
import NavbarHome from "../../assets/images/home-icon.svg";
import NavbarExplore from "../../assets/images/Explore.svg";
import NavbarPeople from "../../assets/images/People.svg";
import NavbarSaved from "../../assets/images/Saved.svg";
import Avatar from "../../assets/images/user.png";
import NavbarReels from "../../assets/images/Reels.svg";
import NavbarChats from "../../assets/images/chats.svg";
import NavbarCreatePost from "../../assets/images/CreatePost.svg";
import NavbarLogOut from "../../assets/images/Logout.svg";
import NavbarSettings from "../../assets/images/Settings.svg";
import { Modal, Spin } from "antd";
import { useState } from "react";

const Sidebar = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = userData?.username || "";
  const { data } = useGetUserQuery(username);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProfileClick = () => {
    setTimeout(() => { 
      navigate(`/profile/${userData?.username}`);
      setLoading(false);
    }, 500); 
  };

  return (
    <>
      <div className="bg-[#09090A] h-[100vh] overflow-y-auto sidebar py-[20px] w-[20%]">
        <div className="flex items-center gap-[8px] pl-[16px]">
          <img src={SnapGramIcon} alt="Snapgram" />
          <h2 className="font-bold text-[28px] leading-[36px] text-white">
            Snapgram
          </h2>
        </div>
        <div
          className="flex items-center gap-[5px] py-[20px] pl-[16px] cursor-pointer my-profile"
          onClick={handleProfileClick}
        >
          <img
            className="w-[56px] h-[56px] rounded-[50%]"
            src={Avatar}
            alt="Avatar"
            width={56}
            height={56}
          />
          <div className="">
            <h3 className="text-white font-bold text-[24px] pt-[20px]">
              {data?.fullName || userData?.username}
            </h3>
            <h3 className="text-slate-400 font-bold text-[16px]">
              @{data?.username || userData?.username}
            </h3>
          </div>
        </div>
        <div className="space-y-[10px] mx-[20px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarHome} alt="Home icon" />
            Home
          </NavLink>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarExplore} alt="Explore" />
            Explore
          </NavLink>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarPeople} alt="People" />
            People
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarSaved} alt="Saved" />
            Saved
          </NavLink>
          <NavLink
            to="/reels"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarReels} alt="Reels" />
            Reels
          </NavLink>
          <NavLink
            to="/chats"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarChats} alt="Chats" />
            Chats
          </NavLink>
          <NavLink
            to="/create-post"
            className={({ isActive }) =>
              isActive
                ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
            }
          >
            <img src={NavbarCreatePost} alt="Create Post" />
            Create Post
          </NavLink>

          <div className="pt-[40px] space-y-[10px]">
            <button
              onClick={showModal}
              className=" px-4 py-2 w-full rounded-lg text-lg hover:bg-[red]  text-[#EFEFEF] font-medium flex items-center gap-x-4"
            >
              <img src={NavbarLogOut} alt="Logout" />
              Log Out
            </button>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#877EFF] text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md duration-200"
                  : "text-white flex items-center gap-[16px] py-[10px] pl-[16px] rounded-md hover:bg-[#877EFF] duration-200"
              }
            >
              <img src={NavbarSettings} alt="Settings" />
              Settings
            </NavLink>
          </div>
        </div>
      </div>

      <Modal
        title="Log Out"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      {loading && (
        <div className="loading-overlay w-[80%] ">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
