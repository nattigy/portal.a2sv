class CreateUserInput {
  final String? firstName;
  final String? middleName;
  final String? lastName;
  final String? phoneNumber;
  final String? password;
  final String? location;
  final String? type;
  final String? gender;
  final String? role;
  final String? source;
  final String? registrationDate;

  CreateUserInput(
      {this.firstName,
      this.middleName,
      this.lastName,
      this.phoneNumber,
      this.password,
      this.location,
      this.type,
      this.gender,
      this.role,
      this.source,
      this.registrationDate});
}
