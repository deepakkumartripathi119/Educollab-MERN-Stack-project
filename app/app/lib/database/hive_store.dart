// import 'package:coursehub/models/contribution.dart';
// import 'package:coursehub/models/favourites.dart';
// import 'package:coursehub/models/user.dart';

import 'package:app/models/project.dart';

import '../models/user.dart';

class HiveStore {
  static Map<String, dynamic> userData = {};
  static Map<String, dynamic> myProjects = {};
  // static Map<String, dynamic> myCourses = {};
  static List<String> myCollabedCourses = [];

  // static List<dynamic> contribution = [];
  // static Map<dynamic, dynamic> coursesData = {};

  static User getUserDetails() {
    return User.fromJson(userData);
  }

  // static List<Project> getMyProjects() {
  //   final myProjects = userData['myProjects'] as List<dynamic>;
  //   return myProjects.map((e) => myProjects.fromJson(e)).toList();
  // }
  //
  static List<String> getMyCollabedCourses() {
    final myCollabedCourses = userData['myCollabedCourses'] as List<String>;
    return myCollabedCourses;
  }
}
