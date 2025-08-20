import axios from "axios";

export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
  institutionName?: string;
  address?: string;
  ethereumAddress?: string;
}

const useAuth = (auth: string, payload: AuthPayload) => {
  const urlApi = import.meta.env.VITE_API_URL;

  try {
    switch (auth) {
      case "login":
        return axios.post(`${urlApi}/auth/login`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS requests
        });
      case "register":
        return axios.post(`${urlApi}/auth/register`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials for CORS requests
        });
      default:
        throw new Error("Invalid auth action");
    }
  } catch (error) {
    console.error("Error occurred during authentication:", error);
  }
};

export default useAuth;