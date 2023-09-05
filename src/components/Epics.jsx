import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Epics(props) {
  const { state } = useLocation();
  // TODO add third check to fetch project if not sent
  const project = state.project || props.project;
  // const navigate = useNavigate();
  // const [projectTitleInput, setProjectTitleInput] = useState("");
  // const [projectDescriptionInput, setProjectDescriptionInput] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const submitForm = async (e) => {
  //   e.preventDefault();
  //   // TODO server will call logged in user via the auth header in order to set project owner
  //   const formData = {
  //     title: projectTitleInput,
  //     description: projectDescriptionInput
  //   };

  //   try {
  //     const token = sessionStorage.getItem('project-management.token');

  //     const response = await fetch(
  //       "http://localhost:4000/api/v1/project/new", 
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": token
  //         },
  //         method: "POST",
  //         body: JSON.stringify(formData)
  //       }
  //     );

  //     const responseJSON = await response.json();

  //     if(response.status === 200) {
  //       navigate(`/project/${responseJSON.id}`);
  //     } else {
  //       setErrorMessage(responseJSON.error);
  //     }

  //     return;
  //   } catch(err) {
  //     // this returns unhandled server errors
  //     console.log(err)
  //   }
  // };

  return (
    <>
      <div className="flex">
        <SideMenu project={ project } />
        <div className="flex px-[20px] py-2 w-[calc(100vw-180px)] h-[60px] flex-col">
          <div className="flex justify-between mb-4">
            <h1 className="flex text-xl">Epics</h1>
            <button className="flex bg-cyan-500 rounded-sm w-[120px] h-[50px] text-white justify-center items-center">
              <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-plus" />Add Epic
            </button>
          </div>
          <div>
            <div className="flex pl-1 text-xs">
              <div className="basis-[20vw] grow shrink max-w-[40vw]">Name</div>
              <div className="basis-[75px] grow-0 shrink-0 text-center">Project</div>
              <div className="basis-[150px] grow-0 shrink-0 flex-wrap max-w-[150px] overflow-hidden text-center text-ellipsis whitespace-nowrap w-[90%]">Sprint</div>
              <div className="basis-[75px] grow-0 shrink-0 flex-wrap text-center">Assigned</div>
              <div className="basis-[110px] grow-0 shrink-0 flex-wrap text-center max-w[150px]">Status</div>
              <div className="basis-[20vw] grow-1 shrink-1 text-center max-w[40vw]">Progress</div>
            </div>
          </div>
        </div>
        {/* <div>
          epics table
        </div> */}
      </div>
      {/* <div className="flex justify-center mt-[100px]">
        <form className="grid gap-y-4 grid-cols-1 text-center">
          <h1 className="flex">New Project Details</h1>
          <input
            value={projectTitleInput}
            onChange={(e) => setProjectTitleInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[500px] border-gray-300 border solid"
            type="text"
            name="projectTitle"
            id="projectTitle"
            placeholder="Project Name (Required)" />
          <textarea
            value={projectDescriptionInput}
            onChange={(e) => setProjectDescriptionInput(e.target.value)}
            className="mr-auto ml-auto rounded-sm w-[500px] h-[200px] border-gray-300 border solid"
            type="text"
            name="projectDescription"
            id="projectDescription"
            placeholder="Project Description (Required)" />
          <div>
            <button onClick={ submitForm } className="w-[500px] bg-blue-500 rounded-sm">
              Create Project
            </button>
          </div>
          <div className="text-red-500 text-center">{ errorMessage }</div>
        </form>
      </div> */}
    </>
  )
}

export default Epics