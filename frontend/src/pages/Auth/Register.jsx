import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../store/api/usersApiSlice";
import { setCredentials } from "../../store/features/auth/authSlice";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [registerApiCall, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  async function submitHandler(event) {
    event.preventDefault();

    try {
      const res = await registerApiCall({ username, email, password }).unwrap();
      console.log(res);
      setCredentials({
        ...res.user,
      });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  }
  return (
    <section className="pl-[10rem] flex flex-wrap  items-center justify-center">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-3xl font-semibold mb-4">Register</h1>
        <form className="container w-[40rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john doe"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Email Adress
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="john.doe@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*****************"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Submitting ..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <p className=" text-gray-700">
            I already have an account{" "}
            <Link
              className="text-blue-500 underline ml-1"
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Sign in.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
