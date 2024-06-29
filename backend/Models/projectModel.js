const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, default: '' }, // Providing a default empty string
  description: { type: String, default: '' }, // Providing a default empty string
  githubLink: { type: String, default: '' }, // Providing a default empty string
  tags: [{ type: String }], // No change needed
  status: { type: String, enum: ['completed', 'ongoing'], default: 'ongoing' }, // Added a default status
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Duplicate removed
  perHeadCredits: { type: Number, default: 0 }, // Providing a default value
  contributors: [{ 
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['approved', 'pending'], default: 'pending' } // Added default status for contributors
  }],
  rating: { type: Number, min: 0, max: 5, default: 0},
  deployedLink: { type: String, default: '' }, // Providing a default empty string
  comments: [{
     type: mongoose.Schema.Types.ObjectId, ref: 'Comment' 
  }],
}, { timestamps: true }); // This adds createdAt and updatedAt fields automatically

// Custom validation or middleware to ensure unique comments per user
projectSchema.pre('save', function(next) {
  // Ensure uniqueness of userID in comments
  const comments = this.comments;
  const uniqueUserIDs = new Set(comments.map(comment => comment.userID.toString()));
  if (uniqueUserIDs.size !== comments.length) {
    next(new Error('Each user can only comment once.'));
  } else {
    next();
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;