import { Routes, Route } from "react-router-dom";
import {
  Home,
  Explore,
  People,
  Saved,
  Reels,
  Chats,
  CreatePosts,
  Settings,
} from "../../pages/dashboard";

const DashboardRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/people" element={<People />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/create-post" element={<CreatePosts />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default DashboardRoutes;
