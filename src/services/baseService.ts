import axios, { AxiosRequestConfig } from "axios";

export const baseService = async (
  url: string,
  type: AxiosRequestConfig["method"],
  data?: any
): Promise<{ data: any | null; error: any }> => {
  const baseUrl = `https://server-n42x.onrender.com/${url}`;
  const token = localStorage.getItem("authToken");

  try {
    const res = await axios({
      method: type,
      url: baseUrl,
      data: data,
      headers: {
        Authorization: token ? token : "",
        "Content-Type": "application/json",
      },
    });

    return {
      data: res.data,
      error: null,
    };
  } catch (err: any) {

    if (err.response?.status === 401 || err.response?.status === 403) {
        const userConfirmed = window.confirm("You are not authorized. Do you want to go to the login page?");
        
        if (userConfirmed) {
          localStorage.removeItem("authToken");
          window.location.href = "/login";
        } else {
          console.log("User chose not to go to login.");
        }
      }
    


    return {
      data: null,
      error: err.message,
    };
  }
};
