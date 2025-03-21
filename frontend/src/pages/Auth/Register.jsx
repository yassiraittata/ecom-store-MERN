import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useRegisterMutation } from "../../store/api/usersApiSlice";
import { setCredentials } from "../../store/features/auth/authSlice";

import ShopBg from "../../../public/shop-bg.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    if (!username || !email || !password || !confirmPassword) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [username, email, password, confirmPassword]);

  async function submitHandler(event) {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return toast.error("All fields are required!");
    }

    try {
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match!");
      }

      const res = await registerApiCall({ username, email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res.user }));
      navigate(redirect);
      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  }
  return (
    <section className="pl-[10rem] flex flex-wrap  items-center">
      <div className="mr-[4rem] mt-[5rem] relative z-10  bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Register</h1>
        <form className="container w-[30rem]" onSubmit={submitHandler}>
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="John doe"
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
              className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
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
              className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="*****************"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="*****************"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="text-white block  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer"
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? "Submitting ..." : "Register"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <p className=" text-gray-700">
            I already have an account{" "}
            <Link
              className="text-orange-500 underline ml-1"
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
            >
              Sign in.
            </Link>
          </p>
        </div>
      </div>
      <img
        src={ShopBg}
        alt="Shop Background"
        className="fixed h-screen w-screen top-0 left-0"
      />
    </section>
  );
}
