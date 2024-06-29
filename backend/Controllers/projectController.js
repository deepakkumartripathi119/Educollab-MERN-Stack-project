// const Project = require("../Models/projectModel");
// const Chat = require("../Models/chatModel");
// const cloudinary = require("cloudinary").v2;
// const streamifier = require("streamifier");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const postProject = async (req, res) => {
//   const NewProject = req.body;
//   const file = req.file;
//   try {
//     console.log(req.body);
//     // Create and save the new project
//     const newProject = new Project(NewProject);
//     if (file) {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         async (error, result) => {
//           if (error) {
//             console.log(error);
//             return res.status(500).json({ message: "Cloudinary upload failed." });
//           }
//           newProject.icon = result.secure_url;
//           // Save the project after assigning the icon URL
//           const savedProject = await newProject.save();

//           // Create a new empty chat related to this project
//           const newChat = new Chat({
//             projectID: savedProject._id,
//             projectName: savedProject.title,
//             members: [], // Assuming you might want to add participants later
//             messages: [] // Starting with an empty messages array
//           });
//           await newChat.save(); // Save the new chat

//           return res.status(200).json(savedProject); // Respond with both project and chat details
//         }
//       );
//       streamifier.createReadStream(file.buffer).pipe(uploadStream);
//     } else {
//       // If there's no file, save the project and create the chat as before
//       const savedProject = await newProject.save();
//       const newChat = new Chat({
//         projectID: savedProject._id,
//         projectName: savedProject.title,
//         members: [], // Assuming you might want to add participants later
//         messages: [] // Starting with an empty messages array
//       });
//       await newChat.save();
//       res.status(200).json({ project: savedProject, chat: newChat });
//       //res.status(200).json(savedProject);
//     }
//   } catch (error) {
//     console.error("Error creating project and chat:", error);
//     res.status(404).json({ message: error.message });
//   }
// };


// const getAllProjects = async (req, res) => {
//   const { tags } = req.body;
//   try {
//     const projects = await Project.find();
//     if (tags) {
//       const filteredProjects = projects.filter((Project) =>
//         Project.skills.some((tag) => tags.includes(tag))
//       );
//       res.status(200).json(filteredProjects);
//       return;
//     }
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const getProjectById = async (req, res) => {
//   const proj = await Project.findById(req.params.id);
//   if (!proj) {
//     res.status(404);
//     throw new Error("Project not found");
//   }
//   res.status(200).json(proj);
// };

// const addCollaborators = async (req, res) => {
//   const { projectId } = req.params;
//   const { userId } = req.body;

//   try {
//     const project = await Project.findById(projectId);

//     if (!project) {
//       return res.status(404).json({ message: "Project not found" });
//     }

//     // Check if user is already a contributor
//     const existingContributor = project.contributors.find(
//       (contributor) => contributor.userId === userId
//     );

//     if (existingContributor) {
//       return res.status(400).json({ message: "User already a contributor" });
//     }

//     // Add user to project contributors with status pending
//     project.contributors.push({ userId, status: "pending" });
//     await project.save();

//     res.status(200).json({ message: "User joined project successfully" });
//   } catch (error) {
//     console.error("Error joining project:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const acceptCollaborator = async (req, res) => {
//   const { projectId, userId } = req.params; // Extract projectId and userId from request parameters

//   try {
//     // Update project, setting the status of the specified user to 'approved'
//     const updatedProject = await Project.updateOne(
//       { _id: projectId, "contributors.userID": userId },
//       { $set: { "contributors.$.status": "approved" } }
//     );

//     // Check if the operation modified any document
//     if (updatedProject.modifiedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Project or contributor not found" });
//     }

//     res.json({ message: "Contributor approved successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error approving contributor", error: error.message });
//   }
// };

// const rejectCollaborator = async (req, res) => {
//   const { projectId, userId } = req.params;

//   try {
//     // Update the project, pulling the specified user from the contributors array
//     const updatedProject = await Project.updateOne(
//       { _id: projectId },
//       { $pull: { contributors: { userID: userId } } }
//     );

//     // Check if the operation modified any document
//     if (updatedProject.modifiedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Project or contributor not found" });
//     }

//     res.json({ message: "Contributor rejected successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error rejecting contributor", error: error.message });
//   }
// };

// module.exports = {
//   postProject,
//   getAllProjects,
//   getProjectById,
//   addCollaborators,
//   acceptCollaborator,
//   rejectCollaborator,
// };


const Project = require("../Models/projectModel");
const Comment = require("../Models/commentModel.js");
const User = require("../Models/userModel");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const Chat = require("../Models/chatModel");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const postProject = async (req, res) => {
  const projectData = req.body;
  console.log("Project Data:",projectData);
  const userID = req.params.userID; // Make sure this param name matches the one in your route

  try {
    // Create the new project without saving it just yet
    const newProject = new Project({
      title: projectData.title,
      description: projectData.description,
      tags: projectData.tags,
      githubLink: projectData.githubLink,
      deployedLink: projectData.deployedLink,
      owner: userID, // Ensure 'owner' is the correct field name in your schema
      perHeadCredits: projectData.credits,
      contributors: [], // Add the owner as an approved contributor
      comments: [],
      rating: 0,
      status: projectData.status
    });
    newProject.contributors.push({ userID: userID, status: 'pending' });
    await newProject.save();

    const user= await User.findById(userID);
    user.myProjects.push(newProject._id);
    user.myCollabedProjects.push(newProject._id);
    await user.save();

    const chat= new Chat({
      projectID:newProject._id,
      projectName:newProject.title,
      members:[userID],
      messages:[]
    });
    await chat.save();
    
      res.status(201).json(newProject);
    // }
  } catch (error) {
    console.error(error);
    res.status(409).json({ message: error.message });
  }
};

function calculateRating(comment) {
  let sum = 0.0;
  if (comment.length === 0) return 0; // Ensure no division by zero
  for (let i = 0; i < comment.length; i++) {
    sum += comment[i].rating;
  }
  return sum / comment.length;
}



const getAllProjects = async (req, res) => {
  const { tags } = req.body;
  try {
    const projects = await Project.find();
    if (tags) {
      const filteredProjects = projects.filter((Project) =>
        Project.skills.some((tag) => tags.includes(tag))
      );
      res.status(200).json(filteredProjects);
      return;
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  const proj = await Project.findById(req.params.id);
  if (!proj) {
    res.status(404);
    throw new Error("Project not found");
  }
  res.status(200).json(proj);
};

const postProjectComment = async (req, res) => {
  try {
    const { review, rating } = req.body;

    console.log(review, rating);
    const userID = req.params.userID;
    const projectID = req.params.projectID;

    // Verify the project exists before proceeding
    

    // Create and save the new comment
    const newComment = new Comment({
      userID,
      projectID,
      review,
      rating,
    });
    await newComment.save();

    console.log(newComment)
    const project = await Project.findById(projectID);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found!" });
    }
    // Append new comment's ID to the project's comments array
    // project.comments.push(newComment._id); // This is the crucial step
    // await project.save(); // Save the project with the updated comments array
    
    // Fetch all comments for the project to recalculate the average rating
    // Assuming calculateRating function takes an array of comments and returns the average rating
    const comments = await Comment.find({projectID:projectID});
    const averageRating = calculateRating(comments);
    project.rating = averageRating.toFixed(0); // Updating the project's rating based on new average
    await project.save(); // Save the project again with the updated rating

    // Respond with the updated project information
    res.status(201).json({ success: true, data: project, message: "Comment added successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



const getProjectComment = async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const comment = await Comment.find({ projectID });

    res.status(200).json({ success: true, data: comment, message: "Comment fetched successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const addCollaborators = async (req, res) => {
  const projectID  = req.params.projectID;
  const userID  = req.params.userID;

  try {
    const project = await Project.findById(projectID);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user is already a contributor
    // const existingContributor = project.contributors.find(
    //   (contributor) => contributor.userId === userId
    // );

    // if (existingContributor) {
    //   return res.status(400).json({ message: "User already a contributor" });
    // }

    // Add user to project contributors with status pending
    project.contributors.push({ userID: userID, status: 'pending' });
    await project.save();
    const user = await User.findById(userID);
    user.myCollabedProjects.push(projectID);
    await user.save();
    const chat= new Chat.findOne({projectID:projectID});
    chat.members.push(userID);
    await chat.save();
    res.status(200).json({ message: "User joined project successfully" });
  } catch (error) {
    console.error("Error joining project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const acceptCollaborator = async (req, res) => {
  const { projectId, userId } = req.params; // Extract projectId and userId from request parameters

  try {
    // Update project, setting the status of the specified user to 'approved'
    const updatedProject = await Project.updateOne(
      { _id: projectId, "contributors.userID": userId },
      { $set: { "contributors.$.status": "approved" } }
    );

    // Check if the operation modified any document
    if (updatedProject.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Project or contributor not found" });
    }

    res.json({ message: "Contributor approved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error approving contributor", error: error.message });
  }
};
const completeProject = async (req, res) => {
  const projectID = req.params.projectID;
  try {
    const project = await Project.findById(projectID);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    project.status = "completed";
    await project.save();
    const users = await User.find({ myCollabedProjects: projectID });
    users.forEach(async (user) => {
      user.creditScore += project.perHeadCredits;
      await user.save();
    });
    res.status(200).json({ message: "Project completed successfully" });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const rejectCollaborator = async (req, res) => {
  const { projectId, userId } = req.params;

  try {
    // Update the project, pulling the specified user from the contributors array
    const updatedProject = await Project.updateOne(
      { _id: projectId },
      { $pull: { contributors: { userID: userId } } }
    );

    // Check if the operation modified any document
    if (updatedProject.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Project or contributor not found" });
    }

    res.json({ message: "Contributor rejected successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error rejecting contributor", error: error.message });
  }
};

module.exports = {
  postProject,
  getAllProjects,
  getProjectById,
  addCollaborators,
  acceptCollaborator,
  rejectCollaborator,
  postProjectComment,
  getProjectComment,
  completeProject
};
