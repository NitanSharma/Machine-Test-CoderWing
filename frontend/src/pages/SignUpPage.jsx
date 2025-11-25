import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData , setUserData] =  useState('');
 
  const navigate = useNavigate();

const submitHandler = async (e) => {
    e.preventDefault();
    
    const newUser = {
      name: name ,
      email: email,
      password: password     
    }
    // console.log(userData);

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, newUser)
    console.log(response);
    if(response.status === 200){
      const data = response.data;
      setUserData(data.user)
      localStorage.setItem('token' , data.token)
      navigate('/')
    }

    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    <div className="h-screen mt-30 flex">
      {/* Right Image */}
      <div className="w-1/2">
        <img src="/loginImage.jpg" alt="loginImage" />
      </div>
      {/* Left Form */}
      <div className="flex flex-col justify-center items-center w-1/2 h-125">
        <h1 className="text-[36px] font-semibold">Create an Account</h1>
        <p className="text-[16px] font-medium">Enter your details below</p>
        <form action="" className="flex flex-col mt-5 gap-4" 
        onSubmit={(e) => submitHandler(e)} >
           <input type="text" placeholder="Name" className="text-md m-5 p-2 "  value={name} onChange={(e) => setName(e.target.value)} />
           <input type="email" placeholder="Email" className="text-md m-5 p-2"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
           <input type="password" placeholder="Password" className="text-md m-5 p-2" 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
           <button className="bg-[#DB4444] text-white py-4 px-[122px] font-semibold mt-1 rounded-md">Create Account</button>
        </form>
      </div>

    </div>
  );
};

export default SignUpPage;
