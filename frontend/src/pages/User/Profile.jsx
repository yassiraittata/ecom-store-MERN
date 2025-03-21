import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { setCredentials } from "../../store/features/auth/authSlice";

export default function Profile() {
  return (
    <section class="py-10 my-auto">
      <div class="lg:w-[80%] md:w-[90%] w-[96%] mx-auto flex gap-4">
        <div class="lg:w-[88%] sm:w-[88%] w-full mx-auto  p-4 rounded-xl h-fit self-center">
          <div class="">
            <h1 className="text-3xl font-semibold mb-4">Profile</h1>

            <form>
              <div class="w-full  mb-4 mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="First Name"
                />
              </div>
              <div class="w-full  mb-4 lg:mt-6">
                <label
                  for=""
                  className="block text-sm font-medium text-slate-600 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
                  placeholder="Last Name"
                />
              </div>

              <button
                type="submit"
                class="text-white block  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
