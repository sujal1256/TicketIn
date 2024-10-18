import React from "react";

function NamePopUp({username}) {
  return (
    <div className="absolute top-[110%] left-50 transform -translate-x-1/2  bg-blue-100 text-white p-0.5 min-w-fit text-xs">
      {username}
    </div>
  );
}

export default NamePopUp;
