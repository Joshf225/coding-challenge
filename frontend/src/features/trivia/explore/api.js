// src/features/explore/api.js
export const fetchMarsPhotos = async (rover, cameras, sol, baseUrl) => {
  const params = `rover=${rover}&cameras=${cameras}&sol=${sol}`;
  const url = `${baseUrl}/mars-photos?${params}`;
  const res = await fetch(url);
  const { photos, length } = await res.json();
  return { photos, length };
};

export const fetchRoverDetails = async (rover, baseUrl) => {
  const url = `${baseUrl}/manifests?rover=${rover}`;
  const res = await fetch(url);
  const { roverDetails } = await res.json();
  return roverDetails;
};
