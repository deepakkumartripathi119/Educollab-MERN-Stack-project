import 'package:app/screens/chatroom_screen.dart';
import 'package:flutter/material.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'chatroom_card.dart';

Widget projectChatRoomGrid(chatroom, username, userId) {
  return GridView.builder(
    padding: const EdgeInsets.all(8),
    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 2,
      crossAxisSpacing: 8,
      mainAxisSpacing: 8,
    ),
    itemCount: chatroom.length,
    itemBuilder: (context, index) {
      return GestureDetector(
          onTap: () {
            // print(((chatroom[index])['_id']).runtimeType);
            // print(chatroom.length.toString());
            print(userId);
            Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => ChatRoomScreen(
                        title:(chatroom[index])['title'],
                          projectId: (chatroom[index])['_id'],
                          username: username,
                          userId: userId,
                        )));
          },
          child: ChatRoomCard(title:(chatroom[index])['title'],));
    },
  );
}
