import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SideMenu from './SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewMember from './NewMember';

function Project(props) {
  const { state } = useLocation();
  // TODO add third check to fetch project if not sent
  const [project, setProject] = useState(state.project || props.project);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);

  const onProjectChanged = (newProject) => {
    setProject(newProject);
    setShowAddMemberModal(false)
  };

  const goToMemberProfile = (member) => {
    console.log(member);
  };

  const getMemberImgById = (memberId) => {
    // TODO fetch memberImgUrl by memberId
    return new URL("../assets/default-profile.jpeg", import.meta.url);
  };

  const getMemberImgBySrc = (imgSrc) => {
    // TODO fetch memberImgUrl by imgUrl
    return new URL("../assets/default-profile.jpeg", import.meta.url);
  };

  const teamMembers = project.teamMembers.map((member) => {
    return (
      <div key={member._id} className="h-12 w-12">
        <img onClick={ () => goToMemberProfile(member) } className="cursor-pointer h-12 w-12 rounded-full border border-white border-solid" src={ getMemberImgById(member) } />
      </div>
    )
  });

  // TODO fetch project events
  const projectEvents = [
    {
      _id: 1,
      description: "ate a frog",
      user: {
        firstName: "Eric",
        lastName: "Bartsch",
        imgUrl: ""
      },
      timestamp: "1692205142467"
    },
    {
      _id: 2,
      description: "ate a grog",
      user: {
        firstName: "Joe",
        lastName: "Rand",
        imgUrl: ""
      },
      timestamp: "1692205144467"
    }
  ];

  const timeline = projectEvents.map((event) => {
    return (
      <div className="py-4" key={event._id}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="h-8 inline-flex">
              <img className="cursor-pointer h-8 w-8 rounded-full border border-white border-solid mr-2" src={ getMemberImgBySrc(event.user.imgUrl) } />
              <div>
                <span className="cursor-pointer">{ `${event.user.firstName} ${event.user.lastName}` }</span>
                <span>{ ` ${event.description}` }</span>
              </div>
            </div>
          </div>
          {/* TODO parse using moment */}
          <div className="flex">{ event.timestamp }</div>
        </div>
      </div>
    )
  });

  return (
    <>
      <div className="flex">
        <SideMenu project={ project } />
        <div className="flex px-[20px] py-2 w-[calc(100vw-180px)] h-[60px] flex-col">
          <div className="mb-4">
            <h1 className="text-xl pb-2">{ project.title }</h1>
            <h3>{ project.description }</h3>
          </div>
          <div>
            <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4">
              <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 xs:col-span-3">
                <div className="divide-y divide-solid">
                  { timeline }
                </div>
              </div>
              <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 xs:col-span-3">
                <div className="bg-blue-300 px-4 py-2">Team</div>
                <div className="py-2 flex">{ teamMembers }</div>
                <div>
                  <button onClick={ () => {setShowAddMemberModal(true)} } className="flex bg-cyan-500 rounded-sm w-[180px] h-[50px] text-white justify-center items-center">
                    <FontAwesomeIcon className="pr-[10px]" icon="fa-solid fa-plus" />Add Team Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        { showAddMemberModal ? 
          <div className="z-[99999] absolute top-0 h-full w-full bg-white opacity-95">
            <div className="absolute right-[25px] top-[25px]">
              <button onClick={ () => {setShowAddMemberModal(false)} }><FontAwesomeIcon className="pr-[10px] text-[28px]" icon="fa-solid fa-xmark" /></button>
            </div>
            <div className="w-[90%] h-full ml-auto mr-auto">
              <NewMember project={ project } onProjectChanged={onProjectChanged} />
            </div>
          </div> 
          : <></> 
        }
      </div>
    </>
  )
}

export default Project