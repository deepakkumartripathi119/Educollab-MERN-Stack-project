import 'package:app/screens/profile_screen.dart';
import 'package:app/widgets/courses_screen/courses_for_you.dart';
import 'package:flutter/material.dart';

import '../widgets/courses_screen/courses_personal.dart';

class CoursesScreen extends StatefulWidget {
  const CoursesScreen({super.key});

  @override
  State<CoursesScreen> createState() => _CoursesScreenState();
}

class _CoursesScreenState extends State<CoursesScreen> {
  bool showForYou = true;

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
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
            child: CircleAvatar(
              // backgroundColor: const Color(0xff357AFF),
              child: IconButton(
                icon: const Icon(
                  Icons.account_circle,
                  color: Colors.black,
                  size: 20,
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            const ProfileScreen()));
                },
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const SizedBox(width: 8,),

                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size(125, 50),
                        maximumSize: const Size(150, 50),
                        shape: const RoundedRectangleBorder(
                            borderRadius: BorderRadius.horizontal(
                                left: Radius.circular(50))),
                        backgroundColor: showForYou ? Colors.blue : Colors.grey,
                      ),
                      onPressed: () {
                        setState(() {
                          showForYou = true;
                        });
                      },
                      child: const Text('For You'),
                    ),
                  ),
                  Expanded(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size(125, 50),
                        maximumSize: const Size(150, 50),
                        shape: const RoundedRectangleBorder(
                            borderRadius: BorderRadius.horizontal(
                                right: Radius.circular(50))),
                        backgroundColor: showForYou ? Colors.grey : Colors.blue,
                      ),
                      onPressed: () {
                        setState(() {
                          showForYou = false;
                        });
                      },
                      child: const Text('Personal'),
                    ),
                  ),
                  const SizedBox(width: 8,),

                ],
              ),
            ),
            Expanded(
              child: showForYou ? coursesForYouGrid() : coursesPersonalGrid(),
            ),
          ],
        ),
      ),
    );
  }
}