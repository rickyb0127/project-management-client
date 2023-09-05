import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  const onProjectHover = () => {
    const elem = document.getElementById("project-dropdown");
    elem.classList.remove("hidden")
  };

  const onProjectLeave = () => {
    const elem = document.getElementById("project-dropdown");
    elem.classList.add("hidden")
  };

  const onProfileHover = () => {
    const elem = document.getElementById("profile-dropdown");
    elem.classList.remove("hidden")
  };

  const onProfileLeave = () => {
    const elem = document.getElementById("profile-dropdown");
    elem.classList.add("hidden")
  };

  const goToProject = (project) => {
    navigate(`/project/${project._id}`, { replace: true, state: { project } });
  };

  const projectsList = props.projects.map((project) => {
    return (
      <div key={project._id}>
        <div onClick={ () => goToProject(project) } className="block px-4 py-2 text-sm">
          <li>{project.title}</li>
        </div>
      </div>
    )
  });
  
  return (
    <>
      { props.loggedInUser ?
      <>
        <nav id="nav" className="bg-slate-300 drop-shadow-lg relative z-[10000]">
          <div className="px-[10px]">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="text-cyan-500 cursor-pointer mr-[20px]">
                    <a href="/"><FontAwesomeIcon className="mr-1" icon="fa-solid fa-house" /></a>
                  </div>
                  <div className="text-cyan-500 cursor-pointer" onMouseEnter={() => onProjectHover()} onMouseLeave={() => onProjectLeave()}>
                    <div className="absolute top-[20px]">
                      <a href="/projects">
                        <FontAwesomeIcon className="mr-1" icon="fa-regular fa-folder" />
                        Projects
                      </a>
                      <div id="project-dropdown" className="hidden relative right-0 z-[10000] mt-2 w-48 origin-top-right rounded-md bg-white text-black py-1 shadow-lg">
                        <ul>
                          { projectsList }
                        </ul>
                        <div className="my-[5px] mx-[8px]">
                          <a href="/project/new" className="bg-cyan-400 w-full block text-center">New Project</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-shrink-0 items-center">
                  {/* <div className="mr-10 text-cyan-500 cursor-pointer">
                    <FontAwesomeIcon icon="fa-regular fa-compass" />
                  </div>
                  <div className="mr-10 text-cyan-500 cursor-pointer">
                    <FontAwesomeIcon icon="fa-regular fa-circle-question" />
                  </div> */}
                  <div className="relative mr-10 text-cyan-500 cursor-pointer">
                    <FontAwesomeIcon icon="fa-regular fa-bell" />
                    <div className="absolute w-[23px] z-[10000] top-[-10px] right-[-15px] h-[23px] rounded-full bg-red-600">
                      <div className="text-[10px] text-white text-center leading-[22px]">400</div>
                    </div>
                  </div>
                  <div className="text-cyan-500 cursor-pointer" onMouseEnter={() => onProfileHover()} onMouseLeave={() => onProfileLeave()}>
                    {/* <img className="h-8 w-8 rounded-full" src="../assets/default-profile.jpeg" alt="" /> */}
                    <img className="h-8 w-8 rounded-full" src={ props.loggedInUser.imgUrl ? props.loggedInUser.imgUrl : new URL("../assets/default-profile.jpeg", import.meta.url)} alt="" />
                    <div className="absolute right-0 w-[150px]">
                      <div id="profile-dropdown" className="hidden relative right-0 z-[10000] mt-2 w-48 origin-top-right rounded-md bg-white text-black py-1 shadow-lg">
                        <ul>
                          <div className="block px-4 py-2 text-sm">
                            <li>Megatron</li>
                            <li onClick={ () => props.signOut() }>Sign Out</li>
                          </div>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>:
      <>
        <nav id="nav" className="bg-slate-300 drop-shadow-lg relative z-[1000]">
          <div className="px-[10px]">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <div className="text-cyan-500 cursor-pointer mr-[20px]">Logo</div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-shrink-0 items-center">
                  <div className="mr-10 text-cyan-500 cursor-pointer">
                    Features
                  </div>
                  <div className="mr-10 text-cyan-500 cursor-pointer">
                    Pricing
                  </div>
                  <div className="mr-10 text-cyan-500 cursor-pointer">
                    About
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex flex-shrink-0 items-center">
                  <div className="mr-10 text-cyan-500 cursor-pointer">
                    <a href="/login">Login</a>
                  </div>
                  <div className="text-cyan-500 cursor-pointer">
                    <a href="/register">Register</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    }
    </>
  )
}

export default NavBar