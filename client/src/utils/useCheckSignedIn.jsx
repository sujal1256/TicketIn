import React, { useEffect, useState } from "react";
import axios from "axios";

function useCheckSignedIn() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    async function checkUserIfSignedInOrNot() {
      const response = await axios.get("/api/v1/user").catch((error) => {
        console.log(error);
        return error;
      });
      setUserLoggedIn(response.status >= 200 && response.status < 300);
    }
    try {
      checkUserIfSignedInOrNot();
    } catch (error) {
      console.log("Error in get Request", false);
    }
  }, []);

  return [userLoggedIn, setUserLoggedIn];
}
 
export default useCheckSignedIn;
 