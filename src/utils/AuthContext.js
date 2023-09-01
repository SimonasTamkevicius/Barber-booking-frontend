import { useContext, useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
      loggedIn: false,
      role: "",
      _id: "",
      fName: "",
      lName: "",
      email: ""
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = getCookie("accessToken");
      const role = getCookie("userRole");
      const _id = getCookie("_id");
      const fName = getCookie("fName");
      const lName = getCookie("lName");
      const email = getCookie("email");

      if (token && role) {
        setUser({
          loggedIn: true,
          role: role,
          _id: _id,
          fName: fName,
          lName: lName,
          email: email
        });
      }
      setLoading(false);
    }, []);
  
    const loginUser = (role, token, _id, fName, lName, email) => {
        logoutUser()
      // Set the token and role in cookies instead of state
      setCookie("accessToken", token, { path: "/" });
      setCookie("userRole", role, { path: "/" });
      setCookie("_id", _id, { path: "/" });
      setCookie("fName", fName, { path: "/" });
      setCookie("lName", lName, { path: "/" });
      setCookie("email", email, { path: "/" });
  
      setUser({
        loggedIn: true,
        role: role,
        _id: _id,
        fName: fName,
        lName: lName,
        email: email
      });
      setLoading(false);
    };
  
    const logoutUser = () => {
      // Clear the token and role from the cookies
      deleteCookie("accessToken");
      deleteCookie("userRole");
      deleteCookie("_id");
      deleteCookie("fName");
      deleteCookie("lName");
      deleteCookie("email");
  
      // Update the user state to indicate that the user is logged out
      setUser({
        loggedIn: false,
        role: "",
        _id: "",
        fName: "",
        lName: "",
        email: ""
      });
    };

    const updateUser = (data) => {
      if (data.fName) {
        setCookie('fName', data.fName,{path:'/'});
      }
      if (data.lName) {
        setCookie('lName', data.lName,{path:'/'});
      }
      if (data.email) {
        setCookie('email', data.email,{path:'/'});
      }

      setUser((prevUser) => ({
        ...prevUser,
        ...data
      }));  
    };
  
    const contextData = {
      user,
      loginUser,
      logoutUser,
      updateUser
    };
  
    return (
      <AuthContext.Provider value={contextData}>
        {loading ? <p>loading...</p> : children}
      </AuthContext.Provider>
    );
  };
  
  // Helper function to set a cookie
  function setCookie(name, value, options) {
    options = {
      path: "/",
      ...options,
    };
  
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (const optionKey in options) {
      updatedCookie += "; " + optionKey;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  }

  // Helper function to delete a cookie
  function deleteCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
  
  
  // Helper function to get a cookie
  function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }  

export const useAuth = ()=> {return useContext(AuthContext)}

export default AuthContext;