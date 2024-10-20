import LoginPage from "../../assets/images/login.png";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/images/google-icon.svg";
import { FormEvent, useState } from "react";
import { useRegisterMutation } from "../../redux/api/user-slice";
import type { Register as RegisterType } from "../../types";

const Register = () => {
  const navigate = useNavigate();
  const [createUser] = useRegisterMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const full_name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const data: RegisterType = {
      full_name,
      username,
      email,
      password,
      photo: null,
    };

    try {
      const response = await createUser(data).unwrap();
      console.log("Registration successful:", response);
      navigate("/login");
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        <div className="p-8 rounded-lg shadow-lg max-w-md w-full bg-black">
          <h2 className="text-3xl leading-10 font-bold mb-4 text-center">
            Create a new account
          </h2>
          <p className="text-gray-400 mt-3 mb-6 text-center">
            To use Snapgram, please enter your details.
          </p>
          {errorMessage && (
            <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
          )}
          <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
            <label>
              <h2 className="font-medium text-lg leading-6 text-white mb-2">
                Name
              </h2>
              <input
                type="text"
                className="w-full px-4 py-3 text-sm bg-[#1F1F22] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                name="name"
                required
              />
            </label>

            <label>
              <h2 className="font-medium text-lg leading-6 text-white mt-[20px] mb-2">
                Username
              </h2>
              <input
                type="text"
                className="w-full px-4 py-3 text-sm bg-[#1F1F22] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                name="username"
                required
              />
            </label>

            <label>
              <h2 className="font-medium text-lg leading-6 text-white mt-[20px] mb-2">
                Email
              </h2>
              <input
                type="email"
                className="w-full px-4 py-3 text-sm bg-[#1F1F22] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                name="email"
                required
              />
            </label>

            <label>
              <h2 className="font-medium text-lg leading-6 text-white mt-[20px] mb-2">
                Password
              </h2>
              <input
                type="password"
                className="w-full px-4 py-3 text-sm bg-[#1F1F22] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 mb-6"
                name="password"
                required
              />
            </label>
            <button
              className="w-full py-2 bg-purple-600 rounded-md text-white font-semibold hover:bg-purple-700 transition duration-200"
              type="submit"
              disabled={loading} 
            >
              {loading ? "Signing Up..." : "Sign Up"} 
            </button>
          </form>
          <div className="mt-6">
            <button className="flex items-center justify-center gap-2 w-full py-2 bg-white rounded-md font-semibold">
              <img src={googleIcon} alt="Google icon" width={24} height={24} />
              <h2 className="text-black">Sign up with Google</h2>
            </button>
          </div>
          <p className="mt-4 text-gray-400 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center w-1/2 bg-black">
        <img
          className="h-screen w-full object-cover"
          src={LoginPage}
          alt="Login"
        />
      </div>
    </div>
  );
};

export default Register;
