import { useState } from "react";
import { toast } from "react-toastify";
import {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategotyMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/api/categorySlice.js";

const CategoryList = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState("");

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* <AdminMenu /> */}
        <div className="md:3/4 p-3">
          <div className="h-12">
            <h1 className="text-2xl font-semibold mb-4 ">Categories</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryList;
