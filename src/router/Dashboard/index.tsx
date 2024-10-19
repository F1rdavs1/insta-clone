import { Routes, Route } from "react-router-dom";
import { SuspenseComponent as Suspense } from "../../utils";
import { LazyExoticComponent, lazy } from "react";
import Sidebar from "../../components/sidebar/Sidebar";

const Home: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Home")
);
const Explore: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Explore")
);
const People: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/People")
);
const Saved: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Saved")
);
const Reels: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Reels")
);
const Chats: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Chats")
);
const CreatePosts: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/CreatePosts")
);
const Settings: LazyExoticComponent<any> = lazy(
  () => import("../../pages/dashboard/Settings")
);

const DashboardRoutes = () => {
  return (
    <main className="flex w-[100%]">
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/explore"
          element={
            <Suspense>
              <Explore />
            </Suspense>
          }
        />
        <Route
          path="/people"
          element={
            <Suspense>
              <People />
            </Suspense>
          }
        />
        <Route
          path="/saved"
          element={
            <Suspense>
              <Saved />
            </Suspense>
          }
        />
        <Route
          path="/reels"
          element={
            <Suspense>
              <Reels />
            </Suspense>
          }
        />
        <Route
          path="/chats"
          element={
            <Suspense>
              <Chats />
            </Suspense>
          }
        />
        <Route
          path="/create-post"
          element={
            <Suspense>
              <CreatePosts />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense>
              <Settings />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
};

export default DashboardRoutes;
