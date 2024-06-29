import 'package:flutter/material.dart';

class ProjectCard extends StatelessWidget {
  final String title;
  final String description;
  final int likes;
  final String status;
  const ProjectCard({super.key, required this.title, required this.description, required this.likes, required this.status});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children:[
          Padding(
            padding: const EdgeInsets.fromLTRB(0, 4, 4, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Chip(label: Text(status, style: const TextStyle(fontSize: 12)),backgroundColor: Colors.blue,),
              ],
            ),
          ),
          SizedBox(height: 8,),
          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          Expanded(child: Text(description, style: const TextStyle(fontSize: 12))),


          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                const Icon(Icons.star),
                Text(likes.toString()),
              ],
            ),
          ),
        ],
      ),
    );
  }}