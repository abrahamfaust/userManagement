import { useEffect, useState } from "react";
import {
  IUser,
  setUsersData,
  adduserToSlice,
  deleteUserToSlice,
  editUserToSlice,
} from "../store/usersSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as service from "../services/userService";
import { setClientData } from "../store/clientSlice";

type UseUsers = {
  users: IUser[];
  username: string | undefined;
  handleLogout: () => void;
  popup: boolean;
  setPopup: (value: boolean) => void;
  addUser: (user: IUser) => void;
  deleteUser: (userId: string) => void;
  editUser: (user: IUser) => void;
  userToEdit: IUser | null;
  setUserToEdit: (user: IUser | null) => void;
  inProgress: boolean;
};

export const useUsers = (): UseUsers => {
  const users = useSelector((state: RootState) => state.users);
  const client = useSelector((state: RootState) => state.clientData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [userToEdit, setUserToEdit] = useState<IUser | null>(null);

  useEffect(() => {
    if (users.length === 0) {
      const fetch = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const jsonToken = JSON.parse(atob(token.split('.')[1]))      
        const client = await service.getUserById(jsonToken.id);
        if (client.data) {          
          client.data.token = token;
          dispatch(setClientData(client.data));
        } else {
          console.log(client.error);
        }
        const { data, error } = await service.getAllUsers();
        if (data) {
          dispatch(setUsersData(data));
        } else {
          console.log(error);
        }
      };
      fetch();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const addUser = async (user: IUser) => {
    setInProgress(true);
    const { data, error } = await service.addUser(user);
    if (data) {
      dispatch(adduserToSlice(data));
    } else {
      console.log(error);
      alert("failed to add user");
    }
    setInProgress(false);
  };

  const deleteUser = async (userId: string) => {
    setInProgress(true);
    confirm("Are you sure you want to delete this user?");
    const { error } = await service.DeleteUserById(userId);
    if (!error) {
      dispatch(deleteUserToSlice(userId));
    } else {
      console.log(error);
      alert("failed to delete user");
    }
    setInProgress(false);
  };

  const editUser = async (user: IUser) => {
    setInProgress(true);
    const { data, error } = await service.EditUserById(user);
    if (data) {
      dispatch(editUserToSlice(user));
    } else {
      console.log(error);
      alert("failed to edit user");
    }
    setInProgress(false);
  };

  return {
    users,
    username: client?.username,
    handleLogout,
    addUser,
    deleteUser,
    editUser,
    popup,
    setPopup,
    userToEdit,
    setUserToEdit,
    inProgress,
  };
};
