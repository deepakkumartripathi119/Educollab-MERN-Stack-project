import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import '../api/authentication/login.dart';
import 'login_screen.dart';
import 'nav_bar_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() async {
    await Future.delayed(const Duration(seconds: 2), () async {});

    if (!mounted) return;
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => FutureBuilder(
              future: isLoggedIn(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  final isLoggedIn = snapshot.data ?? false;
                  if (!isLoggedIn) {
                    return const LoginScreen();
                  } else {
                    return const NavBarScreen(selectedIndex: 0,);
                  }
                } else {
                  return const Scaffold(
                    backgroundColor: Colors.white,
                  );
                }
              }),
        ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: Center(
        child: DefaultTextStyle(
          style: const TextStyle(
              fontSize: 50.0, fontWeight: FontWeight.w700, color: Colors.white),
          child: AnimatedTextKit(
            animatedTexts: [
              TypewriterAnimatedText('Edu-Collab',
                  speed: const Duration(milliseconds: 100)),
            ],
          ),
        ),
      ),
    );
  }
}
