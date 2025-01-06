import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { setClientData, setClientToken } from "../store/clientSlice";
import { RootState } from "../store/store";
import { baseService } from "../services/baseService";

export const SafeRouting = () => {
  const dispatch = useDispatch();
  const client = useSelector((state: RootState) => state.clientData);

  if (!client?.token) {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(setClientToken(token));
      const payload = JSON.parse(atob(token.split('.')[1]));
      (async () => {
          const { data, error } = await baseService(`api/users/${payload.id}`, "get");
          if (data) {
            data.token = token;
            dispatch(setClientData(data));
          } else {
            console.error("Error getting user data from token:", error);
            localStorage.removeItem("authToken");
          }
      })();
    }
  }

  const isAuthenticated = Boolean(client.token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
