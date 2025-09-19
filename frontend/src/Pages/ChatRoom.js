import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';
import io from 'socket.io-client';
import ChatContent from '../Components/ChatContent';
import ChatList from '../Components/ChatList';
import'./CollabPage.css';

// Set API URL based on environment
const API_URL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL;
  
const socket = io.connect(API_URL);

const CollabPage = () => {
  const navigate = useNavigate();
  const [collabedProjects, setCollabedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const userId =  JSON.parse(localStorage.getItem('userData'))._id;

  useEffect(() => {

    const fetchCollabedProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/collab/collabs/${userId}`);
        setCollabedProjects(response.data);
      } catch (error) {
        console.error('Error fetching collabed projects:', error);
      }
    };

    fetchCollabedProjects();
  }, [userId]);

  // Handler for when a project is clicked in the ChatList
  const handleProjectClick = async (projectId) => {
    console.log("Project clicked:", projectId);
    navigate(`/chatroom/${projectId}`);
    setMessages([]);
    setError(null);
    socket.emit('join-room', { room: projectId });
    try {
      // Fetch chat messages for the selected project
      const response = await axios.get(`${API_URL}/api/collab/chat/${projectId}`);
      setMessages(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      setError('Error fetching chat messages. Please try again.');
    }

    setSelectedProject(projectId);
  };

  const updateMessages = (newMessages) => {
    setMessages(newMessages);
  };

  return (
    <div className="chatroom_holder">
      <div className="chatroom_left">
      <ChatList collabedProjects={collabedProjects} onProjectClick={handleProjectClick} socket={socket} />
      </div>
      {selectedProject ? (
        <div className="chatroom_right">
        <ChatContent userId={userId} selectedProject={selectedProject} messages={messages} socket={socket} updateMessages={updateMessages} />
      </div>) : 
      (<div className="chatroom_right">
        <p> Select a project to start chatting </p>
        </div>) }

    </div>
  );
};

export default CollabPage;
