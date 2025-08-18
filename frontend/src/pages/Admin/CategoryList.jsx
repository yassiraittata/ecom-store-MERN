import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllCategoriesQuery,
  useCreateCategotyMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/api/categorySlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import Loader from "../../components/Loader.jsx";

const CategoryList = () => {
  const { data: categories, refetch, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategotyMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

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

  async function handleUpdateCategory(e) {
    e.preventDefault();

    if (!updatedName) {
      toast.error("Category name is required!");
      return;
    }

    try {
      const result = await updateCategory({
        id: selectedCategory._id,
        data: {
          name: updatedName,
        },
      }).unwrap();

      console.log(result);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setUpdatedName("");
      toast.success("Category updated successfully!");
      setModalIsVisible(false);
      setSelectedCategory(null);

      refetch();
    } catch (error) {
      toast.error("Updating category faild, try again!");
    }
  }

  async function handleDeleteCategory() {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Category deleted successfully!");
      setModalIsVisible(false);
      setSelectedCategory(null);

      refetch();
    } catch (error) {
      toast.error("Updating category faild, try again!");
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
            {isLoading ? (
              <div className="flex items-center justify-center p-4 w-full">
                <Loader />
              </div>
            ) : (
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
            )}
            <Modal
              isOpen={modalIsVisible}
              onClose={() => setModalIsVisible(false)}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                buttonText="Update category"
                handleSubmit={handleUpdateCategory}
              />

              <button
                onClick={handleDeleteCategory}
                class="text-white block w-fit  bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer disabled:cursor-not-allowed"
              >
                Delete
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
