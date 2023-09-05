function Dashboard(props) {
  return (
    <>
      <div className="container">
        <h1 className="text-xl my-2">Projects Dashboard</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 gap-4">
          <div className="lg:col-span-2 md:col-span-3 sm:col-span-3 xs:col-span-3 bg-red-400">
            Working on
            {/* TODO clickable list of user stories (newest to oldest, pagination show only latest 10)
            projectImage | projectTitle
            storyStatus
            storyTitle (including number) */}
          </div>
          <div className="lg:col-span-1 md:col-span-3 sm:col-span-3 xs:col-span-3 bg-blue-300">
            projects
            {/* TODO clickable project tiles
            projectImg | projectTitle
            project description
            number of members */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard