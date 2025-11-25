import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    // console.log(userData);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/login`,
      user
    );
    console.log(response);
    if (response.status === 200) {
      const data = response.data;
      setUserData(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="h-screen flex m-auto bg-gray-200 rounded justify-center">
      {/* Left Form */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[36px] font-semibold">Login</h1>
        <form
          action=""
          className="flex flex-col mt-5 gap-6"
          onSubmit={(e) => submitHandler(e)}
        >
          <input
            type="email"
            placeholder="Email"
            className="text-md m-5 p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="text-md m-5 p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#DB4444] text-white py-4 px-[122px] font-semibold mt-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
