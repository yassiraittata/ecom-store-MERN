import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategotyMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/api/categorySlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";

const CategoryList = () => {
  const { data: categories, refetch } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategotyMutation();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState("");

  async function handleCreateCategory(e) {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required!");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setName("");
      toast.success("Category created successfully!");
      refetch();
    } catch (error) {
      toast.error("Creating category faild, try again!");
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row max-w-3xl w-full">
        {/* <AdminMenu /> */}
        <div className=" p-3 w-full">
          <div className="h-12  p-5 w-ful">
            <h1 className="text-2xl font-semibold mb-4 ">Categories</h1>
            <CategoryForm
              value={name}
              setValue={setName}
              buttonText="Create category"
              handleSubmit={handleCreateCategory}
            />
            <br />
            <hr />
            <div className="flex flex-wrap">
              {categories?.map((category) => (
                <div key={category._id}>
                  <button
                    className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    onClick={() => {
                      {
                        setModalIsVisible(true);
                        setSelectedCategory(category);
                        setUpdatedName(category.name);
                      }
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
