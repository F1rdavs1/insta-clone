import Sidebar from "../../components/sidebar/Sidebar";
import TopCreators from "../../components/topCreators/TopCreators";

const Home = () => {
  return (
    <>
      <div className="w-[100%] flex justify-between">
        <div className="w-[20%]">
          <Sidebar />
        </div>

        <div className="w-[50%] bg-[#000000] overflow-y-auto h-[100vh]"></div>

        <div className="w-[30%] overflow-y-auto h-[100vh] bg-[#09090A] border-l-[1px] px-[24px] top-creators">
          <TopCreators /> 
        </div>
      </div>
    </>
  );
};

export default Home;
