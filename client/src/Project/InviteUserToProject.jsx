import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function InviteUserToProject() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    async function invite() {
      const response = await axios.get("/api/v1/invite", {
        params: {
          token: searchParams.get("token"),
        },
      });

      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        navigate("/signin");
      } else if(response.status >= 400 && response.status < 500) {
        navigate("/signup");
      }
      else{
        toast.error("Error in the invitation");
      }
    }
    invite();
  }, []);
  return <div>
    Redirecting.....
    </div>;
}

export default InviteUserToProject;
