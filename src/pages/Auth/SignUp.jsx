import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import mail from "../../assets/icons/auth/mail.svg";
import men from "../../assets/men.svg";
import { Eye, EyeOff } from "lucide-react";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUP = (e) => {
    e.preventDefault();
    console.log(name,email, password);
  };

  return (
    <div className="flex max-w-[1536px] mx-auto px-4 sm:px-6 min-h-screen font-Inter">
      {/* left content  */}
      <div className="w-full md:w-1/2">
        {/* logo section  */}
        <div className="m-5">
          <img src={logo} alt="a animate picture" />
        </div>
        {/* form section area  */}
        <div className="max-w-md  mx-auto mt-16 lg:mt-14">
          <form onSubmit={handleSignUP}>
            <h1 className="font-medium text-[2rem] text-textClr text-center">
              Registration
            </h1>

            {/* name input  */}
             <div>
              <label className="block mb-1 font-Inter font-medium text-textClr">
                Name{" "}
              </label>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Enter FUllname"
                  className=" outline-none flex-1 text-gray-800"
                  onChange={(e)=>setName(e.target.value)}
                />
                <img src={mail} alt="email-icon" />
              </div>
            </div>

            {/* email input  */}
            <div className="mt-7">
              <label className="block mb-1 font-Inter font-medium text-textClr">
                Email{" "}
              </label>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className=" outline-none flex-1 text-gray-800"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <img src={mail} alt="email-icon" />
              </div>
            </div>

            {/* password input  */}
              <div className="my-9">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  Password
                </label>
                <div className="form-control">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-800"
                    placeholder='Enter Password'
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* confirm password input  */}

              <div className="my-9">
                <label className="block mb-1 font-Inter font-medium text-textClr">
                  Password
                </label>
                <div className="form-control">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-800"
                    placeholder='Enter Password'
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-[#797979] hover:text-textClr/70 transition duration-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              
              {/* submition button area  */}

              <button
                type="submit"
                className="signIn_submit"
              >
               Registration
              </button>
                    {/* sign up link  */}
              <div className="mt-4 text-center text-sm text-gray-600">
              Do you have an account?{" "}
              <span
                
                className="text-Primary font-semibold hover:underline"
              >
                Sign in
              </span>
            </div>
          </form>

          <h1 className="text-2xl text-center my-7">Or</h1>

            <div className="sign_with_goole"><FcGoogle size={28}/> Registration  with google account</div>
          
          

          
        </div>
      </div>
      {/* right section  */}
      <div className="bg-Primary w-1/2 hidden md:flex items-center justify-center">
        <img src={men} alt="A men image " className="hidden md:block" />
      </div>
    </div>
  );
};

export default SignUp;


