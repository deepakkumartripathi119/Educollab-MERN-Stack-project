const Course = require("../Models/courseModel.js");
const Feedback = require("../Models/feedbackModel.js");
const User = require("../Models/userModel.js");
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res
      .status(200)
      .json({ success: true, data: courses, message: "All courses fetched!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
const getCourseById = async (req, res) => {
  try {
    const course = Course.findById(req.params.courseID);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found !" });
    }
    res
      .status(200)
      .json({ success: true, data: course, message: "Course fetched!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};
const postCourse = async (req, res, next) => {
  try {
    const { tag, courseName, courseDesc, linkToCourse } = req.body;
    const userID = req.params.userID;
    const newCourse = new Course({
      tag: tag,
      courseName: courseName,
      courseDesc: courseDesc,
      rating: 0,
      feedback: [],
      addedBy: userID,
      linkToCourse: linkToCourse,
    });

    await newCourse.save();
    const user=await User.findById(userID);
    user.myCourses.push(newCourse._id);
    await user.save();
    res
      .status(201)
      .json({ success: true, data: newCourse, message: "Course added!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

function calculateRating(feedback) {
  let sum = 0.0;
  for (let i = 0; i < feedback.length; i++) {
    sum += feedback[i].rating;
  }
  return sum / feedback.length;
}

const postFeedback = async (req, res) => {
  try {
    const { review, rating } = req.body;

    const newFeedback = new Feedback({
      userID: req.params.userID,
      courseID: req.params.courseID,
      review: review,
      rating: rating,
    });
    await newFeedback.save();
    const feedback = await Feedback.find({ courseID: req.params.courseID });
    if(!feedback) {
      res.status(404).json({ success: false, message: "Course not found !" });
    }
    
    const rating1 = calculateRating(feedback);
    const course = await Course.findById(req.params.courseID);
    course.rating = rating1.toFixed(0);
    await course.save();

    res
      .status(201)
      .json({ success: true, data: course, message: "Feedback added!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ courseID: req.params.courseID });
    
    res
      .status(200)
      .json({ success: true, data: feedback, message: "Feedback fetched!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

const postCourseToProfile = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseID);
    const user = await User.findById(req.params.userID);
    user.myCourses.push(newCourse._id);
    await user.save();
    res
      .status(200)
      .json({ success: true, data: user, message: "Course added to profile!" });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  postCourse,
  postFeedback,
  getFeedback,
  postCourseToProfile,
};
