import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ProjectPage() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getProjectDetails() {
      const response = await axios
        .get("/api/v1/project/get-project-details", {
          params: {
            q: searchParams.get("q"),
          },
        })
        .catch((error) => {
          console.log("Error while getting project data" + error.message);
        });
      setDetails(response.data.data);
    }

    getProjectDetails();
    console.log("details", details);
  }, []);


  if (!details) {
    return;
  }
  return (
    <div>
      <h1>{details?.projectDetails?.projectName}</h1>
      <h1>{details?.projectDetails?.projectDescription}</h1>
      <h1>{details?.projectOwner?.username}</h1>
      <h1>{details?.projectOwner?.email}</h1>
    </div>
  );
}

export default ProjectPage;
