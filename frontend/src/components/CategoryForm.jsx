import React from "react";

function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText,
  handleDelete,
}) {
  return (
    <>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Category name
            </label>
            <input
              type="text"
              id="name"
              className="outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 "
              placeholder="Home supplies"
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              class="text-white block  bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer disabled:cursor-not-allowed"
            >
              {buttonText}
            </button>
            {handleDelete && (
              <button
                className="bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CategoryForm;
