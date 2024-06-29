import 'package:flutter/material.dart';

import 'courses_card.dart';

Widget coursesPersonalGrid() {
  // Replace with your data source and item builder for 'Personal'
  return GridView.builder(
    padding: EdgeInsets.all(8),
    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: 6, // Replace with the number of 'Personal' items
    itemBuilder: (context, index) {
      return CoursesCard(); // Customize this widget as needed
    },
  );
}
