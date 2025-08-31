import axios from "axios";

export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
  institutionName?: string;
  address?: string;
  ethereumAddress?: string;
}

const useAuth = async (auth: string, payload: AuthPayload) => {
  const urlApi = import.meta.env.VITE_API_URL;

  try {
    switch (auth) {
      case "login":
        let res = await axios.post(`${urlApi}/auth/login`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS requests
        });
        return res.data;
      case "register-user":
        res = await axios.post(`${urlApi}/auth/register/user`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS requests
        });
        return res.data;
      case "register-institution":
        res = await axios.post(`${urlApi}/auth/register/institution`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS requests
        });
        return res.data;
      default:
        throw new Error("Invalid auth action");
    }
  } catch (error: any) {
    console.error("Error occurred during authentication:", error);
    return error.response?.data || { success: false, message: "Internal server error" };
  }
};

export default useAuth;
