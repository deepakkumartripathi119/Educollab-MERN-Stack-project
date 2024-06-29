const User  = require('../Models/userModel');
const Project  = require('../Models/projectModel.js');
const Chat = require('../Models/chatModel.js')
const Message = require('../Models/messageModel.js')
const connectDB_fire = require("../Config/db_fire.js");

async function getCollabs(req, res) {
  try {
    const userId=req.params.userID;
    console.log(userId);
    const user=await User.findById(userId).populate({path:'myCollabedProjects',model:'Project'}).exec();
    collabedProjects = user.myCollabedProjects;
    res.status(200).json(collabedProjects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getCollabById = async (req, res) => {
  const  projectId  = req.params.projectID;
  if (!projectId) {
    return res.status(400).json({ error: 'Invalid projectId provided' });
  }
  const chat=await Chat.findOne({projectID:projectId}).populate({path:'messages',model:'Message'}).exec();
  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }
  const sortedMessages=chat.messages.sort((a,b)=>a.createdAt-b.createdAt);
  const simplifiedMessages = sortedMessages.map(({ userID, message}) => ({ userID, message}));

  res.status(200).json(simplifiedMessages);
};

// const postMessage = async (req, res) => {
//   try {
//     const { userID, message } = req.body;
//     const newMesage = new Message({
//         userID : userID,
//         message : message,
//     });

//     const newChatMessage=await newMesage.save();
//     const projectId = req.params.projectID;
//     const chat = await Chat.findOne({projectID:projectId});
//     if (!chat) {
//       return res.status(404).json({ error: 'Chat not found' });
//     }
//     chat.messages.push(newChatMessage._id);
//     await chat.save();

//     res.status(201).json({ success: true, data: newChatMessage, message: "Message added!" });
// } catch (error) {
//     res.status(500).send(error.message);
//     console.log(error.message);
// }
// };

const postMessage = async (req, res) => {
  try {
    // Extract userID and message from the request body
    const { userID, message } = req.body;
    // Get the user by userID and populate the email field
    const user = await User.findById(userID).select('email').exec();

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the username from the email
    const username = user.email.split('@')[0];
    
    // Create a new message document in MongoDB
    const newMessage = new Message({
        userID: userID,
        message: message,
    });

    // Save the new message document in MongoDB
    const newChatMessage = await newMessage.save();

    // Find the chat document by projectID
    const projectId = req.params.projectID;
    const chat = await Chat.findOne({projectID: projectId});

    // Check if chat document exists
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Add the new message ID to the chat document's messages array
    chat.messages.push(newChatMessage._id);
    await chat.save();

    // Now save the message to Firestore
    const db = await connectDB_fire(); // Ensure you have already called this somewhere appropriate in your app, or ensure it handles repeated calls gracefully
    const currtime = new Date().toISOString().replace(/[^0-9]/g, "").substring(0, 14);
    await db.collection('chats').doc(projectId).collection('messages').doc(currtime).set({
      userID: username,
      message: message,
      createdAt: currtime,
    });

    // Respond with success
    res.status(201).json({ success: true, data: newChatMessage, message: "Message added!" });
  } catch (error) {
    // Handle any errors
    res.status(500).send(error.message);
    console.log(error.message);
  }
};


module.exports = { getCollabs,getCollabById, postMessage } ;

  