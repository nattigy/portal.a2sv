import 'package:a2sv_portal_mobile/app/auth/bloc/auth/auth.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: TextButton(
            onPressed: () {
              context.read<AuthenticationBloc>().add(
                  AuthenticationLogoutRequested()
              );
            },
            child: Text("Logout"),
          ),
        ),
      ),
    );
  }
}
