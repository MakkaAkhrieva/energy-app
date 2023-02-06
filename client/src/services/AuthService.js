import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return await $api.post("/login", { email: email, password: password });
  }
  static async registration(email, password, name, surname, phone) {
    return await $api.post("/registration", {
      email: email,
      password: password,
      name: name,
      surname: surname,
      phone: phone,
    });
  }
  static async logout() {
    return await $api.post("/logout");
  }
}
