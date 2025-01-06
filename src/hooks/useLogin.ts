import { useState } from "react";
import { loginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setClientToken } from "../store/clientSlice";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inPrgress, setInProgress] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
    } else {
      setError("");
      setInProgress(true);
      const { data, error } = await loginService(username, password);
      if (data) {
        localStorage.setItem("authToken", data.token);
        dispatch(setClientToken(data.token));
        navigate("/");
      } else {
        setError(error);
        console.error("Login failed:", error);
      }
      setInProgress(false);
    }
  };

 

  return {
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
    error,
    inPrgress
  };
};
