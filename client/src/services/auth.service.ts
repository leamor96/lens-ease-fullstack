import axios from "../api/axios";

const register = async (username: string, email: string, password: string) => {
  return await axios.post("/auth/signup", { username, email, password });
};

const login = async (email: string, password: string) => {
  return await axios
    .post("/auth/signin", { email, password })
    .then((res) => {
      const token = res.data.accessToken;
      const email = res.data.email;
      const username = res.data.username;
      const id = res.data.id;
      const isAdmin=res.data.isAdmin;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email, username, token, id, isAdmin})
        );
        localStorage.setItem("userId", id);
      }
      return res.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

export { register, login, logout };

const authService = { register, login, logout };
export default authService;
