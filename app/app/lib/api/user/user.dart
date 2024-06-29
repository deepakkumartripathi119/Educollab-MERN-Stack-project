import 'dart:convert';
import 'package:hive/hive.dart';
import '../../constants/endpoints.dart';
import 'package:http/http.dart' as http;
import '../../database/hive_store.dart';
import '../projects/projects.dart';
import '../protected.dart';

Future<void> getCurrentUser() async {

  try {
    var box = await Hive.openBox('user-data');
    var box2 = await Hive.openBox('current-user');

    final resp = await http.get(
      Uri.parse(AuthEndpoints.userData).replace(queryParameters: {
      // 'email': box2.get('user_email'),})
        'email': 'r.maharsh@iitg.ac.in',})

    );
    final body = jsonDecode(resp.body);
    print(body);
    // List<String> myCollabedProjects = [];
    // List<String> myProjects = [];

    box.put('current_user', body);
    var myCollabedProjects = (body['myCollabedProjects'])??[];
    var myProjects = body['myProjects']??[];
    box.put('my_collabed_projects_id', myCollabedProjects);
    box.put('my_projects_id', myProjects);
    print(box.get('my_collabed_projects_id'));
    // var box_project = await Hive.openBox('project-data');
    fetchAllProjects();
  } catch (e) {
    print(e);
    rethrow;
  }
}