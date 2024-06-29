import React, { useEffect } from "react";
import EduCollabImg from "../Assets/eduCollab.png";
import OutlookIcon from "../Assets/outlookIcon.svg";
import "./Login.css";

const Login = () => {
  const handleSignIn = () => {
    // Redirect to your backend route for Microsoft authentication
    console.log(window.href);
    window.location.href = "http://localhost:5500/auth/microsoft";
  };

  useEffect(() => {
    // Check if there is user data in URL params after redirect from Microsoft
    const urlParams = new URLSearchParams(window.location.search);
    const userDataJson = urlParams.get("user");

    if (userDataJson) {
      const userData = JSON.parse(userDataJson);
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to desired page or do other actions
    }
  }, []);

  return (
    <div className="signIn_body">
      <div className="signin_maindiv">
        <div className="signinUpperdiv">
          <h2 className="signInHeading">
            <span className="login_welcome">Welcome</span>
            to <span className="brandName">EduCollab</span>
          </h2>
          <img className="signInImg" src={EduCollabImg} alt="SignIn Visuals" />
        </div>


        {/* <h3 className="loginPara">Login with Outlook ID</h3> */}
        <div className="loginSection">
          <button type="button" className="loginbtn" onClick={handleSignIn}>
            <img src={OutlookIcon} alt="" className="outlookIconImg" />
            <span>Login with Microsoft</span>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Login;