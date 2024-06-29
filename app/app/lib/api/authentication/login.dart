import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../database/hive_store.dart';
import '../projects/projects.dart';
import '../protected.dart';
import '../user/user.dart';

// Future<void> logoutHandler(context) async {
//   final prefs = await SharedPreferences.getInstance();
//   prefs.clear();
// }

Future<bool> isLoggedIn() async {
  var access = await getAccessToken();

  // await fetchAllProjects();
  if (access != 'error') {
    await getCurrentUser();
    // setHiveStore();
    //TODO fetch all data
    return true;
  } else {
    return false;
  }
}

Future<void> setHiveStore() async {
  final box = await Hive.openBox('user-data');
  final box1 = await Hive.openBox('project-data');
  HiveStore.userData = box.get('user') ?? {};
  // HiveStore.contribution = box.get('contribution') ?? [];
  // HiveStore.coursesData = box.get('courses-data') ?? {};
}



// import 'package:flutter/services.dart';
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:flutter_web_auth/flutter_web_auth.dart';
// import '../../constants/endpoints.dart';
// import '../protected.dart';
//
// Future<void> authenticate() async {
//   try {
//     final result = await FlutterWebAuth.authenticate(
//         url: AuthEndpoints().getAccess, callbackUrlScheme: "com.example.app");
//
//     final prefs = await SharedPreferences.getInstance();
//     var accessToken = Uri.parse(result).queryParameters['token'];
//     if (accessToken == null) {
//       throw ('access token not in query params');
//     }
//     prefs.setString('access_token', accessToken);
//     print(accessToken);
//   } on PlatformException catch (_) {
//     rethrow;
//   } catch (e) {
//     print(e);
//     rethrow;
//   }
// }
//
