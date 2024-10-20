import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectSidebar from "./ProjectSidebar";
import ProjectBoard from "./ProjectBoard";
import IssueDetails from "../Issue/IssueDetails";

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
    <div className="flex">
      <ProjectSidebar details={details} />
      <ProjectBoard details={details} />
    </div>
  );
}

export default ProjectPage;
