import $api from "../http";

export default class UserService {
  static async fetchUsers() {
    return await $api.get("/users");
  }
  static async editUser(id, name, surname, email, phone) {
    return await $api.patch(`/user/${id}`, {
      name: name,
      surname: surname,
      email: email,
      phone: phone,
    });
  }
  static async editUserFavourites(id, favourites) {
    return await $api.patch(`/user/favourites/${id}`, {
      favourites: favourites,
    });
  }
}
