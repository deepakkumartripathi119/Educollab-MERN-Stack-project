
import 'package:aad_oauth/aad_oauth.dart';
import 'package:aad_oauth/model/config.dart';
import 'package:app/constants/endpoints.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../main.dart';
import '../widgets/projects_screen/projects_for_you.dart';
import '../widgets/projects_screen/projects_personal.dart';
import 'profile_screen.dart';
import 'splash_screen.dart';

class ProjectsScreen extends StatefulWidget {
  const ProjectsScreen({super.key});

  @override
  State<ProjectsScreen> createState() => _ProjectsScreenState();
}

class _ProjectsScreenState extends State<ProjectsScreen> {
  bool showForYou = true;
  bool isLoading = true;
  List<dynamic>? myProjects;
  List<dynamic>? allProjects;
  // String? username;
  // String? userId;
  static final Config config = Config(
    tenant: "850aa78d-94e1-4bc6-9cf3-8c11b530701c",
    clientId: "af25041c-1400-4050-935d-e6e660525e6b",
    scope: "openid profile offline_access",
    // redirectUri is Optional as a default is calculated based on app type/web location
    redirectUri: "https://login.live.com/oauth20_desktop.srf",
    navigatorKey: navigatorKey,
    webUseRedirect: true, // default is false - on web only, forces a redirect flow instead of popup auth
    //Optional parameter: Centered CircularProgressIndicator while rendering web page in WebView
    loader: const Center(child: CircularProgressIndicator()),
    // postLogoutRedirectUri: 'http://your_base_url/logout', //optional
  );

  final AadOAuth oauth = AadOAuth(config);

  @override
  void initState() {
    super.initState();
    initHive();
  }

  Future<void> initHive() async {
    final box = await Hive.openBox('user-data');
    final box2 = await Hive.openBox('project-data');

    setState(() {
      myProjects = box.get('my_projects')??[];
      allProjects = box2.get('all_projects')??[];
      // userId = box.get('current_user')['_id'];
      isLoading = false;
    });
    print(myProjects![0]);
    // print(userId);
    // print(box.get('current_user'));
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          title: const Text(
            'Edu-Collab',
            style: TextStyle(
              color: Colors.black,
              fontWeight: FontWeight.w700,
            ),
          ),
          // centerTitle: true,
          actions: [
            Padding(
              padding: const EdgeInsets.fromLTRB(0, 0, 14, 0),
              child: IconButton(
                icon: const Icon(
                  Icons.logout,
                  color: Colors.red,
                  size: 20,
                ),
                onPressed: () async {
                  Navigator.pop(context);
                  Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                          const SplashScreen()));await oauth.logout();
                  final prefs = await SharedPreferences.getInstance();
                  prefs.clear();
                  // Navigator.push(
                  //     context,
                  //     MaterialPageRoute(
                  //         builder: (context) => const ProfileScreen())
                  // );
                },
              ),
            ),
          ],
        ),
        body: SafeArea(
          child: isLoading
              ? const CircularProgressIndicator()
              :Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      width: 8,
                    ),
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          minimumSize: Size(125, 50),
                          maximumSize: Size(150, 50),
                          shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.horizontal(
                                  left: Radius.circular(50))),
                          backgroundColor:
                              showForYou ? Colors.blue : Colors.grey,
                        ),
                        onPressed: () {
                          setState(() {
                            showForYou = true;
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: const Text('For You'),
                        ),
                      ),
                    ),
                    Expanded(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          minimumSize: Size(125, 50),
                          maximumSize: Size(150, 50),
                          shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.horizontal(
                                  right: Radius.circular(50))),
                          backgroundColor:
                              showForYou ? Colors.grey : Colors.blue,
                        ),
                        onPressed: () {
                          setState(() {
                            showForYou = false;
                          });
                        },
                        child: Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: const Text('Personal'),
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 8,
                    ),
                  ],
                ),
              ),
              Expanded(
                child:
                    showForYou ? projectsForYouGrid(allProjects) : projectsPersonalGrid(myProjects),
              ),
            ],
          ),
        ),
        // floatingActionButton: FloatingActionButton(
        //   onPressed: () async{
        //     final box = await Hive.openBox('user-data');
        //     print(box.get('user_details'));
        //     // getCollabs('65be9ce6213c752747f7208c');
        //   },
        //   backgroundColor: Colors.blue,
        //   child: const Icon(Icons.add),
        // )
    );
  }

  Future<bool> getCollabs(String projectId) async {
    final uri =
        Uri.parse(CollabsEndpoints.getCollabById('65be9ce6213c752747f7208c'));
    var response = await http.get(uri);
    if (response.statusCode == 200) {
      print(response.body);
      return true;
    } else {
      throw Exception('Failed to load post2');
    }
  }
}
