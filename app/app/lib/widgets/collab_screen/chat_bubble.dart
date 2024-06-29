import 'package:app/models/message.dart';
import 'package:flutter/material.dart';

class ChatBubble extends StatelessWidget {
  final bool leftAlignment;
  final Message message;
  const ChatBubble({
    Key? key,
    required this.message,
    this.leftAlignment = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: leftAlignment ? CrossAxisAlignment.start : CrossAxisAlignment.end,
      children: [
        Container(
          constraints: const BoxConstraints(maxWidth: 320),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          decoration: BoxDecoration(
            color: leftAlignment ? Colors.grey : Colors.blue,
            borderRadius: BorderRadius.only(
              topLeft: const Radius.circular(20),
              topRight: const Radius.circular(20),
              bottomLeft: leftAlignment ? const Radius.circular(0) : const Radius.circular(20),
              bottomRight: leftAlignment ? const Radius.circular(20) : const Radius.circular(0),
            ),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (leftAlignment)
                Text(
                  message.userID,
                  style: const TextStyle(fontSize: 12, color: Colors.black),
                ),
              Text(
                message.message,
                style: const TextStyle(fontSize: 18, color: Colors.white),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
