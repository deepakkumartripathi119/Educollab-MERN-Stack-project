class Project {
  String title;
  String description;
  String githubLink;
  List<String> tags;
  String status;
  String owner;
  double perHeadCredits;
  List<String> contributors;
  int likes;
  List<String> mediaFiles;
  String deployedLink;
  List<String> comments;

  Project({
    required this.title,
    required this.description,
    required this.githubLink,
    required this.tags,
    required this.status,
    required this.owner,
    required this.perHeadCredits,
    required this.contributors,
    required this.likes,
    required this.mediaFiles,
    required this.deployedLink,
    required this.comments,
  });

  factory Project.fromJson(Map<String, dynamic> json) {
    return Project(
      title: json['title'],
      description: json['description'],
      githubLink: json['githubLink'],
      tags: List<String>.from(json['tags']),
      status: json['status'],
      owner: json['owner'],
      perHeadCredits: json['perHeadCredits'],
      contributors: List<String>.from(json['contributors']),
      likes: json['likes'],
      mediaFiles: List<String>.from(json['mediaFiles']),
      deployedLink: json['deployedLink'],
      comments: List<String>.from(json['comments']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'githubLink': githubLink,
      'tags': tags,
      'status': status,
      'owner': owner,
      'perHeadCredits': perHeadCredits,
      'contributors': contributors,
      'likes': likes,
      'mediaFiles': mediaFiles,
      'deployedLink': deployedLink,
      'comments': comments,
    };
  }
}

class Comment {
  String userID;
  String comment;
  DateTime timestamp;

  Comment({
    required this.userID,
    required this.comment,
    required this.timestamp,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      userID: json['userID'],
      comment: json['comment'],
      timestamp: DateTime.parse(json['timestamp']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'userID': userID,
      'comment': comment,
      'timestamp': timestamp.toIso8601String(),
    };
  }
}
