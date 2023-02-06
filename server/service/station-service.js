import stationsModel from "../models/stations-model.js";
import ApiError from "../exceptions/api-error.js";

export const addStation = async (name, location) => {
  const candidateStationLocation = await stationsModel.findOne({
    location: location,
  });

  if (candidateStationLocation) {
    throw ApiError.BadRequest(
      `Станция по следующи координатам : lat:${location.lat}; lng:${location.lng} уже существует`
    );
  }

  const station = await stationsModel.create({
    name: name,
    location: location,
  });
  return station;
};

export const getStations = async () => {
  const stations = await stationsModel.find();
  return stations;
};

export const removeStation = async (stationId) => {
  const station = await stationsModel.findByIdAndDelete(stationId);
  if (!station) {
    throw ApiError.ErrorResponse(500, "Станция не найдена");
  }
  return station;
};

export const editStation = async (stationId, name) => {
  const station = await stationsModel.updateOne(
    { _id: stationId },
    { name: name }
  );
  if (!station) {
    throw ApiError.ErrorResponse(500, "Станция не найдена");
  }
  return station;
};
