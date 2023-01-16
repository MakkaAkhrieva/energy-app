import * as stationService from "../service/station-service.js";

export const addStation = async (req, res, next) => {
  try {
    const { name, location } = req.body;
    const stationData = await stationService.addStation(name, location);
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
