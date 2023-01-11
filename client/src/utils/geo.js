const defaultCenter = {
  lat: 60.9,
  lng: 27.5667,
};

export const getBrowserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        resolve({ lat, lng });
      },
      (error) => {
        reject(defaultCenter);
        console.log(error);
      }
    );
  });
};
