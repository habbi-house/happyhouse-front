import { getApiInstance } from ".";

const api = getApiInstance();

async function getBaseAddress(success, fail) {
  await api.get(`/search`).then(success).catch(fail);
}

async function getAllHouses(dongCode, success, fail) {
  await api.post(`/search`, dongCode).then(success).catch(fail);
}

async function getAllHouseDeals(aptCode, success, fail) {
  await api.get(`/search/${aptCode}`).then(success).catch(fail);
}

export { getBaseAddress, getAllHouses, getAllHouseDeals };
