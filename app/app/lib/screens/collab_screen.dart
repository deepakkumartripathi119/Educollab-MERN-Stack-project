import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:aad_oauth/aad_oauth.dart';
import 'package:aad_oauth/model/config.dart';
import '../main.dart';
import '../widgets/collab_screen/project_chatroom_grid.dart';
import 'profile_screen.dart';
import 'splash_screen.dart';

class CollabScreen extends StatefulWidget {
  const CollabScreen({super.key});

  @override
  State<CollabScreen> createState() => _CollabScreenState();
}

class _CollabScreenState extends State<CollabScreen> {
  bool isLoading = true;
  List<dynamic>? chatRooms;
  String? username;
  String? userId;
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
    setState(() {
      chatRooms = box.get('my_collabed_projects');
      username = box.get('current_user')['email']?.split('@')[0];
      userId = box.get('current_user')['_id'];
      isLoading = false;
    });
    print(userId);
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
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: isLoading
              ? const CircularProgressIndicator()
              :Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: const Text("Chat-Rooms", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              ),

              Expanded(
                child: projectChatRoomGrid(chatRooms!, username, userId),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
