// const clientId = 'af25041c-1400-4050-935d-e6e660525e6b';
// const scope = 'offline_access User.Read';
// const redirectUri = 'msauth://com.example.app/%2B1ym241gVsqVSC9Nt63cKn8WNNM%3D';
// // const redirectUri = 'http://localhost:5500/auth/microsoft/redirect/mobile';
// // const authorizationEndpoint ='https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/authorize';
// const authorizationEndpoint ='https://login.microsoftonline.com/common/oauth2/v2.0/authorize';
//
//
// class AuthEndpoints {
//   final String getAccess = '$authorizationEndpoint?client_id=$clientId&response_type=code&redirect_uri=$redirectUri&response_mode=query&scope=${Uri.encodeComponent(scope)}&state=12345&consent';
// }

// const String baseurl = "http://10.0.2.2:5500";
const String baseurl = "http://localhost:5500";
// const String baseurl = "http://localhost:5500";


class CollabsEndpoints {
  static const String baseUrl = '$baseurl/api/collab';
  
  static String getCollabs(String userID) => '$baseUrl/collabs/$userID';
  static String getChats(String userID) => '$baseUrl/collabs/$userID/chats';
  static String getCollabById(String projectID) => '$baseUrl/chat/$projectID';
  static String postMessage(String projectID) => '$baseUrl/chat/$projectID';
}



class AuthEndpoints {
  static const String baseUrl = '$baseurl/auth';

  static const String userData = '$baseUrl/userdata/mobile';
  static const String register = '$baseUrl/register/';
  // Add more endpoints as needed
}

class UsersEndpoints {
  static const String baseUrl = '$baseurl/users';

  static const String getUserById = '$baseUrl/:userId';
  static const String updateUser = '$baseUrl/:userId';
  // Add more endpoints as needed
}

class ProjectsEndpoints {
  static const String baseUrl = '$baseurl/projects';

  static const String getProjectById = '$baseUrl/:projectId';
  static const String fetchAllProjects = '$baseUrl/fetch/all';
  // Add more endpoints as needed
}

class CoursesEndpoints {
  static const String baseUrl = '$baseurl/courses';

  static const String getCourseById = '$baseUrl/:courseId';
  static const String enrollCourse = '$baseUrl/:courseId/enroll';
  // Add more endpoints as needed
}