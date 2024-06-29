const Doubt = require('../Models/questionModel.js');
const Answer = require('../Models/answerModel.js');
const User = require('../Models/userModel.js');

const postDoubts = async (req, res, next) => {
  const newDoubt = new Doubt({
    question: req.body.question,
    userID: req.params.userID,
    answers: [],
    tags: []
  });
  try {
    const savedDoubt = await newDoubt.save();
    console.log("Saved Doubts : ", savedDoubt);
    res.status(201).json(savedDoubt);
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const postAnswers = async (req, res, next) => {
  try {
    const { answer, quesid, userid } = req.body;
     
    
    const question = await Doubt.findById(quesid);
    if(!question){
      res.status(404).json({error: 'Question not found'});
    }
    const newAnswer = new Answer({
      userID: userid,
      answerText: answer,
      upvote: 0,
      downvote: 0,
      question: quesid
    });
    await newAnswer.save();
    question.answers.push(newAnswer._id); 
    await question.save();
    const user=await User.findById(userid);
    if(!user){
      res.status(404).json({error: 'User not found'});
    } 
    user.questionList.push(quesid);
    await user.save();
    res.status(200).json(newAnswer);
  } catch (error) {
    next(error);
  }
};

const getDoubts = async (req, res, next) => {
  try {
    // let query = { ...(req.params.userID && { userID: req.params.userID }) };

    const doubts = await Doubt.find()
      .sort({ createdAt: -1 })
      .populate('answers')
      .exec();
    res.status(200).json( doubts );
  } catch (error) {
    next(error);
  }
};

const getAnswers = async (req, res, next) => {
  try {
    const answers = await Answer.find({ question: req.params.doubtID });
    res.status(200).json({
      answers
    });
  } catch (error) {
    next(error);
  }
};

const putVotes = async (req, res, next) =>
{
  try {

    let { userid, upvote, downvote, type } = req.body;
    console.log('upvoterID:', userid);
    console.log('Upvote:', upvote);
    console.log('Downvote:', downvote);
    console.log('type:', type);
    const answer=await Answer.findById(req.params.answerID);
    if(!answer){
      res.status(404).json({error: 'Answer not found'});
    }
    const user=await User.findById(answer.userID);
    if(!user){
      res.status(404).json({error: 'User not found'});
    }
    const upvoter=await User.findById(userid);
    if(!upvoter){
      res.status(404).json({error: 'upvoter not found'});
    }
    if(upvoter.upVoted.includes(req.params.answerID)){
      if(type==='downvote'){
        upvoter.upVoted.pull(req.params.answerID);
        upvoter.downVoted.push(req.params.answerID);
        upvote--;
        downvote++;
        user.creditScore-=2;
      }
    }else if(upvoter.downVoted.includes(req.params.answerID)){
      if(type==='upvote'){
        upvoter.downVoted.pull(req.params.answerID);
        upvoter.upVoted.push(req.params.answerID);
        downvote--;
        upvote++;
        user.creditScore+=2;
      }
    } else {
      if(type==='upvote'){
        upvoter.upVoted.push(req.params.answerID);
        upvote++;
        user.creditScore+=1;
      } else {
        upvoter.downVoted.push(req.params.answerID);
        downvote++;
        user.creditScore-=1;
      }
    }
    const seconds = Math.floor(answer.timestamp.getTime() / 1000); // Assuming this is how you obtain the seconds
    const dateFromTimestamp = new Date(seconds * 1000); // Convert back to milliseconds
    answer.timestamp = dateFromTimestamp;
   

    

    answer.upvote=upvote;
    answer.downvote=downvote;
    await answer.save();
    await upvoter.save();
    
    await user.save();
    res.status(200).json({message: 'Vote processed successfully', data: {upvote, downvote}});

} catch (error) {
    next(error);
    res.status(400).json({ error: 'Bad request' });
}
}

module.exports = {
  postDoubts,
  postAnswers,
  getDoubts,
  getAnswers,
  putVotes
};
