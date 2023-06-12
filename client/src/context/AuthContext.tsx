import { createContext, useEffect, useState } from "react";
import { AuthContextType, ChildProps } from "../@types";

const initialState: AuthContextType = {
  isLoggedIn: false,
  login(username, email, token) {},
  logout() {},
  isAdmin:false,
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

      login(username, email, token);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (username: string, email: string, token: string) => {
    setIsLoggedIn(true);
    setEmail(email);
    setUsername(username);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    setEmail(undefined);
    setUsername(undefined);
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
  const contextValues = { isLoggedIn, username, token, email, login, logout,isAdmin };
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
