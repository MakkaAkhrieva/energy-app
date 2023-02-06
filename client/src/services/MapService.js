import $api from "../http";

export default class MapService {
  static async fetchMaps() {
    return await $api.get("/stations");
  }
  static async addStation(name, location) {
    return await $api.post("/station", {
      name: name,
      location: location,
    });
  }
  static async removeStation(id) {
    return await $api.delete(`/station/${id}`);
  }
  static async editStation(id, name) {
    return await $api.patch(`/station/${id}`, {
      name: name,
    });
  }
}
