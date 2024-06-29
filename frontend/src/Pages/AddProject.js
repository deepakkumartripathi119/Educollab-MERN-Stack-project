// // import './NewProjectCard.css'
// // import axios from 'axios';

// // function NewProjectCard() {

// //   const handleSubmit = async () => {
// //     const title = document.querySelector('.titleinput').value;
// //     const description = document.querySelector('.descriptioninput').value;
// //     const githubLink = document.querySelector('.githubinput').value;
// //     const credit = document.querySelector('.Creditinput').value;
// //     console.log("Credit:-",credit);
// //     const url = document.querySelector('.urlinput').value;
// //     const statusElement = document.querySelector('.statusinput .active-status');
// //     const status = statusElement ? statusElement.textContent : undefined;
// //     const tags = Array.from(document.querySelectorAll('.tagsinput .tags-selected')).map(tag => tag.textContent);
// //     try {
// //       const response = await axios.post(`http://localhost:5500/projects/add`, {
// //         title,
// //         description,
// //         githubLink,
// //         credit,
// //         url,
// //         status,
// //         tags
// //       });
// //       console.log("Project data:-",response.data); // Handle the response from the backend
// //     } catch (error) {
// //       console.error("Error uploading project:", error);
// //     }
// //   };

// //   return (
// //     <div className='newProjectCardMainDiv'>
// //       <div className='newprojectHeading'>
// //         <div>New Project</div>
// //       </div>

// //       <div className='titleHeader input-field'>
// //         <div className='row-title'>Title:  </div>
// //         <input className='titleinput' />
// //       </div>

      
// //       <div className='descriptionHeader input-field'>
// //         <div className='row-title'>Description:</div>
// //         <textarea className='descriptioninput' />
// //       </div>

// //       <div className='githubHeader input-field'>
// //         <div className='row-title'>Github Link: </div>
// //         <input className='githubinput' />
// //       </div>

// //       <div className='tagsHeader input-field'>
// //         <div className='row-title'>Tags: </div>
// //         <div className='tagsinput'>
// //             <button className='tagsElement tags-selected'>Java</button>
// //             <button className='tagsElement'>FrontEnd</button>
// //             <button className='tagsElement'>Dev</button>
// //             <button className='tagsElement'>Java</button>
// //             <button className='tagsElement'>FrontEnd</button>
// //             <button className='tagsElement'>Dev</button>
// //             <button className='tagsElement'>Java</button>
// //             <button className='tagsElement'>FrontEnd</button>
// //             <button className='tagsElement'>Dev</button>
// //             <button className='tagsElement'>Java</button>
// //             <button className='tagsElement'>FrontEnd</button>
// //             <button className='tagsElement'>Dev</button>
// //             <button className='tagsElement'>Java</button>
// //             <button className='tagsElement'>FrontEnd</button>
// //             <button className='tagsElement'>Dev</button>           
// //         </div>
// //       </div>
      
// //       <div className='status-credit'>
// //         <div className='statusHeader input-field'>
// //           <div className='row-title'>Status:</div>
// //           <div className='statusinput'>
// //             <div className='incomplete' >Incomplete</div>
// //             <div className='complete active-status' >Complete</div>
// //           </div>
// //         </div>
// //         <div className='creditHeader input-field'>
// //           <div className='row-title'>Credit:</div>
// //           <input className='Creditinput' />
// //         </div>
// //       </div>
// //       <div className='urlHeader input-field'>
// //         <div className='row-title'>URL:</div>
// //         <input className='urlinput'></input>
// //       </div>
// //       <div className='MediaHeader input-field'>
// //         <div className='row-title'>Media Files:</div>
// //         <div className='Mediainput'></div>
// //         <div className="upload-div">
// //           <button className='Uploadbutton' onClick = {handleSubmit}>Upload</button>
// //         </div>
// //       </div>

// //     </div>
    
// //   )
// // }

// // export default NewProjectCard


// // import React, { useState, useEffect } from "react";
// // import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
// // import "./AddProject.css";

// // const AddProject = () => {
// //   const [userData, setUserData] = useState(() =>
// //     JSON.parse(localStorage.getItem("userData") || "{}")
// //   );

// //   // Initialize form values directly from userData state
// //   const initialValues = {
// //     githubID: userData?.githubID || "",
// //     designation: userData?.designation || "",
// //     tags: [""], // Assuming tags always start empty or can be populated similarly if needed
// //   };

// //   const [updateSuccess, setUpdateSuccess] = useState(false);

// //   const handleSubmit = async (values) => {
// //     if (!userData) return; // Exit if no userData is found
// //     const userID = userData._id;

// //     try {
// //       console.log("In update profile: ", userData);
// //       const response = await fetch(
// //         `http://localhost:5500/users/update/${userID}`,
// //         {
// //           method: "PATCH",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(values),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error("Failed to update profile");
// //       }

// //       alert("User profile updated successfully");
// //       setUpdateSuccess(true); // Set flag to true on successful update
// //     } catch (error) {
// //       console.error("Error updating profile:", error);
// //       alert(`Error updating profile: ${error.message}`); // Show error alert
// //     }
// //   };

// //   useEffect(() => {
// //     // If update was successful, redirect to dashboard
// //     if (updateSuccess) {
// //       window.location.href = "/dashboard";
// //     }
// //   }, [updateSuccess]);

// //   return (
// //     <div className="update-profile-container">
// //       <h2 className="update_profile_heading">Update Profile</h2>
// //       <Formik
// //         initialValues={initialValues}
// //         onSubmit={handleSubmit}
// //         enableReinitialize
// //       >
// //         {({ values }) => (
// //           <Form className="update-profile-form">
// //             <div className="form-group">
// //               <label className="form-label">Name:</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 value={userData.username || ""}
// //                 disabled
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label className="form-label">Email:</label>
// //               <input
// //                 type="email"
// //                 className="form-control"
// //                 value={userData.email || ""}
// //                 disabled
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="githubLink" className="form-label">
// //                 GitHub Link:
// //               </label>
// //               <Field
// //                 type="text"
// //                 id="githubLink"
// //                 name="githubID"
// //                 className="form-control"
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label htmlFor="designation" className="form-label">
// //                 Designation:
// //               </label>
// //               <Field
// //                 type="text"
// //                 id="designation"
// //                 name="designation"
// //                 className="form-control"
// //               />
// //             </div>

// //             <div className="form-group">
// //               <label className="form-label">Tags:</label>
// //               <FieldArray name="tags">
// //                 {({ remove, push }) => (
// //                   <div>
// //                     {values.tags.map((tag, index) => (
// //                       <div key={index} className="tag-field-group">
// //                         <Field
// //                           type="text"
// //                           name={`tags[${index}]`}
// //                           className="form-control"
// //                         />
// //                         <ErrorMessage
// //                           name={`tags[${index}]`}
// //                           component="div"
// //                           className="error-message"
// //                         />
// //                         {values.tags.length > 1 && (
// //                           <button
// //                             type="button"
// //                             className="skill-remove-btn"
// //                             onClick={() => remove(index)}
// //                           >
// //                             Remove Tag
// //                           </button>
// //                         )}
// //                         <div className="spacer"></div>
// //                       </div>
// //                     ))}
// //                     <button
// //                       type="button"
// //                       className="skill-add-btn"
// //                       onClick={() => push("")}
// //                     >
// //                       Add Tag
// //                     </button>
// //                   </div>
// //                 )}
// //               </FieldArray>
// //             </div>

// //             <button type="submit" className="submit-btn">
// //               Submit
// //             </button>
// //           </Form>
// //         )}
// //       </Formik>
// //     </div>
// //   );
// // };

// // export default AddProject;

// import React from 'react';
// import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
// import "./AddProject.css";

// const AddProject = () => {
//   // Initial values for the form fields
//   const initialValues = {
//     title: '',
//     description: '',
//     githubLink: '',
//     status: 'ongoing', // Default status
//     credits: '',
//     tags: [''], // Start with one empty tag field
//   };

//   const handleSubmit = async (values) => {
//     try {
//       const response = await fetch('http://localhost:5500/projects/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add project');
//       }

//       alert('Project added successfully');
//       // Optionally redirect the user or reset the form
//     } catch (error) {
//       console.error('Error adding project:', error);
//       alert(`Error adding project: ${error.message}`);
//     }
//   };

//   return (
//     <div className="add-project-container">
//       <h2 className="add_project_heading">Add Project</h2>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ values }) => (
//           <Form className="add-project-form">
//             <div className="form-group">
//               <label htmlFor="title" className="form-label">Title:</label>
//               <Field id="title" name="title" type="text" className="form-control" />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description" className="form-label">Description:</label>
//               <Field id="description" name="description" as="textarea" className="form-control" />
//             </div>

//             <div className="form-group">
//               <label htmlFor="status" className="form-label">Status:</label>
//               <Field as="select" name="status" className="form-control">
//                 <option value="ongoing">Ongoing</option>
//                 <option value="completed">Completed</option>
//               </Field>
//             </div>

//             <div className="form-group">
//               <label htmlFor="credits" className="form-label">Credits:</label>
//               <Field id="credits" name="credits" type="text" className="form-control" />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Tags:</label>
//               <FieldArray name="tags">
//                 {({ remove, push }) => (
//                   <div>
//                     {values.tags.map((tag, index) => (
//                       <div key={index} className="tag-field-group">
//                         <Field name={`tags[${index}]`} type="text" className="form-control" />
//                         <ErrorMessage name={`tags[${index}]`} component="div" className="error-message" />
//                         {values.tags.length > 1 && (
//                           <button type="button" className="tag-remove-btn" onClick={() => remove(index)}>
//                             Remove Tag
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                     <button type="button" className="tag-add-btn" onClick={() => push('')}>
//                       Add Tag
//                     </button>
//                   </div>
//                 )}
//               </FieldArray>
//             </div>

//             <button type="submit" className="submit-btn">Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AddProject;


import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import "./AddProject.css";

const AddProject = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  // Initial values for the form fields
  const initialValues = {
    title: '',
    description: '',
    status: 'ongoing', // Default status
    credits: '',
    tags: [''], // Start with one empty tag field
  };

  const handleSubmit = async (values) => {
    try {
      if(values.credits>(user.creditScore)/10){
        alert('Per head credits CANNOT be more than 10% of your credit score');
        return;
      }
      const response = await fetch(`http://localhost:5500/projects/add/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // If the response is not OK, throw an error with the response's status text
        throw new Error(`Failed to add project: ${response.statusText}`);
      }

      // Assuming your API returns the created project including its ID
      const newProjectData = await response.json();

      alert('Project added successfully');

      // Optionally, here you can update userData in localStorage with the new project ID
      // Ensure to handle this safely in production code

      // Redirect to the dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error adding project:', error);
      alert(`Error adding project: ${error.message}`);
    }
  };

  return (
    <div className="add-project-container">
      <h2 className="add_project_heading">Add Project</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form className="add-project-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">Title:</label>
              <Field id="title" name="title" type="text" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">Description:</label>
              <Field id="description" name="description" as="textarea" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="status" className="form-label">Status:</label>
              <Field as="select" name="status" className="form-control">
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </Field>
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Github Link:</label>
              <Field id="gitlink" name="githubLink" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="title" className="form-label">Deployed Link:</label>
              <Field id="deplink" name="deployedLink" type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="credits" className="form-label">Per Head Credits:</label>
              <Field id="credits" name="credits" type="number" className="form-control" />
            </div>

            <div className="form-group">
              <label className="form-label">Tags:</label>
              <FieldArray name="tags">
                {({ remove, push }) => (
                  <div>
                    {values.tags.map((tag, index) => (
                      <div key={index} className="tag-field-group">
                        <Field name={`tags[${index}]`} type="text" className="form-control" />
                        <ErrorMessage name={`tags[${index}]`} component="div" className="error-message" />
                        {values.tags.length > 1 && (
                          <button type="button" className="tag-remove-btn" onClick={() => remove(index)}>
                            Remove Tag
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" className="tag-add-btn" onClick={() => push('')}>
                      Add Tag
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProject;
