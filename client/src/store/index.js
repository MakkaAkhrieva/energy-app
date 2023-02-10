import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import MapService from "../services/MapService";
import axios from "axios";
import UserService from "../services/UserService.js";
import { API_URL } from "../http";
import { toJS } from "mobx";
import { observable } from "mobx";

export default class Store {
  user = {}
  isAuth = false;
  isLoading = false;
  isError = "";
  stations = [];

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

  async addStation(name, location) {
    try {
      const station = await MapService.addStation(name, location);
      this.stations = [...this.stations, station.data];
      console.log("newstore", toJS(this.stations));
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async editStation(id, name) {
    try {
      await MapService.editStation(id, name);
      this.getStations();
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async editUser(id, name, surname, email, phone) {
    try {
      const response = await UserService.editUser(
        id,
        name,
        surname,
        email,
        phone
      );
      this.setUser({ ...response?.data?.user });
      console.log("data", response?.data?.user);
      console.log("SNTHIG");
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async removeStation(id) {
    try {
      await MapService.removeStation(id);
      this.stations = this.stations.filter((item) => item._id !== id);
      console.log(toJS(this.stations));
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async getStations() {
    try {
      const response = await MapService.fetchMaps();
      console.log("DATA", response.data);
      this.stations = [...response.data];
      this.setError(false);
      console.log("store", toJS(this.stations));
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async login(email, password) {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
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
        phone
      );
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response, "response");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.setAuth(false);
      this.setUser({});
      this.setError(false);
      console.log("logout");
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("role", response.data.user.role);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setError(false);
    } catch (error) {
      this.setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }
}
