import 'package:aad_oauth/aad_oauth.dart';
import 'package:aad_oauth/model/config.dart';
import 'package:app/screens/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_profile_picture/flutter_profile_picture.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../api/authentication/login.dart';
import '../main.dart';
import '../widgets/profile_screen/project_card.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {


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

  bool showSkills = true;
  bool showProjects = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  const BackButton(),
                  const SizedBox(
                    width: 16,
                  ),
                  const Text(
                    'Profile',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: () async {
                      Navigator.pop(context);
                      Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                              builder: (context) =>
                              const SplashScreen()));await oauth.logout();
                      final prefs = await SharedPreferences.getInstance();
                      prefs.clear();
                    },
                    style: TextButton.styleFrom(backgroundColor: Colors.red),
                    child: const Text(
                      "Logout",
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),

              const ProfilePicture(
                name: "Naman",
                radius: 50,
                fontsize: 21,
                count: 1,
              ),
              const SizedBox(height: 16),

              const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Expanded(
                      child: Text('Naman Tiwari',
                          style: TextStyle(
                              fontSize: 24, fontWeight: FontWeight.bold))),
                  Chip(
                      label: Text('n.tiwari',
                          style: TextStyle(fontSize: 18, color: Colors.grey))),
                ],
              ),
              const Row(
                children: [
                  Text('Graphic Designer', style: TextStyle(fontSize: 12)),
                ],
              ),

              const SizedBox(height: 8),

              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.horizontal(
                              left: Radius.circular(50),
                              right: Radius.circular(50))),
                    ),
                    onPressed: () {},
                    child: const Text('GitHub'),
                  ),
                  const SizedBox(
                    width: 16,
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.horizontal(
                              left: Radius.circular(50),
                              right: Radius.circular(50))),
                    ),
                    onPressed: () {},
                    child: const Text('Email'),
                  ),
                ],
              ),
              Row(
                children: [
                  const Text('Skills:',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  IconButton(
                      onPressed: () {
                        setState(() {
                          showSkills = !showSkills;
                        });
                      },
                      icon: (showSkills)
                          ? const Icon(Icons.expand_less)
                          : const Icon(Icons.expand_more)),
                ],
              ),
              if (showSkills)
                const Wrap(
                  spacing: 8.0,
                  runSpacing: 0.0,
                  children: [
                    Chip(label: Text('Java')),
                    Chip(label: Text('Frontend')),
                    Chip(label: Text('Dev')),
                    Chip(label: Text('UI/UX')),
                    Chip(label: Text('UI/UX')),
                    Chip(label: Text('UI/UX')),
                    Chip(label: Text('UI/UX')),
                    Chip(label: Text('UI/UX')),
                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    Chip(label: Text('UI/UX')),

                    // Add more chips here
                  ],
                ),
              // const SizedBox(height: 16),
              // Section title
              Row(
                children: [
                  const Text('Projects:',
                      style:
                          TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  IconButton(
                      onPressed: () {
                        setState(() {
                          showProjects = !showProjects;
                        });
                      },
                      icon: (showProjects)
                          ? const Icon(Icons.expand_less)
                          : const Icon(Icons.expand_more)),
                ],
              ),
              // Grid of project cards
              if (showProjects)
                Expanded(
                  child: GridView.builder(
                    shrinkWrap: true, // Use it to avoid infinite height error
                    // physics: NeverScrollableScrollPhysics(), // to disable GridView's scrolling
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 8,
                      mainAxisSpacing: 8,
                      childAspectRatio: (2 / 1), // Aspect Ratio of Cards
                    ),
                    itemCount: 16, // The number of cards
                    // padding: const EdgeInsets.all(16),
                    itemBuilder: (context, index) {
                      return const ProjectCard();
                    },
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
