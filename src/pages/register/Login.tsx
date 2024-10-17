import LoginPage from "../../assets/images/login.png";
import googleIcon from "../../assets/images/google-icon.svg";
import SnapgramIcon from "../../assets/images/snapgramIcon.svg";
import { useLoginMutation } from "../../redux/api/user-slice";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/slice/auth-slice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Login = () => {
  const [loginUser] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDataToJson = Object.fromEntries(formData);

    try {
      const res = await loginUser(formDataToJson).unwrap();
      dispatch(setToken(res.accessToken));
      dispatch(setUser(res.user));
      context?.setToken(res.accessToken);

      
      window.localStorage.setItem("userData", JSON.stringify(formDataToJson));

      navigate("/");
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const handleSignUp = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      <div className="flex flex-col justify-center items-center min-w-[500px] p-10 mx-auto sm:w-full sm:max-w-md lg:w-1/2">
        <div className="flex items-center gap-2 mb-10">
          <img src={SnapgramIcon} alt="Snapgram" width={30} height={30} />
          <h2 className="font-bold text-2xl leading-9">Snapgram</h2>
        </div>
        <h2 className="text-3xl font-bold text-center leading-10">
          Log in to your account
        </h2>
        <p className="font-normal text-base leading-6 text-[#7878A3] mt-3 mb-8">
          Welcome back! Please enter your details.
        </p>
        <form autoComplete="off" className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label>
              <h3 className="font-medium text-base leading-6 text-[#EFEFEF] mb-3">
                Username
              </h3>
              <input
                type="text"
                className="w-[400px] px-4 py-3 text-sm bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your username"
                name="username"
              />
            </label>
          </div>

          <div className="relative mt-5 mb-7">
            <label>
              <h3 className="font-medium text-base leading-6 text-[#EFEFEF] mb-3">
                Password
              </h3>
              <input
                type="password"
                className="w-full px-4 py-3 text-sm bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your password"
                name="password"
              />
            </label>
          </div>

          <button
            className="w-full py-3 bg-purple-600 rounded-lg text-white font-semibold text-base leading-6 hover:bg-purple-700 transition duration-200"
            type="submit"
          >
            Log In
          </button>
        </form>
        <button
          className="flex justify-center items-center gap-3 w-full py-3 bg-white rounded-lg text-black font-semibold text-base leading-6 mt-5 mb-8 hover:bg-[#cdc9c9] transition duration-300"
          type="button"
        >
          <img src={googleIcon} alt="Google Icon" width={24} height={24} />
          Sign in with Google
        </button>
        <p className="mt-4 text-gray-400 text-center">
          Don’t have an account?{" "}
          <button onClick={handleSignUp} className="text-blue-500 hover:underline">
            Sign up
          </button>
        </p>
      </div>

      <div className="hidden lg:flex w-full lg:w-1/2">
        <img
          className="h-screen w-full object-cover"
          src={LoginPage}
          alt="Login"
        />
      </div>
    </div>
  );
};

export default Login;
