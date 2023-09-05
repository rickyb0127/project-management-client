function Projects(props) {
  return (
    <>
      <h1 className="text-xl my-2">My Projects</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4">
        <div className="lg:col-span-3 md:col-span-3 sm:col-span-2 xs:col-span-2 bg-red-400">
          Working on
          {/* TODO clickable list of user stories (newest to oldest, pagination show only latest 10)
          projectImage | projectTitle */}
        </div>
        <div className="lg:col-span-1 md:col-span-1 sm:col-span-2 xs:col-span-2 bg-blue-300">
          Reorder your projects to set at the top the most used ones. The top 4 projects will appear in the top navigation bar project list projects
        </div>
      </div>
    </>
  )
}

export default Projects