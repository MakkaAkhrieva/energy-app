import $api from "../http";

export default class MapService {
  static async fetchMaps() {
    return await $api.get("/stations");
  }
  static async addStation(name, location, address) {
    return await $api.post("/station", {
      name: name,
      location: location,
      address: address,
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
  static async getStation(id) {
    return await $api.get(`/station/${id}`);
  }
  static async dropStations() {
    return await $api.get("/stations");
  }
}
