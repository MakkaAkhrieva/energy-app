import * as stationService from "../service/station-service.js";

export const addStation = async (req, res, next) => {
  try {
    const { name, location, address } = req.body;
    const stationData = await stationService.addStation(
      name,
      location,
      address
    );
    return res.json(stationData);
  } catch (error) {
    next(error);
  }
};

export const getStations = async (req, res, next) => {
  try {
    const stations = await stationService.getStations();
    res.json(stations);
  } catch (error) {
    next(error);
  }
};

export const getStation = async (req, res, next) => {
  try {
    const stationId = req.params.id;
    const station = await stationService.getStation(stationId);
    res.json(station);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const stationId = req.params.id;
    console.log("stationId", stationId);
    const removeStation = await stationService.removeStation(stationId);
    res.json(removeStation);
  } catch (error) {
    next(error);
  }
};

export const editStation = async (req, res, next) => {
  try {
    const stationId = req.params.id;
    const { name } = req.body;
    const editStation = await stationService.editStation(stationId, name);
    res.json(editStation);
  } catch (error) {
    next(error);
  }
};

export const dropStations = async (req, res, next) => {
  try {
    await stationService.dropStations();
  } catch (error) {
    next(error);
  }
};
