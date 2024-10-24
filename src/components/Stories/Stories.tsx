import StoryLogo1 from "../../assets/images/profile-detail-logo1.svg";
import StoryLogo2 from "../../assets/images/profile-detail-logo2.svg";
import StoryLogo3 from "../../assets/images/profile-detail-logo3.svg";
import StoryLogo4 from "../../assets/images/profile-detail-logo4.svg";
import StoryLogo5 from "../../assets/images/profile-detail-logo5.svg";
import StoryLogo6 from "../../assets/images/profile-detail-logo6.svg";

const Stories = () => {
  return (
    <ul className="flex items-center gap-[30px] mt-[32px] mb-[69px]">
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo1} alt="Story" width={80} height={72} />
      <span className="text-white">JSM Pro</span>
    </li>
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo2} alt="Story" width={80} height={72} />
      <span className="text-white">React Course</span>
    </li>
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo3} alt="Story" width={80} height={72} />
      <span className="text-white">Web3 Course</span>
    </li>
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo4} alt="Story" width={80} height={72} />
      <span className="text-white">JS Course</span>
    </li>
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo5} alt="Story" width={80} height={72} />
      <span className="text-white">Masterclass</span>
    </li>
    <li className="flex flex-col gap-[6px] text-center cursor-pointer">
      <img src={StoryLogo6} alt="Story" width={80} height={72} />
      <span className="text-white">FAQ</span>
    </li>
  </ul>
  )
};

export default Stories;
