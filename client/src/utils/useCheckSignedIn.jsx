import React, { useEffect, useState } from "react";
import axios from "axios";

function useCheckSignedIn() {
  const [loggedInResponse, setLoggedInResponse] = useState({
    userLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    async function checkUserIfSignedInOrNot() {
      const response = await axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/user", {
          withCredentials: true,
        })
        .catch((error) => {
          return error;
        });
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
