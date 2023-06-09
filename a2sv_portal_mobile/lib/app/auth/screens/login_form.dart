import 'package:a2sv_portal_mobile/app/auth/bloc/login/login_bloc.dart';
import 'package:a2sv_portal_mobile/utils/custom_colors.dart';
import 'package:a2sv_portal_mobile/widgets/buttons/main-button.dart';
import 'package:a2sv_portal_mobile/widgets/inputs/main-input-field.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:formz/formz.dart';

class LoginForm extends StatelessWidget {
  const LoginForm({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocListener<LoginBloc, LoginState>(
      listener: (context, state) {
        if (state.status.isSubmissionFailure) {
          ScaffoldMessenger.of(context)
            ..hideCurrentSnackBar()
            ..showSnackBar(
              const SnackBar(content: Text('Authentication Failure')),
            );
        }
      },
      child: Align(
        alignment: const Alignment(0, -1 / 3),
        child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: MediaQuery.of(context).size.width * 0.03),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 60),
                const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Login",
                    style: TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                const Align(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "Enter credentials associated with your account and continue.",
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                const SizedBox(height: 32),
                _UsernameInput(),
                const SizedBox(height: 12),
                _PasswordInput(),
                const SizedBox(height: 10),
                GestureDetector(
                  onTap: () {},
                  child: Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: Align(
                      alignment: Alignment.centerRight,
                      child: Text(
                        "Forgot password?",
                        style: TextStyle(color: CustomColors.primaryColor),
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 40,
                ),
                Align(alignment: Alignment.topCenter, child: _LoginButton()),
                // const SizedBox(height: 40),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _UsernameInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.username != current.username,
      builder: (context, state) {
        return MainInputField(
          key: const Key('loginForm_usernameInput_textField'),
          placeHolder: "Email",
          iconData: Icons.email_outlined,
          iconColor: CustomColors.veryLightTextColor,
          color: const Color.fromRGBO(250, 251, 255, 1),
          fillColor: CustomColors.fieldBackgroundColor,
          onChanged: (username) =>
              context.read<LoginBloc>().add(LoginUsernameChanged(username)),
          formzInput: state.username,
          customErrorText: "Invalid email",
        );
      },
    );
  }
}

class _PasswordInput extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.password != current.password,
      builder: (context, state) {
        return MainInputField(
          key: const Key('loginForm_passwordInput_textField'),
          placeHolder: "Password",
          iconData: Icons.lock_outline_sharp,
          color: const Color.fromRGBO(250, 251, 255, 1),
          fillColor: CustomColors.fieldBackgroundColor,
          onChanged: (password) =>
              context.read<LoginBloc>().add(LoginPasswordChanged(password)),
          obscureText: true,
          formzInput: state.password,
          customErrorText: "Invalid password",
        );
      },
    );
  }
}

class _LoginButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<LoginBloc, LoginState>(
      buildWhen: (previous, current) => previous.status != current.status,
      builder: (context, state) {
        return state.status.isSubmissionInProgress
            ? const CircularProgressIndicator()
            : MainButton(
                key: const Key('loginForm_continue_raisedButton'),
                title: "Login",
                color: const Color.fromRGBO(89, 86, 233, 1),
                onClick: state.status.isValidated
                    ? () {
                        context.read<LoginBloc>().add(const LoginSubmitted());
                      }
                    : () {},
              );
      },
    );
  }
}
