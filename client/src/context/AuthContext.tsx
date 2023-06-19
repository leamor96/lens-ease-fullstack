import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../@types";

const initialState: AuthContextType = {
  isLoggedIn: false,
  login(username, email, token, id, favorite,favoritePro) {},
  logout() {},
  isAdmin: false,
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.token;
      const email = user.email;
      const username = user.username;
      const id = user.id;
      const favorite = user.favorite;
      const favoritePro = user.favoritePro;
      login(username, email, token, id, favorite,favoritePro);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [favorite, setFavorite] = useState([]);
  const [favoritePro, setFavoritePro] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (
    username: string,
    email: string,
    token: string,
    id: string,
    favorite: [],
    favoritePro:[]
  ) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUsername(username);
    setToken(token);
    setId(id);
    setFavorite(favorite);
    setFavoritePro(favoritePro);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setToken(undefined);
    setEmail(undefined);
    setUsername(undefined);
    setId(undefined);
  };
  const checkAdmin = () => {
    // Retrieve the user data from local storage
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      const userRoles = user.roles;

      // Check if the user has the admin role
      const isAdmin = userRoles && userRoles.includes("admin");

      setIsAdmin(isAdmin);
    }
  };
  // Call the checkAdmin function when the user logs in or on component mount
  useEffect(() => {
    if (isLoggedIn) {
      checkAdmin();
    }
  }, [isLoggedIn]);
  //what we want to expose/share with the app:
  const contextValues = {
    isLoggedIn,
    username,
    token,
    email,
    id,
    favorite,
    favoritePro,
    login,
    logout,
    isAdmin,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

//the provider is only used in index.tsx <Provider>
export { AuthContext, AuthContextProvider };

//used in all the app:
export default AuthContext;
