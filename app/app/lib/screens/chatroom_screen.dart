import 'dart:convert';

import 'package:app/constants/endpoints.dart';
import 'package:http/http.dart' as http;
import 'package:app/models/message.dart';
import 'package:app/widgets/collab_screen/chat_bubble.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class ChatRoomScreen extends StatefulWidget {
  final String? projectId;
  final String? username;
  final String? userId;
  final String? title;
  const ChatRoomScreen(
      {super.key,
      required this.projectId,
      required this.username,
      required this.userId, this.title});

  @override
  ChatRoomScreenState createState() => ChatRoomScreenState();
}

class ChatRoomScreenState extends State<ChatRoomScreen> {
  final TextEditingController _textEditingController = TextEditingController();


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          // elevation: 0,
          leading: const BackButton(color: Colors.black),
          title: Text(
            widget.title!,
            style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.bold, color: Colors.black),
          ),
        ),
        body: SafeArea(
            child: Column(
          children: [
            Expanded(
              child: StreamBuilder<QuerySnapshot>(
                  stream: FirebaseFirestore.instance
                      .collection('chats')
                      .doc(widget.projectId)
                      .collection("messages")
                      .snapshots(),
                  builder: (context, snapshot) {
                    if (snapshot.hasError) {
                      return Text('Error: ${snapshot.error}');
                    }
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    }
                    final chatDocs = snapshot.data!.docs.toList();
                    chatDocs.sort(
                        (a, b) => a['createdAt'].compareTo(b['createdAt']));
                    if (chatDocs.isEmpty) {
                      return const Center(
                        child: Text("No messages yet!"),
                      );
                    } else {
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ListView.builder(
                            itemCount: chatDocs.length,
                            itemBuilder: (context, index) {
                              var chatMessage = chatDocs[index].data()
                                  as Map<String, dynamic>;

                              return ChatBubble(
                                message: Message(
                                    message: chatMessage["message"],
                                    userID: chatMessage["userID"],
                                    timestamp: chatMessage["createdAt"]),
                                leftAlignment:
                                    (chatMessage["userID"] != widget.username),
                              );
                            }),
                      );
                    }
                  }),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 0, 12, 16),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _textEditingController,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.horizontal(
                                  left: Radius.circular(30),
                                  right: Radius.circular(30))),
                          labelText: 'Type a message...',
                          labelStyle: TextStyle(
                            color: Colors.black,
                          ),
                          hintStyle: TextStyle(
                            color: Colors.grey,
                          )
                          // filled: true,
                          // fillColor: Color(0xff1F2C34),
                          ),
                      style: const TextStyle(
                        color: Colors.black,
                      ),
                    ),
                  ),
                  IconButton(
                    onPressed: _sendMessage,
                    icon: const Icon(
                      Icons.send,
                      color: Colors.blue,
                      size: 35,
                    ),
                  ),
                ],
              ),
            ),
          ],
        )));
  }

  void _sendMessage() async {
    String message = _textEditingController.text.trim();
    if (message.isNotEmpty) {
      print('here');
      final url = CollabsEndpoints.postMessage(
          widget.projectId!); // Replace this with your API endpoint URL
      print('here2');

      final Map<String, dynamic> body = {
        'userID': widget.userId!,
        'message': message,
      };
      print('here3');
      final response = await http.post(
        Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(body),
      );

      if (response.statusCode == 201) {
        print('Request successful');
      } else {
        print('Request failed with status: ${response.statusCode}');
        print('Response body: ${response.body}');
      }
      // _scrollDown();
    }
    _textEditingController.clear();
  }
}
