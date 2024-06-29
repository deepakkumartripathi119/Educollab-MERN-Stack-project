import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import "./AddCourse.css";

const AddCourse = () => {
  // const [userData, setUserData] = useState(() =>
  //   JSON.parse(localStorage.getItem("userData") || "{}")
  // );

  // Initialize form values directly from userData state
  // const initialValues = {
  //   githubID: userData?.githubID || "",
  //   designation: userData?.designation || "",
  //   tags: [""], // Assuming tags always start empty or can be populated similarly if needed
  // };

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const user=JSON.parse(localStorage.getItem("userData"));
  const userid=user._id;
  const initialValues = {
    courseName: "",
    courseDesc: "",
    linkToCourse: "",
    tags: [""], // Initialize tags as an empty array
  };
  const handleSubmit = async (values) => {
     // Exit if no userData is found
     

    try {
      console.log("new course: ", values);
      const response = await fetch(
        `http://localhost:5500/courses/add/${userid}/addCourse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({tag: values.tags, courseName: values.courseName, courseDesc: values.courseDesc, linkToCourse: values.linkToCourse}),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      alert("Course Added Successfully!");
      setUpdateSuccess(true); // Set flag to true on successful update
    } catch (error) {
      console.error("Error adding course:", error);
      alert(`Error adding course: ${error.message}`); // Show error alert
    }
  };

  useEffect(() => {
    // If update was successful, redirect to dashboard
    if (updateSuccess) {
      window.location.href = "/dashboard";
    }
  }, [updateSuccess]);

  return (
    <div className="update-profile-container">
      <h2 className="update_profile_heading">Add Course</h2>
      <Formik
      initialValues={initialValues}
        
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="update-profile-form">
            <div className="form-group">
              <label className="form-label">Course Name:</label>
              <Field
                type="text"
                className="form-control"
                name="courseName"
                
              />
            </div>

            <div className="form-group">
              <label className="form-label">Course Description:</label>
              <Field
                type="text"
                className="form-control"
                name="courseDesc"
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="courseLink" className="form-label">
                Course Link:
              </label>
              <Field
                type="text"
                id="githubLink"
                name="linkToCourse"
                className="form-control"
              />
            </div>

        

            <div className="form-group">
              <label className="form-label">Tags:</label>
              <FieldArray name="tags">
                {({ remove, push }) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index} className="tag-field-group">
                        <Field
                          type="text"
                          name={`tags[${index}]`}
                          className="form-control"
                        />
                        <ErrorMessage
                          name={`tags[${index}]`}
                          component="div"
                          className="error-message"
                        />
                        {values.tags.length > 1 && (
                          <button
                            type="button"
                            className="skill-remove-btn"
                            onClick={() => remove(index)}
                          >
                            Remove Tag
                          </button>
                        )}
                        <div className="spacer"></div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="skill-add-btn"
                      onClick={() => push("")}
                    >
                      Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCourse;
