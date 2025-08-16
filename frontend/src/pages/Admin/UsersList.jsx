import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../store/api/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

export default function UsersList() {
  const {
    data: users,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState(null);
  const [editableUserEmail, setEditableUserEmail] = useState(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  async function updateHandler(id) {
    try {
      await updateUser({
        user_id: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      setEditableUserId(null);
      refetch();
    } catch (e) {
      toast.error(e?.daat?.message || e.message);
    }
  }

  function toggleEdit(id, name, email) {
    setEditableUserId(id);
    setEditableUserName(name);
    setEditableUserEmail(email);
  }

  async function deleteHandler(id) {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(id);
        refetch();
      } catch (e) {
        toast.error(e?.daat?.message || e.message);
      }
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 ">Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md::w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Admin</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user._id}</td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full rounded-lg border p-2"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 py-2 px-4 rounded-lg cursor-pointer"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className=" flex items-center">
                            {user.username}{" "}
                            <button
                              className="ml-[1rem]"
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {editableUserId === user._id ? (
                        <div className="flex ">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full rounded-lg border p-2"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="ml-2 bg-blue-500 py-2 px-4 rounded-lg cursor-pointer"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className=" flex items-center">
                            {user.email}{" "}
                            <button
                              className="ml-[1rem]"
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                            >
                              <FaEdit />
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className=" text-red-400 font-bold py-2 px-4 rounded cursor-pointer
                            "
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
