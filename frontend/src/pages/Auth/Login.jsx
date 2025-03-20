import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../store/api/usersApiSlice";
import { setCredentials } from "../../store/features/auth/authSlice";

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

  return (
    <div className=" text-center bg-red-700 text-white text-xl font-black w-screen">
      {el}
    </div>
  );
}
