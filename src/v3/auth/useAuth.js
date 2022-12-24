import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";

const useAuth = (props) => {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    authStorage.removeToken();
    setUser(null);
  };

  const login = (user, token) => {
    authStorage.storeToken(token);
    setUser(user);
  };

  return { user, setUser, login, logout };
};

export default useAuth;
