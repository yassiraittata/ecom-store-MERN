import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/features/auth/authSlice";
import { AiOutlineUser } from "react-icons/ai";
import { useUpdateUserProfileMutation } from "../../store/api/usersApiSlice";

export default function Profile() {
  const [username, setUseranme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confisrPassword, setConfisrPassword] = useState("");

  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading, error }] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    setUseranme(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confisrPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateUserProfile({
        _id: userInfo.id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res.user));
      toast.success("Profile updated successfully");
      //   navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.data?.message || error.message || "An error occurred");
    }
  }

  return (
    <section class=" pl-[10rem] py-10 my-auto">
      <div class="max-w-3xl flex gap-4">
        <div class="lg:w-[88%] sm:w-[88%] w-full mx-auto  p-4 rounded-xl h-fit self-center">
          <div class="">
            <h1 className="text-3xl font-semibold mb-4 flex items-center">
              <span>
                <AiOutlineUser size={26} className="mr-3" />
              </span>
              Profile
            </h1>

            <form onSubmit={handleSubmit}>
              <div class="w-full  mb-4 mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUseranme(e.target.value)}
                />
              </div>
              <div class="w-full  mb-4 lg:mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="w-full  mb-4 lg:mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="w-full  mb-4 lg:mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="******"
                  value={confisrPassword}
                  onChange={(e) => setConfisrPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                class="text-white block  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
