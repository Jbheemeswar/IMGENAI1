import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");

  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Login") {
        if (!email) {
          toast.error("Email is required");
          return;
        }

        const { data } = await axios.post(
          `${backendUrl}/api/users/login`,
          { email }
        );

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        if (!name || !email) {
          toast.error("Name and Email are required");
          return;
        }

       const { data } = await axios.post(
       `${backendUrl}/api/users/register`,
  {
    name,
    email,
    password: "default@123" 
  }
);


        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-8 rounded-xl w-[360px] text-slate-600"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          {state === "Login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-sm text-center mt-1">
          Enter your details to continue
        </p>

        {/* NAME (ONLY FOR SIGN UP) */}
        {state === "Sign Up" && (
          <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" />
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="border px-5 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" />
          <input
            type="email"
            placeholder="Email address"
            className="outline-none text-sm w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-6 cursor-pointer hover:bg-blue-700"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {/* TOGGLE */}
        {state === "Login" ? (
          <p className="mt-5 text-center text-sm">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        {/* CLOSE */}
        <img
          src={assets.cross_icon}
          alt=""
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setShowLogin(false)}
        />
      </motion.form>
    </div>
  );
};

export default Login;
