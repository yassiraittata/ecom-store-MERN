import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../store/api/usersApiSlice";
import { setCredentials } from "../../store/features/auth/authSlice";

import ShopBg from "../../../public/shop-bg.jpg";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const [logingApi, { isLaoding }] = useLoginMutation();

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
      const res = await logingApi({ email, password }).unwrap();

      console.log(res);
      dispatch(
        setCredentials({
          ...res.user,
        })
      );
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  }

  return (
    <section className="pl-[10rem] flex flex-wrap  items-center">
      <div className="mr-[4rem] mt-[5rem] relative z-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Sign In</h1>
        <form className="container w-[30rem]" onSubmit={submitHandler}>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="text-white block  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer"
            disabled={isLaoding}
          >
            {isLaoding ? "Siging in ..." : "Sign in"}
          </button>
        </form>
        <div className="mt-4 text-sm">
          <p className=" text-gray-700">
            New customer?{" "}
            <Link
              className="text-orange-500 underline ml-1"
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Create an account.
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
