import 'package:flutter/material.dart';

import 'project_card.dart';

Widget projectsPersonalGrid(List<dynamic>? myProjects) {
  if(myProjects!.isEmpty){
    return Center(child: Text("Add projects to show here!"),);
  }
  return GridView.builder(
    padding: const EdgeInsets.all(8),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: myProjects?.length, // Replace with the number of 'Personal' items
    itemBuilder: (context, index) {
      return ProjectCard(title: (myProjects![index])['title'], description: (myProjects[index])['description'], likes: (myProjects[index])['likes']??5, status: (myProjects[index])['status'],
      );
    },
  );
}
