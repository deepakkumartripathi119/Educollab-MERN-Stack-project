import 'package:flutter/material.dart';
import 'project_card.dart';

Widget projectsForYouGrid(List<dynamic>? myProjects) {

  return GridView.builder(
    padding: const EdgeInsets.all(8),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 2,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: myProjects?.length, // Replace with the number of 'For You' items
    itemBuilder: (context, index) {
      return ProjectCard(title: (myProjects![index])['title'], description: (myProjects[index])['description'], likes: (myProjects[index])['likes']??5, status: (myProjects[index])['status'],

      ); // Customize this widget as needed
    },
  );
}