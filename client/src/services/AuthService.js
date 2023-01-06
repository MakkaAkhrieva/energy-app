import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return await $api.post("/login", { email: email, password: password });
  }
  static async registration(email, password) {
    return await $api.post("/registration", {
      email: email,
      password: password,
    });
  }
  static async logout() {
    return await $api.post("/logout");
  }
}
