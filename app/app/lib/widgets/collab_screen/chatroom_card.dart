import 'package:flutter/material.dart';

class ChatRoomCard extends StatelessWidget {
  final String title;
  const ChatRoomCard({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          Chip(label: Text('View', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),backgroundColor: Colors.blue, ),
          // ElevatedButton(
          //   style: ElevatedButton.styleFrom(
          //     minimumSize: Size(125, 50),
          //     maximumSize: Size(150, 50),
          //     shape: const RoundedRectangleBorder(
          //         borderRadius: BorderRadius.horizontal(
          //             left: Radius.circular(50),right:  Radius.circular(50))),
          //     backgroundColor:
          //    Colors.blue,
          //   ),
          //   onPressed: () {
          //   },
          //   child: Padding(
          //     padding: const EdgeInsets.all(16.0),
          //     child: const Text('View'),
          //   ),
          // ),
        ],
      ),
    );
  }}