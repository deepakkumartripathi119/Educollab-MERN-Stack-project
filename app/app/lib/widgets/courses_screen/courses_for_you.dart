import 'package:flutter/material.dart';
import 'courses_card.dart';

Widget coursesForYouGrid() {
  // Replace with your data source and item builder for 'For You'
  return GridView.builder(
    padding: const EdgeInsets.all(8),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: 9, // Replace with the number of 'For You' items
    itemBuilder: (context, index) {
      return const CoursesCard(); // Customize this widget as needed
    },
  );
}