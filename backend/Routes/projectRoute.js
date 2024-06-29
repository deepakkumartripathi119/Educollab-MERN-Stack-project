// const express = require("express");
// const router = express.Router();
// const {
//   getProjectById,
//   postProject,
//   getAllProjects,
//   addCollaborators
// } = require("../Controllers/projectController.js");

// router.post("/add", postProject);
// router.get("/fetch/all", getAllProjects);
// router.get("/:projectID", getProjectById);
// router.post("/join/:projectID", addCollaborators)

// module.exports = router;


const express = require("express");
const router = express.Router();
const {
  getProjectById,
  postProject,
  getAllProjects,
  addCollaborators,
  getProjectComment,
  postProjectComment,
  completeProject
} = require("../Controllers/projectController.js");

router.post("/add/:userID", postProject);
router.get("/fetch/all", getAllProjects);
router.get("/:projectID", getProjectById);
// router.post("/join/:projectID", addCollaborators)
router.post("/complete/:projectID", completeProject);
router.get("/getComment/:projectID", getProjectComment);
router.post("/addComment/:projectID/:userID", postProjectComment);
router.post("/addContributor/:projectID/:userID", addCollaborators);
module.exports = router;