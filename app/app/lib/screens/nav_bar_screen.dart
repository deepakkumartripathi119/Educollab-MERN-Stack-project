import 'package:app/screens/collab_screen.dart';
import 'package:app/screens/courses_screen.dart';
import 'package:app/screens/projects_screen.dart';
import 'package:flutter/material.dart';

class NavBarScreen extends StatefulWidget {
  final int selectedIndex;
  const NavBarScreen({super.key, required this.selectedIndex});

  @override
  NavBarScreenState createState() => NavBarScreenState();
}

class NavBarScreenState extends State<NavBarScreen> {
  bool isLoading = false;
  int _selectedIndex=0;

  final List<Widget> _screens = [
    const ProjectsScreen(),
    // const CoursesScreen(),
    const CollabScreen()
  ];

  @override
  void initState() {
    super.initState();
  }

  List<BottomNavigationBarItem> items = [
    const BottomNavigationBarItem(
      icon: Icon(Icons.folder_copy_rounded),
      label: 'Projects',
    ),
    // const BottomNavigationBarItem(
    //   icon: Icon(Icons.shopping_cart),
    //   label: 'Courses',
    // ),
    const BottomNavigationBarItem(
      icon: Icon(Icons.handshake),
      label: 'Collabs',
    ),

  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: isLoading
          ? const CircularProgressIndicator()
          : _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        backgroundColor: const Color(0xff357AFF),
        selectedItemColor: Colors.white,
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        items: items,
      ),
      // ),
    );
  }
}
