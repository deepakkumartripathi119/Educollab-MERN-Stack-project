import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Navbar from "../Components/Navbar";
import ProjectCard from "../Components/ProjectCard";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  const [selectedProjectType, setSelectedProjectType] = useState("All");
  const [allCourses, setAllCourses] = useState([]);
  const [allDoubts, setAllDoubts] = useState([]);

  const [allProjectType, setAllProjectType] = useState(true);

  let userEmailTemp;

  const handleClickProjectType = (data) => {
    setSelectedProjectType(data);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5500/auth/userData");
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          const jsonData = JSON.stringify(userData);

          userEmailTemp = userData.emails[0].value;

          console.log(userData);
          const temp_name = userData.displayName
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
          setUserName(temp_name);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:5500/users/fetch/all");
        if (response.ok) {
          const allUsersData = await response.json();
          console.log(allUsersData.data);
          setAllUsers(allUsersData.data);
          await localStorage.setItem(
            "allUsers",
            JSON.stringify(allUsersData.data)
          );
          console.log(
            "All Users data stored successfully in localStorage.",
            allUsers
          );
          // Iterate over each array in the object
          for (const key in allUsersData) {
            if (Array.isArray(allUsersData[key])) {
              const usersArray = allUsersData[key];
              // Find the user with matching email id
              const foundUser = await usersArray.find(
                (user) => user.email === userEmailTemp
              );
              console.log(foundUser);
              if (foundUser) {
                // Set the found user data
                setUserData(foundUser);
                // Set the user name
                const tempName = foundUser.username
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase());
                setUserName(tempName);
                // Store the user data in localStorage
                await localStorage.setItem(
                  "userData",
                  JSON.stringify(foundUser)
                );
                console.log(
                  "User data stored successfully in localStorage.",
                  userData
                );
                break; // Stop iterating if user is found
              }
            }
          }
        } else {
          throw new Error("Failed to fetch all users data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:5500/projects/fetch/all"
        );
        if (response.ok) {
          const projectsData = await response.json();
          setAllProjects(projectsData);
          await localStorage.setItem(
            "projectsData",
            JSON.stringify(projectsData)
          );
          console.log("Projects data stored in localStorage:", allProjects);
        } else {
          throw new Error("Failed to fetch projects data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllCourses = async () => {
      try {
        const response = await fetch("http://localhost:5500/courses/all");
        if (response.ok) {
          const courseData = await response.json();
          setAllCourses(courseData);
          await localStorage.setItem("courseData", JSON.stringify(courseData));
          console.log("All course data:", allCourses);
        } else {
          throw new Error("Failed to fetch courses");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllDoubts = async () => {
      try {
        const response = await fetch("http://localhost:5500/doubts/fetch/all");
        if (response.ok) {
          const doubtsData = await response.json();
          setAllDoubts(doubtsData);
          await localStorage.setItem("allDoubts", JSON.stringify(doubtsData));
          console.log("All doubts data:", allDoubts);
          console.log("All doubts data stored successfully in localStorage.");
        } else {
          throw new Error("Failed to fetch all doubts data");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
    fetchAllUsers();
    fetchAllProjects();
    fetchAllCourses();
    fetchAllDoubts();
  }, []);
//   return (
//     <div>
//       {userData && (
//         <>
//           <Navbar />
//           <div className="welcome-message">
//             {userName && (
//               <div className="text-welcome">
//                 Hi, {userName} <br /> Welcome to 'EduCollab'
//               </div>
//             )}
//           </div>
//           <div className="add-project">
//             <Link to="/addproject"><button className="add-project-btn">Add Project</button></Link>
//           </div>
//           <div className="small-navbar">
//             <button
//               onClick={() => handleClickProjectType("All")}
//               className={
//                 selectedProjectType === "All"
//                   ? "small-buttons-selected"
//                   : "small-buttons-not-selected"
//               }
//             >
//               All Projects
//             </button>
//             <button
//               onClick={() => handleClickProjectType("My")}
//               className={
//                 selectedProjectType === "My"
//                   ? "small-buttons-selected"
//                   : "small-buttons-not-selected"
//               }
//             >
//               My Projects
//             </button>
//           </div>
//           <div className="small-screen">
//             {selectedProjectType === "All" && (
//               <div className="carousal-space">
//                 <div className="category_name">New Arrivals</div>
//                 <div className="rule_r"></div>
//                 <div className="projects">
//                   {allProjects.filter((project) => userData.myProjects.includes(project._id)).length > 0 ? (
//                     allProjects
//                       .filter((project) => userData.myProjects.includes(project._id))
//                       .map((project) => (
//                         <ProjectCard key={project._id} projectData={project} />
//                       ))
//                   ) : (
//                     <div>No projects to show.....</div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {selectedProjectType === "My" && (
//               <div className="carousal-space">
//                 <div className="category_name">My Projects and Collabs</div>
//                 <div className="rule_r"></div>
//                 <div className="projects">
//                   {allProjects.filter((project) => userData.myProjects.includes(project._id)).length > 0 ? (
//                     allProjects
//                       .filter((project) => userData.myProjects.includes(project._id))
//                       .map((project) => (
//                         <ProjectCard key={project._id} projectData={project} />
//                       ))
//                   ) : (
//                     <div>No projects to show.....</div>
//                   )}
//                 </div>
//               </div>
//             )}
//             {/* <div className="new-arrivals">
//           <div className="category_name">New Arrivals</div>
//           <div className="rule_r"></div>
//         </div>
//         <div className="new-arrivals">
//           <div className="category_name">New Arrivals</div>
//           <div className="rule_r"></div>
//         </div>
//         <div className="new-arrivals">
//           <div className="category_name">New Arrivals</div>
//           <div className="rule_r"></div>
//         </div> */}
//           </div>
//           <div className="center">
//             {/* <div class="pagination">
//           <a href="#" class="active">1</a>
//           <a href="#">2</a>
//           <a href="#">3</a>
//           <a href="#">4</a>
//           <a href="#">5</a>
//           <a href="#">6</a>
//           <a href="#">&raquo;</a>
//         </div> */}
//             <footer className="footer">Thank you for visiting</footer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;
return (
  <div>
    {userData && (
      <>
        <Navbar userData={userData} />
        <div className="welcome-message">
          {userName && (
            <div className="text-welcome">
              Hi, {userName} <br /> Welcome to 'EduCollab'
            </div>
          )}
        </div>
        <div className="add-project">
           <Link to="/addproject"><button className="add-project-btn">Add Project</button></Link>
        </div>
        <div className="small-navbar">
          <button
            onClick={() => handleClickProjectType("All")}
            className={
              selectedProjectType === "All"
                ? "small-buttons-selected"
                : "small-buttons-not-selected"
            }
          >
            All Projects
          </button>
          <button
            onClick={() => handleClickProjectType("My")}
            className={
              selectedProjectType === "My"
                ? "small-buttons-selected"
                : "small-buttons-not-selected"
            }
          >
            My Projects
          </button>
        </div>
        <div className="small-screen">
          {selectedProjectType === "All" && (
            <div className="carousal-space">
              <div className="category_name">New Arrivals</div>
              <div className="rule_r"></div>
              <div className="projects">
                {allProjects.length > 0 ? (
                  allProjects.map((project) => (
                    <ProjectCard key={project._id} projectData={project} />
                  ))
                ) : (
                  <div>No projects to show.....</div>
                )}
              </div>
            </div>
          )}
          {selectedProjectType === "My" && (
            <div className="carousal-space">
              <div className="category_name">My Projects</div>
              <div className="rule_r"></div>
              <div className="projects my">
                {allProjects.filter((project) => userData.myProjects.includes(project._id)).length > 0 ? (
                  allProjects
                    .filter((project) => userData.myProjects.includes(project._id))
                    .map((project) => (
                      <ProjectCard key={project._id} projectData={project} />
                    ))
                ) : (
                  <div>No projects to show.....</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="center">
          {/* <div class="pagination">
        <a href="#" class="active">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div> */}
          <footer className="footer">Thank you for visiting</footer>
        </div>
      </>
    )}
  </div>
);
};

export default Home;