import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import MapService from "../services/MapService";
import axios from "axios";
import UserService from "../services/UserService.js";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;
  isError = false;
  stations = [];
  favouriteStations = [];
  station = {};

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setError(error) {
    this.isError = error;
  }

  addFavouriteStation(favouriteStation) {
    this.favouriteStations = [...this.user.favourites, favouriteStation];
  }

  deleteFavouriteStation(favouriteId) {
    this.favouriteStations = this.user.favourites.filter(
      (station) => station._id !== favouriteId,
    );
  }

  async addStation(name, location, address) {
    try {
      const station = await MapService.addStation(name, location, address);
      this.stations = [...this.stations, station.data];
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async editStation(id, name) {
    try {
      await MapService.editStation(id, name);
      this.getStations();
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async editStations(id, name, location, address) {
    try {
      await MapService.editStations(id, name, location, address);
      this.getStations();
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async editUser(id, name, surname, email, phone) {
    try {
      const response = await UserService.editUser(
        id,
        name,
        surname,
        email,
        phone,
      );
      this.setUser({ ...response?.data?.user });
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async editUserFavourites(id, favourites) {
    try {
      const response = await UserService.editUserFavourites(id, favourites);
      this.setUser(response?.data?.user);
      this.favouriteStations = [...response?.data?.user.favourites];
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async removeStation(id) {
    try {
      await MapService.removeStation(id);
      this.stations = this.stations.filter((item) => item._id !== id);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async dropStations() {
    try {
      await MapService.dropStations();
      this.stations = [];
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async getStations() {
    try {
      const response = await MapService.fetchMaps();
      this.stations = [...response.data];
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async getStation(id) {
    try {
      const response = await MapService.getStation(id);
      this.station = response.data;
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async login(email, password) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email, password, name, surname, phone) {
    this.setLoading(true);
    try {
      const response = await AuthService.registration(
        email,
        password,
        name,
        surname,
        phone,
      );

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.setAuth(false);
      this.setUser({});
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
