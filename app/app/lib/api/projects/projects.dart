import 'dart:convert';

import 'package:app/constants/endpoints.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

Future<void> fetchAllProjects() async {
  try {
    final response = await http.get(Uri.parse(ProjectsEndpoints.fetchAllProjects));

    if (response.statusCode == 200) {
      final List<dynamic> projectsData = json.decode(response.body);
      var box = await Hive.openBox('project-data');
      box.put('all_projects', projectsData);
      var box2 = await Hive.openBox('user-data');
      var myCollabedProjectsId = box2.get('my_collabed_projects_id');
      var myProjectsId = box2.get('my_projects_id');
      print(myCollabedProjectsId);
      List<dynamic> myProject = projectsData.where((project) {
        return myProjectsId.contains(project["_id"]);
      }).toList();
      List<dynamic> myCollabedProjects = projectsData.where((project) {
        return myCollabedProjectsId.contains(project["_id"]);
      }).toList();
      print(myCollabedProjects);
      print('object');
      box2.put('my_projects', myProject);
      box2.put('my_collabed_projects', myCollabedProjects);

      // print('Projects data stored in SharedPreferences: $projectsData');
    } else {
      throw Exception('Failed to fetch projects data');
    }
  } catch (error) {
    print('Error: $error');
  }
}