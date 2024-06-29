import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Course from './Pages/Course';
import ChatRoom from './Pages/ChatRoom';
import Doubts from './Pages/Doubts';
import Login from './Pages/Login';
import Background from './Pages/Background';
import UpdateProfile from './Pages/UpdateProfile';
import AddProject from './Pages/AddProject';

import AddCourse from './Pages/AddCourse';
function App() {
  return (
    
    < Router>
      <Background />
      <Routes>
        {/* <Route path="/" element={<Background />} /> */}

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/course" element={<Course />} />
        <Route path="/chatroom" element={<ChatRoom />} />
        <Route path="/chatroom/:projectID" element={<ChatRoom />} />
        <Route path="/doubts" element={<Doubts />} />
        <Route path='/updateProfile' element={<UpdateProfile/>} />
        <Route path='/addproject' element={<AddProject/>} />
        <Route path='/addcourse' element={<AddCourse/>} />
      </Routes>
    </Router>
  );
}

export default App;
