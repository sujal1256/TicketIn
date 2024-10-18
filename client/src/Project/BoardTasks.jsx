import React, { useEffect } from "react";
import MemberIssues from "./MemberIssues";
import { useSearchParams } from "react-router-dom";

function BoardTasks({ details }) {
  const [searchParams] = useSearchParams();
  const styleString = "bg-gray-200 w-full text-center p-3";
  const sectionStyleString = "flex w-full justify-around px-28 gap-3 mt-10";

  // useEffect(()=>{
  //   async function getAllIssues(){
  //     const response = await axios.get("/api/v1/issues/get-all-issues",{
  //       params: {
  //         projectId: searchParams.get('q')
  //       }

  //     })
  //   }
  // },[])
  return (
    <div className="overflow-hidden overflow-y-scroll h-[60vh] mt-4">

      {/* FIXME: Add number of tasks here */}
      {details.projectDetails?.members?.map((e, index) => {
        return <MemberIssues member={e} {...details} key={index}/>;
      })}

      <MemberIssues member={undefined} {...details}/>

      
      
    </div>
  );
}

export default BoardTasks;
