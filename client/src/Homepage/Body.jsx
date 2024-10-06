import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Mainpage from "./Mainpage.jsx";
import axios from "axios";
import checkSignedIn from "../utils/useCheckSignedIn.jsx";
function Body() {
  const [userLoggedIn, setUserLoggedIn] = checkSignedIn();
  console.log(userLoggedIn);

  return (
    <div className="flex">
      {userLoggedIn ? <Sidebar /> : null}

      <Mainpage />
    </div>
  );
}

export default Body;
 