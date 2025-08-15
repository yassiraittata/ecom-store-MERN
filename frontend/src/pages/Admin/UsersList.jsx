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

export default function UsersList() {
  const {
    data: users,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState(null);
  const [editableUserEmail, setEditableUserEmail] = useState(null);

  return <div className="bg-red-600">usersList</div>;
}
