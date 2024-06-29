import 'package:flutter/material.dart';

class CoursesCard extends StatelessWidget {
  const CoursesCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Icon(Icons.favorite_border), // Replace with your project card content
          Text('Course Title', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          Text('Requirement: Figma', style: TextStyle(fontSize: 14)),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: <Widget>[
              Icon(Icons.comment),
              Text('25'),
              Icon(Icons.favorite),
              Text('1.7k'),
            ],
          ),
        ],
      ),
    );
  }}