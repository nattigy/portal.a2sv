import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String? id;
  final String? firstName;
  final String? middleName;
  final String? lastName;
  final String? email;
  final String? phoneNumber;
  final String? password;

  const User({
    this.id,
    this.firstName,
    this.middleName,
    this.lastName,
    this.email,
    this.phoneNumber,
    this.password,
  });

  @override
  List<Object?> get props =>
      [id, firstName, middleName, lastName, email, phoneNumber, password];

  static const empty = User();

  factory User.fromJson(Map<String, dynamic> data) {
    return User(
      email: data["email"],
      firstName: "First name ",
      lastName: "Last name",
      middleName: "Middle name",
      id: "1",
      password: "123456",
      phoneNumber: "123456",
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'firstName': firstName,
      "lastName": lastName,
      "middleName": middleName,
      "password": password,
      "phoneNumber": phoneNumber,
      "email": email,
    };
  }
}
