import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/UserSlice";
import {BASE_URL} from "../utils/Constants"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/login", { email, password },{ withCredentials: true });
      dispatch(addUser(res.data.user))
      navigate("/")
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    }
  }

  return (
    <main className="w-full h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md bg-white p-6 sm:p-8 shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">

          <div className="input-group w-full flex flex-col my-3">
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full" type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          <div className="input-group w-full flex flex-col my-3">
            <label className="input validator w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                type="password"
                required
                placeholder="Password"
                minLength="6"
                pattern="([a-z])).{6}"
                title="Must be more than 6 characters, including number, lowercase letter"
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
            </p>
          </div>

          <div className="w-full">
            <p className="font-semibold text-left">Already have an account? <Link to="/register" className="text-blue-600"> Sign In </Link></p>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-8 py-2 rounded font-medium mt-4">
            Login
          </button>

          <div className="btn bg-white text-black border-[#e5e5e5] mt-5">
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </div>

        </form>

        {error && (
          <div className="text-red-500 font-medium text-center mt-3">
            {error}
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
