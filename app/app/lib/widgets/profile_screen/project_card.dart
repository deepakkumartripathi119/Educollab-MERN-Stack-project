import 'package:flutter/material.dart';

class ProjectCard extends StatelessWidget {
  const ProjectCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children:[
            Align(
              alignment: Alignment.topLeft,
              child: Icon(Icons.bookmark, color: Colors.blue),
            ),
            Text('Frontend developer Job.',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            // Text('Requirements: JavaScript', style: TextStyle(fontSize: 14)),
            // Row(
            //   mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //   children:[
            //     Text('5.2k', style: TextStyle(color: Colors.red)),
            //     Text('50'),
            //     ElevatedButton(
            //       onPressed: () {
            //         // View action
            //       },
            //       child: Text('View'),
            //     ),
            //   ],
            // ),
          ],
        ),
      ),
    );
  }
}
