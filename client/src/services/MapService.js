import $api from "../http";

export default class MapService {
  static async fetchMaps() {
    return await $api.get("/stations");
  }
}
