import stationsModel from "../models/stations-model.js";

export const addStation = async (name, location) => {
  const candidateStation = await stationsModel.findOne({ location: location });
  if (candidateStation) {
    throw ApiError.BadRequest(
      `Станция по следующи координатам : ${location} уже существует`
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
