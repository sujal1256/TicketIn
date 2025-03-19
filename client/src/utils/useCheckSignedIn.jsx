import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

function useCheckSignedIn() {
  const [loggedInResponse, setLoggedInResponse] = useState({
    userLoggedIn: false,
    user: null,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkUserIfSignedInOrNot() {
      if (!localStorage.getItem("accessToken")) return;
      const response = await axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/user", {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        })
        .catch((error) => {
          return error;
        });
      dispatch(addUser(response?.data?.data));
      setLoggedInResponse({
        userLoggedIn: response.status >= 200 && response.status < 300,
        user: response,
      });
    }
    try {
      checkUserIfSignedInOrNot();
    } catch (error) {
      console.log("Error in get Request", false);
    }
  }, []);

  return loggedInResponse;
}

export default useCheckSignedIn;
