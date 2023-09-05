import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SideMenu(props) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    isCollapsed ? collapseSideMenu() : expandSideMenu();
  }, [isCollapsed]);

  const collapseSideMenu = () => {
    const elem = document.getElementById("side-menu");
    elem.classList.add("w-[50px]");
  };

  const expandSideMenu = () => {
    const elem = document.getElementById("side-menu");
    elem.classList.remove("w-[50px]");
  };

  return (
    <>
      <div id="side-menu" className="w-[180px] h-[calc(100vh-64px)] sticky bg-slate-500 z-50">
        <div className="flex flex-col text-white">
          <button onClick={() => navigate(`/project/${props.project._id}`, { replace: true, state: { project: props.project } })} className={`text-cyan-500 h-[50px] hover:bg-sky-700 text-left px-[14px] ${isCollapsed ? "mr-auto ml-auto" : ""}`}>
            <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-diagram-project" />
            <span>{ isCollapsed ? '' : props.project.title }</span>
          </button>
          {/* <button onClick={() => navigate(`/project/${props.project._id}/epics`, { replace: true, state: { project: props.project } })} className={`h-[50px] hover:bg-sky-700 text-left px-[14px] ${isCollapsed ? "mr-auto ml-auto" : ""}`}>
            <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-mountain-sun" />
            <span>{ isCollapsed ? '' : 'Epics' }</span>
          </button> */}
          <button onClick={() => navigate(`/project/${props.project._id}/backlog`, { replace: true, state: { project: props.project } })} className={`h-[50px] hover:bg-sky-700 text-left px-[14px] ${isCollapsed ? "mr-auto ml-auto" : ""}`}>
            <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-layer-group" />
            <span>{ isCollapsed ? '' : 'Backlog' }</span>
            {/* TODO show sprints (indented as submenu) */}
          </button>
          <button onClick={() => navigate(`/project/${props.project._id}/team`, { replace: true, state: { project: props.project } })} className={`h-[50px] hover:bg-sky-700 text-left px-[14px] ${isCollapsed ? "mr-auto ml-auto" : ""}`}>
            <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-user-group" />
            <span>{ isCollapsed ? '' : 'Team' }</span>
          </button>
          <div onClick={() => { setIsCollapsed(!isCollapsed) }} className="text-cyan-500 ml-auto mr-[10px] my-2 cursor-pointer h-8 w-8 rounded-full border border-white border-solid">
            <div className="text-center">
              {isCollapsed ? <FontAwesomeIcon className="align-middle" icon="fa-solid fa-angles-right" /> : <FontAwesomeIcon className="align-middle" icon="fa-solid fa-angles-left" />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu