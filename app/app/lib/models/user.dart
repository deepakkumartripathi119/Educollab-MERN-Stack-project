import 'project.dart';

class User {
  String username;
  String email;
  int creditScore;
  List<String> tags;
  String profilePic;
  String githubID;
  String designation;
  List<String> questionList;
  List<String> myLikedProjects;
  List<Project> myProjects;
  List<String> myCourses;
  List<Project> myCollabedProjects;
  List<String> upVoted;
  List<String> downVoted;

  User({
    required this.username,
    required this.email,
    required this.creditScore,
    required this.tags,
    required this.profilePic,
    required this.githubID,
    required this.designation,
    required this.questionList,
    required this.myLikedProjects,
    required this.myProjects,
    required this.myCourses,
    required this.myCollabedProjects,
    required this.upVoted,
    required this.downVoted,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      username: json['username'],
      email: json['email'],
      creditScore: json['creditScore'],
      tags: List<String>.from(json['tags']),
      profilePic: json['profilePic'],
      githubID: json['githubID'],
      designation: json['designation'],
      questionList: List<String>.from(json['questionList']),
      myLikedProjects: List<String>.from(json['myLikedProjects']),
      myProjects: (json['myProjects'] as List<dynamic>)
          .map((projectJson) => Project.fromJson(projectJson))
          .toList(),
      myCourses: List<String>.from(json['myCourses']),
      myCollabedProjects: (json['myCollabedProjects'] as List<dynamic>)
          .map((projectJson) => Project.fromJson(projectJson))
          .toList(),
      upVoted: List<String>.from(json['upVoted']),
      downVoted: List<String>.from(json['downVoted']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'email': email,
      'creditScore': creditScore,
      'tags': tags,
      'profilePic': profilePic,
      'githubID': githubID,
      'designation': designation,
      'questionList': questionList,
      'myLikedProjects': myLikedProjects,
      'myProjects': myProjects.map((project) => project.toJson()).toList(),
      'myCourses': myCourses,
      'myCollabedProjects': myCollabedProjects.map((project) => project.toJson()).toList(),
      'upVoted': upVoted,
      'downVoted': downVoted,
    };
  }
}
