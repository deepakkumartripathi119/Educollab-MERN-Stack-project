import 'dart:convert';

import 'package:aad_oauth/aad_oauth.dart';
import 'package:aad_oauth/model/config.dart';
import 'package:app/screens/splash_screen.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../main.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {

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

  var _isLoading = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Stack(
          children: [
            Column(
              children: [
                const SizedBox(
                  height: 250.0,
                ),
                const Text(
                  'Create, Connect and Elevate...',
                  style: TextStyle(fontSize: 40.0, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center,

                ),
                const SizedBox(
                  height: 10.0,
                ),
                const Text(
                  'Unlock seamless collaboration,showcasing,and networking.Post projects,connect with peers,explore opportunities. Start your journey to success now',
                  style: TextStyle(fontSize: 16.0),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(
                  height: 60.0,
                ),
                ElevatedButton(
                  onPressed: () async {

                    await login(true);
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                            const SplashScreen()));
                    // try {
                    //   setState(() {
                    //     _isLoading = true;
                    //   });
                    //   await authenticate();
                    //   setState(() {
                    //     _isLoading = false;
                    //   });
                    //   if (!mounted) return;
                    //   Navigator.of(context).pushReplacement(
                    //     MaterialPageRoute(
                    //       builder: (context) => const NavBarScreen(selectedIndex: 0,),
                    //     ),
                    //   );
                    //   showSnackBar(
                    //       'Successfully Logged In!', context);
                    // } catch (e) {
                    //   Navigator.of(context).pushAndRemoveUntil(
                    //       MaterialPageRoute(
                    //         builder: (context) => const LoginScreen(),
                    //       ),
                    //           (route) => false);
                    //
                    //   showSnackBar('Something Went Wrong!', context);
                    // }
                  },
                  style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueAccent,
                      padding: const EdgeInsets.all(25),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20))),
                  child: const Text('Login Using Outlook',
                      style: TextStyle(color: Colors.white, fontSize: 20)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void showError(dynamic ex) {
    showMessage(ex.toString());
  }

  void showMessage(String text) {
    var alert = AlertDialog(content: Text(text), actions: <Widget>[
      TextButton(
          child: const Text('Ok'),
          onPressed: () {
            Navigator.pop(context);
          })
    ]);
    showDialog(context: context, builder: (BuildContext context) => alert);
  }

  Future<void> login(bool redirect) async {
    config.webUseRedirect = redirect;
    final result = await oauth.login();
    // result.fold(
    //       (l) => print(l.toString()),
    //       (r) => print('Logged in successfully, your access token: $r'),
    // );
    final prefs = await SharedPreferences.getInstance();
    var accessToken = await oauth.getAccessToken();

    // var userEmail = await o
    if (accessToken != null) {
      prefs.setString('access_token', accessToken);
      var response = await http.get(Uri.parse('https://graph.microsoft.com/v1.0/me'),
          headers: {'Authorization': 'Bearer $accessToken'});
      if (response.statusCode == 200) {
        var userProfile = jsonDecode(response.body);
        // prefs.setString('user_email', userProfile["mail"]);
        final box = await Hive.openBox('user-data');
        await box.put('user_email', userProfile["mail"]);
        print('User Profile: $userProfile');
        print(userProfile["mail"]);
      } else {
        print('Failed to get user profile. Status code: ${response.statusCode}');
      }
      // prefs.setString('user_email', useremail);
      // ScaffoldMessenger.of(context).hideCurrentSnackBar();
      // ScaffoldMessenger.of(context)
      //     .showSnackBar(SnackBar(content: Text(accessToken)));
    }
  }

  Future<void> _getUserProfile() async {
    try {
      var token = await oauth.getAccessToken();
      // Use token to make requests to Microsoft Graph API to get user profile
      var response = await http.get(Uri.parse('https://graph.microsoft.com/v1.0/me'),
          headers: {'Authorization': 'Bearer $token'});

      if (response.statusCode == 200) {
        var userProfile = jsonDecode(response.body);
        print('User Profile: $userProfile');
      } else {
        print('Failed to get user profile. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error getting user profile: $e');
    }
  }

  void hasCachedAccountInformation() async {
    var hasCachedAccountInformation = await oauth.hasCachedAccountInformation;
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content:
        Text('HasCachedAccountInformation: $hasCachedAccountInformation'),
      ),
    );
  }

}



// class LoginScreen extends StatefulWidget {
//   const LoginScreen({super.key});
//
//   @override
//   State<LoginScreen> createState() => _LoginScreenState();
// }
//
// class _LoginScreenState extends State<LoginScreen> {
//   var _isLoading = false;
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: SafeArea(
//
//         top: Platform.isAndroid,
//         child: Stack(
//           children: [
//
//             Column(
//               children: [
//                 Expanded(
//                   flex: 4,
//                   child: Row(
//                     children: [
//                       const Spacer(
//                         flex: 5,
//                       ),
//                       Expanded(
//                         flex: 2,
//                         child: Container(
//                           color: Colors.black,
//                           child: const Column(
//                             mainAxisAlignment: MainAxisAlignment.spaceAround,
//                             children: [
//                               RotatedBox(
//                                 quarterTurns: 1,
//                                 child: Text(
//                                   'CourseHub',
//                                   style: TextStyle(
//                                       color: Colors.white,
//                                       fontSize: 70,
//                                       fontWeight: FontWeight.w700),
//                                 ),
//                               ),
//                             ],
//                           ),
//                         ),
//                       )
//                     ],
//                   ),
//                 ),
//                 Expanded(
//                   flex: 1,
//                   child: Container(
//                     padding: const EdgeInsets.symmetric(
//                         vertical: 20, horizontal: 16),
//                     child: Column(
//                       children: [
//                         const Expanded(
//                           child: Text(
//                             'Your go-to platform for all your academic needs. Get access to past papers, lecture slides, assignments, tutorials, notes and more to help you ace your exams',
//                             textAlign: TextAlign.left,
//                             style: TextStyle(
//                               fontWeight: FontWeight.w600,
//                               color: Colors.black,
//                               fontSize: 14.0,
//                             ),
//                           ),
//                         ),
//                         Expanded(
//                           child: GestureDetector(
//                             onTap: () async {
//                               // try {
//                               //   setState(() {
//                               //     _isLoading = true;
//                               //   });
//                               //   await authenticate();
//                               //   setState(() {
//                               //     _isLoading = false;
//                               //   });
//                               //   if (!mounted) return;
//                               //   Navigator.of(context).pushReplacement(
//                               //     MaterialPageRoute(
//                               //       builder: (context) => const NavBarScreen(selectedIndex: 0,),
//                               //     ),
//                               //   );
//                               //   showSnackBar(
//                               //       'Successfully Logged In!', context);
//                               // } catch (e) {
//                               //   Navigator.of(context).pushAndRemoveUntil(
//                               //       MaterialPageRoute(
//                               //         builder: (context) => const LoginScreen(),
//                               //       ),
//                               //           (route) => false);
//                               //
//                               //   showSnackBar('Something Went Wrong!', context);
//                               // }
//                             },
//                             child: ,
//                           ),
//                         )
//                       ],
//                     ),
//                   ),
//                 )
//               ],
//             ),
//             Visibility(
//                 visible: _isLoading,
//                 child: const CustomLinearProgress(text:'Loading Edu-collab...' ,)
//
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }
