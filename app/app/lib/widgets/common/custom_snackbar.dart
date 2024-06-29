import 'package:flutter/material.dart';

void showSnackBar(String message,context) {
  final snackBar = SnackBar(
    elevation: 10,
    duration: const Duration(milliseconds: 1000),
    content: Center(
      child: Text(
        message,
        textAlign: TextAlign.center,
        style: const TextStyle(color: Colors.white),
      ),
    ),
    backgroundColor:
    Colors.black,
    behavior: SnackBarBehavior.floating,
    margin: const EdgeInsets.all(50),
  );

  ScaffoldMessenger.of(context).showSnackBar(snackBar);
}
