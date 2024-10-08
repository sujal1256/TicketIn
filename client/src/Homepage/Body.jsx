import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Mainpage from "./Mainpage.jsx";

function Body() {
  return (
    <div className="flex">
      <Sidebar />
      <Mainpage />
    </div>
  );
}

export default Body;
