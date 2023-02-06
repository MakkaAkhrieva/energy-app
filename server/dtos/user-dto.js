export default class UserDto {
  email;
  id;
  isActivated;
  role;
  name;
  surname;
  phone;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.role = model.role;
    this.name = model.name;
    this.surname = model.surname;
    this.phone = model.phone;
  }
}
