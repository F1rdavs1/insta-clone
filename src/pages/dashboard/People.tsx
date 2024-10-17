import Sidebar from "../../components/sidebar/Sidebar";

const People = () => {
  return (
    <div className="w-[100%] flex">
      <div className="w-[20%]">
        <Sidebar />
      </div>
      <div className="w-[50%] bg-[black] overflow-y-auto h-[100vh]"></div>
      <div className="w-[30%] bg-[black] overflow-y-auto h-[100vh]">
        <h1>People</h1>
      </div>
    </div>
  );
};

export default People;
